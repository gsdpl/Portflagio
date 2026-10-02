"use client";

import { motion } from "motion/react";

/**
 * Per-navigation transition: every route change under [locale] (e.g. clicking a
 * project card, or going back) re-mounts this template, fading the incoming page
 * in. Opacity only — a transform/filter here would break the sticky header's
 * containing block.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
