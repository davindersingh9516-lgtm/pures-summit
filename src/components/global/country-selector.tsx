"use client";

import { useRegion } from "@/contexts/region-context";
import { useTranslations } from "@/hooks/use-translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Country/shipping-region selector - backed by the static ISO list in
 * `data/countries.ts` (see that file's header comment for why this isn't a
 * repository), hidden entirely when there's only one. */
export function CountrySelector() {
  const { countryCode, availableCountries, setCountryCode } = useRegion();
  const t = useTranslations();

  if (availableCountries.length <= 1) return null;

  const current = availableCountries.find((country) => country.code === countryCode) ?? availableCountries[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("country")}
        className="flex items-center gap-1.5 text-sm text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring)"
      >
        {current.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableCountries.map((country) => (
          <DropdownMenuItem key={country.code} onSelect={() => setCountryCode(country.code)}>
            {country.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
