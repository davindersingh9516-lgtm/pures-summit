import type { Page } from "@/types";
import { env } from "@/config/env";
import { mapWooSEO, type WPYoastSEO } from "./seo.mapper";

export interface WPPageNode {
  id: string;
  slug: string;
  title?: string | null;
  content?: string | null;
  modified?: string | null;
  seo?: WPYoastSEO | null;
}

/** No ACF Flexible Content field group exists on pure-summit for generic
 * pages - `content` (rendered Gutenberg HTML) is wrapped into a single
 * `rich-text` block so the `Page.blocks` contract is still satisfied
 * without inventing a plugin/field group nobody configured. */
export function mapWooPage(node: WPPageNode): Page {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${node.slug}`;
  const title = node.title ?? "";

  return {
    id: node.id,
    slug: node.slug,
    title,
    updatedAt: node.modified ?? new Date().toISOString(),
    blocks: node.content
      ? [{ id: `${node.id}-content`, type: "rich-text", order: 1, data: { html: node.content } }]
      : [],
    seo: mapWooSEO(node.seo, {
      title: `${title} | Pure Summit`,
      description: "",
      canonical,
    }),
  };
}
