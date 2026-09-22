/**
 * `ISearchRepository.getSearchSuggestions()` is popular/trending content,
 * not a live search query (see interface docstring) - there's no
 * WordPress/WooCommerce search-analytics plugin installed, so
 * `popularSearches` (raw query strings) has no real source and is left an
 * empty array by the repository. `trendingProducts` and
 * `suggestedCategories` are derived from real store data (most-popular
 * products, highest product-count categories); `suggestedArticles` from
 * the latest blog posts.
 */
export const GET_SEARCH_SUGGESTIONS_QUERY = /* GraphQL */ `
  query GetSearchSuggestions($productsFirst: Int, $categoriesFirst: Int, $articlesFirst: Int) {
    products(first: $productsFirst, where: { orderby: [{ field: POPULARITY, order: DESC }], visibility: CATALOG }) {
      nodes {
        id
        slug
        name
        image {
          id
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price(format: RAW)
          formattedPrice: price
        }
        ... on VariableProduct {
          price(format: RAW)
          formattedPrice: price
        }
      }
    }
    productCategories(first: $categoriesFirst, where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
      nodes {
        id
        slug
        name
      }
    }
    posts(first: $articlesFirst, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
