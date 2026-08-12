import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { env } from "@/config/env";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { getBlogPosts } from "@/services";
import { BlogPostCard } from "@/features/blog/components/blog-post-card";
import type { Author, BreadcrumbItem } from "@/types";

function buildPersonJsonLd(author: Author, path: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}${path}`;
  return {
    "@context": "https://schema.org" as const,
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: author.name,
        url,
        ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
        ...(author.bio ? { description: author.bio } : {}),
        ...(author.sameAs && author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
      },
    ],
  };
}

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function generateStaticParams() {
  const allPosts = await getBlogPosts({ perPage: 999 });
  const seenSlugs = new Set<string>();
  const slugs: { slug: string }[] = [];
  allPosts.nodes.forEach((post) => {
    if (!seenSlugs.has(post.author.slug)) {
      seenSlugs.add(post.author.slug);
      slugs.push({ slug: post.author.slug });
    }
  });
  return slugs;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const allPosts = await getBlogPosts({ perPage: 999 });
  const authorPosts = allPosts.nodes.filter((post) => post.author.slug === slug);
  if (authorPosts.length === 0) return {};

  const author = authorPosts[0].author;
  return buildMetadata(
    createMockSEO({
      path: `/blog/author/${slug}`,
      title: `${author.name} | Pure Summit Journal`,
      description: author.bio ?? `Articles by ${author.name} on Pure Summit's Journal.`,
      type: "profile",
    }),
  );
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const allPosts = await getBlogPosts({ perPage: 999 });
  const authorPosts = allPosts.nodes.filter((post) => post.author.slug === slug);

  if (authorPosts.length === 0) {
    notFound();
  }

  const author = authorPosts[0].author;
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", url: "/" },
    { label: "Journal", url: "/blog" },
    { label: author.name },
  ];

  return (
    <>
      <JsonLd graph={buildPersonJsonLd(author, `/blog/author/${slug}`)} />

      <Section spacing="sm" className="relative overflow-hidden border-b border-(--color-border) bg-(--color-secondary-50)">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] opacity-[0.08] lg:block"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 85% 50%, transparent 0, transparent 42px, var(--color-primary) 43px, var(--color-primary) 44px)",
          }}
        />
        <Container size="full" className="relative flex flex-col items-center gap-5 py-6 text-center">
          <Breadcrumb items={breadcrumbItems} className="self-start" />

          <span className="flex size-24 shrink-0 items-center justify-center rounded-(--radius-full) bg-gradient-to-br from-(--color-secondary-100) to-(--color-secondary-300) font-(family-name:--font-display) text-3xl font-medium text-(--color-secondary-900) ring-4 ring-(--color-neutral-0)">
            {initialsFor(author.name)}
          </span>

          <div className="flex flex-col gap-2">
            <h1 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {author.name}
            </h1>
            {author.jobTitle ? (
              <span className="text-sm font-medium tracking-(--tracking-wide) text-[#12291d] uppercase">
                {author.jobTitle}
              </span>
            ) : null}
            {author.bio ? (
              <p className="max-w-xl text-base leading-relaxed text-(--color-foreground-muted)">{author.bio}</p>
            ) : null}
          </div>

          <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
            {authorPosts.length} {authorPosts.length === 1 ? "article" : "articles"}
          </span>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {authorPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
