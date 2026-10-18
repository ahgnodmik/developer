"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import type { Lang } from "@/lib/design";
import { buildItems, type BuildCategory, type BuildItem, type BuildStatus } from "@/lib/build";

const FONT_STACK = "var(--font-geist-sans), 'Pretendard Variable', Pretendard, system-ui, sans-serif";
const CONTAINER = "max-w-[1400px] mx-auto px-5 md:px-10";
const EASE = [0.22, 1, 0.36, 1] as const;

const copy = {
  ko: {
    crumb: "AI Build",
    intro: "AI와 함께 기획하고 만들고 운영한 작업, 그 과정에서 쓰는 도구와 워크플로, AI 경험을 다룬 디자인을 모았습니다.",
    note: "서비스명과 코드는 비공개이며, 케이스 스터디와 시연은 문의 시 공유합니다.",
    sections: { project: "프로젝트", workflow: "도구와 워크플로", design: "AI 디자인" },
    empty: { project: "프로젝트를 정리하고 있습니다.", workflow: "작업 방식을 정리하고 있습니다.", design: "AI 디자인 케이스를 준비하고 있습니다." },
    status: { live: "LIVE", dev: "개발 중", case: "케이스 스터디" },
    tools: "도구",
  },
  en: {
    crumb: "AI Build",
    intro: "Products I planned, built, and run with AI, the tools and workflows behind them, and design work on AI experiences.",
    note: "Names and code stay private; case studies and demos are available on request.",
    sections: { project: "Projects", workflow: "Tools & workflows", design: "AI design" },
    empty: { project: "Projects are being written up.", workflow: "Workflows are being written up.", design: "AI design cases are in the works." },
    status: { live: "LIVE", dev: "In development", case: "Case study" },
    tools: "Tools",
  },
};

const CATEGORIES: BuildCategory[] = ["project", "workflow", "design"];
const STATUS_ORDER: BuildStatus[] = ["live", "dev", "case"];

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Wraps a card in a link when the item has one; external links open in a new tab.
function MaybeLink({ href, className, children }: { href?: string; className: string; children: React.ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function StatusBadge({ status, label }: { status: BuildStatus; label: string }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 -rotate-3 px-2 py-0.5 rounded-[3px] bg-[var(--n-brand)] text-white text-[11px] font-semibold tracking-wide whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-white motion-safe:animate-pulse" />
        {label}
      </span>
    );
  }
  return <span className="inline-flex px-2 py-0.5 rounded-[3px] bg-white/15 backdrop-blur-sm text-[11px] font-medium text-white/90">{label}</span>;
}

// Image tile with dimmed cover and overlaid copy, same treatment as the home work grid.
function ProjectTile({ item, lang }: { item: BuildItem; lang: Lang }) {
  const t = copy[lang];
  const tags = [...item.tools, ...item.stack];
  return (
    <MaybeLink
      href={item.link}
      className="group relative block aspect-square overflow-hidden rounded-xl bg-[#161616] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--n-accent)]"
    >
      {item.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      <div className="absolute inset-0 bg-[#0f0f0e]/45 transition-colors duration-500 group-hover:bg-[#0f0f0e]/30" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0f0f0e]/90 via-[#0f0f0e]/55 to-transparent" />
      <div className="relative flex flex-col h-full p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          {item.status && <StatusBadge status={item.status} label={t.status[item.status]} />}
          {item.link && <ArrowUpRight className="ml-auto w-4 h-4 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </div>
        <div className="mt-auto">
          <h3 className="text-sm sm:text-base leading-snug font-medium tracking-tight text-balance">{item.title[lang]}</h3>
          <p className="hidden sm:line-clamp-2 mt-1.5 text-xs leading-5 text-white/80">{item.summary[lang]}</p>
          {tags.length > 0 && <p className="hidden sm:block mt-2 font-mono text-[10px] text-white/60 truncate">{tags.join(" / ")}</p>}
        </div>
      </div>
    </MaybeLink>
  );
}

// Text-first row for workflows and design cases: they rarely have a meaningful cover.
function ItemRow({ item, lang, index }: { item: BuildItem; lang: Lang; index: number }) {
  const t = copy[lang];
  const tags = [...item.tools, ...item.stack];
  return (
    <MaybeLink
      href={item.link}
      className="group grid gap-3 md:grid-cols-12 md:gap-6 py-6 md:py-8 border-b border-[var(--n-border)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--n-accent)]"
    >
      <span className="md:col-span-1 font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums pt-1">{String(index + 1).padStart(2, "0")}</span>
      <div className="md:col-span-4">
        <h3 className="flex items-start gap-1.5 text-xl md:text-2xl leading-tight font-medium tracking-[-0.02em] group-hover:text-[var(--n-accent)] transition-colors">
          {item.title[lang]}
          {item.link && <ArrowUpRight className="shrink-0 mt-1 w-4 h-4" />}
        </h3>
        {item.year && <p className="mt-1 font-mono text-xs text-[var(--n-text-tertiary)]">{item.year}</p>}
      </div>
      <p className="md:col-span-4 text-sm leading-6 text-[var(--n-text-secondary)]">{item.summary[lang]}</p>
      {tags.length > 0 && (
        <p className="md:col-span-3 flex flex-wrap content-start gap-1.5 md:justify-end" aria-label={t.tools}>
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-[4px] bg-[var(--n-bg-hover)] text-xs text-[var(--n-text-secondary)]">
              {tag}
            </span>
          ))}
        </p>
      )}
    </MaybeLink>
  );
}

