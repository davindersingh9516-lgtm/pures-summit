import type { Currency, Image, Link, Locale } from "./common.types";

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  businessHours?: string;
}

export interface BusinessInfo {
  legalName: string;
  registrationNumber?: string;
  gstNumber?: string;
  foundedYear?: number;
}

/** Global site settings - the closest analogue to WordPress "Site Settings"
 * / a custom ACF Options Page surfaced through WPGraphQL. */
export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: Image;
  logoDark?: Image;
  favicon: Image;
  contact: ContactInfo;
  business: BusinessInfo;
  socialLinks: Link[];

  /** Multi-language readiness (architecture only - no translations yet). */
  locales: Locale[];
  defaultLocale: string;

  /** Multi-currency readiness (architecture only). */
  currencies: Currency[];
  defaultCurrency: string;

  /** Multi-store readiness (architecture only). */
  storeId: string;
  storeName: string;
}
