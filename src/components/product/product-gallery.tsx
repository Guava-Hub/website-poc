"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border bg-muted/30">
        <Image
          src={images[activeIndex] ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e"}
          alt={alt}
          width={960}
          height={960}
          className="h-full w-full object-cover"
          priority
        />
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border",
              activeIndex === index ? "border-primary" : "border-transparent"
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={image} alt={`${alt} thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
