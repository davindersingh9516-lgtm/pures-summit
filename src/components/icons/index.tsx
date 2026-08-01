import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { LucideProps } from "lucide-react";

/**
 * A closed, typed icon registry rather than importing lucide-react
 * components ad hoc across the codebase. This is where an icon name coming
 * from the CMS (e.g. a menu item's `icon` field) gets resolved to an actual
 * component - keeping every icon usage centrally auditable. Built on
 * lucide-react's `DynamicIcon`, which code-splits each icon on demand
 * instead of bundling the entire icon set.
 */
export type { IconName };

export interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  return <DynamicIcon name={name} {...props} />;
}
