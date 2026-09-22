import type { Author, BlogCategory, BlogPost } from "@/types";
import { env } from "@/config/env";
import { mapWooSEO, type WPYoastSEO } from "./seo.mapper";

interface WPImageNode {
  id: string;
  sourceUrl: string;
  altText?: string | null;
}

interface WPAuthorNode {
  id: string;
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  avatar?: { url?: string | null } | null;
}

interface WPBlogCategoryNode {
  id: string;
  databaseId: number;
  slug: string;
  name?: string | null;
}

export interface WPBlogPostNode {
  id: string;
  databaseId: number;
  slug: string;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  modified?: string | null;
  featuredImage?: { node?: WPImageNode | null } | null;
  author?: { node?: WPAuthorNode | null } | null;
  categories?: { nodes: WPBlogCategoryNode[] } | null;
  tags?: { nodes: { slug: string }[] } | null;
  seo?: WPYoastSEO | null;
}

const FALLBACK_IMAGE = { id: "blog-fallback", url: "/mocks/hero-1.webp", altText: "Pure Summit" };

function mapAuthor(node: WPAuthorNode | null | undefined): Author {
  // WordPress core `User` has no `jobTitle`/`sameAs` fields - those would
  // need a custom ACF field group on the user profile, which isn't
  // configured on pure-summit yet. Left undefined until it is.
  return {
    id: node?.id ?? "unknown-author",
    slug: node?.slug ?? "unknown",
    name: node?.name ?? "Pure Summit",
    avatar: node?.avatar?.url ? { id: `${node.id}-avatar`, url: node.avatar.url, altText: node.name ?? "" } : undefined,
    bio: node?.description ?? undefined,
  };
}

function mapCategory(node: WPBlogCategoryNode): BlogCategory {
  return { id: node.id, slug: node.slug, name: node.name ?? node.slug };
}

/** WordPress doesn't compute reading time - approximated client-side from
 * word count (225 wpm average) since there's no ACF field for it. */
function estimateReadingTime(html: string | null | undefined): number | undefined {
  if (!html) return undefined;
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  if (!words) return undefined;
  return Math.max(1, Math.round(words / 225));
}

export function mapWooBlogPost(node: WPBlogPostNode): BlogPost {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/blog/${node.slug}`;
  const title = node.title ?? "";

  return {
    id: node.id,
    slug: node.slug,
    title,
    excerpt: (node.excerpt ?? "").replace(/<[^>]+>/g, "").trim(),
    content: node.content ?? "",
    featuredImage: node.featuredImage?.node?.sourceUrl
      ? {
          id: node.featuredImage.node.id,
          url: node.featuredImage.node.sourceUrl,
          altText: node.featuredImage.node.altText || title,
        }
      : FALLBACK_IMAGE,
    author: mapAuthor(node.author?.node),
    categories: (node.categories?.nodes ?? []).map(mapCategory),
    tags: (node.tags?.nodes ?? []).map((tag) => tag.slug),
    publishedAt: node.date ?? new Date().toISOString(),
    updatedAt: node.modified ?? node.date ?? new Date().toISOString(),
    readingTimeMinutes: estimateReadingTime(node.content),
    seo: mapWooSEO(node.seo, {
      title: `${title} | Pure Summit`,
      description: (node.excerpt ?? "").replace(/<[^>]+>/g, "").trim(),
      canonical,
      type: "article",
    }),
  };
}
