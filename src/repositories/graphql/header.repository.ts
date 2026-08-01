import type { IHeaderRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/** Future implementation: call `graphqlRequest(GET_HEADER_QUERY)` and map
 * onto `HeaderData`. */
export class GraphQLHeaderRepository implements IHeaderRepository {
  async getHeader(): ReturnType<IHeaderRepository["getHeader"]> {
    notImplemented("getHeader", "GET_HEADER_QUERY");
  }
}
