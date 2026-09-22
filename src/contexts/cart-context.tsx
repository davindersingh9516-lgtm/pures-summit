"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Address, Cart } from "@/types";
import { createMoney } from "@/utils/money";
import { siteConfig } from "@/config/site.config";

/**
 * CART ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Thin client over the `src/app/api/cart/*` route handlers (the BFF - see
 * src/lib/woo-session.ts), which are themselves thin callers of
 * `src/repositories/{mock,graphql}/cart.repository.ts`. This context holds
 * no cart math of its own anymore: every mutation round-trips to the server
 * (WooCommerce's session cart in graphql mode) and replaces local state
 * with whatever it returns, so displayed totals/tax/shipping are always
 * exactly what checkout will charge.
 */

function emptyCart(): Cart {
  const zero = createMoney(0, siteConfig.defaultCurrency);
  return {
    id: "",
    items: [],
    subtotal: zero,
    discountTotal: zero,
    shippingTotal: zero,
    total: zero,
    currencyCode: siteConfig.defaultCurrency,
    couponCodes: [],
  };
}

async function unwrapCart(response: Response): Promise<Cart> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(body.error ? JSON.stringify(body.error) : `Cart request failed (${response.status})`);
  }
  const body = (await response.json()) as { cart: Cart };
  return body.cart;
}

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  isHydrated: boolean;
  isMutating: boolean;
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: (code: string) => Promise<void>;
  updateShippingAddress: (address: Address) => Promise<void>;
  selectShippingRate: (rateId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart());
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  // WooCommerce's session cart is a real network round-trip (WP under local
  // dev load can take several seconds), so the header badge would otherwise
  // sit frozen after every click. This offsets the displayed count by any
  // quantity change that's still in flight, then snaps back to 0 the moment
  // the real cart state lands - a request that fails just reverts the
  // optimistic bump since `cart.items` never changed underneath it.
  const [optimisticDelta, setOptimisticDelta] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/cart");
      setCart(await unwrapCart(response));
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const mutate = useCallback(async (request: () => Promise<Response>, delta = 0) => {
    setIsMutating(true);
    if (delta) setOptimisticDelta((prev) => prev + delta);
    try {
      const response = await request();
      setCart(await unwrapCart(response));
    } finally {
      setIsMutating(false);
      if (delta) setOptimisticDelta((prev) => prev - delta);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0) + optimisticDelta,
      isHydrated,
      isMutating,
      addItem: (productId, quantity = 1, variantId) =>
        mutate(
          () =>
            fetch("/api/cart/items", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId, quantity, variantId }),
            }),
          quantity,
        ),
      removeItem: (itemKey) => {
        const existing = cart.items.find((item) => item.id === itemKey);
        return mutate(
          () => fetch(`/api/cart/items/${itemKey}`, { method: "DELETE" }),
          existing ? -existing.quantity : 0,
        );
      },
      updateQuantity: (itemKey, quantity) => {
        const existing = cart.items.find((item) => item.id === itemKey);
        return mutate(
          () =>
            fetch(`/api/cart/items/${itemKey}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantity }),
            }),
          existing ? quantity - existing.quantity : 0,
        );
      },
      clearCart: () => mutate(() => fetch("/api/cart", { method: "DELETE" })),
      applyCoupon: (code) =>
        mutate(() =>
          fetch("/api/cart/coupons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          }),
        ),
      removeCoupon: (code) =>
        mutate(() =>
          fetch("/api/cart/coupons", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          }),
        ),
      updateShippingAddress: (address) =>
        mutate(() =>
          fetch("/api/cart/shipping-address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
          }),
        ),
      selectShippingRate: (rateId) =>
        mutate(() =>
          fetch("/api/cart/shipping-rate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rateId }),
          }),
        ),
      refresh,
    }),
    [cart, isHydrated, isMutating, optimisticDelta, mutate, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
