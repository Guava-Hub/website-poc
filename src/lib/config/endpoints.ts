/**
 * API Endpoints Configuration
 */

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: {
    LIST: "/api/products",
    DETAIL: (slug: string) => `/api/products/${slug}`,
    BY_CATEGORY: (slug: string) => `/api/products/category/${slug}`,
    REVIEWS: (productId: string) => `/api/products/${productId}/reviews`,
    SEARCH: "/api/products/search",
    RELATED: (productId: string) => `/api/products/${productId}/related`,
  },

  // Categories
  CATEGORIES: {
    LIST: "/api/categories",
    DETAIL: (slug: string) => `/api/categories/${slug}`,
    PRODUCTS: (slug: string) => `/api/categories/${slug}/products`,
  },

  // Authentication
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    RESET_PASSWORD: "/api/auth/reset-password",
    VERIFY_EMAIL: "/api/auth/verify-email",
    PROFILE: "/api/auth/profile",
  },

  // Users
  USERS: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    CHANGE_PASSWORD: "/api/users/change-password",
    ADDRESSES: "/api/users/addresses",
    ORDERS: "/api/users/orders",
    FAVORITES: "/api/users/favorites",
  },

  // Orders
  ORDERS: {
    LIST: "/api/orders",
    DETAIL: (id: string) => `/api/orders/${id}`,
    CREATE: "/api/orders",
    UPDATE: (id: string) => `/api/orders/${id}`,
    CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    TRACK: (id: string) => `/api/orders/${id}/track`,
  },

  // Payments
  PAYMENTS: {
    CREATE_INTENT: "/api/payments/create-intent",
    CONFIRM: "/api/payments/confirm",
    WEBHOOKS: "/api/payments/webhooks",
    REFUND: (paymentId: string) => `/api/payments/${paymentId}/refund`,
  },

  // Cart
  CART: {
    GET: "/api/cart",
    ADD_ITEM: "/api/cart/items",
    UPDATE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
    CLEAR: "/api/cart/clear",
    APPLY_COUPON: "/api/cart/apply-coupon",
  },

  // Reviews
  REVIEWS: {
    CREATE: "/api/reviews",
    UPDATE: (id: string) => `/api/reviews/${id}`,
    DELETE: (id: string) => `/api/reviews/${id}`,
    HELPFUL: (id: string) => `/api/reviews/${id}/helpful`,
  },

  // Search
  SEARCH: {
    PRODUCTS: "/api/search/products",
    CATEGORIES: "/api/search/categories",
    SUGGESTIONS: "/api/search/suggestions",
  },

  // Analytics
  ANALYTICS: {
    TRACK_EVENT: "/api/analytics/events",
    TRACK_VIEW: "/api/analytics/views",
  },
} as const;