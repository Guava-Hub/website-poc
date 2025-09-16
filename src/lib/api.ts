import "server-only";

import { revalidateTag } from "next/cache";

import type { ApiListResponse, ApiSingleResponse, Category, Product, Review } from "@/types";
import { mockCategories, mockProducts, mockReviews } from "./mock-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  if (!API_BASE_URL) {
    return simulateResponse<T>(endpoint) as Promise<T>;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    next: { revalidate: 300, tags: [endpoint] }
  });

  if (!res.ok) {
    console.warn(`Request to ${endpoint} failed with ${res.status}`);
    return simulateResponse<T>(endpoint) as Promise<T>;
  }

  return (await res.json()) as T;
}

async function simulateResponse<T>(endpoint: string): Promise<T> {
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

export async function getProducts(params?: URLSearchParams): Promise<ApiListResponse<Product>> {
  const query = params?.toString();
  const endpoint = query ? `/api/products?${query}` : "/api/products";
  return fetchJson<ApiListResponse<Product>>(endpoint);
}

export async function getProduct(slug: string): Promise<ApiSingleResponse<Product>> {
  return fetchJson<ApiSingleResponse<Product>>(`/api/products/${slug}`);
}

export async function getCategories(): Promise<ApiListResponse<Category>> {
  return fetchJson<ApiListResponse<Category>>("/api/categories");
}

export async function getCategoryProducts(slug: string): Promise<ApiListResponse<Product>> {
  return fetchJson<ApiListResponse<Product>>(`/api/products/category/${slug}`);
}

export async function getProductReviews(
  productId: string
): Promise<ApiListResponse<Review>> {
  return fetchJson<ApiListResponse<Review>>(`/api/products/${productId}/reviews`);
}

export function revalidateProducts() {
  revalidateTag("/api/products");
}
