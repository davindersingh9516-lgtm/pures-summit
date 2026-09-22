import type { IHeaderRepository } from "../interfaces";
import type { HeaderData, PrimaryNavItem } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_HEADER_QUERY } from "@/graphql/queries/header.queries";
import { buildMenuTree, toFlatLinks, type WPMenuItemNode } from "@/graphql/mappers/menu.mapper";
import { siteConfig } from "@/config/site.config";

const FALLBACK_LOGO = { id: "logo", url: "/logo.png", altText: "Pure Summit" };

/** See GET_HEADER_QUERY header comment - requires "primary"/"secondary"/
 * "utility" menus in wp-admin (shared with navigation.repository.ts).
 * Resolves to empty nav (not an error) until they're created. */
export class GraphQLHeaderRepository implements IHeaderRepository {
  async getHeader(): Promise<HeaderData> {
    const data = await graphqlRequest<{
      primary: { menuItems?: { nodes: WPMenuItemNode[] } | null } | null;
      secondary: { menuItems?: { nodes: WPMenuItemNode[] } | null } | null;
      utility: { menuItems?: { nodes: WPMenuItemNode[] } | null } | null;
    }>(GET_HEADER_QUERY, undefined, { next: { revalidate: siteConfig.revalidateSeconds.navigation } });

    // Flat (top-level only) - no ACF mega-menu field group exists yet, so
    // there's nothing to build `megaMenu` from.
    const primaryNav: PrimaryNavItem[] = (data.primary?.menuItems?.nodes ?? [])
      .filter((node) => !node.parentId)
      .map((node) => ({ id: node.id, label: node.label ?? "", url: node.url ?? "#" }));

    return {
      logo: FALLBACK_LOGO,
      primaryNav,
      secondaryNav: buildMenuTree(data.secondary?.menuItems?.nodes),
      utilityLinks: toFlatLinks(data.utility?.menuItems?.nodes),
      // No CTA source - no ACF field, left undefined.
    };
  }
}
