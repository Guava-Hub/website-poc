/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API Error Codes
 */
export const API_ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  DUPLICATE_ERROR: "DUPLICATE_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
  PAYMENT_ERROR: "PAYMENT_ERROR",
  INVENTORY_ERROR: "INVENTORY_ERROR",
  SHIPPING_ERROR: "SHIPPING_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

/**
 * Order Status Constants
 */
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELED: "canceled",
  RETURNED: "returned",
} as const;

/**
 * Payment Status Constants
 */
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
} as const;

/**
 * Product Sort Options
 */
export const PRODUCT_SORT_OPTIONS = {
  NAME_ASC: "name",
  PRICE_ASC: "price",
  PRICE_DESC: "price-desc",
  RATING: "rating",
  POPULARITY: "popularity",
  NEWEST: "newest",
  DISCOUNT: "discount",
  RELEVANCE: "relevance",
} as const;

/**
 * User Roles
 */
export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  MODERATOR: "moderator",
} as const;

/**
 * Address Types
 */
export const ADDRESS_TYPES = {
  SHIPPING: "shipping",
  BILLING: "billing",
} as const;

/**
 * Default Values
 */
export const DEFAULT_VALUES = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  CURRENCY: "USD",
  LANGUAGE: "en",
  THEME: "system",
  COUNTRY: "US",
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_PREFERENCES: "user_preferences",
  CART_ID: "cart_id",
  GUEST_ID: "guest_id",
  RECENT_SEARCHES: "recent_searches",
  VIEWED_PRODUCTS: "viewed_products",
} as const;

/**
 * Event Names for Analytics
 */
export const ANALYTICS_EVENTS = {
  PRODUCT_VIEW: "product_view",
  PRODUCT_CLICK: "product_click",
  ADD_TO_CART: "add_to_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  CART_VIEW: "cart_view",
  CHECKOUT_START: "checkout_start",
  CHECKOUT_COMPLETE: "checkout_complete",
  PURCHASE: "purchase",
  SEARCH: "search",
  FILTER_APPLY: "filter_apply",
  REVIEW_SUBMIT: "review_submit",
  WISHLIST_ADD: "wishlist_add",
  WISHLIST_REMOVE: "wishlist_remove",
} as const;