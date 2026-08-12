import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { ROUTES } from "@/constants/routes.constants";
import { getAllBlogPostSlugs, getAllPageSlugs, getAllProductSlugs, getBlogPosts, getCategories } from "@/services";

/**
 * Fully backend-driven sitemap - every URL comes from the service layer
 * (which, once GraphQL is wired up, resolves from WordPress/WooCommerce).
 * No slugs are ever hardcoded here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;

  const [pageSlugs, productSlugs, blogSlugs, categories, allBlogPosts] = await Promise.all([
    getAllPageSlugs(),
    getAllProductSlugs(),
    getAllBlogPostSlugs(),
    getCategories(),
    getBlogPosts({ perPage: 999 }),
  ]);

  const authorSlugs = Array.from(new Set(allBlogPosts.nodes.map((post) => post.author.slug)));

  return [
    { url: `${siteUrl}${ROUTES.home()}` },
    ...pageSlugs.map((slug) => ({ url: `${siteUrl}${ROUTES.page(slug)}` })),
    { url: `${siteUrl}${ROUTES.labReports()}` },
    { url: `${siteUrl}${ROUTES.productList()}` },
    ...categories.map((category) => ({ url: `${siteUrl}${ROUTES.category(category.slug)}` })),
    ...productSlugs.map((slug) => ({ url: `${siteUrl}${ROUTES.product(slug)}` })),
    { url: `${siteUrl}${ROUTES.blogList()}` },
    ...blogSlugs.map((slug) => ({ url: `${siteUrl}${ROUTES.blogPost(slug)}` })),
    ...authorSlugs.map((slug) => ({ url: `${siteUrl}${ROUTES.blogAuthor(slug)}` })),
  ];
}
