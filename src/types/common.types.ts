/**
 * Common primitives shared across every domain type. Kept deliberately
 * generic - no business meaning lives here.
 */

export type ID = string;

export type Maybe<T> = T | null | undefined;
export type Nullable<T> = T | null;

/** A single localized string keyed by locale code (multi-language ready). */
export type LocalizedString = Record<string, string>;

export interface Image {
  id: ID;
  url: string;
  altText: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

export interface VideoAsset {
  id: ID;
  url: string;
  poster?: Image;
  caption?: string;
}

export interface Money {
  /** Smallest currency unit amount, e.g. cents, to avoid float math. */
  amount: number;
  currencyCode: string;
  /** Pre-formatted display string as provided by the backend (WooCommerce). */
  formatted: string;
}

export interface Link {
  label: string;
  url: string;
  target?: "_self" | "_blank";
  rel?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
  totalCount?: number;
}

export interface Paginated<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

export interface SlugEntity {
  id: ID;
  slug: string;
}

/** Discriminated-union friendly generic content block, used by the CMS layer
 * for flexible, backend-authored page/section composition (e.g. Gutenberg /
 * ACF Flexible Content blocks surfaced through WPGraphQL). */
export interface ContentBlock<TType extends string = string, TData = unknown> {
  id: ID;
  type: TType;
  order: number;
  data: TData;
}

export type Currency = {
  code: string;
  symbol: string;
  decimalDigits: number;
};

export type Locale = {
  code: string;
  label: string;
  isDefault?: boolean;
};
