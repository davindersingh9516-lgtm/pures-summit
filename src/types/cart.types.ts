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

export interface Cart {
  id: ID;
  items: CartLineItem[];
  subtotal: Money;
  discountTotal: Money;
  shippingTotal: Money;
  total: Money;
  currencyCode: string;
  couponCodes: string[];
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
