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
  /** WooCommerce store currency (General > Currency options). WooGraphQL's
   * `price` fields return pre-formatted/raw strings but no currency code, so
   * this is threaded into Money.currencyCode by the graphql product/cart
   * repositories instead of an extra settings round-trip per request. */
  NEXT_PUBLIC_STORE_CURRENCY: z.string().default("NZD"),
  /** Stripe secret key (server-only) - used by /api/checkout/create-payment-intent
   * and /api/webhooks/stripe. Blank until the user supplies real test/live keys. */
  STRIPE_SECRET_KEY: z.string().optional(),
  /** Stripe publishable key, safe for the browser Payment Element. */
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  /** Signing secret for verifying /api/webhooks/stripe requests. */
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  /** Shared secret WordPress must send to /api/revalidate to trigger ISR. */
  REVALIDATE_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
    WOOCOMMERCE_SESSION_SECRET: process.env.WOOCOMMERCE_SESSION_SECRET,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_STORE_CURRENCY: process.env.NEXT_PUBLIC_STORE_CURRENCY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
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
