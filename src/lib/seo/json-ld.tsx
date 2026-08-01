import type { JsonLdGraph } from "@/types";

/**
 * Renders a backend-authored JSON-LD `@graph` verbatim as a `<script>` tag.
 * The frontend never derives or re-shapes schema - Yoast SEO owns the graph
 * (Organization, Product, Article, FAQPage, BreadcrumbList, etc.) and this
 * component is a pure, dumb serializer.
 *
 * Usage: `<JsonLd graph={product.seo.jsonLd} />` in a Server Component.
 */
export function JsonLd({ graph }: { graph?: JsonLdGraph }) {
  if (!graph) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
