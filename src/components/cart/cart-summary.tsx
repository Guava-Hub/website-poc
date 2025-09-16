"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartSummary() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed bg-muted/40 p-12 text-center text-sm text-muted-foreground">
        Your cart is empty. <Link href="/" className="text-primary hover:underline">Explore products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid gap-4 rounded-3xl border bg-background p-4 shadow-sm sm:grid-cols-[160px,1fr]">
            <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={item.product.images?.[0] ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e"}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div>
                <Link href={`/product/${item.product.slug}`} className="text-sm font-semibold text-foreground">
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground">SKU {item.product.sku}</p>
                {item.variantId && <p className="text-xs text-muted-foreground">Variant: {item.variantId.split(":")[1]}</p>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center rounded-full border">
                  <button
                    type="button"
                    className="p-2"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3rem] text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    className="p-2"
                    onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove item"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated tax</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
    </div>
  );
}
