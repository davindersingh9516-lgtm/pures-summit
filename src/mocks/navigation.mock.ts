import type { NavigationData } from "@/types";

/**
 * MOCK DATA - stands in for a WPGraphQL `menuItems` query against a
 * WordPress-managed "Primary" menu location. Replace by implementing
 * repositories/graphql/navigation.repository.ts; this file is never
 * imported outside repositories/mock/navigation.repository.ts.
 */
export const mockNavigationData: NavigationData = {
  primary: {
    id: "menu-primary",
    location: "primary",
    items: [
      {
        id: "nav-shop",
        label: "Shop",
        url: "/shop",
        children: [
          { id: "nav-shop-raw", label: "Raw Manuka Honey", url: "/shop/category/raw-manuka-honey" },
          { id: "nav-shop-mgo", label: "MGO Graded", url: "/shop/category/mgo-graded" },
          { id: "nav-shop-packs", label: "Value Packs", url: "/shop/category/value-packs" },
        ],
      },
      { id: "nav-our-story", label: "Our Story", url: "/our-story" },
      { id: "nav-journal", label: "Journal", url: "/blog" },
      { id: "nav-contact", label: "Contact", url: "/contact" },
    ],
  },
  mobile: {
    id: "menu-mobile",
    location: "mobile",
    items: [
      { id: "nav-m-shop", label: "Shop", url: "/shop" },
      { id: "nav-m-story", label: "Our Story", url: "/our-story" },
      { id: "nav-m-journal", label: "Journal", url: "/blog" },
      { id: "nav-m-contact", label: "Contact", url: "/contact" },
      { id: "nav-m-account", label: "Account", url: "/account" },
    ],
  },
  utility: {
    id: "menu-utility",
    location: "utility",
    items: [
      { id: "nav-u-track", label: "Track Order", url: "/account/orders" },
      { id: "nav-u-wholesale", label: "Wholesale", url: "/wholesale" },
    ],
  },
};
