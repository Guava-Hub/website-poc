import { apiClient } from "../client";
import { API_ENDPOINTS, CACHE_CONFIG } from "@/lib/config";
import type { Product, Category, Review } from "@/types";
import type {
  ProductSearchParams,
  ProductsResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ProductReviewRequest,
  UpdateReviewRequest,
  RelatedProductsResponse,
  ApiListResponse,
  ApiSingleResponse,
} from "../types";

/**
 * Product Service - Handles all product-related API calls
 */
export class ProductService {
  /**
   * Get list of products with optional filters
   */
  async getProducts(params?: ProductSearchParams): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.query) {
      searchParams.append("query", params.query);
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, String(v)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });
    }
    
    if (params?.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    if (params?.sort) {
      Object.entries(params.sort).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const endpoint = searchParams.toString() 
      ? `${API_ENDPOINTS.PRODUCTS.LIST}?${searchParams.toString()}`
      : API_ENDPOINTS.PRODUCTS.LIST;

    const response = await apiClient.get<ProductsResponse | ApiListResponse<Product>>(endpoint, {
      ...CACHE_CONFIG.PRODUCTS,
    });

    // Handle both response formats (API response vs mock simulation)
    if ('products' in response) {
      // This is a ProductsResponse from the real API
      return response as ProductsResponse;
    } else {
      // This is from mock simulation, transform to ProductsResponse
      const mockResponse = response as ApiListResponse<Product>;
      return {
        products: mockResponse.data,
        total: mockResponse.total,
        page: 1,
        pageSize: mockResponse.data.length,
        hasMore: false,
      };
    }
  }

  /**
   * Get single product by slug
   */
  async getProduct(slug: string): Promise<ApiSingleResponse<Product>> {
    return apiClient.get<ApiSingleResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.DETAIL(slug),
      {
        ...CACHE_CONFIG.PRODUCTS,
        tags: [...CACHE_CONFIG.PRODUCTS.tags, `product-${slug}`],
      }
    );
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categorySlug: string, params?: ProductSearchParams): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    
    if (params?.sort) {
      Object.entries(params.sort).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const endpoint = searchParams.toString()
      ? `${API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categorySlug)}?${searchParams.toString()}`
      : API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categorySlug);

    const response = await apiClient.get<ProductsResponse | ApiListResponse<Product>>(endpoint, {
      ...CACHE_CONFIG.PRODUCTS,
      tags: [...CACHE_CONFIG.PRODUCTS.tags, `category-${categorySlug}`],
    });

    // Handle both response formats (API response vs mock simulation)
    if ('products' in response) {
      // This is a ProductsResponse from the real API
      return response as ProductsResponse;
    } else {
      // This is from mock simulation, transform to ProductsResponse
      const mockResponse = response as ApiListResponse<Product>;
      return {
        products: mockResponse.data,
        total: mockResponse.total,
        page: 1,
        pageSize: mockResponse.data.length,
        hasMore: false,
      };
    }
  }

  /**
   * Search products
   */
  async searchProducts(query: string, params?: ProductSearchParams): Promise<ProductsResponse> {
    return this.getProducts({ ...params, query });
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string): Promise<RelatedProductsResponse> {
    return apiClient.get<RelatedProductsResponse>(
      API_ENDPOINTS.PRODUCTS.RELATED(productId),
      {
        ...CACHE_CONFIG.PRODUCTS,
        tags: [...CACHE_CONFIG.PRODUCTS.tags, `related-${productId}`],
      }
    );
  }

  /**
   * Get product reviews
   */
  async getProductReviews(productId: string): Promise<ApiListResponse<Review>> {
    return apiClient.get<ApiListResponse<Review>>(
      API_ENDPOINTS.PRODUCTS.REVIEWS(productId),
      {
        ...CACHE_CONFIG.REVIEWS,
        tags: [...CACHE_CONFIG.REVIEWS.tags, `reviews-${productId}`],
      }
    );
  }

  /**
   * Create a new product (admin only)
   */
  async createProduct(data: CreateProductRequest): Promise<ApiSingleResponse<Product>> {
    const response = await apiClient.post<ApiSingleResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.LIST,
      data
    );
    
    // Revalidate products cache
    apiClient.revalidate(CACHE_CONFIG.PRODUCTS.tags);
    
    return response;
  }

  /**
   * Update a product (admin only)
   */
  async updateProduct(data: UpdateProductRequest): Promise<ApiSingleResponse<Product>> {
    const response = await apiClient.put<ApiSingleResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.DETAIL(data.id),
      data
    );
    
    // Revalidate specific product and products cache
    apiClient.revalidate([...CACHE_CONFIG.PRODUCTS.tags, `product-${data.id}`]);
    
    return response;
  }

  /**
   * Delete a product (admin only)
   */
  async deleteProduct(productId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL(productId));
    
    // Revalidate products cache
    apiClient.revalidate(CACHE_CONFIG.PRODUCTS.tags);
  }

  /**
   * Create a product review
   */
  async createReview(data: ProductReviewRequest): Promise<ApiSingleResponse<Review>> {
    const response = await apiClient.post<ApiSingleResponse<Review>>(
      API_ENDPOINTS.REVIEWS.CREATE,
      data
    );
    
    // Revalidate reviews cache
    apiClient.revalidate([...CACHE_CONFIG.REVIEWS.tags, `reviews-${data.productId}`]);
    
    return response;
  }

  /**
   * Update a review
   */
  async updateReview(data: UpdateReviewRequest): Promise<ApiSingleResponse<Review>> {
    const response = await apiClient.put<ApiSingleResponse<Review>>(
      API_ENDPOINTS.REVIEWS.UPDATE(data.id),
      data
    );
    
    // Revalidate reviews cache
    apiClient.revalidate(CACHE_CONFIG.REVIEWS.tags);
    
    return response;
  }

  /**
   * Delete a review
   */
  async deleteReview(reviewId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.REVIEWS.DELETE(reviewId));
    
    // Revalidate reviews cache
    apiClient.revalidate(CACHE_CONFIG.REVIEWS.tags);
  }

  /**
   * Mark review as helpful
   */
  async markReviewHelpful(reviewId: string, helpful: boolean): Promise<void> {
    await apiClient.post(API_ENDPOINTS.REVIEWS.HELPFUL(reviewId), { helpful });
    
    // Revalidate reviews cache
    apiClient.revalidate(CACHE_CONFIG.REVIEWS.tags);
  }
}

/**
 * Category Service - Handles category-related API calls
 */
export class CategoryService {
  /**
   * Get all categories
   */
  async getCategories(): Promise<ApiListResponse<Category>> {
    return apiClient.get<ApiListResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.LIST,
      {
        ...CACHE_CONFIG.CATEGORIES,
      }
    );
  }

  /**
   * Get single category by slug
   */
  async getCategory(slug: string): Promise<ApiSingleResponse<Category>> {
    return apiClient.get<ApiSingleResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.DETAIL(slug),
      {
        ...CACHE_CONFIG.CATEGORIES,
        tags: [...CACHE_CONFIG.CATEGORIES.tags, `category-${slug}`],
      }
    );
  }

  /**
   * Get products in a category
   */
  async getCategoryProducts(slug: string, params?: ProductSearchParams): Promise<ProductsResponse> {
    const productService = new ProductService();
    return productService.getProductsByCategory(slug, params);
  }
}

// Create singleton instances
export const productService = new ProductService();
export const categoryService = new CategoryService();