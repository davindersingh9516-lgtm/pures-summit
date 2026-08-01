"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { WishlistItem } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface WishlistContextValue {
  items: WishlistItem[];
  isHydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems, isHydrated] = useLocalStorage<WishlistItem[]>("wishlist", []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      isHydrated,
      has: (productId) => items.some((item) => item.productId === productId),
      toggle: (productId) => {
        setItems((prev) =>
          prev.some((item) => item.productId === productId)
            ? prev.filter((item) => item.productId !== productId)
            : [...prev, { id: `wishlist-${productId}`, productId, addedAt: new Date().toISOString() }],
        );
      },
      clear: () => setItems([]),
    }),
    [items, isHydrated, setItems],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
