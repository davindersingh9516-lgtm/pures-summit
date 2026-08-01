import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  className?: string;
}

/**
 * The shared, centered "eyebrow + heading + subheading" block used at the
 * top of homepage sections - one consistent, premium editorial treatment
 * instead of every section rolling its own header markup.
 */
export function SectionHeading({ eyebrow, heading, subheading, className }: SectionHeadingProps) {
  return (
    <FadeIn className={cn("mx-auto flex max-w-2xl flex-col items-center gap-4 text-center", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-(--tracking-widest) text-(--color-primary) uppercase">
          <span aria-hidden className="h-px w-8 bg-(--color-primary)/40" />
          {eyebrow}
          <span aria-hidden className="h-px w-8 bg-(--color-primary)/40" />
        </span>
      )}
      <h2 className="font-(family-name:--font-display) text-4xl font-semibold text-(--color-foreground) sm:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="max-w-xl text-lg leading-relaxed text-(--color-foreground-muted)">{subheading}</p>
      )}
    </FadeIn>
  );
}