export default function BuildPage() {
  const [lang, setLang] = useState<Lang>("en");

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
  const groups = CATEGORIES.map((category) => {
    const items = buildItems.filter((item) => item.category === category);
    // projects: live first, then in development, then case studies (Notion order within each)
    if (category === "project") {
      items.sort((a, b) => STATUS_ORDER.indexOf(a.status ?? "case") - STATUS_ORDER.indexOf(b.status ?? "case"));
    }
    return { category, items };
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--n-bg)] text-[var(--n-text)] break-keep" style={{ fontFamily: FONT_STACK }}>
        <SiteHeader lang={lang} onToggleLang={toggleLang} active="build">
          <span className="text-[var(--n-text-tertiary)]">/</span>
          <span className="font-medium truncate">{t.crumb}</span>
        </SiteHeader>

        <main className={`${CONTAINER} pb-32`}>
          <header className="pt-16 md:pt-24 pb-12 md:pb-16 grid gap-6 md:grid-cols-12 md:items-end border-b border-[var(--n-border)]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="md:col-span-8 text-[clamp(3rem,10vw,9rem)] leading-[0.92] font-medium tracking-[-0.05em]"
            >
              AI Build
              <span aria-hidden className="inline-block ml-[0.06em] w-[0.2em] h-[0.2em] rounded-full bg-[var(--n-accent)]" />
            </motion.h1>
            <div className="md:col-span-4 text-sm leading-6 text-[var(--n-text-secondary)]">
              <p>{t.intro}</p>
              <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">
                {groups.map((g) => (
                  <a key={g.category} href={`#${g.category}`} className="hover:text-[var(--n-text)] transition-colors">
                    {t.sections[g.category]} {g.items.length}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          {groups.map((group) => (
            <section key={group.category} id={group.category} className="scroll-mt-14 pt-16 md:pt-24">
              <h2 className="flex items-baseline gap-3 pb-5 mb-8 border-b border-[var(--n-text)] text-[clamp(1.75rem,3.5vw,3rem)] leading-none font-medium tracking-[-0.035em]">
                {t.sections[group.category]}
                <span className="font-mono text-sm font-normal tracking-normal text-[var(--n-text-tertiary)] tabular-nums">{group.items.length}</span>
              </h2>

              {group.items.length === 0 ? (
                <div className="flex items-center justify-center aspect-[3/1] md:aspect-[5/1] border border-dashed border-[var(--n-border)] text-sm text-[var(--n-text-tertiary)]">
                  {t.empty[group.category]}
                </div>
              ) : group.category === "project" ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  >
                    {group.items.map((item) => (
                      <ProjectTile key={item.id} item={item} lang={lang} />
                    ))}
                  </motion.div>
                  <p className="mt-6 text-xs text-[var(--n-text-tertiary)]">{t.note}</p>
                </>
              ) : (
                <div className="border-t border-[var(--n-border)]">
                  {group.items.map((item, i) => (
                    <ItemRow key={item.id} item={item} lang={lang} index={i} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </main>

        <SiteFooter lang={lang} />
      </div>
    </MotionConfig>
  );
}
