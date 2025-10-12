import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { STRIPE_CONFIG } from "@/lib/config";

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export interface PaymentIntentResponse {
  clientSecret: string;
}

export async function createPaymentIntent(amount: number): Promise<PaymentIntentResponse> {
  const res = await fetch("/api/stripe/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  if (!res.ok) {
    throw new Error("Failed to create payment intent");
  }

  return res.json();
}
