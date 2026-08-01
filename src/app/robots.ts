import type { MetadataRoute } from "next";
import { env } from "@/config/env";

/**
 * Backend-driven in spirit: once WordPress/Yoast is live, this can defer
 * entirely to Yoast's own robots directives fetched via WPGraphQL. Until
 * then it publishes a safe, permissive default derived only from the
 * configured site URL - no hardcoded business rules.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
