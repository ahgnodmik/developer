"use client";

// Shared top navigation for every route (replaced the Notion-style sidebar).
// Desktop: inline links + lang/theme toggles. Mobile: full-screen poster menu.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Lang } from "@/lib/design";

export const SITE_VERSION = "v1.2.0";

export type NavActive = "home" | "design" | "graphics" | "archive";

const navItems: { href: string; label: Record<Lang, string>; key?: NavActive }[] = [
  { href: "/#projects", label: { ko: "작업", en: "Work" } },
  { href: "/#career", label: { ko: "경력", en: "Career" } },
  { href: "/design", label: { ko: "서비스 디자인", en: "Service design" }, key: "design" },
  { href: "/graphics", label: { ko: "그래픽", en: "Graphics" }, key: "graphics" },
  { href: "/archive", label: { ko: "More Works", en: "More works" }, key: "archive" },
  { href: "/#contact", label: { ko: "연락처", en: "Contact" } },
];

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

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0 text-sm font-semibold tracking-tight text-[var(--n-text)]">
      <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-[var(--n-accent)]" />
      Kim Dongha
    </Link>
  );
}

export function SiteHeader({
  lang,
  onToggleLang,
  active,
  children,
}: {
  lang: Lang;
  onToggleLang: () => void;
  active: NavActive;
  /** Optional breadcrumb shown after the wordmark on sub-pages. */
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 bg-[var(--n-bg)]/85 backdrop-blur-md border-b border-[var(--n-border)]">
      <div className="max-w-[1400px] mx-auto flex items-center gap-3 h-14 px-5 md:px-10">
        <Wordmark />
        {children && <div className="hidden sm:flex items-center gap-1.5 min-w-0 text-sm">{children}</div>}

        <nav className="hidden md:flex items-center gap-6 ml-auto text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                item.key && item.key === active
                  ? "text-[var(--n-text)] underline underline-offset-[6px] decoration-[var(--n-accent)] decoration-2"
                  : "text-[var(--n-text-secondary)] hover:text-[var(--n-text)]"
              }`}
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center ml-auto md:ml-2">
          <LangToggle lang={lang} onToggle={onToggleLang} />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col bg-[var(--n-brand)] text-white" role="dialog" aria-modal="true">
            <div className="flex items-center h-14 px-5">
              <span className="text-sm font-semibold tracking-tight">Kim Dongha</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="ml-auto flex items-center justify-center w-9 h-9 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-3 px-5">
              <Link href="/" onClick={() => setOpen(false)} className="text-4xl font-medium tracking-tight">
                {lang === "ko" ? "홈" : "Home"}
              </Link>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-4xl font-medium tracking-tight">
                  {item.label[lang]}
                </Link>
              ))}
            </nav>
            <p className="px-5 pb-6 font-mono text-xs text-white/70">samdongpm@gmail.com</p>
          </div>,
          document.body
        )}
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-[var(--n-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-5 md:px-10 py-6 text-xs text-[var(--n-text-tertiary)]">
        <span>© 2026 Kim Dongha, {SITE_VERSION}</span>
        <div className="flex gap-5 ml-auto">
          <Link href="/" className="hover:text-[var(--n-text)] transition-colors">{lang === "ko" ? "홈" : "Home"}</Link>
          <Link href="/design" className="hover:text-[var(--n-text)] transition-colors">{lang === "ko" ? "서비스 디자인" : "Service design"}</Link>
          <Link href="/graphics" className="hover:text-[var(--n-text)] transition-colors">{lang === "ko" ? "그래픽" : "Graphics"}</Link>
          <Link href="/archive" className="hover:text-[var(--n-text)] transition-colors">More Works</Link>
        </div>
      </div>
    </footer>
  );
}
