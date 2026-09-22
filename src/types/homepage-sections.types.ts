import type { IconName } from "lucide-react/dynamic";
import type { ID, Image, VideoAsset } from "./common.types";
import type { ComparisonRow } from "./homepage-domain.types";

/**
 * HOMEPAGE SECTION ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Every section is a discriminated union member keyed by `type`. A page is
 * just `HomepageSection[]` in CMS-authored order - reordering, adding, or
 * removing sections in WordPress (an ACF Flexible Content field on the
 * homepage) requires zero code changes, because `SectionRenderer`
 * (features/homepage/section-renderer.tsx) dispatches on `type` alone.
 *
 * Two kinds of section:
 *  - "Static" sections carry ALL their own content here (hero copy, banner
 *    text, benefit cards, comparison rows, spacer size, ...) because that's
 *    exactly how an ACF Flexible Content layout returns data - inline.
 *  - "Dynamic" sections (productCarousel, testimonials, blogPreview, ...)
 *    carry only lightweight CMS copy (heading/limit/filter) - the actual
 *    repeated records come from their own repository method
 *    (`getFeaturedProducts()`, `getTestimonials()`, ...) so they can be
 *    fetched, cached, and reused independently of the homepage (and so each
 *    section can stream in on its own via Suspense - see `app/page.tsx`).
 */

interface HomepageSectionBase<TType extends string> {
  id: ID;
  type: TType;
}

export interface SectionCTA {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface HeroSectionData extends HomepageSectionBase<"hero"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  media: Image;
  video?: VideoAsset;
  overlay?: "none" | "light" | "dark";
  buttons: SectionCTA[];
  trustBadges?: Array<{ id: ID; icon: IconName; label: string; description?: string }>;
  rating?: { value: number; count: number };
  awards?: Array<{ id: ID; label: string; image?: Image }>;
  sideContent?: { heading: string; description: string };
  floatingElements?: Array<{ id: ID; image: Image; label?: string }>;
  /** Anchor id for the hero's "Scroll to explore" affordance - the first
   * section after the hero should carry this same `id`. Omit to hide it. */
  scrollToId?: string;
}

export type MediaTextLayout = "imageLeft" | "imageRight";

/** Covers "Split Hero", "Image Left", and "Image Right" - three CMS layout
 * names that render through the same two-column media/text component. */
export interface MediaTextSectionData extends HomepageSectionBase<"splitHero" | "imageLeft" | "imageRight"> {
  layout: MediaTextLayout;
  eyebrow?: string;
  heading: string;
  description: string;
  media: Image;
  /** When present, plays as a muted, looping background video inside the
   * media panel (poster = `media`, shown until the first frame decodes or
   * if playback ever fails) instead of a static image. */
  video?: VideoAsset;
  /** Small supporting highlights row (icon + label + short value) rendered
   * between the description and the buttons, e.g. quick proof-points. */
  highlights?: Array<{ id: ID; icon: IconName; label: string; value: string }>;
  buttons?: SectionCTA[];
}

export interface FullWidthBannerSectionData extends HomepageSectionBase<"fullWidthBanner"> {
  heading: string;
  subheading?: string;
  media: Image;
  overlay?: "none" | "light" | "dark";
  button?: SectionCTA;
  height?: "compact" | "standard" | "tall";
}

/** Covers "Editorial Block" and "Story Block" - both are the same
 * magazine-style, large-typography storytelling layout. */
export interface EditorialStorySectionData extends HomepageSectionBase<"editorialBlock" | "storyBlock"> {
  eyebrow?: string;
  heading: string;
  body: string;
  media: Image;
  secondaryMedia?: Image;
  pullQuote?: string;
  button?: SectionCTA;
  layout: MediaTextLayout;
}

/** Covers "Product Carousel" and "Featured Products" - same carousel
 * component; `getFeaturedProducts()` resolves the actual `Product[]`. */
