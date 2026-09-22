import { cookies } from "next/headers";

/** httpOnly cookie holding the WPGraphQL JWT auth token (see
 * wp-graphql-jwt-authentication, installed on the WordPress backend).
 * Same "route handler is the only reader/writer" pattern as
 * src/lib/woo-session.ts - client components never see the raw token. */
const COOKIE_NAME = "ps_auth_token";

export async function getAuthToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value;
}

export async function setAuthToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // Matches the JWT's own short `exp` claim (5 min by default in
    // wp-graphql-jwt-authentication) - a `refreshToken` mutation to renew
    // it silently is a reasonable follow-up, not implemented yet.
    maxAge: 60 * 5,
  });
}

export async function clearAuthToken(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
