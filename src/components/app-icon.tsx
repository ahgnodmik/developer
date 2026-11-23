// Launcher-style icon for a vibe-coded project tile, keyed by its cover path (/work/<key>.webp).
// Shipped apps use their real launcher icon; pipelines and apps without a custom icon get a
// glyph on the same rounded-square plate (paper tone, so it reads on the white card).

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
  const plate = `block shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-[22%] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.10)] ring-1 ring-black/5 ${className}`;
  const src = LAUNCHER[key];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" width={48} height={48} loading="lazy" className={`${plate} object-cover`} />;
  }
  const Glyph = GLYPH[key];
  if (!Glyph) return null;
  return (
    <span aria-hidden className={`${plate} flex items-center justify-center bg-[var(--n-bg)] text-[var(--n-text)]`}>
      <Glyph className="w-1/2 h-1/2" strokeWidth={1.75} />
    </span>
  );
}
