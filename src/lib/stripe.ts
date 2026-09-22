import Stripe from "stripe";
import { env } from "@/config/env";

/** Server-only Stripe client. `STRIPE_SECRET_KEY` is intentionally left
 * blank in .env.local/.env.example until real test/live keys are supplied -
 * every route that imports this throws a clear error instead of a cryptic
 * Stripe SDK failure until then. */
export function getStripeClient(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Add it to .env.local (WooCommerce Settings > " +
        "Payments > Stripe needs the matching keys entered there too) before using checkout.",
    );
  }
  return new Stripe(env.STRIPE_SECRET_KEY);
}
