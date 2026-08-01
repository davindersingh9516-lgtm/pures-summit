"use client";

import { useLocale } from "@/contexts/locale-context";
import { defaultLocaleKey, messages, type LocaleKey, type MessageKey } from "@/lib/i18n/messages";

function isKnownLocale(value: string): value is LocaleKey {
  return value in messages;
}

/**
 * Resolves UI chrome microcopy for the active locale (see
 * `lib/i18n/messages.ts`), falling back to `defaultLocaleKey` if the
 * current `LocaleContext` locale has no translation table yet.
 */
export function useTranslations() {
  const { locale } = useLocale();
  const table = messages[isKnownLocale(locale) ? locale : defaultLocaleKey];

  return (key: MessageKey): string => table[key];
}
