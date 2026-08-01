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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing.editorial } },
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
