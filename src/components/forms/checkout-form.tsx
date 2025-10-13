"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements, CardElement } from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { getStripe } from "@/lib";
import { useToast } from "@/components/ui/use-toast";

const addressSchema = z.object({
  addressLine1: z.string().min(3, "Street address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required")
});

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().optional(),
  subscribe: z.boolean().optional(),
  notes: z.string().optional(),
  shipping: addressSchema,
  billingSameAsShipping: z.boolean().default(true),
  billing: addressSchema.optional(),
  shippingMethod: z.string().min(1),
  discountCode: z.string().optional()
});

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France"
];

const shippingOptions = [
  { id: "express", label: "Express (2-3 days)", price: 24.99, eta: "Arrives Mar 28" },
  { id: "standard", label: "Standard (5-7 days)", price: 9.99, eta: "Arrives Apr 1" },
  { id: "pickup", label: "Store pickup", price: 0, eta: "Ready in 2 hours" }
];

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [stripePromise, setStripePromise] = useState<Promise<import("@stripe/stripe-js").Stripe | null> | null>(null);

  useEffect(() => {
    setStripePromise(getStripe());
  }, []);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      subscribe: true,
      notes: "",
      shipping: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States"
      },
      billingSameAsShipping: true,
      billing: undefined,
      shippingMethod: shippingOptions[0].id,
      discountCode: ""
    }
  });

  const selectedShipping = form.watch("shippingMethod");
  const billingSame = form.watch("billingSameAsShipping");

  const totals = useMemo(() => {
    const shipping = shippingOptions.find((option) => option.id === selectedShipping)?.price ?? 0;
    const tax = subtotal * 0.0825;
    const total = subtotal + shipping + tax;
    return { shipping, tax, total };
  }, [selectedShipping, subtotal]);

  const onSubmit = async (values: CheckoutFormValues) => {
    console.log("Submitting order", values);
  toast({ title: "Order placed" });
    clearCart();
  };

  if (!stripePromise) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: "flat" } }}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Customer information</h2>
            <p className="text-sm text-muted-foreground">We&apos;ll use these details to keep you updated.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")}
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...form.register("phone")}
                placeholder="(415) 555-0123" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" {...form.register("firstName")}
                aria-invalid={!!form.formState.errors.firstName}
              />
              {form.formState.errors.firstName && (
                <p className="text-xs text-destructive">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" {...form.register("lastName")}
                aria-invalid={!!form.formState.errors.lastName}
              />
              {form.formState.errors.lastName && (
                <p className="text-xs text-destructive">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={form.watch("subscribe") ?? false} onCheckedChange={(checked) => form.setValue("subscribe", Boolean(checked))} />
            Subscribe to curated product drops and newsletters.
          </label>
        </section>

        <Separator />

        <AddressFields title="Shipping address" form={form} path="shipping" />

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={billingSame}
              onCheckedChange={(checked) => form.setValue("billingSameAsShipping", Boolean(checked))}
            />
            Billing address is the same as shipping
          </label>
          {!billingSame && <AddressFields title="Billing address" form={form} path="billing" />}
        </div>

        <Separator />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Shipping method</h2>
            <p className="text-sm text-muted-foreground">Choose the delivery speed that works best.</p>
          </div>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => form.setValue("shippingMethod", option.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                  selectedShipping === option.id ? "border-primary bg-primary/10" : "hover:border-primary"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.eta}</p>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {option.price === 0 ? "Free" : formatCurrency(option.price)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
          </div>
          <div className="space-y-4 rounded-3xl border bg-background p-6 shadow-sm">
            <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: "16px" } } }} />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>By placing your order, you agree to Guava Hub&apos;s terms and privacy policy.</p>
              <Textarea placeholder="Add delivery notes (optional)" {...form.register("notes")} />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Estimated tax</span>
            <span>{formatCurrency(totals.tax)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-foreground">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </section>

        <Button type="submit" size="lg" className="w-full">
          Place secure order
        </Button>
      </form>
    </Elements>
  );
}

interface AddressFieldsProps {
  title: string;
  form: UseFormReturn<CheckoutFormValues>;
  path: "shipping" | "billing";
}

function AddressFields({ title, form, path }: AddressFieldsProps) {
  const fieldErrors = form.formState.errors[path];
  const register = form.register;
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">Used for delivery and billing purposes.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor={`${path}.addressLine1`}>Address line 1</Label>
          <Input id={`${path}.addressLine1`} {...register(`${path}.addressLine1` as const)} />
          {fieldErrors?.addressLine1 && (
            <p className="text-xs text-destructive">{fieldErrors.addressLine1.message}</p>
          )}
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor={`${path}.addressLine2`}>Address line 2</Label>
          <Input id={`${path}.addressLine2`} {...register(`${path}.addressLine2` as const)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${path}.city`}>City</Label>
          <Input id={`${path}.city`} {...register(`${path}.city` as const)} />
          {fieldErrors?.city && <p className="text-xs text-destructive">{fieldErrors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${path}.state`}>State / Province</Label>
          <Input id={`${path}.state`} {...register(`${path}.state` as const)} />
          {fieldErrors?.state && <p className="text-xs text-destructive">{fieldErrors.state.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${path}.postalCode`}>Postal code</Label>
          <Input id={`${path}.postalCode`} {...register(`${path}.postalCode` as const)} />
          {fieldErrors?.postalCode && (
            <p className="text-xs text-destructive">{fieldErrors.postalCode.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Select
            value={form.watch(`${path}.country` as const)}
            onValueChange={(value) => form.setValue(`${path}.country` as const, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
