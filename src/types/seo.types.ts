/**
 * SEO ABSTRACTION LAYER - TYPES
 * ---------------------------------------------------------------------------
 * Shape mirrors what Yoast SEO exposes via the WPGraphQL Yoast SEO addon
 * (`seo { ... }` on any Yoast-enabled node) so that wiring the real backend
 * later is a pure data-mapping exercise with zero UI changes.
 *
 * Every route in src/app is expected to resolve one of these (via
 * services/seo.service.ts -> lib/seo/metadata.ts) instead of hand-writing
 * Next.js `Metadata` objects.
 */

import type { Image } from "./common.types";

export type RobotsDirective =
  | "index"
  | "noindex"
  | "follow"
  | "nofollow"
  | "noarchive"
  | "nosnippet"
  | "noimageindex"
  | "max-snippet:-1"
  | "max-image-preview:large"
  | "max-video-preview:-1";

export interface SEORobots {
  index: boolean;
  follow: boolean;
  directives?: RobotsDirective[];
}

export type OpenGraphType =
  | "website"
  | "article"
  | "product"
  | "product.group"
  | "profile";

export interface SEOOpenGraph {
  type: OpenGraphType;
  title: string;
  description: string;
  url: string;
  siteName: string;
  image?: Image;
  locale?: string;
}

export interface SEOTwitterCard {
  cardType: "summary" | "summary_large_image";
  title: string;
  description: string;
  image?: Image;
}

/** A single node in a JSON-LD @graph array (Organization, Product, FAQPage,
 * BreadcrumbList, Article, etc.). Intentionally loose - the backend owns
 * the exact schema shape; the frontend only ever serializes it verbatim. */
export type JsonLdNode = Record<string, unknown> & {
  "@type": string;
  "@id"?: string;
};

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export interface SEOAlternateLink {
  hrefLang: string;
  href: string;
}

/** The canonical SEO payload every page-level `generateMetadata` consumes. */
export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  robots: SEORobots;
  openGraph: SEOOpenGraph;
  twitter: SEOTwitterCard;
  /** Hreflang alternates - multi-language ready, empty until locales exist. */
  alternates?: SEOAlternateLink[];
  /** Raw JSON-LD graph as authored in Yoast; rendered verbatim by
   * components/seo/json-ld.tsx without frontend re-derivation. */
  jsonLd?: JsonLdGraph;
}

/** Anything the CMS can attach `seo` to. */
export interface WithSEO {
  seo: SEOData;
}
