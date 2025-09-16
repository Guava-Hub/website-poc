"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";

import { useProducts } from "@/hooks/use-products";
import { cn, formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsPopoverProps {
  query: string;
  children: React.ReactNode;
  onSelect?: () => void;
}

export function SearchResultsPopover({ query, children, onSelect }: SearchResultsPopoverProps) {
  const { products, isLoading } = useProducts({ searchTerm: query });

  const showPopover = query.length > 1;
  const filteredProducts = useMemo(() => products.slice(0, 6), [products]);

  return (
    <div className="relative w-full">
      {children}
      {showPopover && (
        <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="flex items-center gap-2 border-b px-4 py-3 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            Showing results for "{query}"
          </div>
          <ScrollArea className="max-h-80">
            <div className="space-y-1 p-2">
              {isLoading && (
                <div className="space-y-2 p-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && filteredProducts.length === 0 && (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  No products found.
                </div>
              )}
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onSelect}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                    !product.inStock && "opacity-75"
                  )}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-muted"
                    aria-hidden
                  >
                    <span className="text-xs font-semibold uppercase">
                      {product.name.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {formatCurrency(product.salePrice ?? product.price)}
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t px-4 py-3 text-sm">
            <Link href={`/category/${filteredProducts[0]?.category.slug ?? "all"}`} className="font-medium text-primary hover:underline" onClick={onSelect}>
              View all results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
