import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { ShopListing, parseShopSearchParams, toURLSearchParams, type ShopSearchParams } from "@/features/shop";
import { getCategory, getProductFilters, getProducts } from "@/services";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<ShopSearchParams>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return buildMetadata(category.seo);
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const rawSearchParams = await searchParams;
  const parsed = parseShopSearchParams(rawSearchParams);

  const [productsResult, filters] = await Promise.all([
    getProducts({
      page: parsed.page,
      categorySlug: category.slug,
      tags: parsed.grades,
      maxPrice: parsed.maxPrice,
      search: parsed.search,
      sortBy: parsed.sort,
    }),
    getProductFilters(category.slug),
  ]);

  return (
    <ShopListing
      breadcrumbItems={[{ label: "Home", url: "/" }, { label: "Shop", url: "/shop" }, { label: category.name }]}
      heading={category.name}
      description={category.description}
      image={category.image}
      filters={filters}
      productsResult={productsResult}
      currentPage={parsed.page}
      pathname={`/shop/category/${category.slug}`}
      searchParams={toURLSearchParams(rawSearchParams)}
      showCategoryFilter={false}
    />
  );
}
