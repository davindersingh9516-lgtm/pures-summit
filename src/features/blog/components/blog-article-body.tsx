import { BlogCtaBanner } from "./blog-cta-banner";
import { BlogStatChart } from "./blog-stat-chart";
import type { BlogContentSegment } from "../utils/parse-blog-content";
import type { NewsletterSignup } from "@/types";

const MGO_GRADE_DATA = [
  { label: "MGO 83+", value: 83 },
  { label: "MGO 263+", value: 263 },
  { label: "MGO 514+", value: 514 },
  { label: "MGO 829+", value: 829 },
  { label: "MGO 1000+", value: 1050 },
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
              title="MGO Grade Bands by Methylglyoxal Content"
              data={MGO_GRADE_DATA}
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
