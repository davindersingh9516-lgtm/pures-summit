import { cache } from "react";
import { searchRepository } from "@/repositories";

export const getSearchSuggestions = cache(async () => searchRepository.getSearchSuggestions());
