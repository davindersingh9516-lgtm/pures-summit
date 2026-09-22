import type { ID, Image, Money } from "./common.types";

export interface CartLineItem {
  id: ID;
  productId: ID;
  variantId?: ID;
  name: string;
  slug: string;
  image: Image;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
  selections?: Record<string, string>;
}

export interface ShippingRate {
  id: ID;
  label: string;
  cost: Money;
  selected: boolean;
}

export interface Cart {
  id: ID;
  items: CartLineItem[];
  subtotal: Money;
  discountTotal: Money;
  shippingTotal: Money;
  total: Money;
  currencyCode: string;
  couponCodes: string[];
  /** Tax breakdown and live shipping rates - undefined in the pre-backend
   * localStorage cart, populated once `CartContext` calls the real
   * repository (see src/repositories/graphql/cart.repository.ts). */
  subtotalTax?: Money;
  shippingTax?: Money;
  totalTax?: Money;
  needsShippingAddress?: boolean;
  availableShippingRates?: ShippingRate[];
}

export interface WishlistItem {
  id: ID;
  productId: ID;
  addedAt: string;
}

export interface CompareItem {
  id: ID;
  productId: ID;
  addedAt: string;
}
