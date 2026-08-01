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
    productCount: 3,
    seo: createMockSEO({
      path: "/shop/category/raw-manuka-honey",
      title: "Raw Manuka Honey | Pure Summit",
      description: "Shop unpasteurized, cold-extracted raw Manuka honey from New Zealand.",
    }),
  },
  {
    id: "cat-umf-graded",
    slug: "umf-graded",
    name: "UMF Graded",
    description: "Independently lab-tested and UMF-certified for guaranteed potency.",
    image: { id: "cat-img-2", url: "/mocks/category-umf.svg", altText: "UMF graded honey jars" },
    parentId: null,
    productCount: 2,
    seo: createMockSEO({
      path: "/shop/category/umf-graded",
      title: "UMF Graded Manuka Honey | Pure Summit",
      description: "UMF-certified Manuka honey, independently lab-tested for potency.",
    }),
  },
  {
    id: "cat-gift-sets",
    slug: "gift-sets",
    name: "Gift Sets",
    description: "Curated honey collections presented in premium packaging.",
    image: { id: "cat-img-3", url: "/mocks/category-gifts.svg", altText: "Gift set packaging" },
    parentId: null,
    productCount: 1,
    seo: createMockSEO({
      path: "/shop/category/gift-sets",
      title: "Manuka Honey Gift Sets | Pure Summit",
      description: "Premium Manuka honey gift sets, thoughtfully curated and beautifully packaged.",
    }),
  },
];
