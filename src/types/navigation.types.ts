import type { ID } from "./common.types";

export interface MenuItem {
  id: ID;
  label: string;
  url: string;
  target?: "_self" | "_blank";
  description?: string;
  icon?: string;
  badge?: string;
  children?: MenuItem[];
}

export type NavigationLocation =
  | "primary"
  | "secondary"
  | "mobile"
  | "footer-1"
  | "footer-2"
  | "footer-3"
  | "utility";

export interface NavigationMenu {
  id: ID;
  location: NavigationLocation;
  items: MenuItem[];
}

/** Root aggregate returned by `getNavigation()` - all menu locations for the
 * current locale/store in a single call, mirroring a single WPGraphQL query. */
export interface NavigationData {
  primary: NavigationMenu;
  mobile: NavigationMenu;
  utility?: NavigationMenu;
}
