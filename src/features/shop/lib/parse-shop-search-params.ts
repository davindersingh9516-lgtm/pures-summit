import type { ProductListParams } from "@/repositories/interfaces";

export interface ParsedShopSearchParams {
  categorySlugs: string[];
  grades: string[];
  maxPrice?: number;
  search?: string;
  sort?: NonNullable<ProductListParams["sortBy"]>;
  page: number;
}

export type ShopSearchParams = Record<string, string | string[] | undefined>;

type SortValue = NonNullable<ProductListParams["sortBy"]>;

const VALID_SORTS: readonly SortValue[] = ["price-asc", "price-desc", "newest", "rating"];

function isValidSort(value: string): value is SortValue {
  return (VALID_SORTS as readonly string[]).includes(value);
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Converts Next's raw `searchParams` object into a real `URLSearchParams`
 * (preserving repeated keys like `category`/`grade`) - used by server
 * components that need to build "same filters, different page" links. */
export function toURLSearchParams(searchParams: ShopSearchParams): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    toArray(value).forEach((item) => params.append(key, item));
  }
  return params;
}

/** Single place that turns the shop page's raw `searchParams` into typed
 * filter/sort/pagination state - both the page (for data fetching) and the
 * filter UI (for reading "what's currently active") read through this. */
export function parseShopSearchParams(searchParams: ShopSearchParams): ParsedShopSearchParams {
  const sortRaw = first(searchParams.sort);
  const pageRaw = first(searchParams.page);
  const maxPriceRaw = first(searchParams.maxPrice);
  const searchRaw = first(searchParams.q);

  const page = Math.max(1, Number(pageRaw) || 1);
  const maxPrice = maxPriceRaw !== undefined ? Number(maxPriceRaw) : undefined;

  return {
    categorySlugs: toArray(searchParams.category),
    grades: toArray(searchParams.grade),
    maxPrice: maxPrice !== undefined && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    search: searchRaw || undefined,
    sort: sortRaw && isValidSort(sortRaw) ? sortRaw : undefined,
    page,
  };
}
