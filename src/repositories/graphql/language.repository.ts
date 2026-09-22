import type { ILanguageRepository } from "../interfaces";
import type { Locale } from "@/types";
import { siteConfig } from "@/config/site.config";

/**
 * Same derivation `GraphQLSettingsRepository` uses (see its docstring) -
 * no multi-language plugin (WPML/Polylang) is installed, so there's only
 * one locale. `SiteShell` (global layout) calls this on every route, so it
 * must resolve rather than throw.
 */
export class GraphQLLanguageRepository implements ILanguageRepository {
  async getLanguages(): Promise<Locale[]> {
    return siteConfig.supportedLocales.map((code) => ({ code, label: code, isDefault: code === siteConfig.defaultLocale }));
  }
}
