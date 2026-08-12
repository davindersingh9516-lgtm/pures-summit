import type { SiteSettings } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Options Page ("Site Settings") surfaced
 * through WPGraphQL. This is intentionally the only file where brand-level
 * placeholder copy is written; every other layer reads it through
 * services/settings.service.ts.
 */
export const mockSiteSettings: SiteSettings = {
  siteName: "Pure Summit",
  tagline: "Raw. Rare. New Zealand Manuka.",
  logo: { id: "logo", url: "/logo.png", altText: "Pure Summit - Premium New Zealand Products", width: 1694, height: 341 },
  favicon: { id: "favicon", url: "/favicon.ico", altText: "Pure Summit" },
  contact: {
    email: "hello@puresummit.co.nz",
    phone: "+64 9 555 0142",
    address: "14 Harbour View Road, Whangarei, Northland 0110, New Zealand",
    businessHours: "Mon-Fri, 9am-5pm NZST",
  },
  business: {
    legalName: "Pure Summit Ltd",
    registrationNumber: "NZ-000000",
    foundedYear: 2012,
  },
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Facebook", url: "https://facebook.com" },
  ],
  locales: [{ code: "en-NZ", label: "English (New Zealand)", isDefault: true }],
  defaultLocale: "en-NZ",
  currencies: [{ code: "NZD", symbol: "$", decimalDigits: 2 }],
  defaultCurrency: "NZD",
  storeId: "default",
  storeName: "Pure Summit",
};
