import type { Collection } from "@/types";
import { createMockSEO } from "./seo.mock";

/**
 * MOCK DATA - stands in for a curated merchandising "Collections" query
 * (distinct from product-category taxonomy - see types/homepage-domain.types.ts).
 */
export const mockCollections: Collection[] = [
  {
    id: "collection-best-sellers",
    slug: "best-sellers",
    name: "Best Sellers",
    description: "Our most-loved jars, chosen by customers.",
    image: { id: "collection-best-sellers-img", url: "/mocks/collection-bestsellers.svg", altText: "Best selling Manuka honey jars" },
    productCount: 4,
    seo: createMockSEO({
      path: "/shop/collection/best-sellers",
      title: "Best Sellers | Pure Summit",
      description: "Shop our most-loved Manuka honey, chosen by customers.",
    }),
  },
  {
    id: "collection-new-arrivals",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "The latest additions to the range.",
    image: { id: "collection-new-arrivals-img", url: "/mocks/collection-new-arrivals.svg", altText: "New arrival Manuka honey products" },
    productCount: 2,
    seo: createMockSEO({
      path: "/shop/collection/new-arrivals",
      title: "New Arrivals | Pure Summit",
      description: "Discover the newest additions to our Manuka honey range.",
    }),
  },
  {
    id: "collection-value-packs",
    slug: "value-packs",
    name: "Value Packs",
    description: "Multi-jar packs, priced below buying the jars separately.",
    image: { id: "collection-value-packs-img", url: "/mocks/category-packs.svg", altText: "Manuka honey multi-jar value pack" },
    productCount: 4,
    seo: createMockSEO({
      path: "/shop/collection/value-packs",
      title: "Value Packs | Pure Summit",
      description: "Multi-jar packs of raw MGO 263+ Manuka honey at a lower price than single jars.",
    }),
  },
];
