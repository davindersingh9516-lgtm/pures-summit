"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easing } from "@/styles/tokens/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Standard editorial fade/rise-in, used by any block that should animate
 * into view. Kept content-agnostic - CMS blocks (components/cms/*) compose
 * this rather than each defining their own motion variants.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: duration.slow, delay, ease: easing.editorial }}
    >
      {children}
    </motion.div>
  );
}
