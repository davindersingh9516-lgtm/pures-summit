import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Pagination } from "@/components/ui/pagination";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site.config";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { getBlogPosts } from "@/services";
import { BlogCategoryPills } from "@/features/blog/components/blog-category-pills";
import { BlogPostCard } from "@/features/blog/components/blog-post-card";
import type { BlogCategory } from "@/types";

function getBlogListSEO() {
  return createMockSEO({
    path: "/blog",
    title: "The Journal | Pure Summit",
    description: "Harvest notes, grading guides, and life at the apiary - stories from Pure Summit's Northland groves.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getBlogListSEO());
}

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const rawSearchParams = await searchParams;
  const categoryParam = Array.isArray(rawSearchParams.category) ? rawSearchParams.category[0] : rawSearchParams.category;
  const pageParam = Array.isArray(rawSearchParams.page) ? rawSearchParams.page[0] : rawSearchParams.page;
  const page = Math.max(1, Number(pageParam) || 1);

  const [allPosts, result] = await Promise.all([
    getBlogPosts({ perPage: 999 }),
    getBlogPosts({ categorySlug: categoryParam, page }),
  ]);

  const categories: BlogCategory[] = [];
  const seenCategorySlugs = new Set<string>();
  allPosts.nodes.forEach((post) => {
    post.categories.forEach((category) => {
      if (!seenCategorySlugs.has(category.slug)) {
        seenCategorySlugs.add(category.slug);
        categories.push(category);
      }
    });
  });

  const totalCount = result.pageInfo.totalCount ?? result.nodes.length;
  const perPage = siteConfig.pagination.blogPostsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  const [featuredPost, ...restPosts] = result.nodes;
  const showFeatured = page === 1 && Boolean(featuredPost);

  function buildPageHref(targetPage: number) {
    const params = new URLSearchParams();
    if (categoryParam) params.set("category", categoryParam);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  }

  return (
    <>
      <JsonLd graph={getBlogListSEO().jsonLd} />

      <Section spacing="sm" className="relative overflow-hidden border-b border-(--color-border) bg-(--color-secondary-50)">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] opacity-[0.08] lg:block"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 85% 50%, transparent 0, transparent 42px, var(--color-primary) 43px, var(--color-primary) 44px)",
          }}
        />
        <Container size="full" className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Journal" }]} />
            <h1 className="font-(family-name:--font-display) text-4xl text-(--color-foreground) sm:text-5xl">
              The Journal
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-(--color-foreground-muted)">
              Harvest notes, grading guides, and life at the apiary - stories from our Northland groves.
            </p>
          </div>
          <div className="relative mx-auto hidden aspect-4/3 w-full max-w-md sm:block">
            <div
              aria-hidden
              className="absolute -inset-6 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 30px, var(--color-primary) 31px, var(--color-primary) 32px)",
              }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-(--radius-xl) shadow-(--shadow-elevation-3)">
              <Image
                src="/mocks/why-manuka-poster.png"
                alt="A jar of Pure Summit Manuka honey surrounded by Manuka flowers in bloom"
                fill
                priority
                sizes="(min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          {categories.length > 0 ? (
            <Suspense fallback={<Skeleton className="mx-auto h-10 w-full max-w-md" />}>
              <BlogCategoryPills categories={categories} />
            </Suspense>
          ) : null}

          {result.nodes.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-2 rounded-(--radius-xl) border border-dashed border-(--color-border) py-20 text-center">
              <p className="font-(family-name:--font-display) text-xl text-(--color-foreground)">No stories yet</p>
              <p className="text-sm text-(--color-foreground-muted)">Check back soon, or browse another category.</p>
            </div>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {showFeatured ? (
                  <div className="sm:col-span-2">
                    <BlogPostCard post={featuredPost} variant="wide" />
                  </div>
                ) : null}
                {(showFeatured ? restPosts : result.nodes).map((post) => (
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
