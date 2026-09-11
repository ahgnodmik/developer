"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Languages } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { designProjects, type Lang } from "@/lib/design";

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const copy = {
  ko: {
    home: "홈",
    crumb: "디자인",
    title: "디자인",
    subtitle: "UX/UI · 프로덕트 디자인 케이스",
    note: "썸네일을 선택하면 상세 케이스를 볼 수 있습니다. 모든 사례는 비공개로 운영되며 익명화되었습니다.",
    count: (n: number) => `총 ${n}개`,
  },
  en: {
    home: "Home",
    crumb: "Design",
    title: "Design",
    subtitle: "UX/UI · Product design cases",
    note: "Select a thumbnail to view the full case. All cases are privately operated and anonymized.",
    count: (n: number) => `${n} total`,
  },
} satisfies Record<Lang, unknown>;

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

export default function DesignGrid() {
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

  return (
    <div className="min-h-screen bg-[var(--n-bg)]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 flex items-center gap-2 px-4 sm:px-6 h-14 bg-[var(--n-bg-sidebar)]/90 backdrop-blur border-b border-[var(--n-border)]">
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
        <div className="mt-10 mb-1 text-5xl select-none">🎨</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--n-text)] tracking-tight">{t.title}</h1>
        <p className="text-[var(--n-text-secondary)] text-base mt-1">{t.subtitle}</p>
        <p className="text-xs text-[var(--n-text-tertiary)] mt-4 max-w-2xl leading-5">{t.note}</p>
        <p className="text-[11px] text-[var(--n-text-tertiary)] mt-2">{t.count(designProjects.length)}</p>

        {/* ── Responsive square grid ── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6"
        >
          {designProjects.map((p) => (
            <motion.div key={p.slug} variants={gridItem}>
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
                {/* year chip */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/30 text-white text-[10px] font-medium backdrop-blur-sm">
                  {p.year}
                </span>
              </motion.div>
              <div className="mt-2 px-0.5">
                <p className="text-sm font-medium text-[var(--n-text)] leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                  {p.title[lang]}
                </p>
                <p className="text-xs text-[var(--n-text-tertiary)] mt-0.5 truncate">{p.role[lang]}</p>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mt-12 text-sm text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.home}
        </Link>
      </main>
    </div>
  );
}
