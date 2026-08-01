"use client";

import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { duration, easing } from "@/styles/tokens/motion";
import type { ProcessStepsSectionData } from "@/types";

type Step = ProcessStepsSectionData["steps"][number];

/** Icon circle with its step number badged on the corner - the badge sits on
 * the circle rather than stacked above it, so the circle is always the first
 * fixed-height element in its column regardless of title/description length,
 * which is what lets the connector line below be positioned with plain math
 * instead of guessing at rendered text height. */
function StepMarker({ number, icon }: { number: string; icon: Step["icon"] }) {
  return (
    <div className="relative flex size-16 shrink-0 items-center justify-center rounded-(--radius-full) border-2 border-[#12291d] bg-(--color-secondary-50)">
      <Icon name={icon} className="size-6 text-[#12291d]" />
      <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-(--radius-full) bg-[#12291d] font-(family-name:--font-mono) text-[0.65rem] font-semibold text-(--color-neutral-0)">
        {number}
      </span>
    </div>
  );
}

/**
 * "Harvesting Process" - a numbered step timeline from hive to bottle.
 * Desktop: a horizontal row of steps with a connector line that fills in
 * segment-by-segment as each step scrolls into view. Mobile: the same steps
 * stacked vertically with a per-row connector that stretches via flexbox
 * (not a fixed pixel offset), so it stays correct no matter how long each
 * step's description runs. Both use viewport-triggered reveals only - no
 * scroll-position tracking, no absolutely-positioned text that could overlap.
 */
export function ProcessStepsSection({ data }: { data: ProcessStepsSectionData }) {
  const stepCount = data.steps.length || 1;

  return (
    <Section spacing="md">
      <Container size="full">
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

        {/* Desktop: horizontal timeline. Column i's center sits at ((i+0.5)/stepCount)*100%
            in an N-column equal-width grid, so the background line spans center-of-first
            to center-of-last (50/stepCount % inset each side) and every fill segment lines
            up with the two circles it connects - exact, not eyeballed. */}
        <div className="relative mt-16 hidden lg:block">
          <div
            aria-hidden
            className="absolute top-8 h-px bg-(--color-border)"
            style={{ left: `${50 / stepCount}%`, right: `${50 / stepCount}%` }}
          />
          {data.steps.slice(0, -1).map((step, index) => (
            <motion.div
              key={step.id}
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: duration.slow, delay: index * 0.12 + 0.15, ease: easing.editorial }}
              className="absolute top-8 h-px origin-left bg-[#12291d]"
              style={{ left: `${((index + 0.5) / stepCount) * 100}%`, width: `${(1 / stepCount) * 100}%` }}
            />
          ))}
          <Stagger>
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}>
              {data.steps.map((step) => (
                <StaggerItem key={step.id}>
                  <div className="flex flex-col items-center gap-4 px-4 text-center">
                    <StepMarker number={step.number} icon={step.icon} />
                    <h3 className="font-medium text-(--color-foreground)">{step.title}</h3>
                    <p className="text-sm text-(--color-foreground-muted)">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>

        {/* Mobile/tablet: vertical timeline. Each row's connector is a flex-1
            filler inside that row's own left column, so it stretches to match
            whatever height the row's text ends up needing - no fixed offsets. */}
        <Stagger className="mt-12 lg:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-10">
            {data.steps.map((step, index) => (
              <StaggerItem key={step.id}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <StepMarker number={step.number} icon={step.icon} />
                    {index < data.steps.length - 1 ? (
                      <div aria-hidden className="mt-2 w-px flex-1 bg-(--color-border)" />
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1 pb-2">
                    <h3 className="font-medium text-(--color-foreground)">{step.title}</h3>
                    <p className="text-sm text-(--color-foreground-muted)">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        {data.closingNote ? (
          <FadeIn delay={0.1} className="mt-12 text-center">
            <p className="mx-auto max-w-xl text-base text-(--color-foreground-muted)">{data.closingNote}</p>
          </FadeIn>
        ) : null}
      </Container>
    </Section>
  );
}
