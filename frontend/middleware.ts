import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  // Enhanced debugging
  if (token) {
    console.log("Token exists. User email:", token.email)
    // Check for token expiration
    const exp = token.exp as number | undefined
    const currentTime = Math.floor(Date.now() / 1000)
    if (exp) {
      const timeLeft = exp - currentTime
      console.log(`Token expires in: ${timeLeft} seconds`)
      if (timeLeft <= 0) {
        console.log("TOKEN EXPIRED! This may explain authentication issues.")
      }
    } else {
      console.log("Token has no expiration information")
    }
  } else {
    console.log("No token found")
  }
  
  console.log(`Middleware: Path ${request.nextUrl.pathname}, Token exists: ${!!token}`)
  
  const isAuthPage = request.nextUrl.pathname.startsWith("/signin") || 
                    request.nextUrl.pathname.startsWith("/signup")

  if (isAuthPage) {
    if (token) {
      console.log("User is already authenticated, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    console.log("User is not authenticated, allowing access to auth page")
    return NextResponse.next()
  }

  if (!token) {
    console.log("User is not authenticated, redirecting to signin page")
    let from = request.nextUrl.pathname
    if (request.nextUrl.search) {
      from += request.nextUrl.search
    }
    return NextResponse.redirect(
      new URL(`/signin?from=${encodeURIComponent(from)}`, request.url)
    )
  }

  console.log("User is authenticated, allowing access to protected route")
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/signin",
    "/signup",
  ],
}