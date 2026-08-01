/**
 * TECHNICAL site configuration only. This is NOT where business content
 * (brand name, logo, copy) lives - that comes from SiteSettings via
 * services/settings.service.ts, sourced from WordPress. Everything here is
 * an infrastructure/architecture decision, not marketing content.
 */

export const siteConfig = {
  /** Fallback used only if the backend-driven SiteSettings fetch fails. */
  defaultLocale: "en-NZ",
  supportedLocales: ["en-NZ"] as string[],

  defaultCurrency: "NZD",
  supportedCurrencies: ["NZD"] as string[],

  /** ISR revalidation window (seconds) for backend-driven content. */
  revalidateSeconds: {
    homepage: 300,
    page: 600,
    product: 300,
    productList: 120,
    blogPost: 600,
    blogList: 300,
    navigation: 900,
    footer: 900,
    settings: 900,
  },

  pagination: {
    productsPerPage: 24,
    blogPostsPerPage: 12,
    reviewsPerPage: 10,
  },
} as const;

export type SiteConfig = typeof siteConfig;
