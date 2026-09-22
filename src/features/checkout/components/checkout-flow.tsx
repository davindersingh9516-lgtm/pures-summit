"use client";

import { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { AppLink } from "@/components/global/app-link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/providers/theme-provider";
import type { Address } from "@/types";
import { ROUTES } from "@/constants/routes.constants";
import { CheckoutAddressForm, type CheckoutAddressSubmitValues } from "./checkout-address-form";
import { CheckoutPaymentForm } from "./checkout-payment-form";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<Stripe | null> | null = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

type Step = "address" | "payment";

export function CheckoutFlow() {
  const { cart, isHydrated, updateShippingAddress } = useCart();
  const { resolvedTheme } = useTheme();
  const [step, setStep] = useState<Step>("address");
  const [billing, setBilling] = useState<Address | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [accountCreated, setAccountCreated] = useState(false);

  const returnUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(`${ROUTES.checkout()}/success`, window.location.origin);
    if (accountCreated) url.searchParams.set("account_created", "1");
    return url.toString();
  }, [accountCreated]);

  async function handleAddressSubmit(values: CheckoutAddressSubmitValues) {
    const { createAccount, password, ...address } = values;

    setIsPreparingPayment(true);
    setError(null);
    try {
      await updateShippingAddress(address);

      const response = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing: address, createAccount, password }),
      });

      let body: { clientSecret?: string; accountCreated?: boolean; error?: unknown; stripeNotConfigured?: boolean };
      try {
        body = await response.json();
      } catch {
        throw new Error("The server didn't respond as expected. Please try again.");
      }

      if (!response.ok) {
        if (body.stripeNotConfigured) throw new Error("STRIPE_NOT_CONFIGURED");
        throw new Error(typeof body.error === "string" ? body.error : "Could not start payment");
      }

      setBilling(address as Address);
      setAccountCreated(Boolean(body.accountCreated));
      setClientSecret(body.clientSecret ?? null);
      setStep("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsPreparingPayment(false);
    }
  }

  if (isHydrated && cart.items.length === 0) {
    return (
      <Container size="page" className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-(--color-foreground)">Your cart is empty</h1>
        <Button asChild size="lg">
          <AppLink href={ROUTES.productList()}>Shop All</AppLink>
        </Button>
      </Container>
    );
  }

  return (
    <Container size="page" className="grid gap-10 py-12 lg:grid-cols-[1fr_360px] lg:items-start">
      <div>
        <h1 className="mb-8 text-3xl font-semibold text-(--color-foreground)">Checkout</h1>

        {step === "address" ? (
          <CheckoutAddressForm onSubmit={handleAddressSubmit} isSubmitting={isPreparingPayment} />
        ) : null}

        {step === "payment" && clientSecret && stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                // Stripe Elements renders in a cross-origin iframe, so it can't
                // read the host page's CSS custom properties - the resolved
                // theme's --color-secondary hex has to be passed in literally.
                theme: resolvedTheme === "dark" ? "night" : "stripe",
                variables: {
                  colorPrimary: resolvedTheme === "dark" ? "#667d51" : "#4d6238",
                  fontFamily: "inherit",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <CheckoutPaymentForm returnUrl={returnUrl} />
          </Elements>
        ) : null}

        {step === "payment" && !stripePromise ? (
          <p className="rounded-(--radius-md) border border-(--color-border) bg-(--color-muted) p-4 text-sm text-(--color-foreground-muted)">
            Payment isn&apos;t configured yet - add Stripe API keys to .env.local
            (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET) and enable the
            Stripe gateway in WooCommerce Settings → Payments to finish checkout.
          </p>
        ) : null}

        {error === "STRIPE_NOT_CONFIGURED" ? (
          <p className="mt-4 rounded-(--radius-md) border border-(--color-border) bg-(--color-muted) p-4 text-sm text-(--color-foreground-muted)">
            Payment isn&apos;t configured yet - add Stripe API keys to .env.local
            (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET) and enable the
            Stripe gateway in WooCommerce Settings → Payments to finish checkout.
          </p>
        ) : error ? (
          <p className="mt-4 text-sm text-(--color-destructive)">{error}</p>
        ) : null}
      </div>

      <aside className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-brand-50) p-6">
        <h2 className="mb-4 text-lg font-semibold text-(--color-foreground)">Order Summary</h2>

        <ul className="mb-4 flex flex-col gap-3 text-sm">
          {cart.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2">
              <span className="text-(--color-foreground-muted)">
                {item.name} × {item.quantity}
              </span>
              <span className="text-(--color-foreground)">{item.lineTotal.formatted}</span>
            </li>
          ))}
        </ul>

        <div className="my-4 h-px bg-(--color-border)" />

        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-(--color-foreground-muted)">Subtotal</dt>
            <dd className="text-(--color-foreground)">{cart.subtotal.formatted}</dd>
          </div>
          {cart.subtotalTax ? (
            <div className="flex justify-between">
              <dt className="text-(--color-foreground-muted)">Tax (GST)</dt>
              <dd className="text-(--color-foreground)">{cart.subtotalTax.formatted}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-(--color-foreground-muted)">Shipping</dt>
            <dd className="text-(--color-foreground)">
              {billing ? cart.shippingTotal.formatted : "Calculated at next step"}
            </dd>
          </div>
        </dl>

        <div className="my-4 h-px bg-(--color-border)" />

        <div className="flex justify-between text-base font-semibold text-(--color-foreground)">
          <span>Total</span>
          <span>{cart.total.formatted}</span>
        </div>
      </aside>
    </Container>
  );
}
