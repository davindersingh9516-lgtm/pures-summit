import type { Address, Money, Order, ShippingCountry } from "@/types";
import { env } from "@/config/env";

interface WPOrderAddress {
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: string | null;
  country?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface WPOrderNode {
  id: string;
  databaseId: number;
  orderNumber?: string | null;
  status?: string | null;
  rawTotal?: string | null;
  total?: string | null;
  paymentMethod?: string | null;
  date?: string | null;
  billing?: WPOrderAddress | null;
  shipping?: WPOrderAddress | null;
}

function toAddress(address: WPOrderAddress | null | undefined): Address | undefined {
  if (!address?.address1) return undefined;
  return {
    firstName: address.firstName ?? "",
    lastName: address.lastName ?? "",
    company: address.company ?? undefined,
    address1: address.address1 ?? "",
    address2: address.address2 ?? undefined,
    city: address.city ?? "",
    state: address.state ?? undefined,
    postcode: address.postcode ?? "",
    country: (address.country as ShippingCountry) ?? "NZ",
    email: address.email ?? undefined,
    phone: address.phone ?? undefined,
  };
}

function toMoney(raw: string | null | undefined, formatted: string | null | undefined): Money {
  const amount = raw ? Math.round(parseFloat(raw) * 100) : 0;
  return {
    amount: Number.isFinite(amount) ? amount : 0,
    currencyCode: env.NEXT_PUBLIC_STORE_CURRENCY,
    formatted: formatted ?? "$0.00",
  };
}

export function mapWooOrder(node: WPOrderNode): Order {
  const billing = toAddress(node.billing) ?? {
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    postcode: "",
    country: "NZ" as ShippingCountry,
  };

  return {
    id: node.id,
    orderNumber: node.orderNumber ?? String(node.databaseId),
    status: (node.status ?? "pending").toLowerCase(),
    total: toMoney(node.rawTotal, node.total),
    paymentMethod: node.paymentMethod ?? "",
    billing,
    shipping: toAddress(node.shipping),
    createdAt: node.date ?? new Date().toISOString(),
  };
}
