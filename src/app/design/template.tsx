"use client";

import { MotionConfig } from "motion/react";

// Re-mounts on every navigation within the /design segment.
// Page-entrance motion lives inside CaseGrid (content only, sidebar excluded)
// and DesignDetail; this template only provides MotionConfig.
// MotionConfig reducedMotion="user" honors the OS "reduce motion" setting for
// every descendant motion component (grid, detail) — transforms are skipped,
// opacity fades kept.
export default function DesignTemplate({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
