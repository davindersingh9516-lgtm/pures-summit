"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { PurityPromiseSectionData } from "@/types";

// Jar silhouette (SVG viewBox 200x320) - one continuous tapered path (the
// shoulder curves into the neck via cubic beziers) instead of stacked
// rectangles, so the honey narrows realistically as it rises into the neck.
const JAR_BODY_PATH =
  "M 39,305 L 161,305 Q 175,305 175,291 L 175,185 C 175,152 162,122 135,115 L 135,80 C 135,74 140,73 140,68 C 140,64 133,64 128,64 L 72,64 C 67,64 60,64 60,68 C 60,73 65,74 65,80 L 65,115 C 38,122 25,152 25,185 L 25,291 Q 25,305 39,305 Z";
const LID_PATH = "M 52,78 L 52,63 Q 52,55 60,55 L 140,55 Q 148,55 148,63 L 148,78 Z";
const JAR_FILL = { x: 25, width: 150, top: 64, bottom: 305 };

// scrollYProgress at which the jar finishes filling, the last proof point
// locks in, and the closing line begins - all three land on this same value
// so the payoff is synchronized and nothing sits idle waiting for the others.
const FILL_END = 0.88;
// scrollYProgress at which the first proof point starts revealing (headline
// and watermark run their own quick intro fade before this, independently).
const POINTS_START = 0.05;
// Proof points live between these two vertical bands so they never collide
// with the pinned headline (top) or the closing line (bottom).
const SLOT_TOP_PCT = 26;
const SLOT_BOTTOM_PCT = 76;

function JarGlyph({ fillProgress }: { fillProgress: MotionValue<number> }) {
  const fillY = useTransform(fillProgress, [0, 1], [JAR_FILL.bottom, JAR_FILL.top]);
  const fillHeight = useTransform(fillProgress, [0, 1], [0, JAR_FILL.bottom - JAR_FILL.top]);

  return (
    <svg viewBox="0 0 200 320" className="h-[42vh] w-auto sm:h-[50vh] lg:h-[55vh]" aria-hidden>
      <defs>
        <linearGradient id="purity-honey-gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-600)" />
          <stop offset="50%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-300)" />
        </linearGradient>
        <linearGradient id="purity-glass-highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="purity-lid-bevel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.1} />
          <stop offset="18%" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="82%" stopColor="#000000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.18} />
        </linearGradient>
        <clipPath id="purity-jar-body-clip">
          <path d={JAR_BODY_PATH} />
        </clipPath>
        <clipPath id="purity-lid-clip">
          <path d={LID_PATH} />
        </clipPath>
      </defs>

      {/* Contact shadow */}
      <ellipse cx={100} cy={308} rx={72} ry={10} fill="var(--color-neutral-900)" opacity={0.12} />

      {/* Rising honey, clipped to the true tapered silhouette so it narrows into the neck as it climbs */}
      <g clipPath="url(#purity-jar-body-clip)">
        <motion.rect x={JAR_FILL.x} width={JAR_FILL.width} y={fillY} height={fillHeight} fill="url(#purity-honey-gradient)" />
        <path
          d="M 60,195 C 55,228 55,262 62,288 C 66,289 70,260 68,228 C 67,208 65,197 60,195 Z"
          fill="url(#purity-glass-highlight)"
        />
      </g>

      <path d={JAR_BODY_PATH} fill="none" stroke="var(--color-primary)" strokeOpacity={0.25} strokeWidth={2} />

      <path d={LID_PATH} fill="var(--color-neutral-900)" />
      <g clipPath="url(#purity-lid-clip)">
        <rect x={52} y={55} width={96} height={23} fill="url(#purity-lid-bevel)" />
      </g>
      <path d={LID_PATH} fill="none" stroke="var(--color-primary)" strokeOpacity={0.25} strokeWidth={2} />
    </svg>
  );
}

function ProofPointLabel({
  text,
  side,
  topPercent,
  windowStart,
  windowEnd,
  scrollYProgress,
}: {
  text: string;
  side: "left" | "right";
  topPercent: number;
  windowStart: number;
  windowEnd: number;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [windowStart, windowEnd], [0, 1]);
  const x = useTransform(scrollYProgress, [windowStart, windowEnd], [side === "left" ? -24 : 24, 0]);

  return (
    <motion.p
      style={{ opacity, x, top: `${topPercent}%` }}
      className={cn(
        "absolute max-w-[15rem] text-base leading-relaxed text-(--color-neutral-0)/90 sm:text-lg",
        side === "left" ? "left-4 text-right sm:left-10 lg:left-[8%]" : "right-4 text-left sm:right-10 lg:right-[8%]",
      )}
    >
      {text}
    </motion.p>
  );
}

/** Desktop/tablet: a pinned, scroll-linked jar that fills with honey as the
 * visitor scrolls through a tall inner track. Every proof point gets its own
 * fixed vertical slot (grouped left/right, evenly spaced) so points never
 * overlap even though they all stay visible once revealed - and each point's
 * reveal window starts exactly where the previous one's ends, so the section
 * is always animating something between the first point and the close. */
