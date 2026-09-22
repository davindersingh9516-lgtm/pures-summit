import { CART_FIELDS } from "../fragments/cart.fragment";

export const GET_CART_QUERY = /* GraphQL */ `
  ${CART_FIELDS}
  query GetCart {
    cart {
      ...CartFields
    }
  }
`;

export const ADD_TO_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation AddToCart($productId: Int!, $quantity: Int!, $variationId: Int) {
    addToCart(input: { productId: $productId, quantity: $quantity, variationId: $variationId }) {
      cart {
        ...CartFields
      }
    }
  }
`;

export const UPDATE_ITEM_QUANTITIES_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation UpdateItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      cart {
        ...CartFields
      }
    }
  }
`;

export const REMOVE_ITEMS_FROM_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation RemoveItemsFromCart($keys: [ID]) {
    removeItemsFromCart(input: { keys: $keys }) {
      cart {
        ...CartFields
      }
    }
  }
`;

export const EMPTY_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        ...CartFields
      }
    }
  }
`;

export const APPLY_COUPON_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        ...CartFields
      }
    }
  }
`;

export const REMOVE_COUPONS_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation RemoveCoupons($codes: [String]) {
    removeCoupons(input: { codes: $codes }) {
      cart {
        ...CartFields
      }
    }
  }
`;

// UpdateCustomerPayload only exposes \`customer\`, not \`cart\` - the caller
// (graphql/cart.repository.ts) re-fetches the cart with GET_CART_QUERY
// immediately after, on the same session, to see the recalculated totals.
export const UPDATE_CUSTOMER_SHIPPING_MUTATION = /* GraphQL */ `
  mutation UpdateCustomerShipping($shipping: CustomerAddressInput) {
    updateCustomer(input: { shipping: $shipping }) {
      customer {
        id
      }
    }
  }
`;

export const UPDATE_SHIPPING_METHOD_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation UpdateShippingMethod($methods: [String]) {
    updateShippingMethod(input: { shippingMethods: $methods }) {
      cart {
        ...CartFields
      }
    }
  }
`;
