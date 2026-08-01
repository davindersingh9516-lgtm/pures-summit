/**
 * Thrown by every graphql/* repository method until its real WPGraphQL/
 * WooGraphQL implementation is written. Centralized so the message -
 * and the guidance for the next developer - stays consistent.
 */
export function notImplemented(methodName: string, queryName: string): never {
  throw new Error(
    `[graphql] ${methodName} is not implemented yet. Wire it up using ` +
      `graphqlRequest() from src/graphql/client.ts and ${queryName} from ` +
      `src/graphql/queries, then map the response onto the domain type. ` +
      `Until then, keep NEXT_PUBLIC_DATA_SOURCE=mock.`,
  );
}
