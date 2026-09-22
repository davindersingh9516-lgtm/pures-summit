"use client";

import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export function CheckoutPaymentForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    // Only reachable for immediate failures (e.g. declined card) - on
    // success Stripe redirects the browser to `returnUrl` itself.
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement />
      {error ? <p className="text-sm text-(--color-destructive)">{error}</p> : null}
      <Button type="submit" size="lg" disabled={!stripe || isSubmitting}>
        {isSubmitting ? "Processing…" : "Pay now"}
      </Button>
    </form>
  );
}
