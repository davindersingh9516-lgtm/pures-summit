import type { ProductCategory } from "@/types";
import { env } from "@/config/env";
import { mapWooSEO, type WPYoastSEO } from "./seo.mapper";

export interface WPCategoryNode {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  count?: number | null;
  image?: { id: string; sourceUrl: string; altText?: string | null } | null;
  parent?: { node?: { id: string } | null } | null;
  seo?: WPYoastSEO | null;
}

export function mapWooCategory(node: WPCategoryNode): ProductCategory {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/shop/category/${node.slug}`;

  return {
    id: node.id,
    slug: node.slug,
    name: node.name,
    description: node.description ?? undefined,
    image: node.image?.sourceUrl
      ? { id: node.image.id, url: node.image.sourceUrl, altText: node.image.altText ?? node.name }
      : undefined,
    parentId: node.parent?.node?.id ?? null,
    productCount: node.count ?? 0,
    seo: mapWooSEO(node.seo, {
      title: `${node.name} | Pure Summit`,
      description: node.description ?? "",
      canonical,
    }),
  };
}
