import { BlogPostCard } from "./blog-post-card";
import type { BlogPost } from "@/types";

export function RelatedBlogPosts({ posts, className }: { posts: BlogPost[]; className?: string }) {
  if (posts.length === 0) return null;

  return (
    <div className={className}>
      <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
        More from the Journal
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
