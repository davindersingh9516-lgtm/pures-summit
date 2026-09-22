import type { ICurrencyRepository } from "../interfaces";
import type { Currency } from "@/types";
import { siteConfig } from "@/config/site.config";

/**
 * Same derivation `GraphQLSettingsRepository` uses (see its docstring) -
 * this store sells in NZD only, no multi-currency plugin is installed, so
 * there's nothing to query. `SiteShell` (global layout) calls this on
 * every route, so it must resolve rather than throw.
 */
export class GraphQLCurrencyRepository implements ICurrencyRepository {
  async getCurrencies(): Promise<Currency[]> {
    return siteConfig.supportedCurrencies.map((code) => ({ code, symbol: "$", decimalDigits: 2 }));
  }
}
