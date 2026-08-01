/**
 * STATIC REFERENCE DATA - distinct from `src/mocks`.
 * ---------------------------------------------------------------------------
 * `mocks/` stands in for CMS/commerce content that will come from WordPress
 * later. `data/` holds genuinely static reference datasets that never come
 * from a CMS in any architecture (ISO country/region lists, dial codes,
 * etc.) - used by checkout/account address forms.
 */
export interface Country {
  code: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: "NZ", name: "New Zealand" },
  { code: "AU", name: "Australia" },
];
