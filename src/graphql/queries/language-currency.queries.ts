/** Reference query for a WPML/Polylang WPGraphQL language list. */
export const GET_LANGUAGES_QUERY = /* GraphQL */ `
  query GetLanguages {
    languages {
      code
      label
      isDefault
    }
  }
`;

/** Reference query for a WooCommerce multi-currency plugin's WooGraphQL
 * currency list. */
export const GET_CURRENCIES_QUERY = /* GraphQL */ `
  query GetCurrencies {
    currencies {
      code
      symbol
      decimalDigits
    }
  }
`;
