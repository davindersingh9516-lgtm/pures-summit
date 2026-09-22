/** Maps onto `Cart` (src/types/cart.types.ts). No dependencies on other
 * fragments, so no composition-order caveat here (unlike product/category).
 * Every money field is fetched twice - RAW (plain decimal, for `Money.amount`)
 * and default FORMATTED (for `Money.formatted`) - same convention as
 * product.fragment.ts's `price`/`formattedPrice` pair. */
export const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    contents {
      itemCount
      nodes {
        key
        quantity
        rawSubtotal: subtotal(format: RAW)
        subtotal
        rawTotal: total(format: RAW)
        total
        product {
          node {
            id
            databaseId
            name
            slug
            image {
              id
              sourceUrl
              altText
            }
          }
        }
        variation {
          node {
            id
            databaseId
            name
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
    rawSubtotal: subtotal(format: RAW)
    subtotal
    rawSubtotalTax: subtotalTax(format: RAW)
    subtotalTax
    rawShippingTotal: shippingTotal(format: RAW)
    shippingTotal
    rawShippingTax: shippingTax(format: RAW)
    shippingTax
    rawDiscountTotal: discountTotal(format: RAW)
    discountTotal
    rawTotal: total(format: RAW)
    total
    rawTotalTax: totalTax(format: RAW)
    totalTax
    appliedCoupons {
      code
    }
    needsShippingAddress
    availableShippingMethods {
      rates {
        id
        label
        rawCost: cost(format: RAW)
        cost
      }
    }
    chosenShippingMethods
  }
`;
