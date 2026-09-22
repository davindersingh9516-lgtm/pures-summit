"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easing } from "@/styles/tokens/motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/**
 * No `opacity` in the hidden state, deliberately - only a Y-offset. Content
 * that never animates (slow hydration, a script error, `whileInView` never
 * firing because a wrapping element made the viewport intersection check
 * behave unexpectedly - all observed happening on a slow dev machine) still
 * renders fully visible, just without the entrance slide. `opacity: 0` here
 * previously meant a stalled animation left entire product grids invisible
 * - real content can't depend on JS succeeding to be seen at all.
 */
const itemVariants: Variants = {
  hidden: { y: 12 },
  visible: { y: 0, transition: { duration: duration.normal, ease: easing.editorial } },
};

/**
 * Wrap a list of children (e.g. a product grid) in `<Stagger>` and each
 * direct child in `<StaggerItem>` to get a staggered reveal animation
 * without hand-rolling Framer Motion variants per feature.
 */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
