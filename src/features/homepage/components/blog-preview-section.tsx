import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { getBlogPreview } from "@/services";
import { ROUTES } from "@/constants/routes.constants";
import type { BlogPost, BlogPreviewSectionData } from "@/types";

function formatPublishedDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("en-NZ", { day: "numeric", month: "short" });
}

function BlogCard({ post }: { post: BlogPost }) {
  const category = post.categories[0];

  return (
    <AppLink href={ROUTES.blogPost(post.slug)} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-lg) bg-(--color-muted)">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.altText}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        {category ? (
          <span className="text-xs font-medium tracking-(--tracking-widest) text-(--color-foreground-muted) uppercase">
            {category.name}
          </span>
        ) : null}
        <h3 className="relative w-fit font-(family-name:--font-display) text-base text-(--color-foreground)">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </h3>
        <p className="text-sm text-(--color-foreground-muted)">{formatPublishedDate(post.publishedAt)}</p>
      </div>
    </AppLink>
  );
}

/**
 * "From the Journal" - a simple equal-weight 4-up grid, full width. Fetches
 * its own posts via the homepage service, so it simply disappears once
 * there's nothing to show.
 */
export async function BlogPreviewSection({ data }: { data: BlogPreviewSectionData }) {
  const posts = await getBlogPreview(data.limit ?? 4);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container size="full">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              {data.eyebrow ? (
                <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                  {data.eyebrow}
                </span>
              ) : null}
              <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                {data.heading}
              </h2>
              {data.subheading ? (
                <p className="max-w-2xl text-base leading-relaxed text-(--color-foreground-muted)">
                  {data.subheading}
                </p>
              ) : null}
            </div>

            {data.viewAllUrl ? (
              <AppLink
                href={data.viewAllUrl}
                className="group -my-2 inline-flex w-fit items-center gap-1.5 py-2 text-sm font-medium text-(--color-foreground) hover:text-(--color-secondary)"
              >
                View the Journal
                <Icon name="arrow-right" className="size-4 transition-transform duration-(--duration-normal) group-hover:translate-x-1" />
              </AppLink>
            ) : null}
          </div>
        </FadeIn>

        <Stagger className="mt-10">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  );
}
