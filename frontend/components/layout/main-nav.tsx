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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className={cn(
        "flex flex-col h-screen bg-secondary transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-14 items-center justify-center border-b">
        {isExpanded ? (
          <h1 className="text-lg font-bold text-primary">Calf Care</h1>
        ) : (
          <span className="text-2xl">🐄</span>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              {isExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
}