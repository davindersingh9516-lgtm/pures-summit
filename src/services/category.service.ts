import { cache } from "react";
import { categoryRepository } from "@/repositories";

export const getCategory = cache(async (slug: string) => categoryRepository.getCategory(slug));
export const getCategories = cache(async () => categoryRepository.getCategories());
