import type { ISettingsRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_SETTINGS_QUERY)` and map
 * `generalSettings` + the Site Settings ACF Options Page onto `SiteSettings`.
 */
export class GraphQLSettingsRepository implements ISettingsRepository {
  async getSettings(): ReturnType<ISettingsRepository["getSettings"]> {
    notImplemented("getSettings", "GET_SETTINGS_QUERY");
  }
}
