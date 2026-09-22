import { MENU_ITEM_FIELDS } from "../fragments/menu.fragment";

/**
 * Reuses the same "primary"/"secondary"/"utility" menu slugs as
 * `navigation.queries.ts` - the header renders a flat projection of the
 * same WordPress menus (no mega-menu column/featured-card/promo data
 * exists without a custom ACF field group on each menu item, so
 * `PrimaryNavItem.megaMenu` is always left `undefined` by the mapper; any
 * nested children under a header nav item are simply not rendered here,
 * though they *do* still show up in `NavigationData.primary`, which keeps
 * the full tree). Logo has no WordPress source (no ACF field, and the
 * Customizer's "Site Icon"/custom logo isn't surfaced by WPGraphQL core) -
 * the repository falls back to the static `/logo.png` asset.
 */
export const GET_HEADER_QUERY = /* GraphQL */ `
  ${MENU_ITEM_FIELDS}
  query GetHeader {
    primary: menu(id: "primary", idType: SLUG) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    secondary: menu(id: "secondary", idType: SLUG) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    utility: menu(id: "utility", idType: SLUG) {
      menuItems(first: 100) {
        nodes {
          ...MenuItemFields
        }
      }
    }
  }
`;
