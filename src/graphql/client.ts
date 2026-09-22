import { env } from "@/config/env";

/**
 * FUTURE DATA LAYER - WPGraphQL + WooGraphQL CLIENT
 * ---------------------------------------------------------------------------
 * Not connected yet. This is the single chokepoint every
 * `repositories/graphql/*` implementation will call through once
 * NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is configured and NEXT_PUBLIC_DATA_SOURCE
 * is flipped to "graphql".
 *
 * Deliberately framework-agnostic (plain fetch, Next.js cache-aware) rather
 * than tied to Apollo/urql, since Next.js Server Components already provide
 * request deduplication and caching via `fetch`. Swap the implementation
 * for a full GraphQL client library here if the project later needs
 * normalized caching, subscriptions, or optimistic mutations.
 */

export interface GraphQLRequestOptions {
  /** Next.js fetch cache/revalidation controls, forwarded verbatim. */
  next?: NextFetchRequestConfig;
  /** AbortSignal for request cancellation (e.g. in route handlers). */
  signal?: AbortSignal;
  /** Extra request headers - used by the cart/checkout repositories to send
   * WooGraphQL's `woocommerce-session` token, since cart state lives in a
   * server-side WC session keyed by that header rather than in the query. */
  headers?: Record<string, string>;
}

export class GraphQLRequestError extends Error {
  constructor(
    message: string,
    public readonly errors?: unknown,
  ) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}

async function performRequest<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  options?: GraphQLRequestOptions,
): Promise<{ data: TData; response: Response }> {
  if (!env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL) {
    throw new GraphQLRequestError(
      "NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is not configured. Set it in .env.local once the " +
        "WordPress + WPGraphQL + WooGraphQL backend is available, then flip " +
        "NEXT_PUBLIC_DATA_SOURCE=graphql.",
    );
  }

  const response = await fetch(env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify({ query, variables }),
    next: options?.next,
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new GraphQLRequestError(`GraphQL request failed with status ${response.status}`);
  }

  const json = (await response.json()) as { data?: TData; errors?: unknown };

  if (json.errors) {
    throw new GraphQLRequestError("GraphQL request returned errors", json.errors);
  }

  if (!json.data) {
    throw new GraphQLRequestError("GraphQL request returned no data");
  }

  return { data: json.data, response };
}

export async function graphqlRequest<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  options?: GraphQLRequestOptions,
): Promise<TData> {
  const { data } = await performRequest<TData, TVariables>(query, variables, options);
  return data;
}

/** Same as `graphqlRequest`, but also returns the `woocommerce-session`
 * response header so the cart/checkout repositories can hand the (possibly
 * rotated) session token back to their caller. */
export async function graphqlSessionRequest<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>(
  query: string,
  variables: TVariables | undefined,
  sessionToken: string | undefined,
  options?: Omit<GraphQLRequestOptions, "headers">,
): Promise<{ data: TData; sessionToken: string }> {
  const { data, response } = await performRequest<TData, TVariables>(query, variables, {
    ...options,
    headers: sessionToken ? { "woocommerce-session": `Session ${sessionToken}` } : undefined,
  });

  const newSessionHeader = response.headers.get("woocommerce-session");
  return { data, sessionToken: newSessionHeader ?? sessionToken ?? "" };
}
