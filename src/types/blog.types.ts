import type { ID, Image, SlugEntity } from "./common.types";
import type { WithSEO } from "./seo.types";

export interface Author {
  id: ID;
  slug: string;
  name: string;
  avatar?: Image;
  bio?: string;
  jobTitle?: string;
  /** External profile links (LinkedIn, X, etc.) - feeds Person schema's `sameAs`. */
  sameAs?: string[];
}

export interface BlogCategory extends SlugEntity {
  name: string;
}

export interface BlogPost extends SlugEntity, WithSEO {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: Image;
  author: Author;
  categories: BlogCategory[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes?: number;
}
