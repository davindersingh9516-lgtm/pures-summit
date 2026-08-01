import { cache } from "react";
import { pageRepository } from "@/repositories";

export const getPage = cache(async (slug: string) => pageRepository.getPage(slug));
export const getAllPageSlugs = cache(async () => pageRepository.getAllPageSlugs());
