import type { Currency } from "@/types";

/**
 * MOCK DATA - stands in for a WooCommerce multi-currency plugin's exposed
 * currency list via WooGraphQL. Only one currency exists today; the
 * type/UI already support many.
 */
export const mockCurrencies: Currency[] = [{ code: "NZD", symbol: "$", decimalDigits: 2 }];
