import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site.config";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { getBlogPosts } from "@/services";
import { BlogPostCard } from "@/features/blog/components/blog-post-card";
import type { BlogCategory } from "@/types";

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * There's no dedicated "resolve a blog category by slug" repository method
 * (unlike WooCommerce product categories, which have their own
 * `categoryRepository.getCategory()`) - blog categories are only ever
 * discovered as a side effect of the posts that carry them, same as
 * `/blog`'s own category pills. Reusing `getBlogPosts({ categorySlug })`
 * here (rather than inventing a new service call) also doubles as the
 * "does this category exist" check: no matching post means no category to
 * show, so the route 404s instead of rendering an empty page for a typo'd
 * slug.
 */
async function resolveCategory(slug: string): Promise<BlogCategory | null> {
  const result = await getBlogPosts({ categorySlug: slug, perPage: 1 });
  return result.nodes[0]?.categories.find((category) => category.slug === slug) ?? null;
}

/** No Yoast config exists for taxonomy archives beyond a category's own
 * `seo` field on the WooCommerce product-category side; WordPress core
 * `Category` nodes carry `seo` too, but resolving it needs the category's
 * own slug lookup we're deliberately not adding a repository method for
 * (see `resolveCategory`) - a constructed fallback, consistent with how
 * `/blog` and `/lab-reports` already build their own SEO via
 * `createMockSEO`, keeps this route working without a wider interface
 * change. */
function getCategorySEO(category: BlogCategory) {
  return createMockSEO({
    path: `/blog/category/${category.slug}`,
    title: `${category.name} | The Journal | Pure Summit`,
    description: `Harvest notes, grading guides, and life at the apiary - stories from the ${category.name} category.`,
  });
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await resolveCategory(slug);
  if (!category) return {};
  return buildMetadata(getCategorySEO(category));
}

export default async function BlogCategoryPage({ params, searchParams }: BlogCategoryPageProps) {
  const { slug } = await params;
  const category = await resolveCategory(slug);

  if (!category) {
    notFound();
  }

  const rawSearchParams = await searchParams;
  const pageParam = Array.isArray(rawSearchParams.page) ? rawSearchParams.page[0] : rawSearchParams.page;
  const page = Math.max(1, Number(pageParam) || 1);

  const result = await getBlogPosts({ categorySlug: slug, page });
  const totalCount = result.pageInfo.totalCount ?? result.nodes.length;
  const perPage = siteConfig.pagination.blogPostsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const seo = getCategorySEO(category);

  function buildPageHref(targetPage: number) {
    const urlParams = new URLSearchParams();
    if (targetPage > 1) urlParams.set("page", String(targetPage));
    const query = urlParams.toString();
    return query ? `/blog/category/${slug}?${query}` : `/blog/category/${slug}`;
  }

  return (
    <>
      <JsonLd graph={seo.jsonLd} />

      <Section spacing="sm" className="border-b border-(--color-border) bg-(--color-secondary-50)">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Journal", url: "/blog" }, { label: category.name }]} />
          <h1 className="font-(family-name:--font-display) text-4xl text-(--color-foreground) sm:text-5xl">{category.name}</h1>
          <p className="max-w-lg text-base leading-relaxed text-(--color-foreground-muted)">
            Harvest notes, grading guides, and life at the apiary - stories filed under {category.name}.
          </p>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          {result.nodes.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-(--radius-xl) border border-dashed border-(--color-border) py-20 text-center">
              <p className="font-(family-name:--font-display) text-xl text-(--color-foreground)">No stories yet</p>
              <p className="text-sm text-(--color-foreground-muted)">Check back soon, or browse another category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {result.nodes.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              <Pagination currentPage={page} totalPages={totalPages} buildHref={buildPageHref} className="mt-16" />
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
