/**
 * Mock response simulation for fallback compatibility
 */

import type { ApiListResponse, ApiSingleResponse } from "./types";
import { mockCategories, mockProducts, mockReviews } from "../mock";

export async function simulateResponse<T>(endpoint: string): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (endpoint.startsWith("/api/products/category/")) {
    const slug = endpoint.replace("/api/products/category/", "");
    const products = mockProducts.filter((product) => product.category.slug === slug);
    return { data: products, total: products.length } as T;
  }

  if (endpoint.startsWith("/api/products/") && endpoint.endsWith("/reviews")) {
    const id = endpoint.replace("/api/products/", "").replace("/reviews", "");
    return { data: mockReviews[id] || [] } as T;
  }

  if (endpoint.startsWith("/api/products/")) {
    const slug = endpoint.replace("/api/products/", "");
    const product = mockProducts.find((item) => item.slug === slug || item.id === slug);
    if (!product) {
      throw new Error("Product not found");
    }
    return { data: product } as T;
  }

  switch (endpoint) {
    case "/api/products":
      return { data: mockProducts, total: mockProducts.length } as T;
    case "/api/categories":
      return { data: mockCategories, total: mockCategories.length } as T;
    default:
      throw new Error(`No mock available for ${endpoint}`);
  }
}