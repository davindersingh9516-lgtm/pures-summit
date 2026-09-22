"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppLink } from "@/components/global/app-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCart } from "@/contexts/cart-context";
import { ROUTES } from "@/constants/routes.constants";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");
  const accountCreated = searchParams.get("account_created") === "1";
  const { refresh } = useCart();

  useEffect(() => {
    // The `checkout` mutation (run server-side by /api/webhooks/stripe once
    // Stripe confirms payment) already empties the WooCommerce cart - this
    // just re-syncs local state to match rather than mutating anything.
    if (redirectStatus === "succeeded") refresh();
  }, [redirectStatus, refresh]);

  if (redirectStatus && redirectStatus !== "succeeded") {
    return (
      <Container size="page" className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-(--color-foreground)">Payment not completed</h1>
        <p className="max-w-md text-(--color-foreground-muted)">
          Your payment didn&apos;t go through ({redirectStatus}). Your cart is still saved - please try again.
        </p>
        <Button asChild size="lg">
          <AppLink href={ROUTES.checkout()}>Back to Checkout</AppLink>
        </Button>
      </Container>
    );
  }

  return (
    <Container size="page" className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-(--color-foreground)">Thank you for your order</h1>
      <p className="max-w-md text-(--color-foreground-muted)">
        Your payment was received and your order is being processed. A confirmation email is on its way.
      </p>
      {accountCreated ? (
        <p className="max-w-md rounded-(--radius-md) border border-(--color-border) bg-(--color-brand-50) px-4 py-3 text-sm text-(--color-foreground)">
          Your account has been created and you&apos;re signed in - track this order anytime from{" "}
          <AppLink href={ROUTES.account()} className="font-medium underline">
            My Account
          </AppLink>
          .
        </p>
      ) : null}
      <div className="flex gap-3">
        <Button asChild size="lg">
          <AppLink href={ROUTES.productList()}>Continue Shopping</AppLink>
        </Button>
        {accountCreated ? (
          <Button asChild size="lg" variant="outline">
            <AppLink href={ROUTES.account()}>View My Account</AppLink>
          </Button>
        ) : null}
      </div>
    </Container>
  );
}
