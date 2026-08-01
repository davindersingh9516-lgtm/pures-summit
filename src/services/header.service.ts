import { cache } from "react";
import { headerRepository } from "@/repositories";

export const getHeader = cache(async () => headerRepository.getHeader());
