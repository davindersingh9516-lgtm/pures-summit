import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { getCollections } from "@/services";
import { ROUTES } from "@/constants/routes.constants";
import type { CollectionGridSectionData } from "@/types";

/**
 * Editorial "curated collections" showcase - a grid of large imagery tiles
 * linking into merchandiser-curated collections. Fetches its own collections
 * via the homepage service, so the section simply disappears (renders
 * nothing) if there are no collections to feature yet.
 */
export async function CollectionGridSection({ data }: { data: CollectionGridSectionData }) {
  const collections = await getCollections();

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container>
        <FadeIn>
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
        </FadeIn>

        <Stagger className="mt-10">
          <Grid cols={{ base: 1, sm: 2, md: 3 }} gap="lg">
            {collections.map((collection) => (
              <StaggerItem key={collection.id}>
                <AppLink href={ROUTES.collection(collection.slug)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-lg) bg-(--color-muted) shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-normal) ease-(--ease-standard) group-hover:shadow-(--shadow-elevation-4)">
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText}
                      fill
                      sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                      <h3 className="font-(family-name:--font-display) text-2xl text-white">{collection.name}</h3>
                      {collection.description ? (
                        <p className="max-w-sm text-sm leading-relaxed text-white/85">{collection.description}</p>
                      ) : null}
                      <span className="mt-1 text-xs font-medium tracking-(--tracking-wider) text-white/70 uppercase">
                        {collection.productCount} {collection.productCount === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
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
