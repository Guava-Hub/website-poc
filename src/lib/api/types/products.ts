/**
 * Product related API types
 */

import type { Product, Category, Review } from "@/types";
import type { PaginationParams, SortParams, FilterParams } from "./common";

export interface ProductFilters extends FilterParams {
  categoryId?: string;
  categorySlug?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  rating?: number;
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
}

export interface ProductSearchParams {
  query?: string;
  filters?: ProductFilters;
  pagination?: PaginationParams;
  sort?: ProductSortParams;
}

export interface ProductSortParams extends SortParams {
  sortBy?: 
    | "name" 
    | "price" 
    | "rating" 
    | "popularity" 
    | "newest" 
    | "discount" 
    | "relevance";
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  images: string[];
  variants?: CreateProductVariantRequest[];
  sku: string;
  inStock: boolean;
  highlights?: string[];
  colors?: string[];
  sizes?: string[];
  tags?: string[];
}

export interface CreateProductVariantRequest {
  name: string;
  options: string[];
  priceModifier?: number;
  image?: string;
  inStock?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductReviewRequest {
  productId: string;
  rating: number;
  comment: string;
  verified?: boolean;
}

export interface UpdateReviewRequest {
  id: string;
  rating?: number;
  comment?: string;
}

export interface ReviewFilters {
  rating?: number;
  verified?: boolean;
  sortBy?: "date" | "rating" | "helpful";
  sortOrder?: "asc" | "desc";
}

// Response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  filters?: {
    availableBrands: string[];
    availableColors: string[];
    availableSizes: string[];
    priceRange: { min: number; max: number };
  };
}

export interface RelatedProductsResponse {
  products: Product[];
  strategy: "category" | "tags" | "similar" | "frequently_bought";
}