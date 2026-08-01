/**
 * SEO feature module - thin re-exports of the SEO abstraction layer
 * (`@/lib/seo/build-metadata`, `@/lib/seo/json-ld`) for feature code that
 * prefers importing from `@/features/seo` over reaching into `@/lib`
 * directly. No SEO logic is duplicated here.
 */
export { buildMetadata } from "@/lib/seo/build-metadata";
export { JsonLd } from "@/lib/seo/json-ld";
