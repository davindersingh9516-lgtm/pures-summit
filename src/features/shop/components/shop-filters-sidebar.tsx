"use client";

import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShopFiltersContent } from "./shop-filters-content";
import type { ProductListFilters } from "@/types";

export function ShopFiltersSidebar({
  filters,
  showCategoryFilter = true,
}: {
  filters: ProductListFilters;
  showCategoryFilter?: boolean;
}) {
  return (
    <>
      <aside className="hidden w-full max-w-[260px] shrink-0 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <ShopFiltersContent filters={filters} showCategoryFilter={showCategoryFilter} />
      </aside>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="md" className="gap-2">
              <Icon name="sliders-horizontal" className="size-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto p-0">
            <SheetHeader className="pt-8">
              <SheetTitle className="sr-only">Filter Products</SheetTitle>
            </SheetHeader>
            <div className="px-5 pb-6">
              <ShopFiltersContent filters={filters} showCategoryFilter={showCategoryFilter} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
