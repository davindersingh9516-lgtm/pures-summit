import type { ILanguageRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/** Future implementation: call `graphqlRequest(GET_LANGUAGES_QUERY)` and
 * map onto `Locale[]`. */
export class GraphQLLanguageRepository implements ILanguageRepository {
  async getLanguages(): ReturnType<ILanguageRepository["getLanguages"]> {
    notImplemented("getLanguages", "GET_LANGUAGES_QUERY");
  }
}
