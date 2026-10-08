"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { graphicSections, type GraphicImage, type Lang } from "@/lib/design";

const FONT_STACK = "var(--font-geist-sans), 'Pretendard Variable', Pretendard, system-ui, sans-serif";
const CONTAINER = "max-w-[1400px] mx-auto px-5 md:px-10";

const copy = {
  ko: {
    crumb: "그래픽",
    intro: "브랜드, 마케팅, 전시, 앱·웹 GUI까지 회사와 프로젝트별로 정리한 그래픽 작업 모음입니다.",
    images: "점",
    viewCase: "케이스 보기",
    empty: "표시할 그래픽 작업이 아직 없습니다.",
    close: "닫기",
    prev: "이전",
    next: "다음",
    more: "자세히 보기",
  },
  en: {
    crumb: "Graphics",
    intro: "Brand, marketing, exhibition, and app/web GUI work, grouped by company and project.",
    images: "images",
    viewCase: "View case",
    empty: "No graphic work to show yet.",
    close: "Close",
    prev: "Previous",
    next: "Next",
    more: "View full page",
  },
};

// Notion titles read "Company — descriptor"; split so the company becomes the heading.
function splitTitle(title: string) {
  const [head, ...rest] = title.split(/\s+[—–-]\s+/);
  return { head, rest: rest.join(" ") };
}

type FlatImage = GraphicImage & { label: string };

// Height/width above this = long detail page (sales page, scroll capture). Phone screens (~2.1) stay below.
const TALL_RATIO = 2.5;
const isTallImg = (el: HTMLImageElement) => el.naturalWidth > 0 && el.naturalHeight / el.naturalWidth > TALL_RATIO;

function Lightbox({
  images,
  index,
  onClose,
  onMove,
  tall,
  onMeasure,
  t,
}: {
  images: FlatImage[];
  index: number;
  onClose: () => void;
  onMove: (delta: number) => void;
  /** Long detail page: render at reading width and scroll vertically instead of fitting to screen. */
  tall: boolean;
  onMeasure: (src: string, tall: boolean) => void;
  t: (typeof copy)["ko"];
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  const img = images[index];
  const btn = "flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors";

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0f0f0e]/95" role="dialog" aria-modal="true" aria-label={img.label}>
      <div className="flex items-center gap-3 h-14 px-5 text-sm text-white/80">
        <span className="truncate">{img.label}</span>
        <span className="ml-auto font-mono text-xs tabular-nums text-white/60">
          {index + 1} / {images.length}
        </span>
        <button type="button" onClick={onClose} aria-label={t.close} className={btn}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="relative flex-1 min-h-0">
        {/* key resets scroll position when moving to another image */}
        <div
          key={index}
          className={`absolute inset-0 overflow-y-auto overscroll-contain px-4 md:px-20 pb-6 ${tall ? "" : "flex items-center justify-center"}`}
          onClick={onClose}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.caption ?? img.label}
            onLoad={(e) => onMeasure(img.src, isTallImg(e.currentTarget))}
            className={tall ? "block w-full max-w-[900px] h-auto mx-auto" : "max-w-full max-h-full object-contain"}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <button type="button" aria-label={t.prev} onClick={() => onMove(-1)} className={`${btn} absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex`}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button type="button" aria-label={t.next} onClick={() => onMove(1)} className={`${btn} absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex`}>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {img.caption && <p className="px-5 pb-5 text-center text-sm text-white/70">{img.caption}</p>}
    </div>,
    document.body
  );
}

