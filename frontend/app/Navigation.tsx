'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"

export default function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = [
    { name: "Overview", href: "/dashboard" },
    { name: "Details", href: "/details" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Settings", href: "/settings" },
  ]

  // Function to generate UI Avatar URL
  const getAvatarUrl = (name: string, email: string) => {
    const encodedName = encodeURIComponent(name || 'User');
    // Use a muted color for the background
    const backgroundColor = '64748b'; // This is a muted slate color, adjust if needed
    const foregroundColor = 'ffffff'; // White text for contrast
    return `https://ui-avatars.com/api/?name=${encodedName}&background=${backgroundColor}&color=${foregroundColor}&size=128&length=2&email=${encodeURIComponent(email)}`;
  }

  return (
    <div className="border-b bg-background text-foreground shadow-sm">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center">
          <Image src="/Calf.svg" alt="Calf Care Logo" width={40} height={40} />
          <span className="text-xl font-bold ml-2 text-foreground">Calf Care</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={session.user?.image || getAvatarUrl(session.user?.name || '', session.user?.email || '')}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium transition-colors hover:text-primary">Sign In</Link>
              <Link href="/signup" className="text-sm font-medium transition-colors hover:text-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}