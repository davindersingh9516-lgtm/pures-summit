import type { Cart, CartLineItem, Money, ShippingRate } from "@/types";
import { env } from "@/config/env";

function toMoney(raw: string | null | undefined, formatted: string | null | undefined): Money {
  const amount = raw ? Math.round(parseFloat(raw) * 100) : 0;
  return {
    amount: Number.isFinite(amount) ? amount : 0,
    currencyCode: env.NEXT_PUBLIC_STORE_CURRENCY,
    formatted: formatted ?? "$0.00",
  };
}

interface WPCartItemNode {
  key: string;
  quantity: number;
  rawSubtotal?: string | null;
  subtotal?: string | null;
  rawTotal?: string | null;
  total?: string | null;
  product?: { node?: { id: string; databaseId: number; name: string; slug: string; image?: { id: string; sourceUrl: string; altText?: string | null } | null } | null } | null;
  variation?: {
    node?: {
      id: string;
      databaseId: number;
      name?: string | null;
      attributes?: { nodes: { name: string; value?: string | null }[] } | null;
    } | null;
  } | null;
}

interface WPShippingRateNode {
  id: string;
  label: string;
  rawCost?: string | null;
  cost?: string | null;
}

export interface WPCartNode {
  contents?: { itemCount: number; nodes: WPCartItemNode[] } | null;
  rawSubtotal?: string | null;
  subtotal?: string | null;
  rawSubtotalTax?: string | null;
  subtotalTax?: string | null;
  rawShippingTotal?: string | null;
  shippingTotal?: string | null;
  rawShippingTax?: string | null;
  shippingTax?: string | null;
  rawDiscountTotal?: string | null;
  discountTotal?: string | null;
  rawTotal?: string | null;
  total?: string | null;
  rawTotalTax?: string | null;
  totalTax?: string | null;
  appliedCoupons?: { code: string }[] | null;
  needsShippingAddress?: boolean | null;
  availableShippingMethods?: { rates?: WPShippingRateNode[] | null }[] | null;
  chosenShippingMethods?: (string | null)[] | null;
}

function mapLineItem(node: WPCartItemNode): CartLineItem {
  const product = node.product?.node;
  const variation = node.variation?.node;

  const selections: Record<string, string> = {};
  for (const attr of variation?.attributes?.nodes ?? []) {
    if (attr.value) selections[attr.name] = attr.value;
  }

  const quantity = node.quantity || 1;
  const lineTotal = toMoney(node.rawTotal, node.total);

  return {
    id: node.key,
    productId: product?.id ?? "",
    variantId: variation?.id,
    name: variation?.name || product?.name || "",
    slug: product?.slug ?? "",
    image: product?.image?.sourceUrl
      ? { id: product.image.id, url: product.image.sourceUrl, altText: product.image.altText ?? product.name }
      : { id: "", url: "", altText: "" },
    quantity,
    unitPrice: (() => {
      const amount = Math.round(lineTotal.amount / quantity);
      return { amount, currencyCode: lineTotal.currencyCode, formatted: `$${(amount / 100).toFixed(2)}` };
    })(),
    lineTotal,
    selections: Object.keys(selections).length ? selections : undefined,
  };
}

export function mapWooCart(node: WPCartNode, cartId: string): Cart {
  const rates: ShippingRate[] = (node.availableShippingMethods ?? []).flatMap((pkg) => pkg.rates ?? []).map((rate) => ({
    id: rate.id,
    label: rate.label,
    cost: toMoney(rate.rawCost, rate.cost),
    selected: node.chosenShippingMethods?.includes(rate.id) ?? false,
  }));

  return {
    id: cartId,
    items: (node.contents?.nodes ?? []).map(mapLineItem),
    subtotal: toMoney(node.rawSubtotal, node.subtotal),
    subtotalTax: toMoney(node.rawSubtotalTax, node.subtotalTax),
    discountTotal: toMoney(node.rawDiscountTotal, node.discountTotal),
    shippingTotal: toMoney(node.rawShippingTotal, node.shippingTotal),
    shippingTax: toMoney(node.rawShippingTax, node.shippingTax),
    total: toMoney(node.rawTotal, node.total),
    totalTax: toMoney(node.rawTotalTax, node.totalTax),
    currencyCode: env.NEXT_PUBLIC_STORE_CURRENCY,
    couponCodes: (node.appliedCoupons ?? []).map((c) => c.code),
    needsShippingAddress: node.needsShippingAddress ?? true,
    availableShippingRates: rates,
  };
}
