import type { Locale } from "@/types";

/**
 * MOCK DATA - stands in for a WPML/Polylang-exposed language list via
 * WPGraphQL. Only one locale exists today; the type/UI already support many.
 */
export const mockLanguages: Locale[] = [{ code: "en-NZ", label: "English (New Zealand)", isDefault: true }];
