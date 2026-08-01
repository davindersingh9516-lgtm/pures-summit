import type { IconName } from "lucide-react/dynamic";
import type { ID } from "./common.types";

export interface AnnouncementItem {
  id: ID;
  message: string;
  icon?: IconName;
  url?: string;
  ctaLabel?: string;
  /** ISO datetimes - a future scheduling UI in WordPress can publish an item
   * ahead of time and have it only render within this window. */
  startsAt?: string;
  endsAt?: string;
}

export interface AnnouncementBarData {
  enabled: boolean;
  dismissible: boolean;
  /** Seconds between auto-rotating items; omitted/0 disables rotation. */
  autoRotateSeconds?: number;
  items: AnnouncementItem[];
}
