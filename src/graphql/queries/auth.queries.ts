export const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      customer {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const GET_VIEWER_QUERY = /* GraphQL */ `
  query GetViewer {
    customer {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GET_CUSTOMER_ORDERS_QUERY = /* GraphQL */ `
  query GetCustomerOrders {
    customer {
      orders(first: 50) {
        nodes {
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
            address1
            address2
            city
            state
            postcode
            country
            email
            phone
          }
        }
      }
    }
  }
`;
