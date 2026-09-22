import { Suspense, type ReactNode } from "react";
import { SkipToContent } from "@/components/global/skip-to-content";
import { ProgressBar } from "@/components/global/progress-bar";
import { ServiceWorkerCleanup } from "@/components/global/service-worker-cleanup";
import { getAnnouncementBar, getCurrencies, getFooter, getHeader, getLanguages, getSearchSuggestions } from "@/services";
import { SearchModal } from "@/features/search";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * The global application shell: skip link, progress bar, announcement bar,
 * sticky header, page content, footer, and the search modal. This is the
 * ONLY place these are assembled - every route renders through
 * `app/layout.tsx`'s `<SiteShell>`, so none of them are duplicated per page.
 * All data comes from the service layer; nothing here is hardcoded.
 */
export async function SiteShell({ children }: { children: ReactNode }) {
  const [header, footer, announcement, languages, currencies, searchSuggestions] = await Promise.all([
    getHeader(),
    getFooter(),
    getAnnouncementBar(),
    getLanguages(),
    getCurrencies(),
    getSearchSuggestions(),
  ]);

  return (
    <>
      <SkipToContent />
      <ServiceWorkerCleanup />
      <Suspense fallback={null}>
        <ProgressBar />
      </Suspense>
      <AnnouncementBar data={announcement} />
      <Header header={header} footer={footer} languages={languages} currencies={currencies} />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer
        footer={footer}
        logo={header.logoDark ?? header.logo}
        languages={languages}
        currencies={currencies}
      />
      <SearchModal suggestions={searchSuggestions} />
    </>
  );
}
