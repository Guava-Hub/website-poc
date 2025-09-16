"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import type { Category, Product } from "@/types";
import { ProductGrid } from "./product-grid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const ratingFilters = [5, 4, 3];
const sortOptions = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest arrivals" }
];

interface CategoryPageContentProps {
  products: Product[];
  category: Category | null;
}

export function CategoryPageContent({ products, category }: CategoryPageContentProps) {
  const initialMin = Math.min(...products.map((product) => product.salePrice ?? product.price));
  const initialMax = Math.max(...products.map((product) => product.salePrice ?? product.price));

  const [priceRange, setPriceRange] = useState<[number, number]>([initialMin, initialMax]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("popular");

  const brandOptions = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((product) => {
      const prefix = product.name.split(" ")[0];
      brands.add(prefix);
    });
    return Array.from(brands).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const price = product.salePrice ?? product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      })
      .filter((product) =>
        selectedRatings.length > 0
          ? selectedRatings.some((rating) => product.rating >= rating)
          : true
      )
      .filter((product) =>
        selectedBrands.length > 0
          ? selectedBrands.some((brand) => product.name.startsWith(brand))
          : true
      )
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        switch (sort) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return b.reviewCount - a.reviewCount;
          default:
            return b.reviewCount - a.reviewCount;
        }
      });
  }, [products, priceRange, selectedRatings, selectedBrands, sort]);

  const filtersApplied = selectedRatings.length + selectedBrands.length > 0 ||
    priceRange[0] !== initialMin ||
    priceRange[1] !== initialMax;

  const clearFilters = () => {
    setPriceRange([initialMin, initialMax]);
    setSelectedRatings([]);
    setSelectedBrands([]);
    setSort("popular");
  };

  const filters = (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Price</h3>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
          </span>
        </div>
        <Slider
          min={Math.floor(initialMin)}
          max={Math.ceil(initialMax)}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide">Brand</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => {
            const checked = selectedBrands.includes(brand);
            return (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setSelectedBrands((prev) =>
                      checked ? [...prev, brand] : prev.filter((item) => item !== brand)
                    )
                  }
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide">Rating</h3>
        <div className="space-y-2">
          {ratingFilters.map((rating) => {
            const checked = selectedRatings.includes(rating);
            return (
              <label key={rating} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setSelectedRatings((prev) =>
                      checked ? [...prev, rating] : prev.filter((item) => item !== rating)
                    )
                  }
                />
                <span>{rating} stars & up</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products in {category?.name ?? "collection"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {filtersApplied && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" /> Clear filters
            </Button>
          )}
          <div className="hidden items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm sm:flex">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
          <RadioGroup
            value={sort}
            onValueChange={setSort}
            className="hidden items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm sm:flex"
          >
            {sortOptions.map((option) => (
              <Label
                key={option.value}
                htmlFor={`sort-${option.value}`}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                  sort === option.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem value={option.value} id={`sort-${option.value}`} className="sr-only" />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="sm:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Reset
                </Button>
              </div>
              <div className="mt-6 space-y-8">{filters}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        <aside className="hidden rounded-3xl border bg-background p-6 shadow-sm lg:block">{filters}</aside>
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border bg-muted/40 px-4 py-3 text-sm">
            <span className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4" /> Sorted by {sortOptions.find((option) => option.value === sort)?.label}
            </span>
            <span className="text-muted-foreground">Showing {filteredProducts.length} results</span>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
