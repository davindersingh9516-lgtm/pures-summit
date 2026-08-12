"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type BlogTocHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

const INDENT_BY_LEVEL: Record<BlogTocHeading["level"], string> = {
  2: "pl-3",
  3: "pl-[1.5rem]",
  4: "pl-[2.25rem]",
};

export function BlogToc({ headings }: { headings: BlogTocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="flex flex-col gap-1 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface-raised) p-5">
      <span className="text-xs font-medium uppercase tracking-(--tracking-wider) text-(--color-foreground-muted)">
        On this page
      </span>
      <nav className="flex flex-col gap-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(event) => handleClick(event, heading.id)}
              className={cn(
                "border-l-2 py-1 text-sm transition-colors duration-(--duration-fast)",
                INDENT_BY_LEVEL[heading.level],
                isActive
                  ? "border-[#12291d] font-bold text-[#12291d]"
                  : "border-transparent text-(--color-foreground-muted) hover:text-(--color-foreground)",
              )}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
