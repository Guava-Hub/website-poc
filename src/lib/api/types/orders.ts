/**
 * Order related API types
 */

import type { Product } from "@/types";
import type { Payment } from "./payments";
import type { Address } from "./auth";

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  payment?: Payment;
  tracking?: TrackingInfo;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  couponCode?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Product;
  variantName?: string;
}

export type OrderStatus = 
  | "pending"
  | "confirmed" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "canceled" 
  | "returned";

export type PaymentStatus = 
  | "pending" 
  | "paid" 
  | "failed" 
  | "refunded" 
  | "partially_refunded";

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrier: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  trackingUrl?: string;
  status: "pending" | "in_transit" | "out_for_delivery" | "delivered" | "exception";
  estimatedDelivery?: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: string;
  description: string;
  location?: string;
  timestamp: string;
}

// Requests
export interface CreateOrderRequest {
  items: CreateOrderItemRequest[];
  shippingAddressId: string;
  billingAddressId?: string; // If different from shipping
  shippingMethodId: string;
  paymentMethodId?: string;
  couponCode?: string;
  notes?: string;
}

export interface CreateOrderItemRequest {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateOrderRequest {
  status?: OrderStatus;
  shippingAddressId?: string;
  billingAddressId?: string;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Responses
export interface OrderSummary {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  statusBreakdown: Record<OrderStatus, number>;
}

export interface ShippingEstimate {
  methods: ShippingMethod[];
  address: Address;
  estimatedTax: number;
}