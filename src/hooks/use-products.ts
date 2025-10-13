"use client";

import { useEffect, useMemo, useState } from "react";

import type { FilterState, Product } from "@/types";
import { productService } from "@/lib/api/services";

const defaultFilters: FilterState = {
  priceRange: { min: 0, max: 3000 },
  brands: [],
  ratings: [],
  sortBy: "popular"
};

interface UseProductsOptions {
  searchTerm?: string;
  categorySlug?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        let list: Product[];
        
        if (options.categorySlug) {
          const response = await productService.getProductsByCategory(options.categorySlug);
          list = response.products;
        } else {
          const response = await productService.getProducts();
          list = response.products;
        }

        if (options.searchTerm) {
          const query = options.searchTerm.toLowerCase();
          list = list.filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query)
          );
        }

        if (isMounted) {
          setProducts(list);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load products");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [options.searchTerm, options.categorySlug]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const price = product.salePrice ?? product.price;
        return price >= filters.priceRange.min && price <= filters.priceRange.max;
      })
      .filter((product) =>
        filters.ratings.length ? filters.ratings.some((rating) => product.rating >= rating) : true
      )
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;

        switch (filters.sortBy) {
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
  }, [products, filters]);

  return {
    products: filteredProducts,
    isLoading,
    error,
    filters,
    setFilters
  };
}
