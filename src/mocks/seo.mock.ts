import type { Image, SEOData } from "@/types";

/**
 * Builds a plausible Yoast-shaped SEO payload for mock entities. This is the
 * ONLY place mock SEO defaults live - every other mock file calls this
 * instead of inlining title/description/schema strings, so swapping in the
 * real Yoast GraphQL response later touches zero call sites.
 */
export function createMockSEO(input: {
  path: string;
  title: string;
  description: string;
  image?: Image;
  type?: SEOData["openGraph"]["type"];
}): SEOData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonical = `${siteUrl}${input.path}`;

  return {
    title: input.title,
    description: input.description,
    canonical,
    robots: { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: "Pure Summit",
      image: input.image,
      locale: "en_NZ",
    },
    twitter: {
      cardType: "summary_large_image",
      title: input.title,
      description: input.description,
      image: input.image,
    },
    alternates: [],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: input.title,
          description: input.description,
        },
      ],
    },
  };
}
