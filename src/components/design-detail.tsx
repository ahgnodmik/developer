"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Languages } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { designProjects, type DesignBlock, type DesignProject, type Lang } from "@/lib/design";

function BodyRenderer({ blocks }: { blocks: DesignBlock[] }) {
  return (
    <div className="mt-2">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading": {
            const cls =
              b.level === 1
                ? "text-2xl font-bold mt-10 mb-3"
                : b.level === 2
                  ? "text-xl font-semibold mt-8 mb-2"
                  : "text-lg font-semibold mt-6 mb-2";
            return (
              <p key={i} className={`text-[var(--n-text)] ${cls}`}>
                {b.text}
              </p>
            );
          }
          case "paragraph":
            return (
              <p key={i} className="text-sm text-[var(--n-text)] leading-7 my-3">
                {b.text}
              </p>
            );
          case "bullet":
            return (
              <li key={i} className="text-sm text-[var(--n-text)] leading-7 ml-5 list-disc">
                {b.text}
              </li>
            );
          case "number":
            return (
              <li key={i} className="text-sm text-[var(--n-text)] leading-7 ml-5 list-decimal">
                {b.text}
              </li>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[var(--n-border)] pl-4 my-4 text-sm text-[var(--n-text-secondary)] italic"
              >
                {b.text}
              </blockquote>
            );
          case "divider":
            return <hr key={i} className="border-t border-[var(--n-border)] my-8" />;
          case "image":
            return (
              <motion.figure
                key={i}
                className="my-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.caption ?? ""}
                  className="w-full rounded-lg border border-[var(--n-border)]"
                />
                {b.caption && (
                  <figcaption className="text-xs text-[var(--n-text-tertiary)] mt-2 text-center">
                    {b.caption}
                  </figcaption>
                )}
              </motion.figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

const copy = {
  ko: {
    home: "홈",
    crumb: "디자인",
    role: "역할",
    year: "연도",
    stack: "도구·방법",
    overview: "개요",
    more: "다른 케이스",
    back: "디자인 목록으로",
    note: "실제 화면과 상세 자료는 비공개이며, 문의 시 공유 가능합니다.",
  },
  en: {
    home: "Home",
    crumb: "Design",
    role: "Role",
    year: "Year",
    stack: "Tools & Methods",
    overview: "Overview",
    more: "More cases",
    back: "Back to Design",
    note: "Actual screens and full materials are private and available on request.",
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

export function DesignDetail({ project }: { project: DesignProject }) {
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
  const others = designProjects.filter((p) => p.slug !== project.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--n-bg)]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-20 flex items-center gap-2 px-4 sm:px-6 h-14 bg-[var(--n-bg-sidebar)]/90 backdrop-blur border-b border-[var(--n-border)]">
        <div className="w-6 h-6 rounded bg-[#37352f] dark:bg-[#e6e6e4] flex items-center justify-center text-white dark:text-[#191919] text-xs font-bold shrink-0">
          K
        </div>
        <nav className="flex items-center gap-1.5 text-sm min-w-0">
          <Link href="/" className="text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors shrink-0">
            {t.home}
          </Link>
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <Link href="/design" className="text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors shrink-0">
            {t.crumb}
          </Link>
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <span className="text-[var(--n-text)] font-medium truncate">{project.title[lang]}</span>
        </nav>
        <div className="ml-auto flex items-center">
          <LangToggle lang={lang} onToggle={toggleLang} />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 pb-32">
        {/* Hero */}
        <motion.div
          className="mt-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--n-border)]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.cover} alt={project.title[lang]} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
              <span className="text-7xl sm:text-8xl select-none drop-shadow-lg">{project.emoji}</span>
            </div>
          )}
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--n-text)] tracking-tight mt-8">{project.title[lang]}</h1>
        <p className="text-[var(--n-text-secondary)] text-base mt-2 leading-relaxed">{project.summary[lang]}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          <div className="bg-[var(--n-bg-callout)] border border-[var(--n-border)] rounded-md p-3">
            <p className="text-[11px] text-[var(--n-text-tertiary)]">{t.role}</p>
            <p className="text-sm text-[var(--n-text)] mt-0.5">{project.role[lang]}</p>
          </div>
          <div className="bg-[var(--n-bg-callout)] border border-[var(--n-border)] rounded-md p-3">
            <p className="text-[11px] text-[var(--n-text-tertiary)]">{t.year}</p>
            <p className="text-sm text-[var(--n-text)] mt-0.5">{project.year}</p>
          </div>
          <div className="bg-[var(--n-bg-callout)] border border-[var(--n-border)] rounded-md p-3 col-span-2 sm:col-span-1">
            <p className="text-[11px] text-[var(--n-text-tertiary)]">{t.stack}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--n-bg-hover)] text-[var(--n-text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview / Body */}
        <div className="flex items-center gap-2 mt-10 mb-3">
          <span className="text-lg">📝</span>
          <h2 className="text-lg font-semibold text-[var(--n-text)]">{t.overview}</h2>
        </div>

        {project.body && project.body.length > 0 ? (
          <BodyRenderer blocks={project.body} />
        ) : (
          <>
            <p className="text-sm text-[var(--n-text)] leading-7">{project.overview[lang]}</p>

            {/* Gallery (property-based fallback) */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {project.gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title[lang]} ${i + 1}`}
                    className="w-full rounded-lg border border-[var(--n-border)]"
                  />
                ))}
              </div>
            )}
          </>
        )}

        <p className="text-xs text-[var(--n-text-tertiary)] mt-6 italic">{t.note}</p>

        <hr className="border-t border-[var(--n-border)] my-10" />

        {/* More cases */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🗂️</span>
          <h2 className="text-lg font-semibold text-[var(--n-text)]">{t.more}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/design/${p.slug}`} className="group block" aria-label={p.title[lang]}>
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative aspect-square rounded-lg overflow-hidden border border-[var(--n-border)]"
              >
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover} alt={p.title[lang]} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <span className="text-3xl select-none drop-shadow">{p.emoji}</span>
                  </div>
                )}
              </motion.div>
              <p className="text-xs font-medium text-[var(--n-text)] mt-1.5 line-clamp-2 group-hover:underline underline-offset-2">
                {p.title[lang]}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/design"
          className="inline-flex items-center gap-1.5 mt-12 text-sm text-[var(--n-text-secondary)] hover:text-[var(--n-text)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>
      </main>
    </div>
  );
}
