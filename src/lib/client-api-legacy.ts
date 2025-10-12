/**
 * Client-side API compatibility layer
 * This maintains compatibility for client-side API calls while using the new service architecture
 */

import { productService, categoryService } from "./api/services";
import type { Product, Category, Review } from "@/types";

export async function fetchProductsClient() {
  try {
    const response = await productService.getProducts();
    return { 
      data: response.products, 
      total: response.total 
    };
  } catch (error) {
    console.warn("Client API fallback for fetchProductsClient", error);
    // Use the old client-side simulation
    const mockProducts = await import("./mock").then(m => m.mockProducts);
    return { data: mockProducts, total: mockProducts.length };
  }
}

export async function fetchCategoriesClient() {
  try {
    const response = await categoryService.getCategories();
    return response;
  } catch (error) {
    console.warn("Client API fallback for fetchCategoriesClient", error);
    const mockCategories = await import("./mock").then(m => m.mockCategories);
    return { data: mockCategories, total: mockCategories.length };
  }
}

export async function fetchCategoryProductsClient(slug: string) {
  try {
    const response = await productService.getProductsByCategory(slug);
    return { 
      data: response.products, 
      total: response.total 
    };
  } catch (error) {
    console.warn("Client API fallback for fetchCategoryProductsClient", error);
    const mockProducts = await import("./mock").then(m => m.mockProducts);
    const products = mockProducts.filter((product) => product.category.slug === slug);
    return { data: products, total: products.length };
  }
}

export async function fetchProductClient(slug: string) {
  try {
    const response = await productService.getProduct(slug);
    return response;
  } catch (error) {
    console.warn("Client API fallback for fetchProductClient", error);
    const mockProducts = await import("./mock").then(m => m.mockProducts);
    const product = mockProducts.find((item) => item.slug === slug || item.id === slug);
    if (!product) throw new Error("Product not found");
    return { data: product };
  }
}

export async function fetchProductReviewsClient(id: string) {
  try {
    const response = await productService.getProductReviews(id);
    return response;
  } catch (error) {
    console.warn("Client API fallback for fetchProductReviewsClient", error);
    const mockReviews = await import("./mock").then(m => m.mockReviews);
    return { data: mockReviews[id] || [] };
  }
}