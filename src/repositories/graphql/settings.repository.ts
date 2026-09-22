import type { ISettingsRepository } from "../interfaces";
import type { SiteSettings } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_SETTINGS_QUERY } from "@/graphql/queries/settings.queries";
import { siteConfig } from "@/config/site.config";
import { env } from "@/config/env";

interface WPGeneralSettings {
  title?: string | null;
  description?: string | null;
  email?: string | null;
  url?: string | null;
  siteIconUrl?: string | null;
}

/**
 * Only `siteName`/`tagline`/`contact.email` have a real WordPress source
 * right now (`generalSettings.title`/`description`/`email`). Everything
 * else on `SiteSettings` - logo, favicon (beyond the site icon), phone/
 * address/hours, legal/business info, social links - has no ACF Options
 * Page configured on pure-summit yet, so it falls back to the same
 * technical defaults `siteConfig` already declares. Once an admin adds a
 * "Site Settings" ACF options page (or equivalent), extend
 * `GET_SETTINGS_QUERY` and this mapper instead of hardcoding further.
 */
export class GraphQLSettingsRepository implements ISettingsRepository {
  async getSettings(): Promise<SiteSettings> {
    const data = await graphqlRequest<{ generalSettings: WPGeneralSettings | null }>(
      GET_SETTINGS_QUERY,
      undefined,
      { next: { revalidate: siteConfig.revalidateSeconds.settings } },
    );

    const general = data.generalSettings;
    const siteName = general?.title || "Pure Summit";

    return {
      siteName,
      tagline: general?.description || "",
      logo: { id: "logo", url: "/logo.png", altText: siteName },
      favicon: general?.siteIconUrl
        ? { id: "favicon", url: general.siteIconUrl, altText: siteName }
        : { id: "favicon", url: "/favicon.ico", altText: siteName },
      contact: {
        email: general?.email || "",
        // No ACF field for phone/address/hours yet - left blank rather than
        // fabricated so the UI can conditionally hide them.
      },
      business: {
        legalName: siteName,
      },
      socialLinks: [],
      locales: siteConfig.supportedLocales.map((code) => ({ code, label: code, isDefault: code === siteConfig.defaultLocale })),
      defaultLocale: siteConfig.defaultLocale,
      currencies: siteConfig.supportedCurrencies.map((code) => ({ code, symbol: "$", decimalDigits: 2 })),
      defaultCurrency: env.NEXT_PUBLIC_STORE_CURRENCY,
      storeId: "default",
      storeName: siteName,
    };
  }
}
