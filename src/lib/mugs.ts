// /mugs data: collected mugs and original mug designs, sourced from the Notion
// "Mug Collection DB" by scripts/fetch-notion.mjs (snapshot committed in mugs.generated.ts).

import { generatedMugs } from "./mugs.generated";
import type { Lang } from "./design";

export type Mug = {
  id: string;
  order: number;
  type: "collected" | "design";
  name: Record<Lang, string>;
  brand: string;
  where: string;
  year: string;
  note: Record<Lang, string>;
  tags: string[];
  /** Local /mugs/<id>.webp for uploads, or a hotlinked external URL (Unsplash). */
  photo: string;
  credit?: string;
  creditUrl?: string;
};

export const mugs: Mug[] = generatedMugs;

/** Sized URL for hotlinked Unsplash photos; local files pass through. */
export function mugSrc(photo: string, width: number): string {
  if (!photo.startsWith("https://images.unsplash.com/")) return photo;
  const sep = photo.includes("?") ? "&" : "?";
  return `${photo}${sep}auto=format&fit=crop&w=${width}&q=75`;
}
