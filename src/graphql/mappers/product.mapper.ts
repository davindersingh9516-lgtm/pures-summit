import type {
  Image,
  Money,
  Product,
  ProductAttribute,
  ProductSpecification,
  ProductType,
  ProductVariant,
  StockStatus,
} from "@/types";
import { env } from "@/config/env";
import { mapWooCategory, type WPCategoryNode } from "./category.mapper";
import { mapWooSEO, type WPYoastSEO } from "./seo.mapper";

interface WPImageNode {
  id: string;
  sourceUrl: string;
  altText?: string | null;
}

interface WPProductAttributeNode {
  id: string;
  name: string;
  label?: string | null;
  options?: (string | null)[] | null;
  variation?: boolean | null;
}

interface WPVariationAttributeNode {
  name: string;
  value?: string | null;
}

interface WPVariationNode {
  id: string;
  databaseId: number;
  name?: string | null;
  sku?: string | null;
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  stockStatus?: string | null;
  stockQuantity?: number | null;
  image?: WPImageNode | null;
  attributes?: { nodes: WPVariationAttributeNode[] } | null;
}

/** Card-level product node - what `ProductCardFields` selects. */
export interface WPProductCardNode {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  type?: string | null;
  sku?: string | null;
  shortDescription?: string | null;
  image?: WPImageNode | null;
  galleryImages?: { nodes: WPImageNode[] } | null;
  productCategories?: { nodes: WPCategoryNode[] } | null;
  productTags?: { nodes: { slug: string }[] } | null;
  averageRating?: number | null;
  reviewCount?: number | null;
  price?: string | null;
  formattedPrice?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
  stockStatus?: string | null;
  seo?: WPYoastSEO | null;
}

/** Detail-level product node - what `ProductDetailFields` selects (superset of the card shape). */
export interface WPProductDetailNode extends WPProductCardNode {
  description?: string | null;
  specifications?: { specifications?: string | null } | null;
  attributes?: { nodes: WPProductAttributeNode[] } | null;
  variations?: { nodes: WPVariationNode[] } | null;
  related?: { nodes: WPProductCardNode[] } | null;
}

function toMoney(raw: string | null | undefined, formatted: string | null | undefined): Money {
  const amount = raw ? Math.round(parseFloat(raw) * 100) : 0;
  return {
    amount: Number.isFinite(amount) ? amount : 0,
    currencyCode: env.NEXT_PUBLIC_STORE_CURRENCY,
    formatted: formatted ?? "",
  };
}

/** WooGraphQL's `price` is the ACTIVE price - already the sale price when a
 * product is on sale - so mapping it straight onto `Product.price` would leave
 * price === salePrice and silently hide the struck-through saving on cards.
 * `regularPrice` is the "was" figure the UI actually needs, with `price` kept
 * as the fallback for products that have never carried a regular price. */
function toRegularMoney(node: {
  price?: string | null;
  regularPrice?: string | null;
  formattedPrice?: string | null;
}): Money {
  if (node.regularPrice) {
    return toMoney(node.regularPrice, `$${parseFloat(node.regularPrice).toFixed(2)}`);
  }
  return toMoney(node.price, node.formattedPrice ?? (node.price ? `$${parseFloat(node.price).toFixed(2)}` : undefined));
}

function toStockStatus(status: string | null | undefined): StockStatus {
  if (status === "OUT_OF_STOCK" || status === "ON_BACKORDER") return status;
  return "IN_STOCK";
}

function toProductType(type: string | null | undefined): ProductType {
  if (type === "VARIABLE") return "variable";
  if (type === "SIMPLE") return "simple";
  // WooCommerce has no native "bundle" type - GROUPED/EXTERNAL fall back here
  // since our ProductType union only models what this store actually sells.
  return "bundle";
}

function toImage(node: WPImageNode | null | undefined, fallbackAlt: string): Image | undefined {
  if (!node?.sourceUrl) return undefined;
  return { id: node.id, url: node.sourceUrl, altText: node.altText || fallbackAlt };
}

