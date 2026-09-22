import type { CartResult, ICartRepository } from "../interfaces";
import type { Address, Cart, CartLineItem } from "@/types";
import { mockProducts } from "@/mocks";
import { siteConfig } from "@/config/site.config";

/** Dev-only in-memory store, keyed by a fake session token. Resets on every
 * server restart - fine for local mock-mode browsing, never used once
 * NEXT_PUBLIC_DATA_SOURCE=graphql switches to the real WooCommerce cart. */
const carts = new Map<string, Cart>();

function createEmptyCart(): Cart {
  return {
    id: crypto.randomUUID(),
    items: [],
    subtotal: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    discountTotal: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    shippingTotal: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    total: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    subtotalTax: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    shippingTax: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    totalTax: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
    currencyCode: siteConfig.defaultCurrency,
    couponCodes: [],
    needsShippingAddress: true,
    availableShippingRates: [
      { id: "flat_rate:1", label: "Standard Shipping", cost: { amount: 990, currencyCode: "NZD", formatted: "$9.90" }, selected: true },
    ],
  };
}

function money(amount: number): Cart["subtotal"] {
  return { amount, currencyCode: siteConfig.defaultCurrency, formatted: `$${(amount / 100).toFixed(2)}` };
}

const TAX_RATE = 0.15;

function recalculate(cart: Cart, country?: Address["country"]): Cart {
  const subtotal = cart.items.reduce((sum, item) => sum + item.lineTotal.amount, 0);
  const isNZ = (country ?? "NZ") === "NZ";
  const shippingTotal = cart.availableShippingRates?.find((r) => r.selected)?.cost.amount ?? 0;
  const subtotalTax = isNZ ? Math.round(subtotal * TAX_RATE) : 0;
  const shippingTax = isNZ ? Math.round(shippingTotal * TAX_RATE) : 0;

  return {
    ...cart,
    subtotal: money(subtotal),
    shippingTotal: money(shippingTotal),
    subtotalTax: money(subtotalTax),
    shippingTax: money(shippingTax),
    totalTax: money(subtotalTax + shippingTax),
    total: money(subtotal + shippingTotal + subtotalTax + shippingTax - cart.discountTotal.amount),
  };
}

function getOrCreate(sessionToken?: string): { token: string; cart: Cart } {
  const token = sessionToken || crypto.randomUUID();
  let cart = carts.get(token);
  if (!cart) {
    cart = createEmptyCart();
    carts.set(token, cart);
  }
  return { token, cart };
}

export class MockCartRepository implements ICartRepository {
  async getCart(sessionToken?: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    return { sessionToken: token, cart };
  }

  async addItem(sessionToken: string | undefined, productId: string, quantity: number, variantId?: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) throw new Error(`Unknown mock product id "${productId}"`);
    const variant = variantId ? product.variants.find((v) => v.id === variantId) : undefined;
    const unitPrice = variant?.price ?? product.price;

    const existing = cart.items.find((item) => item.productId === productId && item.variantId === variantId);
    if (existing) {
      existing.quantity += quantity;
      existing.lineTotal = money(existing.unitPrice.amount * existing.quantity);
    } else {
      const lineItem: CartLineItem = {
        id: crypto.randomUUID(),
        productId,
        variantId,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        quantity,
        unitPrice,
        lineTotal: money(unitPrice.amount * quantity),
        selections: variant?.selections,
      };
      cart.items.push(lineItem);
    }

    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async updateItemQuantity(sessionToken: string, itemKey: string, quantity: number): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    const item = cart.items.find((i) => i.id === itemKey);
    if (item) {
      item.quantity = quantity;
      item.lineTotal = money(item.unitPrice.amount * quantity);
    }
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async removeItem(sessionToken: string, itemKey: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    cart.items = cart.items.filter((i) => i.id !== itemKey);
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async clearCart(sessionToken: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    cart.items = [];
    cart.couponCodes = [];
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async applyCoupon(sessionToken: string, code: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    if (!cart.couponCodes.includes(code)) cart.couponCodes.push(code);
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async removeCoupon(sessionToken: string, code: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    cart.couponCodes = cart.couponCodes.filter((c) => c !== code);
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async updateShippingAddress(sessionToken: string, address: Address): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    const rate =
      address.country === "AU"
        ? { id: "flat_rate:2", label: "International Shipping", cost: money(1990), selected: true }
        : { id: "flat_rate:1", label: "Standard Shipping", cost: money(990), selected: true };
    cart.availableShippingRates = [rate];
    cart.needsShippingAddress = false;
    const updated = recalculate(cart, address.country);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }

  async selectShippingRate(sessionToken: string, rateId: string): Promise<CartResult> {
    const { token, cart } = getOrCreate(sessionToken);
    cart.availableShippingRates = cart.availableShippingRates?.map((rate) => ({ ...rate, selected: rate.id === rateId }));
    const updated = recalculate(cart);
    carts.set(token, updated);
    return { sessionToken: token, cart: updated };
  }
}