export interface ProductCarouselSectionData extends HomepageSectionBase<"productCarousel" | "featuredProducts"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewAllUrl?: string;
  limit: number;
  categorySlug?: string;
}

export interface CategoryCarouselSectionData extends HomepageSectionBase<"categoryCarousel"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export interface CollectionGridSectionData extends HomepageSectionBase<"collectionGrid"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export interface TrustIconsSectionData extends HomepageSectionBase<"trustIcons"> {
  heading?: string;
}

export interface BenefitsGridSectionData extends HomepageSectionBase<"benefitsGrid"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  benefits: Array<{ id: ID; icon: IconName; title: string; description: string }>;
}

export interface ComparisonTableSectionData extends HomepageSectionBase<"comparisonTable"> {
  heading: string;
  subheading?: string;
  columns: Array<{ id: ID; label: string; highlight?: boolean }>;
  rows: ComparisonRow[];
}

export interface VideoSectionData extends HomepageSectionBase<"videoSection"> {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export interface StatisticsSectionData extends HomepageSectionBase<"statistics"> {
  eyebrow?: string;
  heading?: string;
}

export interface TestimonialsSectionData extends HomepageSectionBase<"testimonials"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export interface FAQPreviewSectionData extends HomepageSectionBase<"faqPreview"> {
  heading: string;
  subheading?: string;
  viewAllUrl?: string;
  limit?: number;
  supportEmail?: string;
}

export type NewsletterSectionData = HomepageSectionBase<"newsletter">;

export interface InstagramFeedSectionData extends HomepageSectionBase<"instagramFeed"> {
  eyebrow?: string;
  heading?: string;
  handle?: string;
}

export interface BlogPreviewSectionData extends HomepageSectionBase<"blogPreview"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewAllUrl?: string;
  limit?: number;
}

export interface CTABannerSectionData extends HomepageSectionBase<"ctaBanner"> {
  heading: string;
  description?: string;
  media?: Image;
  button: SectionCTA;
}

export interface SpacerSectionData extends HomepageSectionBase<"spacer"> {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export interface DividerSectionData extends HomepageSectionBase<"divider"> {
  label?: string;
}

export interface CustomHtmlSectionData extends HomepageSectionBase<"customHtml"> {
  html: string;
}

/** Graceful fallback for a block type the CMS knows about but this build of
 * the frontend doesn't yet implement - renders nothing (or a subtle admin
 * hint) instead of crashing the whole page. */
export interface FutureCustomBlockSectionData extends HomepageSectionBase<"futureCustomBlock"> {
  originalType?: string;
}

/** Editorial copy + a stack of explainer cards on one side, a single large
 * image (with an optional small stats row beneath it) on the other -
 * e.g. "MGO 263+, Explained". `imagePosition` controls which side the
 * image sits on. */
export interface FeatureCardsMediaSectionData extends HomepageSectionBase<"featureCardsMedia"> {
  eyebrow?: string;
  heading: string;
  description: string;
  button?: SectionCTA;
  cards: Array<{ id: ID; icon: IconName; title: string; description: string }>;
  media: Image;
  imagePosition: "left" | "right";
  stats?: Array<{ id: ID; label: string }>;
}

/** "Shop by Strength" - a tabbed product preview. Each tab filters the same
 * pre-fetched product pool client-side by tag prefix (no re-fetch), showing
 * up to `limit` matches per tab. `tagPrefix: ""` on a tab means "show
 * everything" (the "All" tab). */
export interface ProductFilterSectionData extends HomepageSectionBase<"productFilterGrid"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  tabs: Array<{ id: ID; label: string; tagPrefix: string }>;
  limit: number;
  viewAllUrl?: string;
}

/** "Purity Promise" - a scroll-linked jar that fills with honey as the
 * visitor scrolls, with proof points revealing at fill thresholds. No
 * image, no card grid, no split columns - deliberately unlike every other
 * homepage section. `proofPoints` reveal in order, alternating margins by
 * index (even = left, odd = right). */
