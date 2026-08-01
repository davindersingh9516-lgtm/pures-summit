import { cache } from "react";
import { settingsRepository } from "@/repositories";

export const getSettings = cache(async () => settingsRepository.getSettings());
