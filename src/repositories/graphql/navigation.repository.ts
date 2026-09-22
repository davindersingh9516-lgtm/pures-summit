import type { INavigationRepository } from "../interfaces";
import type { NavigationData } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_NAVIGATION_QUERY } from "@/graphql/queries/navigation.queries";
import { buildMenuTree, type WPMenuNode } from "@/graphql/mappers/menu.mapper";
import { siteConfig } from "@/config/site.config";

/** See GET_NAVIGATION_QUERY header comment - requires "primary"/"mobile"/
 * "utility" menus to exist in wp-admin (Appearance > Menus). Resolves to
 * empty menus (not an error) until they're created. */
export class GraphQLNavigationRepository implements INavigationRepository {
  async getNavigation(): Promise<NavigationData> {
    const data = await graphqlRequest<{
      primary: WPMenuNode | null;
      mobile: WPMenuNode | null;
      utility: WPMenuNode | null;
    }>(GET_NAVIGATION_QUERY, undefined, { next: { revalidate: siteConfig.revalidateSeconds.navigation } });

    return {
      primary: { id: data.primary?.id ?? "menu-primary", location: "primary", items: buildMenuTree(data.primary?.menuItems?.nodes) },
      mobile: { id: data.mobile?.id ?? "menu-mobile", location: "mobile", items: buildMenuTree(data.mobile?.menuItems?.nodes) },
      utility: data.utility
        ? { id: data.utility.id, location: "utility", items: buildMenuTree(data.utility.menuItems?.nodes) }
        : undefined,
    };
  }
}
