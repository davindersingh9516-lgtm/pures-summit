"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/styles/tokens/motion";
import type { OriginTraceabilitySectionData } from "@/types";

type Region = OriginTraceabilitySectionData["regions"][number];
type BatchRecord = OriginTraceabilitySectionData["batchLookup"]["records"][number];
type LookupStatus = "idle" | "loading" | "found" | "not-found";

function RegionPanel({
  region,
  allRegions,
  onSelectRegion,
  onJumpToLookup,
}: {
  region: Region;
  allRegions: Region[];
  onSelectRegion: (id: string) => void;
  onJumpToLookup: () => void;
}) {
  const initials = region.beekeeper
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: duration.normal, ease: easing.editorial }}
      className="flex h-full flex-col gap-6 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-full) bg-gradient-to-br from-(--color-secondary-100) to-(--color-secondary-300) font-(family-name:--font-display) text-sm font-medium text-(--color-secondary-900) ring-1 ring-(--color-secondary-500)/20">
          {initials}
        </div>
        <div>
          <p className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">Beekeeper</p>
          <p className="text-sm font-medium text-(--color-foreground)">{region.beekeeper}</p>
        </div>
      </div>

      <div>
        <h3 className="font-(family-name:--font-display) text-2xl text-(--color-foreground)">{region.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-(--color-foreground-muted)">{region.description}</p>
      </div>

      <dl className="grid grid-cols-2 gap-4 border-t border-(--color-border) pt-5 sm:grid-cols-4">
        <div>
          <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">Harvest</dt>
          <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{region.harvestWindow}</dd>
        </div>
        <div>
          <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">Hives</dt>
          <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{region.hiveCount}</dd>
        </div>
        <div>
          <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">UMF</dt>
          <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{region.umfRange}</dd>
        </div>
        <div>
          <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">MGO</dt>
          <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{region.mgoRange}</dd>
        </div>
      </dl>

      <Button variant="link" size="sm" className="w-fit px-0 text-[#12291d] hover:opacity-80" onClick={onJumpToLookup}>
        See batches from this region
        <Icon name="arrow-right" className="size-4" />
      </Button>

      <div className="mt-auto flex flex-col gap-1 border-t border-(--color-border) pt-5">
        <p className="mb-1 text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">
          All Harvest Regions
        </p>
        {allRegions.map((candidate) => {
          const active = candidate.id === region.id;
          return (
            <button
              key={candidate.id}
              type="button"
              onClick={() => onSelectRegion(candidate.id)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-(--radius-md) px-3 py-2.5 text-left text-sm transition-colors duration-(--duration-fast)",
                active
                  ? "bg-(--color-secondary-50) text-(--color-foreground)"
                  : "text-(--color-foreground-muted) hover:bg-(--color-muted)",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-(--radius-full)",
                    active ? "bg-[#12291d]" : "bg-(--color-border-strong)",
                  )}
                />
                {candidate.name}
              </span>
              <span className="shrink-0 text-xs text-(--color-foreground-muted)">{candidate.umfRange}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function BatchLookup({
  data,
  regions,
  panelId,
}: {
  data: OriginTraceabilitySectionData["batchLookup"];
  regions: Region[];
  panelId: string;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LookupStatus>("idle");
  const [result, setResult] = useState<BatchRecord | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = query.trim().toUpperCase();
    if (!code) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 500));

    const match = data.records.find((record) => record.code.toUpperCase() === code) ?? null;
    setResult(match);
    setStatus(match ? "found" : "not-found");
  }

  const matchedRegion = result ? regions.find((region) => region.id === result.regionId) : undefined;
  const inputId = `${panelId}-input`;

  return (
    <div
      id={panelId}
      className="scroll-mt-24 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) p-6 sm:p-8"
    >
      <h3 className="font-(family-name:--font-display) text-2xl text-(--color-foreground)">{data.heading}</h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-(--color-foreground-muted)">{data.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            {data.inputLabel}
          </label>
          <Input
            id={inputId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={data.placeholder}
            autoComplete="off"
          />
          <p className="mt-1.5 text-xs text-(--color-foreground-muted)">{data.helperText}</p>
        </div>
        <Button
          type="submit"
          disabled={status === "loading" || !query.trim()}
          className="shrink-0 bg-[#12291d] hover:bg-[#12291d] hover:opacity-90"
        >
          {status === "loading" ? (
            <Icon name="loader-2" className="size-4 animate-spin" />
          ) : (
            <Icon name="search" className="size-4" />
          )}
          Verify Batch
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {status === "found" && result ? (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.normal, ease: easing.editorial }}
            className="mt-6 rounded-(--radius-lg) border border-[#12291d]/25 bg-(--color-secondary-50) p-5"
          >
            <div className="flex items-center gap-2 text-[#12291d]">
              <Icon name="badge-check" className="size-5" />
              <span className="text-sm font-semibold tracking-(--tracking-wide) uppercase">Verified Batch</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">
                  Region
                </dt>
                <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{matchedRegion?.name ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">
                  Harvested
                </dt>
                <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{result.harvestDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">UMF</dt>
                <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{result.umf}</dd>
              </div>
              <div>
                <dt className="text-xs text-(--color-foreground-muted) uppercase tracking-(--tracking-wide)">MGO</dt>
                <dd className="mt-1 text-sm font-medium text-(--color-foreground)">{result.mgo}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-(--color-foreground-muted)">
              Verified by {result.lab}
              {result.bestBefore ? ` - best before ${result.bestBefore}` : ""}
            </p>
          </motion.div>
        ) : null}

        {status === "not-found" ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.normal, ease: easing.editorial }}
            className="mt-6 rounded-(--radius-lg) border border-(--color-border) bg-(--color-muted) p-5"
          >
            <p className="text-sm text-(--color-foreground)">{data.notFoundMessage}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * "Origin & Traceability" - an interactive New Zealand map (real,
 * proportionally-accurate coastline paths, not a hand-drawn approximation)
 * with pinned harvest regions, paired with a batch-code lookup. Both read
 * from the same `data.regions` list so they can never show a different
 * region name or story for the same id. All reveals are click/submit
 * triggered (no scroll-position tracking, no absolutely-positioned text
 * without an explicit anchor point) - every pin is placed with `left/top`
 * percentages that map exactly onto the SVG's own viewBox, not eyeballed.
 */
export function OriginTraceabilitySection({ data }: { data: OriginTraceabilitySectionData }) {
  const defaultRegionId = data.regions.find((region) => region.featured)?.id ?? data.regions[0]?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultRegionId);
  const selectedRegion = data.regions.find((region) => region.id === selectedId);

  const [, , vbWidth, vbHeight] = data.map.viewBox.split(" ").map(Number);
  const lookupPanelId = `${data.id}-batch-lookup`;

  function jumpToLookup() {
    document.getElementById(lookupPanelId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Section spacing="md" className="bg-(--color-neutral-50)">
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

        <FadeIn delay={0.1} className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div
            className="relative mx-auto h-[55vh] w-auto max-w-full overflow-hidden rounded-(--radius-xl) border border-(--color-border) bg-(--color-secondary-50) sm:h-[60vh] lg:h-auto lg:w-full lg:max-w-none"
            style={{ aspectRatio: `${vbWidth} / ${vbHeight}` }}
          >
            <svg viewBox={data.map.viewBox} className="absolute inset-0 h-full w-full" aria-hidden>
              <path
                d={data.map.northIslandPath}
                fill="var(--color-secondary-100)"
                stroke="#12291d"
                strokeOpacity={0.45}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={data.map.southIslandPath}
                fill="var(--color-secondary-100)"
                stroke="#12291d"
                strokeOpacity={0.45}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            {data.regions.map((region) => {
              const isActive = region.id === selectedId;
              return (
                <div
                  key={region.id}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(region.id)}
                    aria-pressed={isActive}
                    aria-label={region.name}
                    className="relative flex size-10 items-center justify-center"
                  >
                    {region.featured ? (
                      <span className="absolute inset-0 animate-ping rounded-(--radius-full) bg-[#12291d]/35" />
                    ) : null}
                    <span
                      className={cn(
                        "relative block size-3.5 rounded-(--radius-full) border-2 border-[#12291d] transition-all duration-(--duration-fast)",
                        isActive ? "scale-125 bg-[#12291d] ring-4 ring-[#12291d]/25" : "bg-(--color-neutral-0)",
                        !isActive && selectedId ? "opacity-60" : "opacity-100",
                      )}
                    />
                  </button>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-(--radius-md) bg-(--color-neutral-900) px-2 py-1 text-xs whitespace-nowrap text-(--color-neutral-0) opacity-0 transition-opacity duration-(--duration-fast) group-hover:opacity-100">
                    {region.name}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedRegion ? (
              <RegionPanel
                key={selectedRegion.id}
                region={selectedRegion}
                allRegions={data.regions}
                onSelectRegion={setSelectedId}
                onJumpToLookup={jumpToLookup}
              />
            ) : null}
          </AnimatePresence>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-6">
          <BatchLookup data={data.batchLookup} regions={data.regions} panelId={lookupPanelId} />
        </FadeIn>
      </Container>
    </Section>
  );
}
