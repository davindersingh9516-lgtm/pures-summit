import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { ShopListing, parseShopSearchParams, toURLSearchParams, type ShopSearchParams } from "@/features/shop";
import { getProductFilters, getProducts } from "@/services";

function getShopListSEO() {
  return createMockSEO({
    path: "/shop",
    title: "Shop All | Pure Summit",
    description: "Browse the full range of raw, lab-tested New Zealand Manuka honey - by grade, by collection, or by gift set.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getShopListSEO());
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const rawSearchParams = await searchParams;
  const parsed = parseShopSearchParams(rawSearchParams);

  const [productsResult, filters] = await Promise.all([
    getProducts({
      page: parsed.page,
      categorySlugs: parsed.categorySlugs,
      tags: parsed.grades,
      maxPrice: parsed.maxPrice,
      search: parsed.search,
      sortBy: parsed.sort,
    }),
    getProductFilters(),
  ]);

  return (
    <>
      <JsonLd graph={getShopListSEO().jsonLd} />
      <ShopListing
        breadcrumbItems={[{ label: "Home", url: "/" }, { label: "Shop" }]}
        heading="Shop All"
        description="Raw, single-origin Manuka honey - every jar lab-tested and traceable back to its harvest."
        filters={filters}
        productsResult={productsResult}
        currentPage={parsed.page}
        pathname="/shop"
        searchParams={toURLSearchParams(rawSearchParams)}
      />
    </>
  );
}
