"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FileText, List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Details", href: "/details", icon: FileText },
  { name: "Watchlist", href: "/watchlist", icon: List },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:space-x-6">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="font-bold text-xl">Calf Care</span>
      </Link>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}