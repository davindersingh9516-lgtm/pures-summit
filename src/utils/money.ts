import type { Money } from "@/types";

/**
 * Client-side money helpers. Real totals always come from the backend
 * (WooCommerce owns tax/discount/shipping math) - these exist only for
 * optimistic UI updates (e.g. incrementing a cart line's quantity before
 * the server round-trip confirms it).
 */
export function formatMoney(amountMinorUnits: number, currencyCode: string, locale = "en-NZ"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amountMinorUnits / 100);
}

export function createMoney(amountMinorUnits: number, currencyCode: string, locale = "en-NZ"): Money {
  return {
    amount: amountMinorUnits,
    currencyCode,
    formatted: formatMoney(amountMinorUnits, currencyCode, locale),
  };
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currencyCode !== b.currencyCode) {
    throw new Error(`Cannot add mismatched currencies: ${a.currencyCode} vs ${b.currencyCode}`);
  }
  return createMoney(a.amount + b.amount, a.currencyCode);
}
