import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mocked";
    stripePromise = loadStripe(publicKey);
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
