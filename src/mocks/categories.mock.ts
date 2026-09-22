import type { ProductCategory } from "@/types";
import { createMockSEO } from "./seo.mock";

/**
 * MOCK DATA - stands in for WooGraphQL `productCategories`.
 */
export const mockCategories: ProductCategory[] = [
  {
    id: "cat-raw-manuka-honey",
    slug: "raw-manuka-honey",
    name: "Raw Manuka Honey",
    description: "Unpasteurized, cold-extracted honey harvested from remote Manuka groves.",
    image: { id: "cat-img-1", url: "/mocks/category-raw.svg", altText: "Raw Manuka honey jars" },
    parentId: null,
    productCount: 2,
    seo: createMockSEO({
      path: "/shop/category/raw-manuka-honey",
      title: "Raw Manuka Honey | Pure Summit",
      description: "Shop unpasteurized, cold-extracted raw Manuka honey from New Zealand.",
    }),
  },
  {
    id: "cat-mgo-graded",
    slug: "mgo-graded",
    name: "MGO Graded",
    description: "Independently lab-tested for Methylglyoxal content, so the grade on the jar is a measured result.",
    image: { id: "cat-img-2", url: "/mocks/category-mgo.svg", altText: "MGO graded honey jars" },
    parentId: null,
    productCount: 6,
    seo: createMockSEO({
      path: "/shop/category/mgo-graded",
      title: "MGO Graded Manuka Honey | Pure Summit",
      description: "MGO-graded Manuka honey, independently lab-tested for Methylglyoxal potency.",
    }),
  },
  {
    id: "cat-value-packs",
    slug: "value-packs",
    name: "Value Packs",
    description: "Multi-jar packs of our MGO 263+ honey, priced below buying the jars separately.",
    image: { id: "cat-img-3", url: "/mocks/category-packs.svg", altText: "Multi-jar Manuka honey value pack" },
    parentId: null,
    productCount: 4,
    seo: createMockSEO({
      path: "/shop/category/value-packs",
      title: "Manuka Honey Value Packs | Pure Summit",
      description: "Multi-jar packs of raw MGO 263+ Manuka honey at a lower price than single jars.",
    }),
  },
];
