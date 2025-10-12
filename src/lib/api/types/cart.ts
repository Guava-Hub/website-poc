/**
 * Cart related API types
 */

import type { Product } from "@/types";

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Product;
  variantName?: string;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId?: string; // For guest carts, this might be null
  sessionId?: string; // For guest carts
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  couponCode?: string;
  couponDiscount?: number;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string; // For guest carts
}

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  itemId: string;
}

export interface ApplyCouponRequest {
  code: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number; // Percentage (0-100) or fixed amount
  description: string;
  minimumAmount?: number;
  maximumDiscount?: number;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  applicableProducts?: string[]; // Product IDs
  applicableCategories?: string[]; // Category IDs
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  estimatedDelivery?: string;
}