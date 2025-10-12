import { apiClient } from "../client";
import { API_ENDPOINTS, CACHE_CONFIG } from "@/lib/config";
import type {
  Order,
  OrderSummary,
  ShippingEstimate,
  ShippingMethod,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderFilters,
  TrackingInfo,
  ApiSingleResponse,
  ApiListResponse,
  PaginationParams,
} from "../types";

/**
 * Order Service - Handles order management
 */
export class OrderService {
  /**
   * Get user's orders with optional filters
   */
  async getOrders(params?: {
    filters?: OrderFilters;
    pagination?: PaginationParams;
  }): Promise<ApiListResponse<Order>> {
    const searchParams = new URLSearchParams();
    
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

    const endpoint = searchParams.toString()
      ? `${API_ENDPOINTS.ORDERS.LIST}?${searchParams.toString()}`
      : API_ENDPOINTS.ORDERS.LIST;

    return apiClient.get<ApiListResponse<Order>>(
      endpoint,
      {
        ...CACHE_CONFIG.ORDERS,
      }
    );
  }

  /**
   * Get single order by ID
   */
  async getOrder(orderId: string): Promise<ApiSingleResponse<Order>> {
    return apiClient.get<ApiSingleResponse<Order>>(
      API_ENDPOINTS.ORDERS.DETAIL(orderId),
      {
        ...CACHE_CONFIG.ORDERS,
        tags: [...CACHE_CONFIG.ORDERS.tags, `order-${orderId}`],
      }
    );
  }

  /**
   * Create new order
   */
  async createOrder(data: CreateOrderRequest): Promise<ApiSingleResponse<Order>> {
    const response = await apiClient.post<ApiSingleResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      data,
      { cache: "no-store" }
    );

    // Revalidate orders cache
    apiClient.revalidate(CACHE_CONFIG.ORDERS.tags);

    return response;
  }

  /**
   * Update order (admin only)
   */
  async updateOrder(orderId: string, data: UpdateOrderRequest): Promise<ApiSingleResponse<Order>> {
    const response = await apiClient.put<ApiSingleResponse<Order>>(
      API_ENDPOINTS.ORDERS.UPDATE(orderId),
      data,
      { cache: "no-store" }
    );

    // Revalidate specific order and orders cache
    apiClient.revalidate([...CACHE_CONFIG.ORDERS.tags, `order-${orderId}`]);

    return response;
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId: string, reason?: string): Promise<ApiSingleResponse<Order>> {
    const response = await apiClient.post<ApiSingleResponse<Order>>(
      API_ENDPOINTS.ORDERS.CANCEL(orderId),
      { reason },
      { cache: "no-store" }
    );

    // Revalidate specific order and orders cache
    apiClient.revalidate([...CACHE_CONFIG.ORDERS.tags, `order-${orderId}`]);

    return response;
  }

  /**
   * Track order
   */
  async trackOrder(orderId: string): Promise<ApiSingleResponse<TrackingInfo>> {
    return apiClient.get<ApiSingleResponse<TrackingInfo>>(
      API_ENDPOINTS.ORDERS.TRACK(orderId),
      { cache: "no-store" }
    );
  }

  /**
   * Get order summary/statistics
   */
  async getOrderSummary(): Promise<ApiSingleResponse<OrderSummary>> {
    return apiClient.get<ApiSingleResponse<OrderSummary>>(
      `${API_ENDPOINTS.ORDERS.LIST}/summary`,
      {
        ...CACHE_CONFIG.ORDERS,
        tags: [...CACHE_CONFIG.ORDERS.tags, "summary"],
      }
    );
  }

  /**
   * Get available shipping methods
   */
  async getShippingMethods(addressData: {
    country: string;
    state: string;
    postalCode: string;
  }): Promise<ApiListResponse<ShippingMethod>> {
    return apiClient.post<ApiListResponse<ShippingMethod>>(
      "/api/shipping/methods",
      addressData,
      { cache: "no-store" }
    );
  }

  /**
   * Estimate shipping and tax
   */
  async getShippingEstimate(data: {
    items: Array<{ productId: string; quantity: number; variantId?: string }>;
    address: {
      country: string;
      state: string;
      postalCode: string;
    };
  }): Promise<ApiSingleResponse<ShippingEstimate>> {
    return apiClient.post<ApiSingleResponse<ShippingEstimate>>(
      "/api/shipping/estimate",
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Reorder (create new order from existing order)
   */
  async reorder(orderId: string): Promise<ApiSingleResponse<Order>> {
    const response = await apiClient.post<ApiSingleResponse<Order>>(
      `/api/orders/${orderId}/reorder`,
      {},
      { cache: "no-store" }
    );

    // Revalidate orders cache
    apiClient.revalidate(CACHE_CONFIG.ORDERS.tags);

    return response;
  }

  /**
   * Get order invoice
   */
  async getOrderInvoice(orderId: string): Promise<Blob> {
    const response = await fetch(
      `/api/orders/${orderId}/invoice`,
      {
        headers: {
          Accept: "application/pdf",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download invoice");
    }

    return response.blob();
  }

  /**
   * Download order receipt
   */
  async downloadReceipt(orderId: string): Promise<Blob> {
    const response = await fetch(
      `/api/orders/${orderId}/receipt`,
      {
        headers: {
          Accept: "application/pdf",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download receipt");
    }

    return response.blob();
  }

  /**
   * Request order return/exchange
   */
  async requestReturn(orderId: string, data: {
    items: Array<{ orderItemId: string; quantity: number; reason: string }>;
    type: "return" | "exchange";
    comments?: string;
  }): Promise<ApiSingleResponse<any>> {
    return apiClient.post<ApiSingleResponse<any>>(
      `/api/orders/${orderId}/return`,
      data,
      { cache: "no-store" }
    );
  }
}

// Create singleton instance
export const orderService = new OrderService();