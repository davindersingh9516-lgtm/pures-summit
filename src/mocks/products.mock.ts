import type { Money, Product } from "@/types";
import { mockCategories } from "./categories.mock";
import { createMockSEO } from "./seo.mock";

function nzd(amount: number): Money {
  return { amount: Math.round(amount * 100), currencyCode: "NZD", formatted: `$${amount.toFixed(2)}` };
}

const byslug = (slug: string) => mockCategories.find((c) => c.slug === slug)!;

/**
 * MOCK DATA - stands in for a WooGraphQL `products` query. Every field
 * mirrors what WooCommerce/WooGraphQL exposes so the repository swap later
 * is a pure data-mapping exercise.
 */
export const mockProducts: Product[] = [
  {
    id: "prod-umf-10-250g",
    slug: "umf-10-manuka-honey-250g",
    type: "variable",
    name: "UMF 10+ Manuka Honey",
    shortDescription: "A versatile, everyday-strength Manuka honey, cold-extracted and raw.",
    description:
      "Harvested from remote Northland groves and cold-extracted to preserve its natural enzymes, our UMF 10+ Manuka Honey is independently lab-tested for guaranteed potency.",
    sku: "MH-UMF10",
    price: nzd(39.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-1", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 10+" }, { id: "img-1-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 10+, shown with its lab certificate of analysis" }, { id: "img-1-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 10+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("raw-manuka-honey"), byslug("umf-graded")],
    tags: ["umf10", "everyday", "raw"],
    attributes: [
      {
        id: "attr-size",
        name: "Size",
        values: [
          { id: "size-250g", name: "250g" },
          { id: "size-500g", name: "500g" },
        ],
      },
    ],
    variants: [
      {
        id: "var-umf10-250g",
        sku: "MH-UMF10-250",
        price: nzd(39.9),
        stockStatus: "IN_STOCK",
        selections: { Size: "size-250g" },
      },
      {
        id: "var-umf10-500g",
        sku: "MH-UMF10-500",
        price: nzd(69.9),
        stockStatus: "IN_STOCK",
        selections: { Size: "size-500g" },
      },
    ],
    reviewSummary: { averageRating: 4.7, count: 128 },
    relatedProductIds: ["prod-umf-15-250g", "prod-umf-20-250g"],
    badges: ["Best Seller"],
    seo: createMockSEO({
      path: "/shop/product/umf-10-manuka-honey-250g",
      title: "UMF 10+ Manuka Honey 250g | Pure Summit",
      description: "Raw, cold-extracted UMF 10+ Manuka honey. Lab-tested for guaranteed potency.",
      type: "product",
    }),
  },
  {
    id: "prod-umf-15-250g",
    slug: "umf-15-manuka-honey-250g",
    type: "variable",
    name: "UMF 15+ Manuka Honey",
    shortDescription: "A robust, high-potency Manuka honey for daily wellness rituals.",
    description:
      "Our UMF 15+ Manuka Honey is harvested at peak season and independently tested to guarantee its non-peroxide antibacterial activity.",
    sku: "MH-UMF15",
    price: nzd(59.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-2", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 15+" }, { id: "img-2-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 15+, shown with its lab certificate of analysis" }, { id: "img-2-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 15+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("umf-graded")],
    tags: ["umf15", "high-potency"],
    attributes: [
      { id: "attr-size", name: "Size", values: [{ id: "size-250g", name: "250g" }] },
    ],
    variants: [
      { id: "var-umf15-250g", sku: "MH-UMF15-250", price: nzd(59.9), stockStatus: "IN_STOCK", selections: { Size: "size-250g" } },
    ],
    reviewSummary: { averageRating: 4.9, count: 86 },
    relatedProductIds: ["prod-umf-10-250g", "prod-umf-20-250g"],
    seo: createMockSEO({
      path: "/shop/product/umf-15-manuka-honey-250g",
      title: "UMF 15+ Manuka Honey 250g | Pure Summit",
      description: "High-potency UMF 15+ Manuka honey, independently lab-tested and raw.",
      type: "product",
    }),
  },
  {
    id: "prod-umf-20-250g",
    slug: "umf-20-manuka-honey-250g",
    type: "simple",
    name: "UMF 20+ Manuka Honey",
    shortDescription: "Our rarest, most concentrated harvest - reserved for the connoisseur.",
    description:
      "A limited annual harvest of exceptionally rare Manuka honey, UMF 20+ represents the peak of natural potency and flavour complexity.",
    sku: "MH-UMF20",
    price: nzd(109.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-3", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 20+" }, { id: "img-3-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 20+, shown with its lab certificate of analysis" }, { id: "img-3-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 20+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("raw-manuka-honey"), byslug("umf-graded")],
    tags: ["umf20", "rare", "limited"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 5.0, count: 41 },
    relatedProductIds: ["prod-umf-15-250g"],
    badges: ["Limited Harvest"],
    seo: createMockSEO({
      path: "/shop/product/umf-20-manuka-honey-250g",
      title: "UMF 20+ Manuka Honey 250g | Pure Summit",
      description: "A rare, limited-harvest UMF 20+ Manuka honey of exceptional potency.",
      type: "product",
    }),
  },
  {
    id: "prod-umf-5-250g",
    slug: "umf-5-manuka-honey-250g",
    type: "simple",
    name: "UMF 5+ Manuka Honey",
    shortDescription: "An entry-strength introduction to raw Manuka honey.",
    description:
      "A gentler, everyday Manuka honey, still cold-extracted and independently lab-tested for guaranteed potency.",
    sku: "MH-UMF05",
    price: nzd(29.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-5", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 5+" }, { id: "img-5-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 5+, shown with its lab certificate of analysis" }, { id: "img-5-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 5+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("raw-manuka-honey")],
    tags: ["umf5", "entry", "raw"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.6, count: 64 },
    relatedProductIds: ["prod-umf-10-250g"],
    seo: createMockSEO({
      path: "/shop/product/umf-5-manuka-honey-250g",
      title: "UMF 5+ Manuka Honey 250g | Pure Summit",
      description: "An entry-strength, raw and lab-tested Manuka honey for everyday use.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-550-250g",
    slug: "mgo-550-manuka-honey-250g",
    type: "simple",
    name: "MGO 550+ Manuka Honey",
    shortDescription: "High-potency Manuka honey, graded by Methylglyoxal content.",
    description:
      "Independently lab-verified for MGO (Methylglyoxal) levels, our MGO 550+ Manuka Honey delivers concentrated potency for those who prefer MGO grading over UMF.",
    sku: "MH-MGO550",
    price: nzd(79.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-6", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, MGO 550+" }, { id: "img-6-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, MGO 550+, shown with its lab certificate of analysis" }, { id: "img-6-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, MGO 550+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("umf-graded")],
    tags: ["mgo550", "high-potency"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.8, count: 37 },
    relatedProductIds: ["prod-umf-20-250g"],
    badges: ["New"],
    seo: createMockSEO({
      path: "/shop/product/mgo-550-manuka-honey-250g",
      title: "MGO 550+ Manuka Honey 250g | Pure Summit",
      description: "High-potency Manuka honey, independently graded by MGO content.",
      type: "product",
    }),
  },
  {
    id: "prod-umf-8-250g",
    slug: "umf-8-manuka-honey-250g",
    type: "simple",
    name: "UMF 8+ Manuka Honey",
    shortDescription: "A light, everyday Manuka honey with gentle floral notes.",
    description:
      "Cold-extracted and independently lab-tested, our UMF 8+ Manuka Honey is a smooth, approachable everyday grade.",
    sku: "MH-UMF08",
    price: nzd(34.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-7", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 8+" }, { id: "img-7-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 8+, shown with its lab certificate of analysis" }, { id: "img-7-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 8+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("raw-manuka-honey")],
    tags: ["umf8", "everyday", "raw"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.7, count: 52 },
    relatedProductIds: ["prod-umf-10-250g"],
    seo: createMockSEO({
      path: "/shop/product/umf-8-manuka-honey-250g",
      title: "UMF 8+ Manuka Honey 250g | Pure Summit",
      description: "A light, everyday Manuka honey grade, raw and lab-tested.",
      type: "product",
    }),
  },
  {
    id: "prod-umf-24-250g",
    slug: "umf-24-manuka-honey-250g",
    type: "simple",
    name: "UMF 24+ Manuka Honey",
    shortDescription: "Our most concentrated harvest yet - exceptionally rare.",
    description:
      "A once-a-year micro-harvest, UMF 24+ is independently lab-verified for exceptional potency and reserved in extremely limited quantities.",
    sku: "MH-UMF24",
    price: nzd(159.9),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-8", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey jar, UMF 24+" }, { id: "img-8-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey jar, UMF 24+, shown with its lab certificate of analysis" }, { id: "img-8-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey jar, UMF 24+, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("raw-manuka-honey"), byslug("umf-graded")],
    tags: ["umf24", "rare", "limited"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 5.0, count: 12 },
    relatedProductIds: ["prod-umf-20-250g"],
    badges: ["Limited Harvest"],
    seo: createMockSEO({
      path: "/shop/product/umf-24-manuka-honey-250g",
      title: "UMF 24+ Manuka Honey 250g | Pure Summit",
      description: "An exceptionally rare, once-a-year micro-harvest of UMF 24+ Manuka honey.",
      type: "product",
    }),
  },
  {
    id: "prod-discovery-gift-set",
    slug: "discovery-gift-set",
    type: "bundle",
    name: "Discovery Gift Set",
    shortDescription: "Three signature grades, presented in a keepsake box.",
    description:
      "An introduction to our range, the Discovery Gift Set pairs three signature UMF grades in a beautifully finished keepsake box.",
    sku: "MH-GIFT-DISC",
    price: nzd(139.0),
    stockStatus: "IN_STOCK",
    images: [{ id: "img-4", url: "/mocks/product-jar.png", altText: "Pure Summit Manuka Honey Discovery Gift Set" }, { id: "img-4-lab", url: "/mocks/umf-mgo-media.jpg", altText: "Pure Summit Manuka Honey Discovery Gift Set, shown with its lab certificate of analysis" }, { id: "img-4-bloom", url: "/mocks/why-manuka-poster.png", altText: "Pure Summit Manuka Honey Discovery Gift Set, surrounded by Manuka flowers in bloom" }],
    categories: [byslug("gift-sets")],
    tags: ["gift", "bundle"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.8, count: 19 },
    relatedProductIds: ["prod-umf-10-250g", "prod-umf-15-250g", "prod-umf-20-250g"],
    seo: createMockSEO({
      path: "/shop/product/discovery-gift-set",
      title: "Discovery Gift Set | Pure Summit",
      description: "Three signature Manuka honey grades in a keepsake gift box.",
      type: "product",
    }),
  },
];
