import { cache } from "react";
import { blogRepository } from "@/repositories";
import type { BlogListParams } from "@/repositories/interfaces";

export const getBlogPost = cache(async (slug: string) => blogRepository.getBlogPost(slug));
export const getBlogPosts = cache(async (params?: BlogListParams) => blogRepository.getBlogPosts(params));
export const getAllBlogPostSlugs = cache(async () => blogRepository.getAllBlogPostSlugs());
