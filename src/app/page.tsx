import { Suspense } from "react";
import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/global/error-boundary";
import { SectionRenderer, SectionSkeleton } from "@/features/homepage";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { getHomepage } from "@/services";

/**
 * SEO ARCHITECTURE - no hardcoded metadata. `getHomepage()` resolves a
 * Yoast-shaped `SEOData` payload (mock today, WPGraphQL's `seo` field on the
 * homepage node later); `buildMetadata` is the one place that gets
 * translated into Next.js's `Metadata` shape. See lib/seo/build-metadata.ts.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepage();
  return buildMetadata(seo);
}

/**
 * The homepage renders ENTIRELY from `sections: HomepageSection[]` - see
 * types/homepage-sections.types.ts and features/homepage/section-renderer.tsx.
 * Reordering, adding, or removing sections in WordPress requires no code
 * change here.
 *
 * Each section gets its own `<Suspense>` boundary (so "dynamic" sections -
 * featured products, testimonials, blog preview, etc. - stream in
 * independently instead of blocking the whole page behind one big fetch)
 * wrapped in its own `<ErrorBoundary>` (so one section's future backend
 * error can't take down the rest of the homepage).
 */
export default async function HomePage() {
  const { seo, sections } = await getHomepage();

  return (
    <>
      <JsonLd graph={seo.jsonLd} />
      {sections.map((section) => (
        <div key={section.id} id={section.id}>
          <ErrorBoundary fallback={null}>
            <Suspense fallback={<SectionSkeleton type={section.type} />}>
              <SectionRenderer section={section} />
            </Suspense>
          </ErrorBoundary>
        </div>
      ))}
    </>
  );
}
