"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ProductRating } from "./product-rating";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

interface ProductQuickViewProps {
  product: Product;
  children: React.ReactNode;
}

export function ProductQuickView({ product, children }: ProductQuickViewProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();

  const displayPrice = useMemo(() => product.salePrice ?? product.price, [product]);

  const handleAdd = () => {
    addItem(product, selectedVariant, quantity);
  toast({ title: "Added to cart" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="grid gap-6 overflow-hidden p-0 sm:grid-cols-[1fr,1.1fr]">
        <div className="relative min-h-[320px]">
          <Image
            src={product.images?.[0] ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4 p-6">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              SKU {product.sku}
            </DialogDescription>
          </DialogHeader>
          <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-primary">{formatCurrency(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-4">{product.description}</p>

          {product.variants.length > 0 && (
            <div className="space-y-3">
              {product.variants.map((variant) => (
                <div key={variant.id} className="space-y-1">
                  <span className="text-sm font-medium text-foreground">{variant.name}</span>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const value = `${variant.id}:${option}`;
                      const isSelected = selectedVariant === value;
                      return (
                        <button
                          key={value}
                          onClick={() => setSelectedVariant(value)}
                          className={`rounded-full border px-4 py-1 text-xs font-medium transition hover:border-primary hover:text-primary ${isSelected ? "border-primary bg-primary/10 text-primary" : "border-border"}`}
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

          <div className="flex items-center gap-3">
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
            <Button className="flex-1" onClick={handleAdd}>
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
