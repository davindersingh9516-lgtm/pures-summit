"use client";

import { useEffect, useState } from "react";
import type { AnnouncementBarData } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";

export function AnnouncementBar({ data }: { data: AnnouncementBarData }) {
  const t = useTranslations();
  const [dismissed, setDismissed] = useLocalStorage("announcement-dismissed", false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!data.autoRotateSeconds || data.items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.items.length);
    }, data.autoRotateSeconds * 1000);

    return () => clearInterval(interval);
  }, [data.autoRotateSeconds, data.items.length]);

  if (!data.enabled || data.items.length === 0 || dismissed) return null;

  const activeItem = data.items[activeIndex % data.items.length];

  return (
    <div className="relative bg-(--color-neutral-900) text-(--color-neutral-50)">
      <Container className="flex items-center justify-center gap-2 py-2.5 text-center text-sm">
        <div key={activeItem.id} className="flex items-center gap-2 animate-in fade-in duration-(--duration-slow)">
          {activeItem.icon && <Icon name={activeItem.icon} className="size-4 shrink-0" aria-hidden />}
          <span>{activeItem.message}</span>
          {activeItem.url && activeItem.ctaLabel && (
            <AppLink href={activeItem.url} className="font-medium underline underline-offset-4 hover:no-underline">
              {activeItem.ctaLabel}
            </AppLink>
          )}
        </div>

        {data.items.length > 1 && (
          <div className="ml-2 hidden items-center gap-1.5 sm:flex" role="tablist" aria-label="Announcements">
            {data.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show announcement ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "size-1.5 rounded-(--radius-full) transition-colors",
                  index === activeIndex ? "bg-(--color-neutral-50)" : "bg-(--color-neutral-50)/30",
                )}
              />
            ))}
          </div>
        )}
      </Container>

      {data.dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t("dismiss")}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-(--radius-sm) p-1 text-(--color-neutral-50)/70 transition-colors hover:text-(--color-neutral-50) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-neutral-50)"
        >
          <Icon name="x" className="size-4" />
        </button>
      )}
    </div>
  );
}
