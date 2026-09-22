import type { Money, Product } from "@/types";
import { mockCategories } from "./categories.mock";
import { createMockSEO } from "./seo.mock";

function nzd(amount: number): Money {
  return { amount: Math.round(amount * 100), currencyCode: "NZD", formatted: `$${amount.toFixed(2)}` };
}

const byslug = (slug: string) => mockCategories.find((c) => c.slug === slug)!;

/** Single-jar RRPs. Multi-jar packs are priced off these so the struck-through
 * "was" figure on a pack card always equals the sum of its parts. */
const PRICE_250G = 39.9;
const PRICE_500G = 69.9;

/** Shared spec sheet. Every jar is the same honey - MGO 263+ - so only the
 * pack size and net weight change between entries. */
function honeySpecs(input: { netWeight: string; contents?: string }) {
  return [
    ...(input.contents ? [{ label: "Contents", value: input.contents }] : []),
    { label: "Grade", value: "MGO 263+" },
    { label: "MGO (Methylglyoxal)", value: "263+ mg/kg, independently lab-verified" },
    { label: "Net Weight", value: input.netWeight },
    { label: "Ingredients", value: "100% Raw New Zealand Manuka Honey" },
    { label: "Harvest Region", value: "Northland, New Zealand" },
    { label: "Extraction Method", value: "Cold-extracted, unpasteurised" },
    { label: "Packaging", value: "Glass jar, tamper-evident seal" },
    { label: "Country of Origin", value: "New Zealand" },
    { label: "Shelf Life", value: "24 months unopened, stored in a cool, dry place" },
    { label: "Diet Suitability", value: "Gluten-free, non-GMO" },
  ];
}

/** Product photography is shared across the range - the honey is identical,
 * only the jar size differs - so image sets are built rather than repeated. */
function honeyImages(idPrefix: string, subject: string) {
  return [
    { id: `${idPrefix}-jar`, url: "/mocks/product-jar.png", altText: `Pure Summit ${subject}` },
    {
      id: `${idPrefix}-lab`,
      url: "/mocks/mgo-media.jpg",
      altText: `Pure Summit ${subject}, shown with its lab certificate of analysis`,
    },
    {
      id: `${idPrefix}-bloom`,
      url: "/mocks/why-manuka-poster.png",
      altText: `Pure Summit ${subject}, surrounded by Manuka flowers in bloom`,
    },
  ];
}

/**
 * MOCK DATA - stands in for a WooGraphQL `products` query. Every field
 * mirrors what WooCommerce/WooGraphQL exposes so the repository swap later
 * is a pure data-mapping exercise.
 *
 * The catalogue is deliberately one honey in two jar sizes, plus multi-jar
 * packs built from those two sizes. Packs carry `price` as the sum of their
 * parts and `salePrice` as the pack price, which is what renders the
 * struck-through saving on product cards.
 */
