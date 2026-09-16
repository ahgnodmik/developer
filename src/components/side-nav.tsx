"use client";

// Shared desktop sidebar used by the home page and the /design·/archive grids,
// so navigating between routes keeps the same frame. Lang/theme toggles live in
// the footer next to the version.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Home as HomeIcon,
  FileText,
  Code2,
  Briefcase,
  Layers,
  Phone,
  Palette,
  Archive,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Lang } from "@/lib/design";

export const SITE_VERSION = "v1.1.0";

export type SideNavActive = "home" | "design" | "archive";

const pageLabels: Record<Lang, string[]> = {
  ko: ["홈", "소개", "사용하는 도구", "경력", "프로젝트", "연락처"],
  en: ["Home", "About", "Skills", "Career", "Projects", "Contact"],
};

const pageHrefs = ["/", "/#about", "/#skills", "/#career", "/#projects", "/#contact"];

const pageIcons = [
  <HomeIcon key="home" className="w-4 h-4" />,
  <FileText key="about" className="w-4 h-4" />,
  <Code2 key="skills" className="w-4 h-4" />,
  <Briefcase key="career" className="w-4 h-4" />,
  <Layers key="projects" className="w-4 h-4" />,
  <Phone key="contact" className="w-4 h-4" />,
];

function itemClass(active: boolean) {
  return `flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
    active
      ? "bg-[var(--n-bg-active)] text-[var(--n-text)] font-medium"
      : "text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)]"
  }`;
}

export function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
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

export function SideNav({
  lang,
  onToggleLang,
  active,
}: {
  lang: Lang;
  onToggleLang: () => void;
  active: SideNavActive;
}) {
  return (
    <aside className="hidden md:flex flex-col w-[200px] shrink-0 border-r border-[var(--n-border)] h-screen sticky top-0 bg-[var(--n-bg-sidebar)] overflow-y-auto">
      {/* Workspace header */}
      <div className="flex items-center gap-1.5 px-4 h-14 border-b border-[var(--n-border)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.jpeg" alt="Kim Dongha" className="w-6 h-6 rounded object-cover shrink-0" />
        <span className="text-sm font-semibold text-[var(--n-text)] truncate">Kim Dongha</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[11px] font-medium text-[var(--n-text-tertiary)] uppercase tracking-widest">
          Pages
        </p>
        {pageLabels[lang].map((label, i) => (
          <a key={label} href={pageHrefs[i]} className={itemClass(active === "home" && i === 0)}>
            {pageIcons[i]}
            {label}
          </a>
        ))}
      </nav>

      <div className="px-2 py-3 mb-[200px] border-t border-[var(--n-border)]">
        <p className="px-3 mb-2 text-[11px] font-medium text-[var(--n-text-tertiary)] uppercase tracking-widest">
          {lang === "ko" ? "더 알아보기" : "More"}
        </p>
        <Link href="/design" className={itemClass(active === "design")}>
          <Palette className="w-4 h-4" />
          {lang === "ko" ? "서비스 디자인" : "Service Design"}
        </Link>
        <Link href="/archive" className={itemClass(active === "archive")}>
          <Archive className="w-4 h-4" />
          More Works
        </Link>
      </div>

      <div className="px-4 py-3 border-t border-[var(--n-border)]">
        <div className="flex items-center -ml-2 mb-1">
          <LangToggle lang={lang} onToggle={onToggleLang} />
          <ThemeToggle />
        </div>
        <p className="text-[11px] text-[var(--n-text-tertiary)]">© 2026 Kim Dongha · {SITE_VERSION}</p>
      </div>
    </aside>
  );
}

/**
 * Mobile drawer navigation: hamburger button + slide-in panel with the same
 * Pages / More items as the desktop sidebar. Render inside the mobile top bar.
 */
export function MobileNav({
  lang,
  onToggleLang,
  active,
}: {
  lang: Lang;
  onToggleLang: () => void;
  active: SideNavActive;
}) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-9 h-9 rounded text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)] transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          {/* panel */}
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] flex flex-col bg-[var(--n-bg-sidebar)] border-r border-[var(--n-border)] shadow-xl overflow-y-auto">
            <div className="flex items-center gap-1.5 px-4 h-14 border-b border-[var(--n-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpeg" alt="Kim Dongha" className="w-6 h-6 rounded object-cover shrink-0" />
              <span className="text-sm font-semibold text-[var(--n-text)] truncate">Kim Dongha</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="ml-auto flex items-center justify-center w-9 h-9 rounded text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-0.5">
              <p className="px-3 mb-2 text-[11px] font-medium text-[var(--n-text-tertiary)] uppercase tracking-widest">
                Pages
              </p>
              {pageLabels[lang].map((label, i) => (
                <a
                  key={label}
                  href={pageHrefs[i]}
                  onClick={() => setOpen(false)}
                  className={itemClass(active === "home" && i === 0)}
                >
                  {pageIcons[i]}
                  {label}
                </a>
              ))}

              <p className="px-3 mt-6 mb-2 text-[11px] font-medium text-[var(--n-text-tertiary)] uppercase tracking-widest">
                {lang === "ko" ? "더 알아보기" : "More"}
              </p>
              <Link href="/design" onClick={() => setOpen(false)} className={itemClass(active === "design")}>
                <Palette className="w-4 h-4" />
                {lang === "ko" ? "서비스 디자인" : "Service Design"}
              </Link>
              <Link href="/archive" onClick={() => setOpen(false)} className={itemClass(active === "archive")}>
                <Archive className="w-4 h-4" />
                More Works
              </Link>
            </nav>

            <div className="px-4 py-3 border-t border-[var(--n-border)]">
              <div className="flex items-center -ml-2 mb-1">
                <LangToggle lang={lang} onToggle={onToggleLang} />
                <ThemeToggle />
              </div>
              <p className="text-[11px] text-[var(--n-text-tertiary)]">© 2026 Kim Dongha · {SITE_VERSION}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
