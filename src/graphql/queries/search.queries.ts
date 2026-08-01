export const GET_SEARCH_SUGGESTIONS_QUERY = /* GraphQL */ `
  query GetSearchSuggestions {
    searchSuggestions {
      popularSearches
      trendingProducts {
        id
        slug
        name
        image {
          sourceUrl
          altText
        }
        price
      }
      suggestedCategories {
        id
        slug
        name
      }
      suggestedArticles {
        id
        slug
        title
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;
