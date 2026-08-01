/**
 * DATA SOURCE SWITCH
 * ---------------------------------------------------------------------------
 * The single flag that decides whether repositories/index.ts (the
 * repository factory) hands out the mock implementations or the future
 * WPGraphQL/WooGraphQL implementations.
 *
 * Flipping NEXT_PUBLIC_DATA_SOURCE from "mock" to "graphql" once the WordPress
 * backend exists should be the ONLY change required to go live - no UI,
 * service, or page component should need to change.
 */

export type DataSourceMode = "mock" | "graphql";

function resolveDataSourceMode(): DataSourceMode {
  const raw = process.env.NEXT_PUBLIC_DATA_SOURCE;
  return raw === "graphql" ? "graphql" : "mock";
}

export const dataSourceConfig = {
  mode: resolveDataSourceMode(),
} as const;

export const isMockDataSource = dataSourceConfig.mode === "mock";
export const isGraphQLDataSource = dataSourceConfig.mode === "graphql";
