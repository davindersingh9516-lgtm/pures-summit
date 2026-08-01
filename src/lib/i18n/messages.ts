/**
 * MULTI-LANGUAGE ARCHITECTURE - UI chrome microcopy
 * ---------------------------------------------------------------------------
 * This is NOT business content (that's 100% backend-driven - see
 * repositories/services). It's the small set of UI-chrome strings every
 * shell component needs (button labels, aria-labels) that would otherwise
 * end up hardcoded English inside JSX. Keyed by locale so
 * `hooks/use-translations.ts` can resolve the active locale from
 * `LocaleContext` - today there's only `en-NZ`, but adding a second locale
 * is additive here, not a UI rewrite.
 */
export const messages = {
  "en-NZ": {
    skipToContent: "Skip to content",
    search: "Search",
    searchPlaceholder: "Search products, categories, articles…",
    searchRecent: "Recent searches",
    searchPopular: "Popular searches",
    searchTrendingProducts: "Trending products",
    searchSuggestedCategories: "Shop by category",
    searchSuggestedArticles: "From the journal",
    searchEmptyTitle: "No results yet",
    searchEmptyDescription: "Try a different search term.",
    searchClearRecent: "Clear",
    cart: "Cart",
    cartEmpty: "Your cart is empty",
    wishlist: "Wishlist",
    wishlistEmpty: "Your wishlist is empty",
    account: "Account",
    menu: "Menu",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    language: "Language",
    currency: "Currency",
    country: "Country",
    home: "Home",
    viewAll: "View all",
    dismiss: "Dismiss",
    close: "Close",
    backToParentMenu: "Back",
    newsletterEmailPlaceholder: "Your email address",
    newsletterSubmit: "Subscribe",
  },
} as const;

export type LocaleKey = keyof typeof messages;
export type MessageKey = keyof (typeof messages)["en-NZ"];

export const defaultLocaleKey: LocaleKey = "en-NZ";
