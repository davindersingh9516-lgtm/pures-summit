import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppLink } from "@/components/global/app-link";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { formatDate } from "@/utils/format-date";
import { getAllBlogPostSlugs, getBlogPost, getBlogPosts, getFooter, getRelatedBlogPosts } from "@/services";
import { BlogArticleBody } from "@/features/blog/components/blog-article-body";
import { BlogPaginationNav } from "@/features/blog/components/blog-pagination-nav";
import { BlogPostSidebar } from "@/features/blog/components/blog-post-sidebar";
import { CopyLinkButton } from "@/features/blog/components/copy-link-button";
import { RelatedBlogPosts } from "@/features/blog/components/related-blog-posts";
import { parseBlogHeadings, splitBlogContentSegments } from "@/features/blog/utils/parse-blog-content";
import { ROUTES } from "@/constants/routes.constants";
import type { BreadcrumbItem } from "@/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return buildMetadata(post.seo);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const [related, footer, allPosts] = await Promise.all([
    getRelatedBlogPosts(post.id),
    getFooter(),
    getBlogPosts({ perPage: 999 }),
  ]);

  const sortedPosts = [...allPosts.nodes].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const currentIndex = sortedPosts.findIndex((candidate) => candidate.id === post.id);
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const { html, headings } = parseBlogHeadings(post.content);
  const segments = splitBlogContentSegments(html);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", url: "/" },
    { label: "Journal", url: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd graph={post.seo.jsonLd} />

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
            <Breadcrumb items={breadcrumbItems} />

            {post.categories.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="w-fit rounded-(--radius-sm) bg-(--color-neutral-0) px-2.5 py-1 text-[10px] font-bold tracking-(--tracking-wider) text-(--color-neutral-900) uppercase shadow-(--shadow-elevation-1)"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            ) : null}

            <h1 className="font-(family-name:--font-display) text-4xl text-(--color-foreground) sm:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-foreground-muted)">
              <AppLink href={ROUTES.blogAuthor(post.author.slug)} className="font-medium text-(--color-foreground) hover:text-(--color-secondary)">
                By {post.author.name}
              </AppLink>
              <span aria-hidden>&middot;</span>
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTimeMinutes ? (
                <>
                  <span aria-hidden>&middot;</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </>
              ) : null}
              <span aria-hidden>&middot;</span>
              <CopyLinkButton />
            </div>
          </div>

          <div className="relative hidden aspect-4/3 w-full sm:block">
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
                src={post.featuredImage.url}
                alt={post.featuredImage.altText}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
            <div className="w-full">
              <BlogArticleBody segments={segments} newsletter={footer.newsletter} />
              <BlogPaginationNav prevPost={prevPost} nextPost={nextPost} className="mt-16" />
            </div>

            <BlogPostSidebar headings={headings} />
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section spacing="md" className="border-t border-(--color-border)">
          <Container size="full">
            <RelatedBlogPosts posts={related} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
