import type { INavigationRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_NAVIGATION_QUERY)` and map
 * the WPGraphQL `menuItems` connections onto `NavigationData`.
 */
export class GraphQLNavigationRepository implements INavigationRepository {
  async getNavigation(): ReturnType<INavigationRepository["getNavigation"]> {
    notImplemented("getNavigation", "GET_NAVIGATION_QUERY");
  }
}
