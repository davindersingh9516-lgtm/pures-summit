"use client";

import type { Currency } from "@/types";
import { useCurrency } from "@/contexts/currency-context";
import { useTranslations } from "@/hooks/use-translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Renders whatever currencies `getCurrencies()` returns - hidden entirely
 * when there's only one. */
export function CurrencySelector({ currencies }: { currencies: Currency[] }) {
  const { currencyCode, setCurrencyCode } = useCurrency();
  const t = useTranslations();

  if (currencies.length <= 1) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("currency")}
        className="flex items-center gap-1.5 text-sm text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring)"
      >
        {currencyCode}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem key={currency.code} onSelect={() => setCurrencyCode(currency.code)}>
            {currency.symbol} {currency.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
