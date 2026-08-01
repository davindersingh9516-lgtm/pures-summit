"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const MAX_RECENT_SEARCHES = 6;

/**
 * Per-visitor recent search terms - deliberately client-only (localStorage),
 * never a repository. See `types/search.types.ts` for why this is excluded
 * from `SearchSuggestions`.
 */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("recent-searches", []);

  const addRecentSearch = useCallback(
    (term: string) => {
      const normalized = term.trim();
      if (!normalized) return;
      setRecentSearches((prev) =>
        [normalized, ...prev.filter((existing) => existing.toLowerCase() !== normalized.toLowerCase())].slice(
          0,
          MAX_RECENT_SEARCHES,
        ),
      );
    },
    [setRecentSearches],
  );

  const clearRecentSearches = useCallback(() => setRecentSearches([]), [setRecentSearches]);

  return { recentSearches, addRecentSearch, clearRecentSearches };
}
