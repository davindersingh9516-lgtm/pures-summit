/**
 * Fields needed everywhere a `Product` is rendered as a card (shop grid,
 * related products, search results). Price/stock live only on the concrete
 * `SimpleProduct`/`VariableProduct`/`ExternalProduct` types in WooGraphQL's
 * schema, not the shared `Product` interface, hence the inline fragments.
 *
 * Depends on `SeoFields` and `CategoryFields` but does not embed them -
 * callers must compose `SEO_FRAGMENT` + `CATEGORY_FIELDS` + this fragment
 * (each exactly once) in the final query string.
 */
export const PRODUCT_CARD_FIELDS = /* GraphQL */ `
  fragment ProductCardFields on Product {
    id
    databaseId
    slug
    name
    type
    sku
    shortDescription
    image {
      id
      sourceUrl
      altText
    }
    galleryImages(first: 10) {
      nodes {
        id
        sourceUrl
        altText
      }
    }
    productCategories(first: 10) {
      nodes {
        ...CategoryFields
      }
    }
    productTags(first: 20) {
      nodes {
        slug
      }
    }
    averageRating
    reviewCount
    ... on SimpleProduct {
      price(format: RAW)
      formattedPrice: price
      regularPrice(format: RAW)
      salePrice(format: RAW)
      stockStatus
    }
    ... on VariableProduct {
      price(format: RAW)
      formattedPrice: price
      regularPrice(format: RAW)
      salePrice(format: RAW)
      stockStatus
    }
    ... on ExternalProduct {
      price(format: RAW)
      formattedPrice: price
      regularPrice(format: RAW)
    }
    seo {
      ...SeoFields
    }
  }
`;

/** Depends on `ProductCardFields` (and transitively `SeoFields`/`CategoryFields`) - see composition note above. */
export const PRODUCT_DETAIL_FIELDS = /* GraphQL */ `
  fragment ProductDetailFields on Product {
    ...ProductCardFields
    description
    specifications {
      specifications
    }
    ... on VariableProduct {
      attributes(first: 10) {
        nodes {
          id
          name
          label
          options
          variation
        }
      }
      variations(first: 50) {
        nodes {
          id
          databaseId
          name
          sku
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
          stockStatus
          stockQuantity
          image {
            id
            sourceUrl
            altText
          }
          attributes {
            nodes {
              name
              value
            }
          }
        }
      }
    }
    related(first: 4) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;
