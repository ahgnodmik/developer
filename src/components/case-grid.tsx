"use client";

// Shared case grid used by /design and /archive. Same layout, different
// project list and copy per page.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Languages } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SideNav, type SideNavActive } from "@/components/side-nav";
import type { DesignProject, Lang } from "@/lib/design";

export type CaseGridCopy = Record<
  Lang,
  {
    home: string;
    crumb: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    all: string;
    open: string;
  }
>;

function FilterPill({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-[var(--n-text)] text-[var(--n-bg)] border-[var(--n-text)]"
          : "bg-transparent text-[var(--n-text-secondary)] border-[var(--n-border)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)]"
      }`}
    >
      {label}
      <span className={`tabular-nums ${active ? "text-[var(--n-bg)]/70" : "text-[var(--n-text-tertiary)]"}`}>
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
      className="flex items-center gap-1 px-2 h-8 rounded text-xs font-semibold text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)] transition-colors"
    >
      <Languages className="w-4 h-4" />
      {lang === "ko" ? "EN" : "한"}
    </button>
  );
}

export function CaseGrid({
  projects,
  copy,
  active,
}: {
  projects: DesignProject[];
  copy: CaseGridCopy;
  active: SideNavActive;
}) {
  const [lang, setLang] = useState<Lang>("ko");

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

  const [activeTag, setActiveTag] = useState<string | null>(null);

  // tag -> count, sorted by frequency
  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of projects) for (const tag of p.tags) m.set(tag, (m.get(tag) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const filtered = useMemo(
    () => (activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects),
    [activeTag, projects]
  );

  return (
    <div className="flex min-h-screen bg-[var(--n-bg)]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Sidebar (desktop) ── */}
      <SideNav lang={lang} onToggleLang={toggleLang} active={active} />

      <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 min-w-0"
      >
      {/* ── Top bar (mobile) ── */}
      <header className="md:hidden sticky top-0 z-20 flex items-center gap-2 px-4 sm:px-6 h-14 bg-[var(--n-bg-sidebar)]/90 backdrop-blur border-b border-[var(--n-border)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.jpeg" alt="Kim Dongha" className="w-6 h-6 rounded object-cover shrink-0" />
        <nav className="flex items-center gap-1.5 text-sm min-w-0">
          <Link href="/" className="text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors truncate">
            {t.home}
          </Link>
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <span className="text-[var(--n-text)] font-medium truncate">{t.crumb}</span>
        </nav>
        <div className="ml-auto flex items-center">
          <LangToggle lang={lang} onToggle={toggleLang} />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pb-32">
        {/* Header */}
        <div className="mt-12 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--n-text-tertiary)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--n-text-tertiary)]" />
              {t.eyebrow} · {String(projects.length).padStart(2, "0")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--n-text)] tracking-tight">{t.title}</h1>
            <p className="text-[var(--n-text-secondary)] text-base mt-2">{t.subtitle}</p>
          </div>
          <p className="hidden sm:block shrink-0 text-sm text-[var(--n-text-tertiary)] tabular-nums">
            {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        <hr className="border-t border-[var(--n-border)] my-6" />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5">
          <FilterPill active={activeTag === null} label={t.all} count={projects.length} onClick={() => setActiveTag(null)} />
          {tagCounts.map(([tag, count]) => (
            <FilterPill key={tag} active={activeTag === tag} label={tag} count={count} onClick={() => setActiveTag(tag)} />
          ))}
        </div>

        <p className="text-xs text-[var(--n-text-tertiary)] mt-4 max-w-2xl leading-5">{t.note}</p>

        {/* ── Responsive square grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {filtered.map((p, i) => (
            <div key={p.slug}>
            <Link
              href={`/design/${p.slug}`}
              className="group block"
              aria-label={p.title[lang]}
            >
              <motion.div
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-[var(--n-border)] group-hover:shadow-lg"
              >
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.cover}
                    alt={p.title[lang]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <span className="text-4xl sm:text-5xl select-none drop-shadow transition-transform duration-300 group-hover:scale-110">
                      {p.emoji}
                    </span>
                  </div>
                )}
                {/* index number */}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/30 text-white text-[10px] font-semibold tabular-nums backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* year chip */}
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/30 text-white text-[10px] font-medium backdrop-blur-sm">
                  {p.year}
                </span>
                {/* OPEN ↗ on hover */}
                <span className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/90 text-[#191919] text-[10px] font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  {t.open}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.div>
              <div className="mt-2 px-0.5">
                <p className="text-sm font-medium text-[var(--n-text)] leading-snug line-clamp-1 group-hover:underline underline-offset-2">
                  {p.title[lang]}
                </p>
                <p className="text-xs text-[var(--n-text-secondary)] mt-0.5 line-clamp-1 leading-snug">
                  {p.summary[lang]}
                </p>
              </div>
            </Link>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mt-12 text-sm text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.home}
        </Link>
      </main>
      </motion.div>
      </MotionConfig>
    </div>
  );
}
