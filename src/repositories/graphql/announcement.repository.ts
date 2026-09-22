import type { IAnnouncementRepository } from "../interfaces";
import type { AnnouncementBarData } from "@/types";

/**
 * No WordPress source exists for a promo announcement bar (no ACF options
 * page, no dedicated plugin) - same "don't invent a backend field nobody
 * asked for" call as homepage/content/currency's sibling repos. Returning
 * `enabled: false` (rather than throwing) matters here specifically because
 * `SiteShell` - the global layout every route renders through - calls this,
 * so a thrown error here would 500 the entire site, not just the homepage.
 */
export class GraphQLAnnouncementRepository implements IAnnouncementRepository {
  async getAnnouncementBar(): Promise<AnnouncementBarData> {
    return { enabled: false, dismissible: true, items: [] };
  }
}