export interface PurityPromiseSectionData extends HomepageSectionBase<"purityPromise"> {
  headline: string;
  proofPoints: Array<{ id: ID; text: string }>;
  closingLine: string;
  batchLabel?: string;
}

/** "Harvesting Process" - a numbered step-by-step timeline (hive placement
 * through bottling). Horizontal with a progressively-filling connector line
 * on desktop, a vertical timeline on mobile - both share the same step data. */
export interface ProcessStepsSectionData extends HomepageSectionBase<"harvestProcess"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  steps: Array<{ id: ID; number: string; icon: IconName; title: string; description: string }>;
  closingNote?: string;
}

/** "Origin & Traceability" - an interactive New Zealand map with pinned
 * harvest regions (click a pin -> region story + potency range) plus a
 * batch-code lookup that resolves to a specific harvest record. Map and
 * lookup share one region list (`regions[].id` <-> `records[].regionId`) so
 * the two features can never disagree on a region's name or story. */
export interface OriginTraceabilitySectionData extends HomepageSectionBase<"originTraceability"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  map: {
    /** SVG viewBox, e.g. "0 0 400 534" - region x/y below are percentages
     * of this box, so pins line up with the path outlines exactly. */
    viewBox: string;
    northIslandPath: string;
    southIslandPath: string;
  };
  regions: Array<{
    id: ID;
    name: string;
    /** Percentage position (0-100) within `map.viewBox`. */
    x: number;
    y: number;
    beekeeper: string;
    description: string;
    harvestWindow: string;
    hiveCount: number;
    /** Typical MGO band this region's harvests test at - regional context,
     * not the grade of any one jar. */
    mgoRange: string;
    /** Only 1-2 regions should be `featured` (pulses to invite the first
     * click) - marking every pin featured reads as noisy, not premium. */
    featured?: boolean;
  }>;
  batchLookup: {
    heading: string;
    description: string;
    inputLabel: string;
    placeholder: string;
    helperText: string;
    notFoundMessage: string;
    records: Array<{
      id: ID;
      code: string;
      regionId: ID;
      harvestDate: string;
      bestBefore?: string;
      /** The lab-measured MGO figure for this batch. */
      mgo: string;
      lab: string;
    }>;
  };
}

/** "Contact Us" - a homepage-embedded contact form (name/email/topic/message)
 * paired with a trust panel (response-time expectation, hours, direct email,
 * trade phone line, certification badges). No live backend yet - submission
 * is a mock/demo confirmation, not a real send. */
export interface ContactFormSectionData extends HomepageSectionBase<"contactForm"> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  responseTimeNote: string;
  hours: string;
  email: string;
  phone?: string;
  phoneNote?: string;
  topics: string[];
  trustBadges?: Array<{ id: ID; icon: IconName; label: string }>;
}

export type HomepageSection =
  | HeroSectionData
  | MediaTextSectionData
  | FullWidthBannerSectionData
  | EditorialStorySectionData
  | ProductCarouselSectionData
  | CategoryCarouselSectionData
  | CollectionGridSectionData
  | TrustIconsSectionData
  | BenefitsGridSectionData
  | ComparisonTableSectionData
  | VideoSectionData
  | StatisticsSectionData
  | TestimonialsSectionData
  | FAQPreviewSectionData
  | NewsletterSectionData
  | InstagramFeedSectionData
  | BlogPreviewSectionData
  | CTABannerSectionData
  | FeatureCardsMediaSectionData
  | ProductFilterSectionData
  | PurityPromiseSectionData
  | ProcessStepsSectionData
  | OriginTraceabilitySectionData
  | ContactFormSectionData
  | SpacerSectionData
  | DividerSectionData
  | CustomHtmlSectionData
  | FutureCustomBlockSectionData;

export type HomepageSectionType = HomepageSection["type"];
