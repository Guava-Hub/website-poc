"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface MobileMenuProps {
  routes: { href: string; label: string }[];
  onNavigate?: () => void;
}

export function MobileMenu({ routes, onNavigate }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onNavigate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="space-y-1">
      <div className="px-6 pb-4 pt-6">
        <h3 className="text-lg font-semibold">Browse</h3>
        <p className="text-sm text-muted-foreground">Discover the latest tech handpicked for you.</p>
      </div>
      <nav className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center justify-between px-6 py-3 text-sm font-medium",
              pathname === route.href ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            )}
          >
            <span>{route.label}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
