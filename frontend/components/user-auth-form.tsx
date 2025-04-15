"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/lib/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp?: boolean;
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, isSignUp = false, ...props }: UserAuthFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    try {
      if (isSignUp) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Sign up failed")
        }

        // Automatically sign in the user after successful signup
        const signInResult = await signIn("credentials", {
          email: data.email.toLowerCase(),
          password: data.password,
          redirect: false,
        })

        if (signInResult?.error) {
          throw new Error("Failed to sign in after signup")
        }
      } else {
        console.log("Attempting to sign in with:", data.email.toLowerCase())
        const result = await signIn("credentials", {
          email: data.email.toLowerCase(),
          password: data.password,
          redirect: false,
        })
        
        console.log("Sign in result:", result)
        
        if (result?.error) {
          throw new Error(result.error)
        }
      }

      console.log("Authentication successful, redirecting to dashboard")
      // Try using a hard redirect instead of router.push which might be failing silently
      window.location.href = "/dashboard"
      // Fallback to router.push after a short delay if the redirect doesn't happen
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: isSignUp ? "Account creation failed" : "Sign in failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {isSignUp && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading || isGoogleLoading}
                {...register("name")}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google", { callbackUrl: "/dashboard" })
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}