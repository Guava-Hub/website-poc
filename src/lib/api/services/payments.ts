import { apiClient } from "../client";
import { API_ENDPOINTS } from "@/lib/config";
import type {
  PaymentIntent,
  PaymentMethod,
  Payment,
  CreatePaymentIntentRequest,
  ConfirmPaymentRequest,
  RefundRequest,
  WebhookEvent,
  ApiSingleResponse,
  ApiListResponse,
} from "../types";

/**
 * Payment Service - Handles payment processing
 */
export class PaymentService {
  /**
   * Create payment intent
   */
  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<ApiSingleResponse<PaymentIntent>> {
    return apiClient.post<ApiSingleResponse<PaymentIntent>>(
      API_ENDPOINTS.PAYMENTS.CREATE_INTENT,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Confirm payment
   */
  async confirmPayment(data: ConfirmPaymentRequest): Promise<ApiSingleResponse<PaymentIntent>> {
    return apiClient.post<ApiSingleResponse<PaymentIntent>>(
      API_ENDPOINTS.PAYMENTS.CONFIRM,
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Get payment by ID
   */
  async getPayment(paymentId: string): Promise<ApiSingleResponse<Payment>> {
    return apiClient.get<ApiSingleResponse<Payment>>(
      `/api/payments/${paymentId}`,
      { cache: "no-store" }
    );
  }

  /**
   * Refund payment
   */
  async refundPayment(paymentId: string, data: Omit<RefundRequest, 'paymentIntentId'>): Promise<ApiSingleResponse<Payment>> {
    return apiClient.post<ApiSingleResponse<Payment>>(
      API_ENDPOINTS.PAYMENTS.REFUND(paymentId),
      data,
      { cache: "no-store" }
    );
  }

  /**
   * Get user's payment methods
   */
  async getPaymentMethods(): Promise<ApiListResponse<PaymentMethod>> {
    return apiClient.get<ApiListResponse<PaymentMethod>>(
      "/api/payments/methods",
      { cache: "no-store" }
    );
  }

  /**
   * Add payment method
   */
  async addPaymentMethod(paymentMethodId: string): Promise<ApiSingleResponse<PaymentMethod>> {
    return apiClient.post<ApiSingleResponse<PaymentMethod>>(
      "/api/payments/methods",
      { paymentMethodId },
      { cache: "no-store" }
    );
  }

  /**
   * Remove payment method
   */
  async removePaymentMethod(methodId: string): Promise<void> {
    await apiClient.delete(
      `/api/payments/methods/${methodId}`,
      { cache: "no-store" }
    );
  }

  /**
   * Set default payment method
   */
  async setDefaultPaymentMethod(methodId: string): Promise<ApiSingleResponse<PaymentMethod>> {
    return apiClient.put<ApiSingleResponse<PaymentMethod>>(
      `/api/payments/methods/${methodId}/default`,
      {},
      { cache: "no-store" }
    );
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(event: WebhookEvent): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.PAYMENTS.WEBHOOKS,
      event,
      { cache: "no-store" }
    );
  }

  /**
   * Get payment history for user
   */
  async getPaymentHistory(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiListResponse<Payment>> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const endpoint = searchParams.toString()
      ? `/api/payments?${searchParams.toString()}`
      : "/api/payments";

    return apiClient.get<ApiListResponse<Payment>>(
      endpoint,
      { cache: "no-store" }
    );
  }

  /**
   * Calculate processing fees
   */
  async calculateFees(amount: number, paymentMethodType: string): Promise<{
    fees: number;
    total: number;
  }> {
    return apiClient.post<{ fees: number; total: number }>(
      "/api/payments/calculate-fees",
      { amount, paymentMethodType },
      { cache: "no-store" }
    );
  }
}

// Create singleton instance
export const paymentService = new PaymentService();