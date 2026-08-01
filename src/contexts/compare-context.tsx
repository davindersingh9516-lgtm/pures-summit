"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { CompareItem } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

const MAX_COMPARE_ITEMS = 4;

interface CompareContextValue {
  items: CompareItem[];
  isHydrated: boolean;
  isFull: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems, isHydrated] = useLocalStorage<CompareItem[]>("compare", []);

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      isHydrated,
      isFull: items.length >= MAX_COMPARE_ITEMS,
      has: (productId) => items.some((item) => item.productId === productId),
      toggle: (productId) => {
        setItems((prev) => {
          if (prev.some((item) => item.productId === productId)) {
            return prev.filter((item) => item.productId !== productId);
          }
          if (prev.length >= MAX_COMPARE_ITEMS) return prev;
          return [...prev, { id: `compare-${productId}`, productId, addedAt: new Date().toISOString() }];
        });
      },
      clear: () => setItems([]),
    }),
    [items, isHydrated, setItems],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
}
