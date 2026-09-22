export const CHECKOUT_MUTATION = /* GraphQL */ `
  mutation Checkout(
    $billing: CustomerAddressInput
    $shipping: CustomerAddressInput
    $shipToDifferentAddress: Boolean
    $customerNote: String
    $paymentMethod: String
    $transactionId: String
  ) {
    checkout(
      input: {
        billing: $billing
        shipping: $shipping
        shipToDifferentAddress: $shipToDifferentAddress
        customerNote: $customerNote
        paymentMethod: $paymentMethod
        isPaid: true
        transactionId: $transactionId
      }
    ) {
      order {
        id
        databaseId
        orderNumber
        status
        rawTotal: total(format: RAW)
        total
        paymentMethod
        date
        billing {
          firstName
          lastName
          company
          address1
          address2
          city
          state
          postcode
          country
          email
          phone
        }
        shipping {
          firstName
          lastName
          company
          address1
          address2
          city
          state
          postcode
          country
        }
      }
    }
  }
`;

/**
 * Runs on the same WooCommerce session as the cart (via
 * `graphqlSessionRequest`, not the JWT auth flow) so the guest cart carries
 * over to the new account instead of being abandoned. `authenticate: true`
 * also logs the WC session in as this customer immediately, before payment.
 */
export const REGISTER_CUSTOMER_MUTATION = /* GraphQL */ `
  mutation RegisterCustomer($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        id
        email
      }
    }
  }
`;
