import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isActive: boolean;
      image?: string | null;
    } & DefaultSession["user"]
    accessToken?: string;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    accessToken?: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        try {
          console.log("Attempting login with credentials:", credentials.email)
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email.toLowerCase(),
              password: credentials.password
            }),
            headers: { "Content-Type": "application/json" }
          })

          const data = await res.json()
          console.log("Login response status:", res.status)
          console.log("Login response data:", JSON.stringify(data))

          if (!res.ok) {
            throw new Error(data.message || 'Authentication failed')
          }

          if (data.user && data.access_token) {
            const user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              isActive: data.user.isActive,
              accessToken: data.access_token
            }
            console.log("User authenticated successfully:", user.email)
            return user
          }

          console.log("Authentication failed: Missing user or token in response")
          return null
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT callback - user:", user ? user.email : "no user")
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
        token.isActive = user.isActive
        token.accessToken = user.accessToken || account?.access_token
      }
      return token
    },
    async session({ session, token }) {
      console.log("Session callback - user:", token?.email)
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        session.user.isActive = token.isActive as boolean
        session.user.image = token.picture as string | null
        session.accessToken = token.accessToken as string | undefined
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
})