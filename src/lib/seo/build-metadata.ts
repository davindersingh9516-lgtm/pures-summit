import type { Metadata } from "next";
import type { SEOData } from "@/types";

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
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
      languages: Object.fromEntries((seo.alternates ?? []).map((alt) => [alt.hrefLang, alt.href])),
    },
    robots: robotsDirectives,
    // Next.js's built-in OpenGraph typings only model the four core
    // og:type variants (website/article/book/profile); "product" is valid
    // per the OpenGraph protocol and universally used by ecommerce SEO
    // tools like Yoast, so it's asserted through rather than dropped.
    openGraph: {
      type: seo.openGraph.type,
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
