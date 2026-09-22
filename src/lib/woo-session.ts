import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CartResult } from "@/repositories/interfaces";

/**
 * WooGraphQL ties cart state to a `woocommerce-session` JWT it hands back on
 * every request (see graphql/client.ts's `graphqlSessionRequest`), not a
 * normal WP cookie - the browser never talks to WPGraphQL directly (CORS,
 * and it would expose the WordPress origin). Route handlers under
 * src/app/api/cart/* are the only callers of the cart/checkout
 * repositories; they read this cookie in, forward the token to WooGraphQL,
 * and write whatever (possibly rotated) token comes back out.
 */
const COOKIE_NAME = "ps_woo_session";

export async function getWooSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value;
}

export async function setWooSessionToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // WooGraphQL's JWT itself expires in 48h (see the `exp` claim) - match it
    // so the cookie doesn't outlive a token WooCommerce will reject anyway.
    maxAge: 60 * 60 * 48,
  });
}

/** Every `src/app/api/cart/*` route handler ends with this: persist the
 * (possibly rotated) session token back into the cookie, return the cart. */
export async function respondWithCart(result: CartResult): Promise<NextResponse> {
  await setWooSessionToken(result.sessionToken);
  return NextResponse.json({ cart: result.cart });
}
