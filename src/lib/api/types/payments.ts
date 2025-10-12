/**
 * Payment related API types
 */

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "apple_pay" | "google_pay";
  isDefault: boolean;
  card?: PaymentCard;
  paypal?: PaypalAccount;
  createdAt: string;
}

export interface PaymentCard {
  last4: string;
  brand: "visa" | "mastercard" | "amex" | "discover";
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
}

export interface PaypalAccount {
  email: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "requires_confirmation" | "requires_action" | "processing" | "requires_capture" | "canceled" | "succeeded";
  paymentMethod?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  paymentMethodId?: string;
  confirm?: boolean;
  returnUrl?: string;
  description?: string;
  metadata?: Record<string, string>;
  orderId?: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId?: string;
  returnUrl?: string;
}

export interface RefundRequest {
  paymentIntentId: string;
  amount?: number; // If not provided, full refund
  reason?: "duplicate" | "fraudulent" | "requested_by_customer";
  metadata?: Record<string, string>;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "succeeded" | "failed" | "canceled" | "refunded";
  paymentMethod: PaymentMethod;
  transactionId?: string;
  failureReason?: string;
  refundedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}