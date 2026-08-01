"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Cart, CartLineItem } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { createMoney } from "@/utils/money";
import { siteConfig } from "@/config/site.config";

/**
 * CART ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Client-side cart state, persisted to localStorage. This is a placeholder
 * for the real WooCommerce cart/session: once the checkout feature module
 * calls into WooGraphQL cart mutations, this context becomes a thin
 * optimistic-UI layer in front of the server cart instead of the source of
 * truth. The shape (`Cart`, `CartLineItem`) already matches that future
 * state, so the migration only touches this file, not its consumers.
 */

function createEmptyCart(currencyCode: string): Cart {
  const zero = createMoney(0, currencyCode);
  return {
    id: "local-cart",
    items: [],
    subtotal: zero,
    discountTotal: zero,
    shippingTotal: zero,
    total: zero,
    currencyCode,
    couponCodes: [],
  };
}

function recalculate(cart: Cart): Cart {
  const subtotalAmount = cart.items.reduce((sum, item) => sum + item.lineTotal.amount, 0);
  const subtotal = createMoney(subtotalAmount, cart.currencyCode);
  const total = createMoney(
    subtotalAmount - cart.discountTotal.amount + cart.shippingTotal.amount,
    cart.currencyCode,
  );
  return { ...cart, subtotal, total };
}

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  isHydrated: boolean;
  addItem: (item: Omit<CartLineItem, "lineTotal">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart, isHydrated] = useLocalStorage<Cart>(
    "cart",
    createEmptyCart(siteConfig.defaultCurrency),
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      isHydrated,
      addItem: (item) => {
        setCart((prev) => {
          const lineTotal = createMoney(item.unitPrice.amount * item.quantity, prev.currencyCode);
          const existing = prev.items.find(
            (line) => line.productId === item.productId && line.variantId === item.variantId,
          );

          const items = existing
            ? prev.items.map((line) =>
                line.id === existing.id
                  ? {
                      ...line,
                      quantity: line.quantity + item.quantity,
                      lineTotal: createMoney(
                        line.unitPrice.amount * (line.quantity + item.quantity),
                        prev.currencyCode,
                      ),
                    }
                  : line,
              )
            : [...prev.items, { ...item, lineTotal }];

          return recalculate({ ...prev, items });
        });
      },
      removeItem: (itemId) => {
        setCart((prev) => recalculate({ ...prev, items: prev.items.filter((item) => item.id !== itemId) }));
      },
      updateQuantity: (itemId, quantity) => {
        setCart((prev) =>
          recalculate({
            ...prev,
            items: prev.items.map((item) =>
              item.id === itemId
                ? { ...item, quantity, lineTotal: createMoney(item.unitPrice.amount * quantity, prev.currencyCode) }
                : item,
            ),
          }),
        );
      },
      clearCart: () => setCart(createEmptyCart(cart.currencyCode)),
    }),
    [cart, isHydrated, setCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
