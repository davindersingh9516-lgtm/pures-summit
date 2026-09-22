import type { JsonLdGraph, SEOData } from "@/types";

/** Structurally identical response shape for both `SeoFields` (PostTypeSEO)
 * and `SeoTaxonomyFields` (TaxonomySEO) - see graphql/fragments/seo.fragment.ts. */
export interface WPYoastSEO {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphImage?: { sourceUrl?: string | null; altText?: string | null } | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: { sourceUrl?: string | null; altText?: string | null } | null;
  schema?: { raw?: string | null } | null;
}

/** Maps a raw WPGraphQL Yoast SEO addon response onto the app's internal
 * `SEOData` shape (src/lib/seo/build-metadata.ts then turns that into
 * Next.js `Metadata`). Falls back to sensible defaults for any field the
 * addon didn't return, since Yoast leaves most fields blank until an editor
 * fills them in manually. */
export function mapWooSEO(
  seo: WPYoastSEO | null | undefined,
  fallback: { title: string; description: string; canonical: string; type?: SEOData["openGraph"]["type"] },
): SEOData {
  const title = seo?.title || fallback.title;
  const description = seo?.metaDesc || fallback.description;
  // Deliberately NEVER use seo.canonical: Yoast runs on the WordPress
  // origin and always emits a canonical pointing there (e.g.
  // http://wp-origin/product/slug/), which is wrong for a headless setup -
  // Google must only ever see the public Next.js frontend's own URL as
  // canonical, never the WordPress backend. `fallback.canonical` is built
  // by every caller from NEXT_PUBLIC_SITE_URL + the frontend's own route.
  const canonical = fallback.canonical;
  const ogTitle = seo?.opengraphTitle || title;
  const ogDescription = seo?.opengraphDescription || description;

  const ogImage = seo?.opengraphImage?.sourceUrl
    ? { id: "", url: seo.opengraphImage.sourceUrl, altText: seo.opengraphImage.altText ?? "" }
    : undefined;
  const twitterImage = seo?.twitterImage?.sourceUrl
    ? { id: "", url: seo.twitterImage.sourceUrl, altText: seo.twitterImage.altText ?? "" }
    : ogImage;

  let jsonLd: JsonLdGraph | undefined;
  if (seo?.schema?.raw) {
    try {
      jsonLd = JSON.parse(seo.schema.raw) as JsonLdGraph;
    } catch {
      jsonLd = undefined;
    }
  }

  return {
    title,
    description,
    canonical,
    robots: {
      index: seo?.metaRobotsNoindex !== "noindex",
      follow: seo?.metaRobotsNofollow !== "nofollow",
    },
    openGraph: {
      type: fallback.type ?? "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "Pure Summit",
      image: ogImage,
      locale: "en_NZ",
    },
    twitter: {
      cardType: "summary_large_image",
      title: seo?.twitterTitle || ogTitle,
      description: seo?.twitterDescription || ogDescription,
      image: twitterImage,
    },
    alternates: [],
    jsonLd,
  };
}
