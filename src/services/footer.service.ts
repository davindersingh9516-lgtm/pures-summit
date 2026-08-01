import { cache } from "react";
import { footerRepository } from "@/repositories";

export const getFooter = cache(async () => footerRepository.getFooter());
