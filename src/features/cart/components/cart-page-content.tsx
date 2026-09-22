"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AppLink } from "@/components/global/app-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { QuantityStepper } from "@/features/product/components/quantity-stepper";
import { useCart } from "@/contexts/cart-context";
import { ROUTES } from "@/constants/routes.constants";

export function CartPageContent() {
  const { cart, isHydrated, isMutating, updateQuantity, removeItem } = useCart();

  if (isHydrated && cart.items.length === 0) {
    return (
      <Container size="page" className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-(--color-foreground)">Your cart is empty</h1>
        <p className="max-w-md text-(--color-foreground-muted)">
          Explore our raw, lab-tested Manuka honey and add something to your cart.
        </p>
        <Button asChild size="lg">
          <AppLink href={ROUTES.productList()}>Shop All</AppLink>
        </Button>
      </Container>
    );
  }

  return (
    <Container size="page" className="grid gap-10 py-12 lg:grid-cols-[1fr_360px] lg:items-start">
      <div>
        <h1 className="mb-8 text-3xl font-semibold text-(--color-foreground)">Your Cart</h1>

        <ul className="flex flex-col divide-y divide-(--color-border)">
          {cart.items.map((item) => (
            <li key={item.id} className="flex gap-4 py-6">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-(--radius-lg) bg-(--color-brand-50)">
                {item.image.url ? (
                  <Image src={item.image.url} alt={item.image.altText} fill sizes="96px" className="object-cover" />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <AppLink
                      href={ROUTES.product(item.slug)}
                      className="font-medium text-(--color-foreground) hover:text-(--color-primary)"
                    >
                      {item.name}
                    </AppLink>
                    {item.selections ? (
                      <p className="mt-1 text-sm text-(--color-foreground-muted)">
                        {Object.entries(item.selections)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(item.id)}
                    disabled={isMutating}
                    className="text-(--color-foreground-muted) transition-colors hover:text-(--color-destructive) disabled:opacity-(--opacity-disabled)"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                    className={isMutating ? "pointer-events-none opacity-(--opacity-disabled)" : undefined}
                  />
                  <span className="font-medium text-(--color-foreground)">{item.lineTotal.formatted}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-brand-50) p-6">
        <h2 className="mb-4 text-lg font-semibold text-(--color-foreground)">Order Summary</h2>

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
              {cart.needsShippingAddress ? "Calculated at checkout" : cart.shippingTotal.formatted}
            </dd>
          </div>
        </dl>

        <div className="my-4 h-px bg-(--color-border)" />

        <div className="flex justify-between text-base font-semibold text-(--color-foreground)">
          <span>Total</span>
          <span>{cart.total.formatted}</span>
        </div>

        <Button asChild size="lg" className="mt-6 w-full" disabled={isMutating || cart.items.length === 0}>
          <AppLink href={ROUTES.checkout()}>Proceed to Checkout</AppLink>
        </Button>
      </aside>
    </Container>
  );
}
