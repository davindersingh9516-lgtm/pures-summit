import type { ID, Image, Link } from "./common.types";
import type { MenuItem } from "./navigation.types";

export interface HeaderCTA {
  label: string;
  url: string;
}

export interface MegaMenuFeaturedCard {
  id: ID;
  title: string;
  description?: string;
  image: Image;
  url: string;
  badge?: string;
}

export interface MegaMenuPromoBlock {
  id: ID;
  image: Image;
  heading: string;
  subheading?: string;
  url: string;
}

export interface MegaMenuColumn {
  id: ID;
  title?: string;
  links: MenuItem[];
}

/** A mega menu supports arbitrarily many columns, each with recursively
 * nestable links (`MenuItem.children`), plus optional featured cards and a
 * single promo block - enough to model WordPress ACF Flexible Content
 * "mega menu" field groups without a UI-side depth limit. */
export interface MegaMenu {
  columns: MegaMenuColumn[];
  featuredCards: MegaMenuFeaturedCard[];
  promo?: MegaMenuPromoBlock;
}

export interface PrimaryNavItem {
  id: ID;
  label: string;
  url: string;
  megaMenu?: MegaMenu;
}

export interface HeaderData {
  logo: Image;
  logoDark?: Image;
  primaryNav: PrimaryNavItem[];
  secondaryNav: MenuItem[];
  utilityLinks: Link[];
  cta?: HeaderCTA;
}
