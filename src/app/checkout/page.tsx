import { Suspense } from "react";

import { CartSummary } from "@/components/cart/cart-summary";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutPage() {
  return (
    <div className="container grid gap-10 py-12 lg:grid-cols-[1fr,1.2fr]">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
          <p className="text-sm text-muted-foreground">Review your cart and complete your secure payment.</p>
        </div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-32 rounded-3xl" />
              <Skeleton className="h-32 rounded-3xl" />
            </div>
          }
        >
          <CartSummary />
        </Suspense>
      </section>
      <section className="space-y-6 rounded-3xl border bg-background p-6 shadow-sm">
        <CheckoutForm />
      </section>
    </div>
  );
}
