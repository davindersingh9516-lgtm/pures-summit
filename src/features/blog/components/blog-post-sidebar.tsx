import { BlogToc } from "./blog-toc";
import { BlogSidebarCta } from "./blog-sidebar-cta";
import type { BlogHeading } from "../utils/parse-blog-content";

export function BlogPostSidebar({ headings }: { headings: BlogHeading[] }) {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
      <BlogToc headings={headings} />
      <BlogSidebarCta />
    </aside>
  );
}