function slugifyValue(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function mapAttributes(nodes: WPProductAttributeNode[] | undefined): ProductAttribute[] {
  if (!nodes?.length) return [];
  return nodes.map((attr) => ({
    id: attr.id,
    name: attr.label || attr.name,
    values: (attr.options ?? []).filter((option): option is string => Boolean(option)).map((option) => ({
      id: `${slugifyValue(attr.name)}-${slugifyValue(option)}`,
      name: option,
    })),
  }));
}

function mapVariants(
  nodes: WPVariationNode[] | undefined,
  attributeLabels: Map<string, string>,
): ProductVariant[] {
  if (!nodes?.length) return [];
  return nodes.map((variation) => {
    const selections: Record<string, string> = {};
    for (const attr of variation.attributes?.nodes ?? []) {
      if (!attr.value) continue;
      const label = attributeLabels.get(attr.name) ?? attr.name;
      selections[label] = `${slugifyValue(attr.name)}-${slugifyValue(attr.value)}`;
    }

    return {
      id: variation.id,
      sku: variation.sku ?? "",
      price: toRegularMoney(variation),
      salePrice: variation.salePrice ? toMoney(variation.salePrice, undefined) : undefined,
      stockStatus: toStockStatus(variation.stockStatus),
      image: toImage(variation.image, variation.name ?? ""),
      selections,
    };
  });
}

function parseSpecifications(raw: string | null | undefined): ProductSpecification[] | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    return parsed.filter(
      (entry): entry is ProductSpecification =>
        typeof entry === "object" && entry !== null && "label" in entry && "value" in entry,
    );
  } catch {
    return undefined;
  }
}

function collectImages(node: WPProductCardNode): Image[] {
  const seen = new Set<string>();
  const images: Image[] = [];
  const candidates = [node.image, ...(node.galleryImages?.nodes ?? [])];
  for (const candidate of candidates) {
    const image = toImage(candidate, node.name);
    if (!image || seen.has(image.id)) continue;
    seen.add(image.id);
    images.push(image);
  }
  return images;
}

/** Maps a card-level node. Detail-only fields required by the `Product`
 * type (description, attributes, variants, relatedProductIds) get cheap
 * empty defaults here - list views never render them, and re-fetching
 * detail data for every card in a grid would be wasteful. */
export function mapWooProductCard(node: WPProductCardNode): Product {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/shop/product/${node.slug}`;

  return {
    id: node.id,
    slug: node.slug,
    type: toProductType(node.type),
    name: node.name,
    shortDescription: node.shortDescription ?? "",
    description: "",
    sku: node.sku ?? "",
    price: toRegularMoney(node),
    salePrice: node.salePrice ? toMoney(node.salePrice, undefined) : undefined,
    stockStatus: toStockStatus(node.stockStatus),
    images: collectImages(node),
    categories: (node.productCategories?.nodes ?? []).map(mapWooCategory),
    tags: (node.productTags?.nodes ?? []).map((tag) => tag.slug),
    attributes: [],
    variants: [],
    reviewSummary: { averageRating: node.averageRating ?? 0, count: node.reviewCount ?? 0 },
    relatedProductIds: [],
    seo: mapWooSEO(node.seo, {
      title: `${node.name} | Pure Summit`,
      description: node.shortDescription ?? "",
      canonical,
      type: "product",
    }),
  };
}

export function mapWooProductDetail(node: WPProductDetailNode): Product {
  const card = mapWooProductCard(node);
  const attributes = mapAttributes(node.attributes?.nodes);
  const attributeLabels = new Map(attributes.map((attr) => [slugifyValue(attr.name), attr.name]));
  // variation.attributes.name comes back lowercase (e.g. "size"); match it
  // back to the human label (e.g. "Size") via the slugified key.
  for (const attr of node.attributes?.nodes ?? []) {
    attributeLabels.set(attr.name, attr.label || attr.name);
  }

  return {
    ...card,
    description: node.description ?? "",
    attributes,
    variants: mapVariants(node.variations?.nodes, attributeLabels),
    relatedProductIds: (node.related?.nodes ?? []).map((related) => related.id),
    specifications: parseSpecifications(node.specifications?.specifications),
  };
}
