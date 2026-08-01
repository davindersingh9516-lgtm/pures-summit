import { cache } from "react";
import { languageRepository } from "@/repositories";

export const getLanguages = cache(async () => languageRepository.getLanguages());
