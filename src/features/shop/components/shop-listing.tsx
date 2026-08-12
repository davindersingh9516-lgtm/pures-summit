import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site.config";
import type { BreadcrumbItem, Image as ImageType, Paginated, Product, ProductListFilters } from "@/types";
import { ShopFiltersSidebar } from "./shop-filters-sidebar";
import { ShopHeaderBanner } from "./shop-header-banner";
import { ShopPaginationNav } from "./shop-pagination-nav";
import { ShopProductGrid } from "./shop-product-grid";
import { ShopToolbar } from "./shop-toolbar";

/** Shared composer behind both `/shop` and `/shop/category/[slug]` - the two
 * routes differ only in header copy, breadcrumb, and whether the category
 * filter group makes sense to show (redundant once the route already scopes
 * to one category). */
export function ShopListing({
  breadcrumbItems,
  heading,
  description,
  image,
  filters,
  productsResult,
  currentPage,
  pathname,
  searchParams,
  showCategoryFilter = true,
}: {
  breadcrumbItems: BreadcrumbItem[];
  heading: string;
  description?: string;
  image?: ImageType;
  filters: ProductListFilters;
  productsResult: Paginated<Product>;
  currentPage: number;
  pathname: string;
  searchParams: URLSearchParams;
  showCategoryFilter?: boolean;
}) {
  const totalCount = productsResult.pageInfo.totalCount ?? productsResult.nodes.length;
  const perPage = siteConfig.pagination.productsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  return (
    <>
      <ShopHeaderBanner breadcrumbItems={breadcrumbItems} heading={heading} description={description} image={image} />

      <Section spacing="md">
        <Container size="full">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <Suspense fallback={<Skeleton className="h-96 w-full max-w-[260px]" />}>
              <ShopFiltersSidebar filters={filters} showCategoryFilter={showCategoryFilter} />
            </Suspense>

            <div className="min-w-0 flex-1">
              <Suspense fallback={<Skeleton className="h-10 w-full" />}>
                <ShopToolbar currentCount={productsResult.nodes.length} totalCount={totalCount} />
              </Suspense>

              <div className="mt-8">
                <ShopProductGrid products={productsResult.nodes} />
              </div>

              <ShopPaginationNav
                currentPage={currentPage}
                totalPages={totalPages}
                pathname={pathname}
                searchParams={searchParams}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
