import type { IFooterRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_FOOTER_QUERY)` and map the
 * ACF Options Page footer fields onto `FooterData`.
 */
export class GraphQLFooterRepository implements IFooterRepository {
  async getFooter(): ReturnType<IFooterRepository["getFooter"]> {
    notImplemented("getFooter", "GET_FOOTER_QUERY");
  }
}
