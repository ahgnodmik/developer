"use client";

import { motion } from "motion/react";

// Re-mounts on every navigation within the /design segment, so each page
// entrance (grid ↔ detail) animates in.
export default function DesignTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
