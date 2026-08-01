import { cache } from "react";
import { contentRepository } from "@/repositories";

export const getFAQs = cache(async () => contentRepository.getFAQs());
export const getTestimonials = cache(async () => contentRepository.getTestimonials());