export const mockProducts: Product[] = [
  {
    id: "prod-mgo-263-250g",
    slug: "mgo-263-manuka-honey-250g",
    type: "simple",
    name: "MGO 263+ Manuka Honey 250g",
    shortDescription: "Our signature raw Manuka honey, cold-extracted and lab-verified at MGO 263+.",
    description:
      "Harvested from remote Northland groves and cold-extracted to preserve its natural enzymes, our MGO 263+ Manuka Honey is independently lab-tested so the number on the jar is a measured result, not a marketing claim. The 250g jar is the everyday size - enough for a daily spoonful through the season.",
    sku: "PS-MGO263-250",
    price: nzd(PRICE_250G),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-250g", "MGO 263+ Manuka Honey, 250g jar"),
    categories: [byslug("raw-manuka-honey"), byslug("mgo-graded")],
    tags: ["mgo263", "everyday", "raw"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.8, count: 128 },
    relatedProductIds: ["prod-mgo-263-500g", "prod-mgo-263-duo-250g", "prod-mgo-263-mixed-duo"],
    badges: ["Best Seller"],
    specifications: honeySpecs({ netWeight: "250g" }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-manuka-honey-250g",
      title: "MGO 263+ Manuka Honey 250g | Pure Summit",
      description: "Raw, cold-extracted MGO 263+ Manuka honey in a 250g jar. Independently lab-tested for guaranteed potency.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-263-500g",
    slug: "mgo-263-manuka-honey-500g",
    type: "simple",
    name: "MGO 263+ Manuka Honey 500g",
    shortDescription: "The same signature MGO 263+ honey in our better-value 500g jar.",
    description:
      "The identical raw, cold-extracted MGO 263+ Manuka honey as our 250g jar, in a larger format that works out cheaper per gram. Independently lab-tested batch by batch, with the certificate of analysis published against the batch code on the label.",
    sku: "PS-MGO263-500",
    price: nzd(PRICE_500G),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-500g", "MGO 263+ Manuka Honey, 500g jar"),
    categories: [byslug("raw-manuka-honey"), byslug("mgo-graded")],
    tags: ["mgo263", "everyday", "raw", "best-value"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.9, count: 86 },
    relatedProductIds: ["prod-mgo-263-250g", "prod-mgo-263-duo-500g", "prod-mgo-263-family-trio"],
    badges: ["Best Value"],
    specifications: honeySpecs({ netWeight: "500g" }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-manuka-honey-500g",
      title: "MGO 263+ Manuka Honey 500g | Pure Summit",
      description: "Raw, cold-extracted MGO 263+ Manuka honey in a 500g jar. Better value per gram, independently lab-tested.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-263-duo-250g",
    slug: "mgo-263-twin-pack-250g",
    type: "bundle",
    name: "MGO 263+ Twin Pack - 2 x 250g",
    shortDescription: "Two 250g jars at a lower price than buying them separately.",
    description:
      "Two 250g jars of our signature MGO 263+ Manuka honey. The easiest way to keep one jar in the kitchen and one at work - or to split a delivery with someone else - at a better price than two single jars.",
    sku: "PS-MGO263-2X250",
    price: nzd(PRICE_250G * 2),
    salePrice: nzd(71.9),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-duo-250", "MGO 263+ Manuka Honey twin pack, two 250g jars"),
    categories: [byslug("value-packs"), byslug("mgo-graded")],
    tags: ["mgo263", "pack", "raw"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.8, count: 34 },
    relatedProductIds: ["prod-mgo-263-250g", "prod-mgo-263-mixed-duo", "prod-mgo-263-duo-500g"],
    badges: ["Save $7.90"],
    specifications: honeySpecs({ contents: "2 x 250g jars - MGO 263+", netWeight: "500g total" }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-twin-pack-250g",
      title: "MGO 263+ Manuka Honey Twin Pack - 2 x 250g | Pure Summit",
      description: "Two 250g jars of raw MGO 263+ Manuka honey, priced lower than buying them separately.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-263-mixed-duo",
    slug: "mgo-263-mixed-pack-500g-250g",
    type: "bundle",
    name: "MGO 263+ Mixed Pack - 500g + 250g",
    shortDescription: "A 500g jar for home and a 250g jar to take with you.",
    description:
      "One 500g jar and one 250g jar of our signature MGO 263+ Manuka honey. The large jar stays in the pantry, the smaller one travels - both from the same lab-verified harvest, at a lower combined price.",
    sku: "PS-MGO263-500-250",
    price: nzd(PRICE_500G + PRICE_250G),
    salePrice: nzd(99.9),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-mixed-duo", "MGO 263+ Manuka Honey mixed pack, one 500g and one 250g jar"),
    categories: [byslug("value-packs"), byslug("mgo-graded")],
    tags: ["mgo263", "pack", "raw"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.9, count: 27 },
    relatedProductIds: ["prod-mgo-263-500g", "prod-mgo-263-250g", "prod-mgo-263-family-trio"],
    badges: ["Save $9.90"],
    specifications: honeySpecs({ contents: "1 x 500g jar + 1 x 250g jar - MGO 263+", netWeight: "750g total" }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-mixed-pack-500g-250g",
      title: "MGO 263+ Manuka Honey Mixed Pack - 500g + 250g | Pure Summit",
      description: "A 500g and a 250g jar of raw MGO 263+ Manuka honey, bundled at a lower combined price.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-263-duo-500g",
    slug: "mgo-263-twin-pack-500g",
    type: "bundle",
    name: "MGO 263+ Twin Pack - 2 x 500g",
    shortDescription: "A full kilogram of MGO 263+ honey, at our lowest price per gram.",
    description:
      "Two 500g jars of our signature MGO 263+ Manuka honey - a full kilogram, and the best price per gram we offer. Built for households that go through a jar a month, or anyone who would rather order twice a year than every six weeks.",
    sku: "PS-MGO263-2X500",
    price: nzd(PRICE_500G * 2),
    salePrice: nzd(125.9),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-duo-500", "MGO 263+ Manuka Honey twin pack, two 500g jars"),
    categories: [byslug("value-packs"), byslug("mgo-graded")],
    tags: ["mgo263", "pack", "raw", "best-value"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 4.9, count: 41 },
    relatedProductIds: ["prod-mgo-263-500g", "prod-mgo-263-family-trio", "prod-mgo-263-mixed-duo"],
    badges: ["Save $13.90"],
    specifications: honeySpecs({ contents: "2 x 500g jars - MGO 263+", netWeight: "1kg total" }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-twin-pack-500g",
      title: "MGO 263+ Manuka Honey Twin Pack - 2 x 500g | Pure Summit",
      description: "Two 500g jars of raw MGO 263+ Manuka honey - a full kilogram at our best price per gram.",
      type: "product",
    }),
  },
  {
    id: "prod-mgo-263-family-trio",
    slug: "mgo-263-family-pack",
    type: "bundle",
    name: "MGO 263+ Family Pack - 2 x 500g + 250g",
    shortDescription: "Our largest pack: 1.25kg of MGO 263+ honey across three jars.",
    description:
      "Two 500g jars and one 250g jar of our signature MGO 263+ Manuka honey - 1.25kg in total, and the largest saving in the range. All three jars come from the same lab-verified harvest, with the certificate of analysis published against their batch code.",
    sku: "PS-MGO263-FAM",
    price: nzd(PRICE_500G * 2 + PRICE_250G),
    salePrice: nzd(159.9),
    stockStatus: "IN_STOCK",
    images: honeyImages("img-family", "MGO 263+ Manuka Honey family pack, two 500g jars and one 250g jar"),
    categories: [byslug("value-packs"), byslug("mgo-graded")],
    tags: ["mgo263", "pack", "raw", "best-value"],
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: 5.0, count: 19 },
    relatedProductIds: ["prod-mgo-263-duo-500g", "prod-mgo-263-500g", "prod-mgo-263-mixed-duo"],
    badges: ["Biggest Saving"],
    specifications: honeySpecs({
      contents: "2 x 500g jars + 1 x 250g jar - MGO 263+",
      netWeight: "1.25kg total",
    }),
    seo: createMockSEO({
      path: "/shop/product/mgo-263-family-pack",
      title: "MGO 263+ Manuka Honey Family Pack - 2 x 500g + 250g | Pure Summit",
      description: "1.25kg of raw MGO 263+ Manuka honey across three jars, at the largest saving in our range.",
      type: "product",
    }),
  },
];
