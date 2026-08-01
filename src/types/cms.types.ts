import type { ContentBlock, ID, Image, SlugEntity, VideoAsset } from "./common.types";
import type { WithSEO } from "./seo.types";
import type { HomepageSection } from "./homepage-sections.types";

/** Known block types the homepage/landing-page builder can render. Kept as a
 * union of string literals so new block types are additive and type-checked;
 * the actual per-block `data` shape lives in each block's own interface. */
export type BlockType =
  | "hero"
  | "announcement-bar"
  | "feature-grid"
  | "collection-showcase"
  | "product-carousel"
  | "testimonials"
  | "editorial-banner"
  | "faq"
  | "newsletter"
  | "rich-text"
  | "image-gallery"
  | "video-showcase"
  | "certifications"
  | "instagram-feed";

export interface HeroBlockData {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  media: Image;
  buttons: Array<{ label: string; url: string; variant?: "primary" | "secondary" }>;
}

export interface AnnouncementBarBlockData {
  message: string;
  url?: string;
  dismissible: boolean;
}

/** A generic CMS page (About Us, Contact, Policies, etc.) composed entirely
 * of backend-authored content blocks. */
export interface Page extends SlugEntity, WithSEO {
  title: string;
  blocks: ContentBlock<BlockType>[];
  updatedAt: string;
}

export interface HomepageData extends WithSEO {
  sections: HomepageSection[];
}

export type FAQCategory = "Product" | "Sourcing & Quality" | "Shipping & Returns" | "Orders & Payment";

export interface FAQItem {
  id: ID;
  question: string;
  answer: string;
  category: FAQCategory;
}

export interface Testimonial {
  id: ID;
  authorName: string;
  authorTitle?: string;
  authorAvatar?: Image;
  quote: string;
  rating?: number;
  /** Present when the CMS has a video review attached - testimonial
   * renderers should offer to play this instead of (or alongside) the
   * quote when it exists. */
  video?: VideoAsset;
  /** At most 1-2 testimonials per section should be featured - it gets the
   * large hero treatment in the wall layout. Marking every item featured
   * defeats the point (nothing left to visually recede). */
  featured?: boolean;
}
