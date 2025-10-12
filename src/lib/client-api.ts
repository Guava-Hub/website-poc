import type { Category, Product, Review } from "@/types";
import { mockCategories, mockProducts, mockReviews } from "./mock";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function clientFetch<T>(endpoint: string): Promise<T> {
  if (!API_BASE_URL) {
    return simulateResponse<T>(endpoint);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("Request failed");
    return (await res.json()) as T;
  } catch (error) {
    console.warn("Falling back to mock data for", endpoint, error);
    return simulateResponse<T>(endpoint);
  }
}

async function simulateResponse<T>(endpoint: string): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 200));

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
    if (!product) throw new Error("Product not found");
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

export function fetchProductsClient() {
  return clientFetch<{ data: Product[]; total: number }>("/api/products");
}

export function fetchCategoriesClient() {
  return clientFetch<{ data: Category[]; total: number }>("/api/categories");
}

export function fetchCategoryProductsClient(slug: string) {
  return clientFetch<{ data: Product[]; total: number }>(`/api/products/category/${slug}`);
}

export function fetchProductClient(slug: string) {
  return clientFetch<{ data: Product }>(`/api/products/${slug}`);
}

export function fetchProductReviewsClient(id: string) {
  return clientFetch<{ data: Review[] }>(`/api/products/${id}/reviews`);
}
