import { BlogCtaBanner } from "./blog-cta-banner";
import { BlogStatChart } from "./blog-stat-chart";
import type { BlogContentSegment } from "../utils/parse-blog-content";
import type { NewsletterSignup } from "@/types";

const UMF_GRADE_DATA = [
  { label: "UMF 5+", value: 83 },
  { label: "UMF 10+", value: 263 },
  { label: "UMF 15+", value: 514 },
  { label: "UMF 20+", value: 829 },
  { label: "UMF 24+", value: 1050 },
];

export function BlogArticleBody({ segments, newsletter }: { segments: BlogContentSegment[]; newsletter: NewsletterSignup }) {
  return (
    <div className="flex flex-col gap-10">
      {segments.map((segment, index) => {
        if (segment.type === "html") {
          return <div key={index} className="blog-prose" dangerouslySetInnerHTML={{ __html: segment.html }} />;
        }
        if (segment.type === "chart") {
          return (
            <BlogStatChart
              key={index}
              title="UMF Grade vs. Approximate MGO Potency"
              data={UMF_GRADE_DATA}
              unit="mg/kg"
            />
          );
        }
        if (segment.variant === "newsletter") {
          return <BlogCtaBanner key={index} variant="newsletter" newsletter={newsletter} />;
        }
        return <BlogCtaBanner key={index} variant="shop" />;
      })}
    </div>
  );
}
