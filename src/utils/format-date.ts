/** Formats an ISO date string using a locale-aware, backend-agnostic format.
 * Locale is a parameter (not hardcoded) so it can be sourced from the
 * locale context once multi-language is live. */
export function formatDate(iso: string, locale = "en-NZ"): string {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}
