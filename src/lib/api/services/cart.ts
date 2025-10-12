import { apiClient } from "../client";
import { API_ENDPOINTS } from "@/lib/config";
import type {
  Cart,
  CartItem,
  CartSummary,
  AddToCartRequest,
  UpdateCartItemRequest,
  RemoveCartItemRequest,
  ApplyCouponRequest,
  Coupon,
  ApiSingleResponse,
  ApiListResponse,
} from "../types";

/**
 * Cart Service - Handles shopping cart operations
 */
export class CartService {
  /**
   * Get current user's cart
   */
  async getCart(): Promise<ApiSingleResponse<Cart>> {
    return apiClient.get<ApiSingleResponse<Cart>>(
      API_ENDPOINTS.CART.GET,
      { cache: "no-store" }
    );
  }

  /**
   * Add item to cart
   */
  async addToCart(data: AddToCartRequest): Promise<ApiSingleResponse<CartItem>> {
    return apiClient.post<ApiSingleResponse<CartItem>>(
      API_ENDPOINTS.CART.ADD_ITEM,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(data: UpdateCartItemRequest): Promise<ApiSingleResponse<CartItem>> {
    return apiClient.put<ApiSingleResponse<CartItem>>(
      API_ENDPOINTS.CART.UPDATE_ITEM(data.itemId),
      { quantity: data.quantity },
      { cache: "no-store" }
    );
  }

  /**
   * Remove item from cart
   */
  async removeCartItem(itemId: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.CART.REMOVE_ITEM(itemId),
      { cache: "no-store" }
    );
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.CART.CLEAR,
      { cache: "no-store" }
    );
  }

  /**
   * Apply coupon to cart
   */
  async applyCoupon(data: ApplyCouponRequest): Promise<ApiSingleResponse<Cart>> {
    return apiClient.post<ApiSingleResponse<Cart>>(
      API_ENDPOINTS.CART.APPLY_COUPON,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Remove coupon from cart
   */
  async removeCoupon(): Promise<ApiSingleResponse<Cart>> {
    return apiClient.delete<ApiSingleResponse<Cart>>(
      API_ENDPOINTS.CART.APPLY_COUPON,
      { cache: "no-store" }
    );
  }

  /**
   * Get cart summary (lightweight version)
   */
  async getCartSummary(): Promise<ApiSingleResponse<CartSummary>> {
    return apiClient.get<ApiSingleResponse<CartSummary>>(
      `${API_ENDPOINTS.CART.GET}/summary`,
      { cache: "no-store" }
    );
  }

  /**
   * Validate cart items (check availability, prices, etc.)
   */
  async validateCart(): Promise<ApiSingleResponse<Cart>> {
    return apiClient.post<ApiSingleResponse<Cart>>(
      `${API_ENDPOINTS.CART.GET}/validate`,
      {},
      { cache: "no-store" }
    );
  }

  /**
   * Merge guest cart with user cart after login
   */
  async mergeCart(guestCartId: string): Promise<ApiSingleResponse<Cart>> {
    return apiClient.post<ApiSingleResponse<Cart>>(
      `${API_ENDPOINTS.CART.GET}/merge`,
      { guestCartId },
      { cache: "no-store" }
    );
  }

  /**
   * Estimate shipping costs
   */
  async estimateShipping(addressData: {
    country: string;
    state: string;
    postalCode: string;
  }): Promise<{ methods: any[] }> {
    return apiClient.post<{ methods: any[] }>(
      `${API_ENDPOINTS.CART.GET}/estimate-shipping`,
      addressData,
      { cache: "no-store" }
    );
  }

  /**
   * Calculate taxes
   */
  async calculateTax(addressData: {
    country: string;
    state: string;
    postalCode: string;
  }): Promise<{ tax: number; rate: number }> {
    return apiClient.post<{ tax: number; rate: number }>(
      `${API_ENDPOINTS.CART.GET}/calculate-tax`,
      addressData,
      { cache: "no-store" }
    );
  }
}

// Create singleton instance
export const cartService = new CartService();