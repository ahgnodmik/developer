"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import type { Lang } from "@/lib/design";
import { mugs, mugSrc, type Mug } from "@/lib/mugs";

const FONT_STACK = "var(--font-geist-sans), 'Pretendard Variable', Pretendard, system-ui, sans-serif";
const CONTAINER = "max-w-[1400px] mx-auto px-5 md:px-10";

const copy = {
  ko: {
    crumb: "머그컵",
    intro: "여행지와 카페에서 모은 머그, 그리고 직접 디자인한 머그 기록입니다.",
    sampleNote: "일부 사진은 실제 사진으로 교체 전인 Unsplash 샘플 이미지입니다.",
    sections: { collected: "수집한 머그", design: "디자인한 머그" },
    sample: "샘플",
    where: "출처",
    year: "연도",
    brand: "브랜드",
    close: "닫기",
  },
  en: {
    crumb: "Mugs",
    intro: "Mugs collected from trips and cafes, and mugs I designed myself.",
    sampleNote: "Some photos are Unsplash samples until the real ones are added.",
    sections: { collected: "Collected", design: "Designed" },
    sample: "Sample",
    where: "From",
    year: "Year",
    brand: "Brand",
    close: "Close",
  },
};

const isSample = (m: Mug) => m.tags.includes("Sample");

function MugModal({ mug, lang, onClose }: { mug: Mug; lang: Lang; onClose: () => void }) {
  const t = copy[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const facts = [
    { k: t.where, v: mug.where },
    { k: t.year, v: mug.year },
    { k: t.brand, v: isSample(mug) ? "" : mug.brand },
  ].filter((f) => f.v);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" role="dialog" aria-modal="true" aria-label={mug.name[lang]}>
      <button type="button" aria-label={t.close} onClick={onClose} className="absolute inset-0 bg-[#0f0f0e]/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid w-full max-w-4xl max-h-full overflow-y-auto md:grid-cols-2 bg-[var(--n-bg)] text-[var(--n-text)]"
      >
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px] bg-[var(--n-bg-callout)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mugSrc(mug.photo, 1200)} alt={mug.name[lang]} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="self-end -mt-2 -mr-2 flex items-center justify-center w-9 h-9 rounded-full hover:bg-[var(--n-bg-hover)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="font-mono text-xs text-[var(--n-text-tertiary)]">{t.sections[mug.type]}</p>
          <h2 className="mt-2 text-3xl md:text-4xl leading-tight font-medium tracking-[-0.03em]">{mug.name[lang]}</h2>
          {mug.note[lang] && <p className="mt-4 text-sm leading-6 text-[var(--n-text-secondary)]">{mug.note[lang]}</p>}
          <dl className="mt-8 grid grid-cols-[5rem_1fr] gap-y-2 text-sm border-t border-[var(--n-border)] pt-5">
            {facts.map((f) => (
              <div key={f.k} className="contents">
                <dt className="font-mono text-xs leading-5 text-[var(--n-text-tertiary)]">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          {mug.tags.length > 0 && (
            <p className="mt-5 flex flex-wrap gap-1.5">
              {mug.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-[4px] bg-[var(--n-bg-hover)] text-xs text-[var(--n-text-secondary)]">
                  {tag}
                </span>
              ))}
            </p>
          )}
          {mug.credit && (
            <p className="mt-auto pt-8 text-xs text-[var(--n-text-tertiary)]">
              {mug.creditUrl ? (
                <a href={mug.creditUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-[var(--n-accent)]">
                  {mug.credit}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ) : (
                mug.credit
              )}
            </p>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function MugsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState<Mug | null>(null);

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
  const groups = (["collected", "design"] as const)
    .map((type) => ({ type, items: mugs.filter((m) => m.type === type) }))
    .filter((g) => g.items.length > 0);
  const hasSample = mugs.some(isSample);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--n-bg)] text-[var(--n-text)] break-keep" style={{ fontFamily: FONT_STACK }}>
        <SiteHeader lang={lang} onToggleLang={toggleLang} active="mugs">
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <span className="font-medium truncate">{t.crumb}</span>
        </SiteHeader>

        <main className={`${CONTAINER} pb-32`}>
          <header className="pt-16 md:pt-24 pb-12 md:pb-16 grid gap-6 md:grid-cols-12 md:items-end border-b border-[var(--n-border)]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-8 text-[clamp(3rem,10vw,9rem)] leading-[0.92] font-medium tracking-[-0.05em]"
            >
              Mugs
              <span aria-hidden className="inline-block ml-[0.06em] w-[0.2em] h-[0.2em] rounded-full bg-[var(--n-accent)]" />
            </motion.h1>
            <div className="md:col-span-4 text-sm leading-6 text-[var(--n-text-secondary)]">
              <p>{t.intro}</p>
              <p className="mt-3 font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">
                {groups.map((g) => `${t.sections[g.type]} ${g.items.length}`).join(" / ")}
              </p>
            </div>
          </header>

          {hasSample && <p className="pt-6 text-xs text-[var(--n-text-tertiary)]">{t.sampleNote}</p>}

          {groups.map((group) => (
            <section key={group.type} id={group.type} className="scroll-mt-14 pt-16 md:pt-24">
              <h2 className="flex items-baseline gap-3 pb-5 mb-8 border-b border-[var(--n-text)] text-[clamp(1.75rem,3.5vw,3rem)] leading-none font-medium tracking-[-0.035em]">
                {t.sections[group.type]}
                <span className="font-mono text-sm font-normal tracking-normal text-[var(--n-text-tertiary)] tabular-nums">{group.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((mug, i) => (
                  <motion.button
                    key={mug.id}
                    type="button"
                    onClick={() => setOpen(mug)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--n-accent)]"
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden bg-[var(--n-bg-callout)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mugSrc(mug.photo, 700)}
                        alt={mug.name[lang]}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-3 flex items-start justify-between gap-2">
                      <span className="text-base font-medium leading-snug tracking-tight">{mug.name[lang]}</span>
                      {isSample(mug) && (
                        <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded-[3px] border border-[var(--n-border)] text-[10px] text-[var(--n-text-tertiary)]">
                          {t.sample}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-[var(--n-text-tertiary)]">
                      {[mug.where, mug.year].filter(Boolean).join(", ")}
                    </span>
                    {mug.credit && <span className="mt-1 block text-[11px] text-[var(--n-text-tertiary)] truncate">{mug.credit}</span>}
                  </motion.button>
                ))}
              </div>
            </section>
          ))}
        </main>

        <SiteFooter lang={lang} />
        {open && <MugModal mug={open} lang={lang} onClose={() => setOpen(null)} />}
      </div>
    </MotionConfig>
  );
}
