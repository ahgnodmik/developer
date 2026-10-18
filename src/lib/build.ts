// /build data: AI projects, workflows, and AI design cases, sourced from the Notion
// "AI Build DB" by scripts/fetch-notion.mjs (snapshot committed in build.generated.ts).

import { generatedBuild } from "./build.generated";
import type { Lang } from "./design";

export type BuildCategory = "project" | "workflow" | "design";
export type BuildStatus = "live" | "dev" | "case";

export type BuildItem = {
  id: string;
  order: number;
  category: BuildCategory;
  /** Projects only. */
  status?: BuildStatus;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  /** AI tools used (Claude Code, MCP, ...). */
  tools: string[];
  stack: string[];
  year: string;
  /** Local /build/<id>.webp for uploads, or a site path such as /work/ocr.webp. */
  cover?: string;
  /** External URL or an internal route such as /design/<slug>. */
  link?: string;
};

export const buildItems: BuildItem[] = generatedBuild;
