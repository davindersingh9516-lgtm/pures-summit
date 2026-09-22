import { MENU_ITEM_FIELDS } from "../fragments/menu.fragment";

/**
 * Footer columns map to menus by slug "footer-1"/"footer-2"/"footer-3"
 * (WordPress admin: Appearance > Menus - name them so the slug matches, or
 * rename after creation). `generalSettings.email` doubles as the footer
 * contact email since there's no ACF Options Page for it. Social links,
 * payment/shipping icons, certifications, and newsletter copy have no
 * WordPress/WooCommerce source at all (no ACF field group configured) and
 * are left as empty/disabled defaults by the repository - see AGENTS.md
 * "what not to invent".
 */
export const GET_FOOTER_QUERY = /* GraphQL */ `
  ${MENU_ITEM_FIELDS}
  query GetFooter {
    generalSettings {
      email
    }
    footer1: menu(id: "footer-1", idType: SLUG) {
      name
      menuItems(first: 50) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    footer2: menu(id: "footer-2", idType: SLUG) {
      name
      menuItems(first: 50) {
        nodes {
          ...MenuItemFields
        }
      }
    }
    footer3: menu(id: "footer-3", idType: SLUG) {
      name
      menuItems(first: 50) {
        nodes {
          ...MenuItemFields
        }
      }
    }
  }
`;
