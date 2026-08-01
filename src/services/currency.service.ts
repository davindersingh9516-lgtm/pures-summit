import { cache } from "react";
import { currencyRepository } from "@/repositories";

export const getCurrencies = cache(async () => currencyRepository.getCurrencies());
