import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Skeleton } from "@/components/ui/skeleton";
import type { HomepageSectionType } from "@/types";

function HeroSkeleton() {
  return (
    <div className="flex h-[85vh] min-h-[560px] w-full flex-col items-center justify-center gap-4 bg-(--color-muted) px-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-12 w-full max-w-2xl" />
      <Skeleton className="h-5 w-full max-w-md" />
      <div className="mt-4 flex gap-3">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  );
}

function MediaTextSkeleton() {
  return (
    <Container className="py-16">
      <Grid cols={{ base: 1, md: 2 }} gap="lg" className="items-center">
        <Skeleton className="aspect-4/5 w-full" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full max-w-sm" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="mt-2 h-11 w-40" />
        </div>
      </Grid>
    </Container>
  );
}

function BannerSkeleton() {
  return (
    <div className="flex h-[420px] w-full flex-col items-center justify-center gap-4 bg-(--color-muted) px-6">
      <Skeleton className="h-9 w-full max-w-xl" />
      <Skeleton className="h-5 w-full max-w-sm" />
      <Skeleton className="mt-2 h-11 w-40" />
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <Container className="py-16">
      <div className="mb-8 flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64" />
      </div>
      <Grid cols={{ base: 2, sm: 2, md: 4 }} gap="md">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </Grid>
    </Container>
  );
}

function GridSkeleton() {
  return (
    <Container className="py-16">
      <div className="mb-8 flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64" />
      </div>
      <Grid cols={{ base: 1, sm: 2, md: 4 }} gap="md">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="aspect-4/5 w-full" />
        ))}
      </Grid>
    </Container>
  );
}

function RowSkeleton() {
  return (
    <Container className="py-12">
      <Grid cols={{ base: 2, md: 4 }} gap="md">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="size-10 rounded-(--radius-full)" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </Grid>
    </Container>
  );
}

function TextBlockSkeleton() {
  return (
    <Container className="flex flex-col items-center gap-3 py-16 text-center">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-9 w-full max-w-md" />
      <Skeleton className="h-4 w-full max-w-lg" />
    </Container>
  );
}

function TableSkeleton() {
  return (
    <Container className="py-16">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <Skeleton className="mx-auto h-9 w-full max-w-md" />
      </div>
      <Skeleton className="h-72 w-full" />
    </Container>
  );
}

function NullSkeleton() {
  return null;
}

const skeletonByType: Record<HomepageSectionType, () => React.ReactElement | null> = {
  hero: HeroSkeleton,
  splitHero: MediaTextSkeleton,
  imageLeft: MediaTextSkeleton,
  imageRight: MediaTextSkeleton,
  fullWidthBanner: BannerSkeleton,
  editorialBlock: MediaTextSkeleton,
  storyBlock: MediaTextSkeleton,
  productCarousel: CarouselSkeleton,
  featuredProducts: CarouselSkeleton,
  categoryCarousel: CarouselSkeleton,
  collectionGrid: GridSkeleton,
  trustIcons: RowSkeleton,
  benefitsGrid: GridSkeleton,
  comparisonTable: TableSkeleton,
  videoSection: BannerSkeleton,
  statistics: RowSkeleton,
  testimonials: TextBlockSkeleton,
  faqPreview: TextBlockSkeleton,
  newsletter: TextBlockSkeleton,
  instagramFeed: GridSkeleton,
  blogPreview: CarouselSkeleton,
  ctaBanner: BannerSkeleton,
  featureCardsMedia: MediaTextSkeleton,
  productFilterGrid: CarouselSkeleton,
  purityPromise: BannerSkeleton,
  harvestProcess: RowSkeleton,
  originTraceability: GridSkeleton,
  contactForm: GridSkeleton,
  spacer: NullSkeleton,
  divider: NullSkeleton,
  customHtml: NullSkeleton,
  futureCustomBlock: NullSkeleton,
};

/** Loading fallback for a homepage section's Suspense boundary - shaped
 * closely enough to the real section to avoid layout shift, not a precise
 * match (the real component owns exact spacing). */
export function SectionSkeleton({ type }: { type: HomepageSectionType }) {
  const Component = skeletonByType[type] ?? NullSkeleton;
  return <Component />;
}