export default function GraphicsPage() {
  const [lang, setLang] = useState<Lang>("ko");
  const [open, setOpen] = useState<number | null>(null);
  const [tallSrcs, setTallSrcs] = useState<Record<string, boolean>>({});
  const measure = useCallback(
    (src: string, tall: boolean) => setTallSrcs((m) => (m[src] === tall ? m : { ...m, [src]: tall })),
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ko") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    const next: Lang = lang === "ko" ? "en" : "ko";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  const t = copy[lang];

  // One flat list drives the lightbox so arrows move across groups and sections.
  const { flat, offsets } = useMemo(() => {
    const flat: FlatImage[] = [];
    const offsets = new Map<string, number>();
    for (const section of graphicSections) {
      for (const group of section.groups) {
        offsets.set(group.slug, flat.length);
        for (const part of group.parts) {
          const label = part.heading ? `${group.title[lang]} / ${part.heading}` : group.title[lang];
          for (const img of part.images) flat.push({ ...img, label });
        }
      }
    }
    return { flat, offsets };
  }, [lang]);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + flat.length) % flat.length)),
    [flat.length]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--n-bg)] text-[var(--n-text)] break-keep" style={{ fontFamily: FONT_STACK }}>
        <SiteHeader lang={lang} onToggleLang={toggleLang} active="graphics">
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <span className="font-medium truncate">{t.crumb}</span>
        </SiteHeader>

        <main className={`${CONTAINER} pb-32`}>
          <header className="pt-16 md:pt-24 pb-12 md:pb-16 grid gap-6 md:grid-cols-12 md:items-end border-b border-[var(--n-border)]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-8 text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-medium tracking-[-0.045em]"
            >
              Graphics &amp;{" "}
              {/* keep the signature dot glued to the last word */}
              <span className="whitespace-nowrap">
                GUI
                <span aria-hidden className="inline-block ml-[0.08em] w-[0.2em] h-[0.2em] rounded-full bg-[var(--n-accent)]" />
              </span>
            </motion.h1>
            <p className="md:col-span-4 text-sm leading-6 text-[var(--n-text-secondary)]">{t.intro}</p>
          </header>

          {/* Section index */}
          {graphicSections.length > 1 && (
            <nav aria-label="Index" className="flex flex-wrap gap-x-6 gap-y-2 py-6 text-sm border-b border-[var(--n-border)]">
              {graphicSections.map((s) => (
                <a key={s.slug} href={`#${s.slug}`} className="text-[var(--n-text-secondary)] hover:text-[var(--n-accent)] transition-colors">
                  {splitTitle(s.title[lang]).head}
                </a>
              ))}
            </nav>
          )}

          {graphicSections.length === 0 && <p className="py-24 text-sm text-[var(--n-text-tertiary)]">{t.empty}</p>}

          {graphicSections.map((section) => {
            const { head, rest } = splitTitle(section.title[lang]);
            const total = section.groups.reduce((n, g) => n + g.images.length, 0);
            return (
              <section key={section.slug} id={section.slug} className="scroll-mt-14 pt-20 md:pt-28">
                <div className="grid gap-4 md:grid-cols-12 md:items-end pb-6 border-b border-[var(--n-text)]">
                  <div className="md:col-span-8">
                    <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-none font-medium tracking-[-0.04em]">{head}</h2>
                    {rest && <p className="mt-3 text-lg text-[var(--n-text-secondary)]">{rest}</p>}
                  </div>
                  <div className="md:col-span-4 md:text-right text-sm">
                    <p className="font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">
                      {section.year} / {total} {t.images}
                    </p>
                    <p className="mt-1 text-[var(--n-text-secondary)]">{section.role[lang]}</p>
                    <Link
                      href={`/design/${section.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-[var(--n-accent)] underline underline-offset-4"
                    >
                      {t.viewCase}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {section.groups.map((group, gi) => {
                  const start = offsets.get(group.slug) ?? 0;
                  // The case's own images sit directly under the section heading; sub-cases get a subheading.
                  const showHeading = !(gi === 0 && group.slug === section.slug);
                  return (
                    <div key={group.slug} className="mt-10 md:mt-12">
                      {showHeading && (
                        <h3 className="mb-5 flex items-baseline gap-3 text-xl font-medium tracking-tight">
                          {group.title[lang]}
                          <span className="font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">{group.images.length}</span>
                        </h3>
                      )}
                      {group.parts.map((part, pi) => {
                        // Lightbox index of this part's first image within the flat list.
                        const partStart = start + group.parts.slice(0, pi).reduce((n, q) => n + q.images.length, 0);
                        return (
                          <div key={pi} className={pi > 0 || part.heading ? "mt-8" : ""}>
                            {part.heading && (
                              <h4 className="mb-4 text-sm font-medium text-[var(--n-text-secondary)]">
                                {part.heading}
                                <span className="ml-2 font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">{part.images.length}</span>
                              </h4>
                            )}
                            <div
                              className={
                                part.row
                                  ? // step rows keep each image at its full natural height
                                  "grid grid-flow-col auto-cols-[minmax(160px,1fr)] items-start gap-3 overflow-x-auto pb-2 [&>button]:mb-0"
                                  : `gap-3 [column-fill:_balance] ${
                                      part.compact ? "columns-4 md:columns-7 xl:columns-9" : "columns-2 md:columns-3 xl:columns-4"
                                    }`
                              }
                            >
                              {part.images.map((img, ii) => (
                                <button
                                  key={img.src}
                                  type="button"
                                  onClick={() => setOpen(partStart + ii)}
                                  className="group relative flex justify-center w-full mb-3 break-inside-avoid overflow-hidden bg-[var(--n-bg-callout)] focus-visible:outline-2 focus-visible:outline-[var(--n-accent)]"
                                  aria-label={img.caption ?? `${part.heading ?? group.title[lang]} ${ii + 1}`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={img.src}
                                    alt={img.caption ?? ""}
                                    loading="lazy"
                                    onLoad={(e) => measure(img.src, isTallImg(e.currentTarget))}
                                    // images that finished loading before hydration never fire onLoad
                                    ref={(el) => {
                                      if (el?.complete) measure(img.src, isTallImg(el));
                                    }}
                                    // long pages show only their top; small assets (logos) keep native size instead of upscaling
                                    className={`transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
                                      tallSrcs[img.src] && !part.row ? "w-full aspect-[3/4] object-cover object-top" : "max-w-full h-auto"
                                    }`}
                                  />
                                  {tallSrcs[img.src] && !part.row && (
                                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-center h-28 pb-4 bg-gradient-to-t from-[var(--n-bg)] via-[var(--n-bg)]/80 to-transparent">
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--n-brand)] text-white text-xs font-medium">
                                        {t.more}
                                        <ArrowDown className="w-3.5 h-3.5" />
                                      </span>
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </main>

        <SiteFooter lang={lang} />

        {open !== null && flat[open] && <Lightbox images={flat} index={open} onClose={close} onMove={move} tall={Boolean(tallSrcs[flat[open].src])} onMeasure={measure} t={t} />}
      </div>
    </MotionConfig>
  );
}
