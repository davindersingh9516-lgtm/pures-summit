import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { RatingStars } from "@/components/global/rating-stars";
import { Icon } from "@/components/icons";
import { getHomepageTestimonials } from "@/services";
import type { Testimonial, TestimonialsSectionData } from "@/types";
import { cn } from "@/lib/utils";

function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-full) bg-gradient-to-br from-(--color-secondary-100) to-(--color-secondary-300) font-(family-name:--font-display) text-sm font-medium text-(--color-secondary-900) ring-1 ring-(--color-secondary-500)/20"
      aria-hidden
    >
      {testimonial.authorName.charAt(0).toUpperCase()}
    </div>
  );
}

/** Short quotes stay compact, longer ones get a wider tile - so the wall
 * reads as curated rather than a uniform grid of identical boxes. */
function getCardSpan(quote: string) {
  return quote.length < 70 ? "md:col-span-1" : "md:col-span-2";
}

function TestimonialTile({ testimonial, hero = false }: { testimonial: Testimonial; hero?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6",
        hero && "sm:p-8",
      )}
    >
      {hero ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 -left-2 font-(family-name:--font-display) text-8xl text-(--color-secondary-900)/10 select-none"
        >
          &ldquo;
        </span>
      ) : null}

      <div className="relative flex flex-col gap-3">
        {testimonial.rating !== undefined ? <RatingStars value={testimonial.rating} showCount={false} /> : null}
        <blockquote
          className={cn(
            "font-(family-name:--font-display) text-(--color-foreground) italic",
            hero ? "text-xl sm:text-2xl" : "text-base",
          )}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <div className="relative flex items-center gap-3">
        <TestimonialAvatar testimonial={testimonial} />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-(--color-foreground)">{testimonial.authorName}</span>
          {testimonial.authorTitle ? (
            <span className="truncate text-xs text-(--color-foreground-muted)">{testimonial.authorTitle}</span>
          ) : null}
        </div>
        {testimonial.video ? (
          <span className="ml-auto inline-flex items-center gap-1 rounded-(--radius-full) bg-(--color-accent) px-2.5 py-1 text-[11px] font-medium tracking-(--tracking-wide) text-(--color-accent-foreground) uppercase">
            <Icon name="play" className="size-3" />
            Watch
          </span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * "Loved By Customers" - an asymmetric bento wall (one hero tile sized by a
 * data-driven `featured` flag, the rest bucketed by quote length) instead of
 * a carousel or a uniform 3-up grid. Fetches its own testimonials via the
 * homepage service, so it simply disappears once there's nothing to show.
 */
export async function TestimonialsSection({ data }: { data: TestimonialsSectionData }) {
  const testimonials = await getHomepageTestimonials();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const heroTestimonial = testimonials.find((testimonial) => testimonial.featured) ?? testimonials[0];
  const restTestimonials = testimonials.filter((testimonial) => testimonial.id !== heroTestimonial.id);

  return (
    <Section spacing="md" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 100% 0%, transparent 0, transparent 50px, #12291d 51px, #12291d 52px)",
        }}
      />

      <Container size="full" className="relative">
        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            {data.eyebrow ? (
              <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {data.heading}
            </h2>
            {data.subheading ? (
              <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.subheading}</p>
            ) : null}
          </div>
        </FadeIn>

        <Stagger className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-flow-row-dense md:auto-rows-[minmax(180px,auto)] md:grid-cols-4">
            <StaggerItem className="sm:col-span-2 md:row-span-2">
              <TestimonialTile testimonial={heroTestimonial} hero />
            </StaggerItem>
            {restTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id} className={getCardSpan(testimonial.quote)}>
                <TestimonialTile testimonial={testimonial} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
