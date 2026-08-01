import type { ID, Image, VideoAsset } from "./common.types";
import type { IconName } from "lucide-react/dynamic";
import type { WithSEO } from "./seo.types";

/**
 * A curated merchandising grouping (e.g. "Gift Sets", "Best Sellers", "New
 * Arrivals") - distinct from `ProductCategory` (a taxonomy term). In
 * WooCommerce terms, a Category is a product taxonomy; a Collection here
 * models something more like a manually-curated list or a smart/dynamic
 * segment a merchandiser configures, which is why it's fetched via its own
 * `getCollections()` repository method rather than reusing category data.
 */
export interface Collection extends WithSEO {
  id: ID;
  slug: string;
  name: string;
  description?: string;
  image: Image;
  productCount: number;
}

export interface TrustBadge {
  id: ID;
  icon: IconName;
  label: string;
  description?: string;
}

export interface Statistic {
  id: ID;
  /** Numeric value the UI animates a counter up to; `suffix`/`prefix` carry
   * any unit or symbol (e.g. value: 12, suffix: "+ years"). */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Certificate {
  id: ID;
  name: string;
  description?: string;
  image: Image;
  /** Link to the underlying lab report / certification body page, if any. */
  url?: string;
}

export interface InstagramPost {
  id: ID;
  image: Image;
  caption?: string;
  permalink: string;
  likeCount?: number;
}

export interface FeaturedVideo {
  id: ID;
  title: string;
  description?: string;
  asset: VideoAsset;
}

export interface ComparisonRow {
  id: ID;
  label: string;
  /** One cell per column, aligned by index to `ComparisonTableSectionData.columns`. */
  values: Array<string | boolean>;
}
