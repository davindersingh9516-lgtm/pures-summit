import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { ROUTES } from "@/constants/routes.constants";
import { formatDate } from "@/utils/format-date";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

function CategoryBadges({ post }: { post: BlogPost }) {
  if (post.categories.length === 0) return null;
  return (
    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
      {post.categories.map((category) => (
        <span
          key={category.id}
          className="rounded-(--radius-sm) bg-(--color-neutral-0) px-2.5 py-1 text-[10px] font-bold tracking-(--tracking-wider) text-(--color-neutral-900) uppercase shadow-(--shadow-elevation-1)"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-[11px] font-medium tracking-(--tracking-wide) text-(--color-foreground-muted) uppercase">
      <span className="flex items-center gap-1.5">
        <span className="size-1 rounded-(--radius-full) bg-(--color-primary)" />
        {formatDate(post.publishedAt)}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-1 rounded-(--radius-full) bg-(--color-primary)" />
        Post by {post.author.name}
      </span>
    </p>
  );
}

/**
 * `variant="wide"` is the single bento highlight card in the listing grid
 * (spans 2 columns, text overlaid on the image itself) - everything else
 * uses the standard card (badges on the image, title/rule/meta below it).
 */
export function BlogPostCard({ post, variant = "default" }: { post: BlogPost; variant?: "default" | "wide" }) {
  if (variant === "wide") {
    return (
      <AppLink
        href={ROUTES.blogPost(post.slug)}
        className="group relative flex aspect-[4/3] w-full overflow-hidden rounded-(--radius-lg) bg-(--color-muted) sm:aspect-[16/9]"
      >
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.altText}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-neutral-950)/80 via-(--color-neutral-950)/10 to-transparent" />
        <div className="relative mt-auto flex flex-col gap-2 p-5">
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-(--radius-sm) bg-(--color-neutral-0) px-2.5 py-1 text-[10px] font-bold tracking-(--tracking-wider) text-(--color-neutral-900) uppercase"
              >
                {category.name}
              </span>
            ))}
          </div>
          <h3 className="font-(family-name:--font-display) text-xl text-(--color-neutral-0) sm:text-2xl">
            {post.title}
          </h3>
        </div>
      </AppLink>
    );
  }

  return (
    <AppLink href={ROUTES.blogPost(post.slug)} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-lg) bg-(--color-muted)">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.altText}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <CategoryBadges post={post} />
      </div>

      <div className={cn("flex flex-col gap-2 border-b border-(--color-border) pb-3")}>
        <h3 className="relative w-fit font-(family-name:--font-display) text-lg text-(--color-foreground)">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </h3>
      </div>

      <PostMeta post={post} />
    </AppLink>
  );
}
