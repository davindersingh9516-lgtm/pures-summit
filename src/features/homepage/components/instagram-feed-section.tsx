import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { getInstagramFeed } from "@/services";
import type { InstagramFeedSectionData } from "@/types";

/**
 * Shoppable-style Instagram grid - fetches its own posts via the homepage
 * service, so it simply disappears (renders nothing) once there's nothing to
 * show. Each tile links out to the live post and reveals its caption/likes
 * on hover.
 */
export async function InstagramFeedSection({ data }: { data: InstagramFeedSectionData }) {
  const posts = await getInstagramFeed();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            {data.eyebrow ? (
              <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {data.eyebrow}
              </span>
            ) : null}
            {data.heading ? (
              <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                {data.heading}
              </h2>
            ) : null}
          </div>

          {data.handle ? (
            <span className="text-sm font-medium tracking-(--tracking-wide) text-(--color-foreground-muted)">
              {data.handle}
            </span>
          ) : null}
        </div>

        <Stagger className="mt-10">
          <Grid cols={{ base: 2, sm: 3, md: 6 }} gap="sm">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <AppLink
                  href={post.permalink}
                  className="group relative block aspect-square overflow-hidden rounded-(--radius-md) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
                >
                  <Image
                    src={post.image.url}
                    alt={post.image.altText}
                    fill
                    sizes="(min-width: 768px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-(--color-foreground)/0 p-3 opacity-0 transition-opacity duration-(--duration-normal) ease-(--ease-standard) group-hover:bg-(--color-foreground)/60 group-hover:opacity-100">
                    {post.caption ? (
                      <p className="line-clamp-2 text-xs leading-snug text-(--color-background)">{post.caption}</p>
                    ) : null}
                    {post.likeCount !== undefined ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-(--color-background)">
                        <Icon name="heart" className="size-3" />
                        {post.likeCount}
                      </span>
                    ) : null}
                  </div>
                </AppLink>
              </StaggerItem>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  );
}
