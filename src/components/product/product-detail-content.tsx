"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Share2, Minus, Plus, ShieldCheck, RefreshCw } from "lucide-react";

import type { Product, Review } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductRating } from "./product-rating";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { ReviewsSection } from "./reviews-section";
import { ProductGrid } from "./product-grid";

interface ProductDetailContentProps {
  product: Product;
  related: Product[];
  reviews: Review[];
}

export function ProductDetailContent({ product, related, reviews }: ProductDetailContentProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const displayPrice = useMemo(() => product.salePrice ?? product.price, [product]);
  const discount = useMemo(() => {
    if (!product.salePrice) return null;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  }, [product]);

  const handleAddToCart = () => {
    addItem(product, selectedVariant ?? undefined, quantity);
  toast({ title: "Added to cart" });
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant ?? undefined, quantity);
  toast({ title: "Checkout" });
  };

  return (
    <div className="space-y-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>{product.category.name}</span>
            {product.inStock ? <Badge variant="secondary">In stock</Badge> : <Badge variant="outline">Backorder</Badge>}
            {discount && <Badge variant="destructive">Save {discount}%</Badge>}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
            <div className="text-sm text-muted-foreground">SKU {product.sku}</div>
            <button className="text-sm font-medium text-primary hover:underline">
              Write a review
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-2xl font-semibold">
            <span className="text-primary">{formatCurrency(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.highlights?.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 rounded-xl border bg-background/60 px-4 py-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" /> {highlight}
              </div>
            ))}
          </div>
          <Separator />
          {product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.id} className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">{variant.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const value = `${variant.id}:${option}`;
                      const isActive = selectedVariant === value;
                      return (
                        <button
                          key={value}
                          onClick={() => setSelectedVariant(value)}
                          className={`rounded-full border px-4 py-1 text-xs font-medium transition ${
                            isActive ? "border-primary bg-primary/10 text-primary" : "border-input hover:border-primary"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border">
              <button
                type="button"
                className="p-2"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3rem] text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                className="p-2"
                onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-1 min-w-[200px]">
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
            </Button>
            <Button size="lg" variant="secondary" onClick={handleBuyNow} className="flex-1 min-w-[200px]">
              Buy now
            </Button>
            <Button size="icon" variant="outline" aria-label="Add to wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Share product">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Secure checkout</h4>
                  <p>Protected payments via Stripe with PCI compliance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Flexible returns</h4>
                  <p>30-day returns with free prepaid label on every order.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Key specifications</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {product.highlights?.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                {highlight}
              </li>
            ))}
          </ul>
          <Separator />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Need help?</h3>
          <p className="text-sm text-muted-foreground">
            Chat with our product specialists or email <Link href="mailto:support@visionary.io" className="text-primary hover:underline">support@visionary.io</Link> for tailored recommendations.
          </p>
          <Button variant="outline" className="w-full">
            Start live chat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </TabsContent>
        <TabsContent value="specs">
          <div className="grid gap-3 sm:grid-cols-2">
            {product.highlights?.map((highlight) => (
              <div key={highlight} className="rounded-2xl border bg-muted/40 p-4">
                <h4 className="text-sm font-semibold text-foreground">{highlight.split(" ")[0]}</h4>
                <p className="text-xs text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="space-y-3 text-sm text-muted-foreground">
          <p>Enjoy complimentary express shipping on US orders over $199.</p>
          <p>Need to return? Start a return within 30 days for a free prepaid label.</p>
          <p>International shipping calculated at checkout with duties prepaid.</p>
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsSection reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} />
        </TabsContent>
      </Tabs>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">You might also like</h2>
          <Button variant="ghost" asChild>
            <Link href={`/category/${product.category.slug}`}>View more</Link>
          </Button>
        </div>
        <ProductGrid products={related} emptyMessage="No related products available." />
      </section>
    </div>
  );
}
