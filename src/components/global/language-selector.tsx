"use client";

import type { Locale } from "@/types";
import { useLocale } from "@/contexts/locale-context";
import { useTranslations } from "@/hooks/use-translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/icons";

/** Renders whatever locales `SiteSettings`/`getLanguages()` returns -
 * hidden entirely when there's only one, since there's nothing to switch. */
export function LanguageSelector({ languages }: { languages: Locale[] }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  if (languages.length <= 1) return null;

  const current = languages.find((item) => item.code === locale) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("language")}
        className="flex items-center gap-1.5 text-sm text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring)"
      >
        <Icon name="globe" className="size-4" />
        {current.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((item) => (
          <DropdownMenuItem key={item.code} onSelect={() => setLocale(item.code)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
