/**
 * Reference query for the future WPGraphQL implementation. Not executed
 * yet - see repositories/graphql/navigation.repository.ts.
 */
export const GET_NAVIGATION_QUERY = /* GraphQL */ `
  query GetNavigation {
    primary: menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        label
        url
        childItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
    mobile: menuItems(where: { location: MOBILE }) {
      nodes {
        id
        label
        url
      }
    }
  }
`;
