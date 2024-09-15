import * as z from "zod"
import { signIn } from "next-auth/react"

export const userAuthSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export type UserAuthSchema = z.infer<typeof userAuthSchema>
export type SignUpCredentials = z.infer<typeof userAuthSchema>

export async function signUpWithCredentials(data: SignUpCredentials) {
  const validatedFields = userAuthSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || "Sign up failed" }
    }

    // Sign in the user after successful signup
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { error: "Failed to sign in after signup. Please try logging in manually." }
    }

    return { success: true }
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." }
  }
}