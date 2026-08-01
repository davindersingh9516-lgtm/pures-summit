import type { HeaderData } from "@/types";
import { mockSiteSettings } from "./settings.mock";

/**
 * MOCK DATA - stands in for a WPGraphQL query against the "Header" theme
 * options (logo + primary/secondary/utility nav + CTA) plus each primary
 * nav item's ACF "mega menu" field group.
 */
export const mockHeaderData: HeaderData = {
  logo: mockSiteSettings.logo,
  // Recolored (dark green -> white) variant for when the header sits
  // transparent over the hero video - see Header's `isTransparent` branch.
  logoDark: {
    id: "logo-dark-bg",
    url: "/logo-dark-bg.png",
    altText: mockSiteSettings.logo.altText,
    width: mockSiteSettings.logo.width,
    height: mockSiteSettings.logo.height,
  },
  primaryNav: [
    {
      id: "header-shop",
      label: "Shop",
      url: "/shop",
      megaMenu: {
        columns: [
          {
            id: "col-grades",
            title: "Shop by Grade",
            links: [
              { id: "col-grades-raw", label: "Raw Manuka Honey", url: "/shop/category/raw-manuka-honey" },
              { id: "col-grades-umf", label: "UMF Graded", url: "/shop/category/umf-graded" },
            ],
          },
          {
            id: "col-collections",
            title: "Collections",
            links: [
              { id: "col-collections-gifts", label: "Gift Sets", url: "/shop/category/gift-sets" },
              { id: "col-collections-wholesale", label: "Wholesale", url: "/wholesale" },
            ],
          },
        ],
        featuredCards: [
          {
            id: "featured-umf20",
            title: "UMF 20+ Manuka Honey",
            description: "Our rarest, most concentrated harvest.",
            image: { id: "featured-umf20-img", url: "/mocks/product-umf20-1.svg", altText: "UMF 20+ Manuka Honey jar" },
            url: "/shop/product/umf-20-manuka-honey-250g",
            badge: "Limited Harvest",
          },
          {
            id: "featured-gift-set",
            title: "Discovery Gift Set",
            description: "Three signature grades in a keepsake box.",
            image: { id: "featured-gift-img", url: "/mocks/product-gift-1.svg", altText: "Discovery gift set box" },
            url: "/shop/product/discovery-gift-set",
          },
        ],
        promo: {
          id: "shop-promo",
          image: { id: "shop-promo-img", url: "/mocks/category-raw.svg", altText: "Raw Manuka honey jars" },
          heading: "New Season Harvest",
          subheading: "Now available in limited quantities",
          url: "/shop/category/raw-manuka-honey",
        },
      },
    },
    { id: "header-our-story", label: "Our Story", url: "/our-story" },
    { id: "header-journal", label: "Journal", url: "/blog" },
    { id: "header-contact", label: "Contact", url: "/contact" },
  ],
  secondaryNav: [
    { id: "secondary-lab-reports", label: "Lab Reports", url: "/lab-reports" },
    { id: "secondary-sustainability", label: "Sustainability", url: "/sustainability" },
  ],
  utilityLinks: [
    { label: "Track Order", url: "/account/orders" },
    { label: "Wholesale", url: "/wholesale" },
  ],
  cta: { label: "Shop Now", url: "/shop" },
};
