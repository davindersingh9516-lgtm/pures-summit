import type { Metadata } from "next";
import type { OpenGraphType, SEOData } from "@/types";

/**
 * Next.js's OpenGraph metadata resolver validates `type` against its own
 * internal allow-list at RUNTIME (not just in its TypeScript types) and
 * throws "Invalid OpenGraph type" for anything outside
 * website/article/book/profile - `product`/`product.group` are real,
 * Yoast-standard OG types (see `OpenGraphType`) but Next has no first-class
 * support for them, so they're mapped to `website` here rather than passed
 * through. A type assertion alone does NOT fix this - it only silences the
 * compiler while the page still crashes on render.
 */
function toNextOpenGraphType(type: OpenGraphType): "website" | "article" | "profile" {
  switch (type) {
    case "article":
    case "profile":
      return type;
    default:
      return "website";
  }
}

/**
 * SEO ABSTRACTION LAYER
 * ---------------------------------------------------------------------------
 * The ONLY place a Yoast-shaped `SEOData` object is translated into Next.js's
 * `Metadata` shape. Every route's `generateMetadata` should look like:
 *
 *   export async function generateMetadata(): Promise<Metadata> {
 *     const product = await getProduct(slug);
 *     return buildMetadata(product.seo);
 *   }
 *
 * No route should ever construct a `Metadata` object by hand - that would
 * reintroduce hardcoded SEO. When the real Yoast/WPGraphQL data arrives,
 * only `SEOData` itself changes shape (if at all); this function and every
 * page that calls it stay untouched.
 */
export function buildMetadata(seo: SEOData): Metadata {
  const robotsDirectives = [
    seo.robots.index ? "index" : "noindex",
    seo.robots.follow ? "follow" : "nofollow",
    ...(seo.robots.directives ?? []),
  ].join(", ");

  return {
    // `{ absolute }` opts out of the root layout's `title.template`
    // (`%s | ${siteName}`, see src/app/layout.tsx) - Yoast (and
    // createMockSEO) already produce a complete, final title including the
    // site name, so applying the template on top would double it up
    // ("Product - Pure Summit | Pure Summit").
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
      languages: Object.fromEntries((seo.alternates ?? []).map((alt) => [alt.hrefLang, alt.href])),
    },
    robots: robotsDirectives,
    openGraph: {
      type: toNextOpenGraphType(seo.openGraph.type),
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      images: seo.openGraph.image
        ? [
            {
              url: seo.openGraph.image.url,
              width: seo.openGraph.image.width,
              height: seo.openGraph.image.height,
              alt: seo.openGraph.image.altText,
            },
          ]
        : undefined,
    } as Metadata["openGraph"],
    twitter: {
      card: seo.twitter.cardType,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: seo.twitter.image ? [seo.twitter.image.url] : undefined,
    },
  };
}
