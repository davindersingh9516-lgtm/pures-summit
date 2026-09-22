import { MENU_ITEM_FIELDS } from "../fragments/menu.fragment";

/**
 * WordPress `menus` are looked up by *slug*, not by `MenuLocationEnum`
 * location - introspection showed `MenuLocationEnum` has no values
 * registered on pure-summit's active theme (`{ enumValues: [{name: EMPTY}] }`),
 * meaning no nav menu locations exist yet, so a `location:`-filtered query
 * would fail schema validation. Slug lookup works regardless of whether
 * locations are ever registered.
 *
 * REQUIRES WP-ADMIN SETUP: create menus named "Primary", "Mobile", and
 * "Utility" (WordPress slugifies the name, so these slugs need to be
 * `primary`/`mobile`/`utility` - rename them in Appearance > Menus if the
 * auto-generated slug differs) and add items to them. Until then this
 * query resolves `null` for each and the repository returns empty menus.
 */
export const GET_NAVIGATION_QUERY = /* GraphQL */ `
  ${MENU_ITEM_FIELDS}
  query GetNavigation {
    primary: menu(id: "primary", idType: SLUG) {
      id
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    mobile: menu(id: "mobile", idType: SLUG) {
      id
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    utility: menu(id: "utility", idType: SLUG) {
      id
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
  }
`;
