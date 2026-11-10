// Launcher-style icon for a vibe-coded project tile, keyed by its cover path (/work/<key>.webp).
// Shipped apps use their real launcher icon; pipelines and apps without a custom icon get a
// glyph on the same rounded-square plate so the grid reads consistently.

import { Newspaper, LayoutGrid, Radar, UtensilsCrossed, type LucideIcon } from "lucide-react";

const LAUNCHER: Record<string, string> = {
  ocr: "/work/icons/ocr.webp",
  currency: "/work/icons/currency.webp",
  place: "/work/icons/place.webp",
  order: "/work/icons/order.webp",
};

const GLYPH: Record<string, LucideIcon> = {
  blog: Newspaper,
  cards: LayoutGrid,
  sourcing: Radar,
  meal: UtensilsCrossed,
};

const keyOf = (cover?: string) => cover?.match(/\/work\/([a-z-]+)\.webp$/)?.[1];

export function hasAppIcon(cover?: string) {
  const key = keyOf(cover);
  return !!key && (key in LAUNCHER || key in GLYPH);
}

export function AppIcon({ cover, className = "" }: { cover?: string; className?: string }) {
  const key = keyOf(cover);
  if (!key) return null;
  const plate = `block shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-[22%] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-white/15 ${className}`;
  const src = LAUNCHER[key];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" width={48} height={48} loading="lazy" className={`${plate} object-cover`} />;
  }
  const Glyph = GLYPH[key];
  if (!Glyph) return null;
  return (
    <span aria-hidden className={`${plate} flex items-center justify-center bg-white text-[#0f0f0e]`}>
      <Glyph className="w-1/2 h-1/2" strokeWidth={1.75} />
    </span>
  );
}