function ScrollytellingPurityPromise({ data }: { data: PurityPromiseSectionData }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const fillProgress = useTransform(scrollYProgress, [0, FILL_END], [0, 1]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const closingOpacity = useTransform(scrollYProgress, [FILL_END, 1], [0, 1]);
  const closingY = useTransform(scrollYProgress, [FILL_END, 1], [16, 0]);

  const pointCount = data.proofPoints.length || 1;
  // Last threshold lands exactly on FILL_END - zero gap into the close.
  const thresholds = data.proofPoints.map(
    (_, index) => POINTS_START + ((index + 1) / pointCount) * (FILL_END - POINTS_START),
  );
  const leftCount = data.proofPoints.filter((_, index) => index % 2 === 0).length;
  const rightCount = data.proofPoints.filter((_, index) => index % 2 !== 0).length;

  let leftSlot = 0;
  let rightSlot = 0;

  return (
    <div ref={trackRef} className="relative hidden h-[240vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-(--color-neutral-900)">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 120%, transparent 0, transparent 60px, var(--color-primary) 61px, var(--color-primary) 62px)",
          }}
        />
        <motion.span
          aria-hidden
          style={{ opacity: watermarkOpacity }}
          className="pointer-events-none absolute font-(family-name:--font-display) text-[38vh] font-semibold text-(--color-neutral-0)/[0.05] select-none"
        >
          100%
        </motion.span>

        <motion.h2
          style={{ opacity: headlineOpacity }}
          className="absolute top-16 max-w-lg px-6 text-center font-(family-name:--font-display) text-3xl text-(--color-neutral-0) sm:text-4xl"
        >
          {data.headline}
        </motion.h2>

        <JarGlyph fillProgress={fillProgress} />

        {data.proofPoints.map((point, index) => {
          const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
          const sideCount = side === "left" ? leftCount : rightCount;
          const slot = side === "left" ? leftSlot++ : rightSlot++;
          const topPercent = SLOT_TOP_PCT + ((slot + 1) / (sideCount + 1)) * (SLOT_BOTTOM_PCT - SLOT_TOP_PCT);
          const windowStart = index === 0 ? POINTS_START : thresholds[index - 1];

          return (
            <ProofPointLabel
              key={point.id}
              text={point.text}
              side={side}
              topPercent={topPercent}
              windowStart={windowStart}
              windowEnd={thresholds[index]}
              scrollYProgress={scrollYProgress}
            />
          );
        })}

        <motion.div
          style={{ opacity: closingOpacity, y: closingY }}
          className="absolute bottom-14 flex flex-col items-center gap-2 px-6 text-center"
        >
          <p className="font-(family-name:--font-display) text-xl text-(--color-neutral-0) sm:text-2xl">
            {data.closingLine}
          </p>
          {data.batchLabel && (
            <p className="font-(family-name:--font-mono) text-xs tracking-(--tracking-wide) text-(--color-neutral-0)/60 uppercase">
              {data.batchLabel}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/** Mobile, and anyone with `prefers-reduced-motion`: no pinning, no
 * scroll-linked fill - a static full jar with the same content revealed as
 * a simple fade-in list instead. */
function StaticPurityPromise({ data }: { data: PurityPromiseSectionData }) {
  const fullProgress = useMotionValue(1);

  return (
    <div className="bg-(--color-neutral-900) py-20 lg:hidden">
      <Container size="content">
        <FadeIn className="flex flex-col items-center gap-8 text-center">
          <h2 className="font-(family-name:--font-display) text-3xl text-(--color-neutral-0)">{data.headline}</h2>
          <JarGlyph fillProgress={fullProgress} />
        </FadeIn>

        <Stagger className="mt-10">
          <ul className="mx-auto flex max-w-md flex-col gap-4">
            {data.proofPoints.map((point) => (
              <StaggerItem key={point.id}>
                <li className="text-center text-base text-(--color-neutral-0)/90">{point.text}</li>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>

        <FadeIn className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="font-(family-name:--font-display) text-xl text-(--color-neutral-0)">{data.closingLine}</p>
          {data.batchLabel && (
            <p className="font-(family-name:--font-mono) text-xs tracking-(--tracking-wide) text-(--color-neutral-0)/60 uppercase">
              {data.batchLabel}
            </p>
          )}
        </FadeIn>
      </Container>
    </div>
  );
}

/**
 * "Purity Promise" - deliberately unlike every other homepage section: a
 * single jar that fills with honey as the visitor scrolls, with proof points
 * locking into their own fixed slot as the fill passes each threshold.
 * Renders the full pinned scrollytelling version on large screens; a static,
 * non-pinned version on mobile/tablet and for `prefers-reduced-motion` (the
 * scroll-linked version still mounts its hooks either way - hooks can't be
 * called conditionally - but visually only one variant is ever visible).
 */
export function PurityPromiseSection({ data }: { data: PurityPromiseSectionData }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticPurityPromise data={data} />;
  }

  return (
    <section aria-label={data.headline}>
      <ScrollytellingPurityPromise data={data} />
      <StaticPurityPromise data={data} />
    </section>
  );
}
