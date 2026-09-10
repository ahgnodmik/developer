"use client";

import { MotionConfig, motion } from "motion/react";

// Re-mounts on every navigation within the /design segment, so each page
// entrance (grid ↔ detail) animates in.
// MotionConfig reducedMotion="user" honors the OS "reduce motion" setting for
// every descendant motion component (grid, detail) — transforms are skipped,
// opacity fades kept.
export default function DesignTemplate({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
