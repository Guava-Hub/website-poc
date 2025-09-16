"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Search, LogIn } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { MobileMenu } from "./mobile-menu";
import { SearchResultsPopover } from "./search-results-popover";

const routes = [
  { href: "/", label: "Home" },
  { href: "/category/smartphones", label: "Smartphones" },
  { href: "/category/laptops", label: "Laptops" },
  { href: "/category/audio", label: "Audio" },
  { href: "/category/wearables", label: "Wearables" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs px-0">
              <MobileMenu routes={routes} onNavigate={() => setSearchTerm("")} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">v0</span>
            <span>Visionary</span>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <SearchResultsPopover query={searchTerm} onSelect={() => setSearchTerm("")}>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="pl-9"
                aria-label="Search products"
              />
            </div>
          </SearchResultsPopover>
        </div>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {routes.slice(0, 4).map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === route.href ? "bg-accent text-accent-foreground" : ""
                      )}
                    >
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign in
              </DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/checkout"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="View cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-[1.25rem] justify-center bg-accent text-xs text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </div>

      <div className="border-t bg-muted/40 py-2">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <p>Free shipping on orders over $199</p>
          <div className="hidden items-center gap-4 md:flex">
            {routes.slice(4).map((route) => (
              <Link key={route.href} href={route.href} className="hover:text-foreground">
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
