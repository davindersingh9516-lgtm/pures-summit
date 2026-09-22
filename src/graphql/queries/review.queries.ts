/**
 * WooGraphQL's `Product.reviews` connection is Comment-backed. The star
 * rating lives on the *edge* (`ProductToCommentConnectionEdge.rating`), not
 * on the `Comment` node itself - verified via introspection. There is no
 * exposed "verified purchase" flag (that's WooCommerce comment meta, which
 * WPGraphQL doesn't surface without a custom field registration), and
 * `Comment` has no review `title` field (WooCommerce core reviews don't
 * support one) - both are left as sensible defaults by the mapper.
 */
export const GET_PRODUCT_REVIEWS_QUERY = /* GraphQL */ `
  query GetProductReviews($productId: ID!, $first: Int, $after: String) {
    product(id: $productId, idType: ID) {
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
        }
        edges {
          rating
          node {
            id
            databaseId
            content
            date
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
