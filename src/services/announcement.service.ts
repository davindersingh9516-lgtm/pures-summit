import { cache } from "react";
import { announcementRepository } from "@/repositories";

export const getAnnouncementBar = cache(async () => announcementRepository.getAnnouncementBar());
