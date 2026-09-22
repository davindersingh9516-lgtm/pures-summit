import type { IFooterRepository } from "../interfaces";
import type { FooterColumn, FooterData } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_FOOTER_QUERY } from "@/graphql/queries/footer.queries";
import { toFlatLinks, type WPMenuItemNode } from "@/graphql/mappers/menu.mapper";
import { getSiteContent } from "../shared/site-content";
import {
  mapSiteContentCertificationBadge,
  mapSiteContentNewsletter,
  mapSiteContentSocialLink,
} from "@/graphql/mappers/site-content.mapper";
import { siteConfig } from "@/config/site.config";

interface WPFooterMenu {
  name?: string | null;
  menuItems?: { nodes: WPMenuItemNode[] } | null;
}

/** See GET_FOOTER_QUERY header comment - requires "footer-1"/"footer-2"/
 * "footer-3" menus assigned to their theme locations in wp-admin (see
 * pure-summit-menu-locations.php). Newsletter/certifications/social links
 * come from the same `siteContent` blob the homepage repository reads -
 * payment/shipping icons still have no source (no such field exists) and
 * stay empty until asked for. */
export class GraphQLFooterRepository implements IFooterRepository {
  async getFooter(): Promise<FooterData> {
    const [data, content] = await Promise.all([
      graphqlRequest<{
        generalSettings: { email?: string | null } | null;
        footer1: WPFooterMenu | null;
        footer2: WPFooterMenu | null;
        footer3: WPFooterMenu | null;
      }>(GET_FOOTER_QUERY, undefined, { next: { revalidate: siteConfig.revalidateSeconds.footer } }),
      getSiteContent(),
    ]);

    const columns: FooterColumn[] = [data.footer1, data.footer2, data.footer3]
      .map((menu, index) =>
        menu
          ? { id: `footer-col-${index + 1}`, title: menu.name ?? "", links: toFlatLinks(menu.menuItems?.nodes) }
          : null,
      )
      .filter((column): column is FooterColumn => column !== null);

    return {
      contactEmail: data.generalSettings?.email || undefined,
      columns,
      // Defensive: `content.socialLinks` may be missing from an
      // already-cached siteContent response fetched before this field
      // existed - falls back to empty rather than crashing the whole layout.
      socialLinks: (content.socialLinks ?? []).map(mapSiteContentSocialLink),
      // No source for payment/shipping method icons yet.
      paymentIcons: [],
      shippingIcons: [],
      certifications: content.certificates.map(mapSiteContentCertificationBadge),
      newsletter: mapSiteContentNewsletter(content.newsletter),
      copyrightText: `© ${new Date().getFullYear()} Pure Summit. All rights reserved.`,
      bottomLinks: [],
    };
  }
}
