/**
 * API Configuration and Environment Variables
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  DEFAULT_REVALIDATE: 300, // 5 minutes
} as const;

export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mocked",
  API_VERSION: "2023-10-16" as const,
} as const;

export const AUTH_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  TOKEN_EXPIRY: "7d",
  REFRESH_TOKEN_EXPIRY: "30d",
  COOKIE_NAME: "auth-token",
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const CACHE_CONFIG = {
  PRODUCTS: { revalidate: 300, tags: ["products"] },
  CATEGORIES: { revalidate: 600, tags: ["categories"] },
  REVIEWS: { revalidate: 180, tags: ["reviews"] },
  USER: { revalidate: 60, tags: ["user"] },
  ORDERS: { revalidate: 0, tags: ["orders"] }, // No cache for orders
};