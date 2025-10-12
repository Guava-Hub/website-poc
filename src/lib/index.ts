// Core API services (new architecture)
export * from "./api/services";
export * from "./api/client";
export type {
  ApiListResponse,
  ApiSingleResponse,
  PaginationParams,
  SortParams,
  FilterParams,
  SearchParams,
  ProductFilters,
  ProductSearchParams,
  ProductSortParams,
  User,
  Address,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  TokenResponse,
  Cart,
  CartItem,
  Order,
  PaymentIntent,
  PaymentMethod,
} from "./api/types";

// Stripe utilities
export { getStripe, createPaymentIntent } from "./api/services/stripe";

// Configuration and constants
export * from "./config";
export * from "./constants";

// Utilities
export * from "./utils";

// Mock data
export * from "./mock";

// Re-export the original utils for backward compatibility
export { cn } from "./utils";

// Legacy API compatibility (keep these functions available for gradual migration)
export {
  getProducts as getProductsLegacy,
  getProduct as getProductLegacy,
  getCategories as getCategoriesLegacy,
  getCategoryProducts as getCategoryProductsLegacy,
  getProductReviews as getProductReviewsLegacy,
  revalidateProducts as revalidateProductsLegacy
} from "./api-legacy";