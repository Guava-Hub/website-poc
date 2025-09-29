"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";

import type { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductRating } from "./product-rating";
import { ProductQuickView } from "./product-quick-view";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - (product.salePrice ?? product.price)) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product);
  toast({ title: "Added to cart" });
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <CardHeader className="relative flex h-60 items-center justify-center overflow-hidden p-0">
        <Link href={`/product/${product.slug}`} className="relative h-full w-full">
          <Image
            src={product.images?.[0] ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="destructive" className="rounded-full text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && <Badge variant="secondary">Sold out</Badge>}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <ProductQuickView product={product}>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-3 right-3 h-9 w-9 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </ProductQuickView>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-foreground">
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-primary">{formatCurrency(displayPrice)}</span>
          {hasDiscount && (
            <span className="text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid gap-2 p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" disabled={!product.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
        </Button>
        <Link
          href={`/product/${product.slug}`}
          className="w-full rounded-md border border-input px-3 py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
