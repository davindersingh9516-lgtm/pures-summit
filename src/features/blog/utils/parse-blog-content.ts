export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export type BlogContentSegment = { type: "html"; html: string } | { type: "cta"; variant: "newsletter" | "shop" } | { type: "chart" };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Injects a stable `id` into every h2-h4 in raw WP-style content HTML (only
 * when one isn't already present) and collects them into a flat outline -
 * the same ids and order a `<BlogToc>` scrollspy needs to match anchors 1:1.
 */
export function parseBlogHeadings(html: string): { html: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = [];
  const slugCounts = new Map<string, number>();

  const processed = html.replace(/<h([2-4])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, inner) => {
    const level = Number(levelStr) as 2 | 3 | 4;
    const text = inner.replace(/<[^>]+>/g, "").trim();

    let slug = slugify(text) || `section-${headings.length + 1}`;
    const seenCount = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, seenCount + 1);
    if (seenCount > 0) slug = `${slug}-${seenCount}`;

    headings.push({ id: slug, text, level });

    const hasId = /\sid=["']/.test(attrs);
    const newAttrs = hasId ? attrs : `${attrs} id="${slug}"`;
    return `<h${level}${newAttrs}>${inner}</h${level}>`;
  });

  return { html: processed, headings };
}

const MARKER_PATTERN = /<!--\s*CTA:(newsletter|shop)\s*-->|<!--\s*CHART\s*-->/gi;

/**
 * Splits content HTML on `<!--CTA:newsletter-->` / `<!--CTA:shop-->` /
 * `<!--CHART-->` marker comments into an ordered list of html/CTA/chart
 * segments, so interactive React components (a real form, a real chart) can
 * be interleaved into what is otherwise a single dangerouslySetInnerHTML blob.
 */
export function splitBlogContentSegments(html: string): BlogContentSegment[] {
  const segments: BlogContentSegment[] = [];
  let lastIndex = 0;

  for (const match of html.matchAll(MARKER_PATTERN)) {
    const index = match.index ?? 0;
    const htmlChunk = html.slice(lastIndex, index).trim();
    if (htmlChunk) segments.push({ type: "html", html: htmlChunk });

    if (match[1]) {
      segments.push({ type: "cta", variant: match[1] as "newsletter" | "shop" });
    } else {
      segments.push({ type: "chart" });
    }

    lastIndex = index + match[0].length;
  }

  const rest = html.slice(lastIndex).trim();
  if (rest) segments.push({ type: "html", html: rest });

  return segments;
}
