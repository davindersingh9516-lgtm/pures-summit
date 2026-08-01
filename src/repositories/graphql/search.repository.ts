import type { ISearchRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/** Future implementation: call `graphqlRequest(GET_SEARCH_SUGGESTIONS_QUERY)`
 * and map onto `SearchSuggestions`. */
export class GraphQLSearchRepository implements ISearchRepository {
  async getSearchSuggestions(): ReturnType<ISearchRepository["getSearchSuggestions"]> {
    notImplemented("getSearchSuggestions", "GET_SEARCH_SUGGESTIONS_QUERY");
  }
}
