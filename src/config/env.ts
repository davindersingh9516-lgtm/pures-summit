import { z } from "zod";

/**
 * Environment variable contract. Every var the frontend depends on - now or
 * once GraphQL is wired up - is declared here so a missing/misconfigured
 * value fails fast in development instead of surfacing as a silent runtime
 * bug. Nothing here holds a value itself; see .env.example for local setup.
 */
const envSchema = z.object({
  NEXT_PUBLIC_DATA_SOURCE: z.enum(["mock", "graphql"]).default("mock"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  /** Future WPGraphQL endpoint, e.g. https://cms.example.com/graphql */
  NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL: z.string().optional(),
  /** Future WooGraphQL session/auth secret, kept server-only. */
  WOOCOMMERCE_SESSION_SECRET: z.string().optional(),
  /** Google Tag Manager container ID. Absent in local/dev - GTMProvider and
   * AnalyticsProvider both stay fully inert until this is set. */
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
    WOOCOMMERCE_SESSION_SECRET: process.env.WOOCOMMERCE_SESSION_SECRET,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  });

  if (!parsed.success) {
    // Fail fast with a readable message rather than undefined-value bugs
    // scattered across the app.
    console.error("Invalid environment configuration:", parsed.error.flatten());
    throw new Error("Invalid environment configuration. Check .env.example.");
  }

  return parsed.data;
}

export const env = loadEnv();
