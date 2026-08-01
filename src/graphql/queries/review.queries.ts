export const GET_PRODUCT_REVIEWS_QUERY = /* GraphQL */ `
  query GetProductReviews($productId: ID!, $first: Int) {
    comments(where: { contentId: $productId }, first: $first) {
      nodes {
        id
        author {
          node {
            name
          }
        }
        content
        date
      }
    }
  }
`;
