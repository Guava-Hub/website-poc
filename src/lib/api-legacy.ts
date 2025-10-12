/**
 * Compatibility layer for existing API calls
 * This file maintains backward compatibility while migrating to the new API structure
 */

import { productService, categoryService } from "./api/services";
import type { Product, Category, Review } from "@/types";
import type { ApiListResponse, ApiSingleResponse } from "./api/types";

// Mock data simulation fallback
import { simulateResponse } from "./api/mock-simulation";

/**
 * @deprecated Use productService.getProducts() instead
 */
export async function getProducts(params?: URLSearchParams): Promise<ApiListResponse<Product>> {
    try {
        const searchParams = params ? Object.fromEntries(params.entries()) : undefined;
        const response = await productService.getProducts({
            filters: searchParams,
            pagination: {
                page: searchParams?.page ? parseInt(searchParams.page) : undefined,
                pageSize: searchParams?.pageSize ? parseInt(searchParams.pageSize) : undefined,
            },
            sort: {
                sortBy: searchParams?.sortBy as any,
                sortOrder: searchParams?.sortOrder as any,
            },
        });

        return {
            data: response.products,
            total: response.total,
        };
    } catch (error) {
        console.warn("Falling back to mock data for getProducts", error);
        const query = params?.toString();
        const endpoint = query ? `/api/products?${query}` : "/api/products";
        return simulateResponse<ApiListResponse<Product>>(endpoint);
    }
}

/**
 * @deprecated Use productService.getProduct() instead
 */
export async function getProduct(slug: string): Promise<ApiSingleResponse<Product>> {
    try {
        return await productService.getProduct(slug);
    } catch (error) {
        console.warn("Falling back to mock data for getProduct", error);
        return simulateResponse<ApiSingleResponse<Product>>(`/api/products/${slug}`);
    }
}

/**
 * @deprecated Use categoryService.getCategories() instead
 */
export async function getCategories(): Promise<ApiListResponse<Category>> {
    try {
        return await categoryService.getCategories();
    } catch (error) {
        console.warn("Falling back to mock data for getCategories", error);
        return simulateResponse<ApiListResponse<Category>>("/api/categories");
    }
}

/**
 * @deprecated Use productService.getProductsByCategory() instead
 */
export async function getCategoryProducts(slug: string): Promise<ApiListResponse<Product>> {
    try {
        const response = await productService.getProductsByCategory(slug);
        // Handle both API response format {products: Product[]} and mock format {data: Product[]}
        if ('products' in response) {
            return {
                data: response.products,
                total: response.total,
            };
        } else {
            return response as ApiListResponse<Product>;
        }
    } catch (error) {
        console.warn("Falling back to mock data for getCategoryProducts", error);
        return simulateResponse<ApiListResponse<Product>>(`/api/products/category/${slug}`);
    }
}

/**
 * @deprecated Use productService.getProductReviews() instead
 */
export async function getProductReviews(productId: string): Promise<ApiListResponse<Review>> {
    try {
        return await productService.getProductReviews(productId);
    } catch (error) {
        console.warn("Falling back to mock data for getProductReviews", error);
        return simulateResponse<ApiListResponse<Review>>(`/api/products/${productId}/reviews`);
    }
}

/**
 * @deprecated Use productService.revalidate() instead
 */
export function revalidateProducts() {
    try {
        // Import the apiClient directly for revalidation
        import("./api/client").then(({ apiClient }) => {
            apiClient.revalidate(["products"]);
        });
    } catch (error) {
        console.warn("Could not revalidate products cache", error);
    }
}