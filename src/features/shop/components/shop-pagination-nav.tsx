import { Pagination } from "@/components/ui/pagination";

export function ShopPaginationNav({
  currentPage,
  totalPages,
  pathname,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  pathname: string;
  searchParams: URLSearchParams;
}) {
  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  return <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} className="mt-12" />;
}
