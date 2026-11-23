// Pictogram for a vibe-coded project tile, keyed by its cover path (/work/<key>.webp).
// Every project gets a glyph on the same rounded-square plate (paper tone, so it reads on the
// white card); real launcher icons were dropped to keep the grid uniform and anonymous.

import { ScanText, ArrowLeftRight, MapPin, Coffee, Newspaper, LayoutGrid, Radar, UtensilsCrossed, type LucideIcon } from "lucide-react";

const GLYPH: Record<string, LucideIcon> = {
  ocr: ScanText,
  currency: ArrowLeftRight,
  place: MapPin,
  order: Coffee,
  blog: Newspaper,
  cards: LayoutGrid,
  sourcing: Radar,
  meal: UtensilsCrossed,
};

const keyOf = (cover?: string) => cover?.match(/\/work\/([a-z-]+)\.webp$/)?.[1];

export function AppIcon({ cover, className = "" }: { cover?: string; className?: string }) {
  const key = keyOf(cover);
  const Glyph = key ? GLYPH[key] : undefined;
  if (!Glyph) return null;
  return (
    <span
      aria-hidden
      className={`flex items-center justify-center shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-[22%] bg-[var(--n-bg)] text-[var(--n-text)] shadow-[0_2px_8px_rgba(0,0,0,0.10)] ring-1 ring-black/5 ${className}`}
    >
      <Glyph className="w-1/2 h-1/2" strokeWidth={1.75} />
    </span>
  );
}
