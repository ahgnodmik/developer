"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader, SITE_VERSION } from "@/components/site-header";
import type { Lang } from "@/lib/design";

type ProjectStatus = "live" | "dev" | "case";

const FONT_STACK = "var(--font-geist-sans), 'Pretendard Variable', Pretendard, system-ui, sans-serif";
const CONTAINER = "max-w-[1400px] mx-auto px-5 md:px-10";

// Career ruler spans 2019 to "now" (Oct 2026); bars and ticks are positioned as % of this range.
const RULER_START = 2019;
const RULER_END = 2026.8;
const rulerPos = (year: number) => ((year - RULER_START) / (RULER_END - RULER_START)) * 100;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Figma-style selection frame around a label: the "designer" half of the identity diptych.
function SelectionFrame({ children }: { children: React.ReactNode }) {
  const handle = "absolute w-1.5 h-1.5 bg-[var(--n-bg)] border border-[var(--n-accent)]";
  return (
    <span className="relative inline-block px-2.5 py-1 border border-[var(--n-accent)] text-sm font-medium text-[var(--n-text)]">
      {children}
      <span className={`${handle} -left-[4px] -top-[4px]`} />
      <span className={`${handle} -right-[4px] -top-[4px]`} />
      <span className={`${handle} -left-[4px] -bottom-[4px]`} />
      <span className={`${handle} -right-[4px] -bottom-[4px]`} />
    </span>
  );
}

function LiveSticker({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 -rotate-3 px-2 py-0.5 rounded-[3px] bg-[var(--n-brand)] text-white text-[11px] font-semibold tracking-wide whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-white motion-safe:animate-pulse" />
      {label}
    </span>
  );
}

const skillGroups = [
  { heading: "AI Build", tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Flutter", "Dart", "Firebase", "AWS", "Netlify", "Claude API", "OpenAI API", "Cursor"] },
  { heading: "Design & Work", tags: ["Figma", "Adobe", "Prototyping", "User Research", "Design System", "WordPress", "아임웹", "카페24", "Notion", "Jira", "Confluence", "Monday.com"] },
];

// Index-aligned with content.{ko,en}.career
const careerMeta = [
  { from: 2025, to: RULER_END },
  { from: 2020, to: 2025 },
  { from: 2019, to: 2020 },
];

// Index-aligned with content.{ko,en}.projects
const projectTags = [
  ["Flutter", "OCR", "AdMob"],
  ["Flutter", "REST API", "AdMob"],
  ["Flutter", "Firebase", "Google Maps"],
  ["Python", "LLM", "Automation"],
  ["Node.js", "Supabase", "Automation"],
  ["Node.js", "Apify", "Telegram Bot"],
  ["Flutter", "Firestore", "Riverpod"],
  ["Next.js", "Supabase", "LLM"],
];

const projectStatuses: ProjectStatus[] = ["live", "live", "live", "case", "dev", "dev", "case", "case"];

// Generated duotone covers for the LIVE apps (abstract, no real UI), index-aligned with live projects.
const liveCovers = ["/work/ocr.webp", "/work/currency.webp", "/work/place.webp"];

const content = {
  ko: {
    name: "김동하",
    role: "AI Builder, UX/UI Designer",
    headline: "디자인하고, AI로 직접 만들고, 운영합니다",
    experience: "디자인 10+ 년",
    status: "구직 중",
    seeWork: "대표 작업 보기",
    identity: {
      design: { role: "UX/UI Designer", years: "5+", unit: "년", desc: "리서치, UI 디자인, 프로토타입, 디자인 시스템 구축" },
      build: { role: "AIBuilder", years: "1+", unit: "년", desc: "Claude와 OpenAI API, Flutter, Next.js로 기획부터 출시까지" },
    },
    aboutLead: "프로덕트 기획부터 프로토타입 개발, 서비스 환경 구축까지 전 과정을 제공합니다.",
    aboutBody:
      "AI 기술과 Flutter를 활용한 크로스 플랫폼 앱 개발에 집중하며, 웹 서비스와 모바일 앱을 통합한 디지털 솔루션을 제공합니다. 디자인 중심의 개발 철학으로 사용자 친화적인 인터페이스를 구현하고, 지속적인 기술 연구와 혁신을 통해 더 나은 디지털 경험을 만들어갑니다.",
    work: { title: "대표 작업", note: "스토어에 출시해 운영 중인 앱 3개. 서비스명과 코드는 비공개입니다." },
    more: { title: "더 많은 프로젝트", note: "상세 케이스 스터디와 시연은 문의 시 공유합니다." },
    designCta: { title: "서비스 디자인 케이스 스터디", body: "B2B 관제 시스템, 챗봇, 퍼블리싱 등 디자인 작업 모음", link: "디자인 작업 보기", archive: "More Works" },
    career: {
      title: "경력과 도구",
      items: [
        { period: "2025 - 현재", short: "AI Builder", title: "AI Builder", desc: "Claude, OpenAI API 등 AI를 활용한 웹 서비스 및 앱 기획·개발. Cursor 등 AI 도구 기반 고속 프로토타이핑." },
        { period: "2020 - 2025", short: "UX/UI", title: "UX/UI 디자이너", desc: "모바일·웹 서비스 UX 리서치, UI 디자인, 프로토타이핑. 디자인 시스템 구축 및 개발팀 협업." },
        { period: "2019 - 2020", short: "Marketing", title: "마케팅 디자인, UX/UI 디자인 매니저", desc: "헬스케어 회사에서 마케팅 디자인과 UX/UI 디자인 매니저로 브랜드·프로덕트 디자인 전반을 담당." },
      ],
    },
    statusLabels: { live: "LIVE", dev: "개발 중", case: "케이스 스터디" },
    projects: [
      { title: "OCR 기반 노트 생성 앱", desc: "촬영·스캔 문서를 구조화된 노트로 변환하는 모바일 앱. 스토어 출시 및 운영 중." },
      { title: "실시간 환율 변환 앱", desc: "20개 통화 실시간 환율 조회·변환. 스토어 출시 및 운영 중." },
      { title: "장소 기록 모바일 앱", desc: "장소를 카드로 기록·탐색. 필드 암호화, 다국어, 지도 연동 포함 프로덕션 운영." },
      { title: "블로그 콘텐츠 자동 발행 파이프라인", desc: "키워드 수집부터 원고 생성·발행까지 무인 운영한 일일 자동 발행 시스템." },
      { title: "SNS 카드뉴스 자동화 파이프라인", desc: "소재 수집, 카드 렌더링, 게시까지 이어지는 멀티 계정 콘텐츠 자동화." },
      { title: "해외 신상품 모니터링 시스템", desc: "해외 커머스 신상품을 수집·필터링해 메신저로 발송하는 소싱 레이더." },
      { title: "단체 주문 자동화 앱", desc: "링크 공유로 참여자 주문을 자동 집계. 비회원 참여, 실시간 동기화 설계." },
      { title: "주간 식단·장보기 리스트 생성기", desc: "가구 제약(알레르기, 예산, 조리 실력)을 반영한 7일 식단과 합산 장보기 리스트 MVP." },
    ],
    contact: { label: "연락처", lead: "프로젝트나 채용 관련 문의는 메일로 받습니다." },
  },
  en: {
    name: "Kim Dongha",
    role: "AI Builder, UX/UI Designer",
    headline: "I design it, build it with AI, and keep it running",
    experience: "10+ years in design",
    status: "Open to work",
    seeWork: "See selected work",
    identity: {
      design: { role: "UX/UI Designer", years: "5+", unit: "yrs", desc: "Research, UI design, prototyping, and design systems" },
      build: { role: "AIBuilder", years: "1+", unit: "yr", desc: "From planning to launch with Claude, OpenAI APIs, Flutter, and Next.js" },
    },
    aboutLead: "I cover the full journey from product planning to prototype development and service infrastructure setup.",
    aboutBody:
      "I focus on cross-platform app development combining AI and Flutter, delivering digital solutions that unify web services and mobile apps. With a design-driven development philosophy, I craft user-friendly interfaces and keep improving digital experiences through continuous research and innovation.",
    work: { title: "Selected work", note: "Three apps live in production. Names and code stay private." },
    more: { title: "More projects", note: "Detailed case studies and demos are available on request." },
    designCta: { title: "Service design case studies", body: "B2B monitoring systems, chatbots, publishing, and more", link: "View design work", archive: "More works" },
    career: {
      title: "Career and tools",
      items: [
        { period: "2025 - Present", short: "AI Builder", title: "AI Builder", desc: "Planning and building AI-powered web services and apps with Claude and OpenAI APIs. Rapid prototyping with AI tools such as Cursor." },
        { period: "2020 - 2025", short: "UX/UI", title: "UX/UI Designer", desc: "UX research, UI design, and prototyping for mobile and web services. Built design systems and collaborated with engineering teams." },
        { period: "2019 - 2020", short: "Marketing", title: "Marketing Design, UX/UI Design Manager", desc: "Led marketing design and UX/UI as design manager at a healthcare company, covering brand and product design." },
      ],
    },
    statusLabels: { live: "LIVE", dev: "In development", case: "Case study" },
    projects: [
      { title: "OCR Note-Taking App", desc: "Mobile app that turns captured or scanned documents into structured notes. Published and live on the store." },
      { title: "Real-Time Currency Converter", desc: "Real-time exchange rates and conversion across 20 currencies. Published and live on the store." },
      { title: "Place-Logging Mobile App", desc: "Save and explore places as cards. In production with field encryption, i18n, and map integration." },
      { title: "Automated Blog Publishing Pipeline", desc: "Daily publishing system that ran unattended from keyword research to article generation and posting." },
      { title: "Social Card-News Automation Pipeline", desc: "Multi-account content automation covering sourcing, card rendering, and posting." },
      { title: "Overseas New-Product Monitoring System", desc: "Sourcing radar that collects and filters new overseas commerce products and delivers them via messenger." },
      { title: "Group Ordering Automation App", desc: "Auto-aggregates participant orders via shared link. Designed for guest participation and real-time sync." },
      { title: "Weekly Meal Plan & Grocery List Generator", desc: "MVP generating 7-day meal plans and consolidated grocery lists that respect allergies, budget, and cooking skill." },
    ],
    contact: { label: "Contact", lead: "For projects or hiring, email works best." },
  },
} satisfies Record<Lang, unknown>;

export default function Home() {
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

  const t = content[lang];
  const projects = t.projects.map((p, i) => ({ ...p, status: projectStatuses[i], tags: projectTags[i] }));
  const liveProjects = projects.filter((p) => p.status === "live");
  const otherProjects = projects
    .filter((p) => p.status !== "live")
    .sort((a, b) => (a.status === b.status ? 0 : a.status === "dev" ? -1 : 1));
  const devCount = otherProjects.filter((p) => p.status === "dev").length;
  const rulerYears = Array.from({ length: Math.floor(RULER_END) - RULER_START + 1 }, (_, i) => RULER_START + i);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--n-bg)] text-[var(--n-text)] break-keep" style={{ fontFamily: FONT_STACK }}>
        <SiteHeader lang={lang} onToggleLang={toggleLang} active="home" />

        <main>
          {/* ── Hero ── */}
          <section className={`${CONTAINER} flex flex-col justify-between md:min-h-[calc(100dvh-3.5rem)] pt-16 md:pt-24 pb-10`}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[11ch] text-[clamp(3rem,10.5vw,10.5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance"
            >
              <span className="sr-only">{t.name}, </span>
              {t.headline}
              <span aria-hidden className="inline-block ml-[0.08em] w-[0.22em] h-[0.22em] rounded-full bg-[var(--n-accent)] align-baseline" />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-16 grid gap-6 md:grid-cols-12 md:items-end pt-6 border-t border-[var(--n-border)]"
            >
              <div className="md:col-span-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.jpeg" alt="" className="w-12 h-12 rounded-lg object-cover ring-1 ring-[var(--n-border)]" />
                <div className="text-sm leading-5">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-[var(--n-text-secondary)]">{t.role}</p>
                </div>
              </div>
              <dl className="md:col-span-4 grid grid-cols-[4.5rem_1fr] gap-y-1 text-sm">
                <dt className="font-mono text-xs leading-5 text-[var(--n-text-tertiary)]">Email</dt>
                <dd><a href="mailto:samdongpm@gmail.com" className="hover:text-[var(--n-accent)] transition-colors">samdongpm@gmail.com</a></dd>
                <dt className="font-mono text-xs leading-5 text-[var(--n-text-tertiary)]">GitHub</dt>
                <dd><a href="https://github.com/ahgnodmik" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--n-accent)] transition-colors">ahgnodmik</a></dd>
                <dt className="font-mono text-xs leading-5 text-[var(--n-text-tertiary)]">Exp.</dt>
                <dd>{t.experience}</dd>
              </dl>
              <div className="md:col-span-4 flex items-center gap-5 md:justify-end">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--n-accent-bg)] text-[var(--n-accent)]">{t.status}</span>
                <a href="#projects" className="group inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 decoration-[var(--n-border)] hover:decoration-[var(--n-accent)] transition-colors">
                  {t.seeWork}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          </section>

          {/* ── Identity diptych + about ── */}
          <section id="about" className={`${CONTAINER} scroll-mt-14 py-20 md:py-28`}>
            <Reveal className="grid md:grid-cols-2 border border-[var(--n-border)]">
              <div className="p-7 md:p-12">
                <SelectionFrame>{t.identity.design.role}</SelectionFrame>
                <p className="mt-12 text-[clamp(4.5rem,10vw,9rem)] leading-none font-light tracking-[-0.05em] tabular-nums">
                  {t.identity.design.years}
                  <span className="ml-2 text-base font-medium tracking-normal text-[var(--n-text-secondary)]">{t.identity.design.unit}</span>
                </p>
                <p className="mt-4 text-sm text-[var(--n-text-secondary)]">{t.identity.design.desc}</p>
              </div>
              <div className="p-7 md:p-12 bg-[var(--n-brand)] text-white">
                <p className="inline-block py-1 font-mono text-sm">
                  &lt;{t.identity.build.role} /&gt;
                  <span aria-hidden className="inline-block w-[0.55em] h-[1.1em] ml-1.5 -mb-[0.2em] bg-white motion-safe:animate-pulse" />
                </p>
                <p className="mt-12 font-mono text-[clamp(4.5rem,10vw,9rem)] leading-none font-light tracking-[-0.06em] tabular-nums">
                  {t.identity.build.years}
                  <span className="ml-2 font-sans text-base font-medium tracking-normal text-white/75">{t.identity.build.unit}</span>
                </p>
                <p className="mt-4 text-sm text-white/80">{t.identity.build.desc}</p>
              </div>
            </Reveal>

            <Reveal className="mt-16 md:mt-24 grid gap-8 md:grid-cols-12">
              <p className="md:col-span-7 text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.2] font-medium tracking-[-0.025em] text-balance">{t.aboutLead}</p>
              <p className="md:col-span-4 md:col-start-9 text-sm leading-7 text-[var(--n-text-secondary)] text-pretty md:pt-2">{t.aboutBody}</p>
            </Reveal>
          </section>

          {/* ── Selected work ── */}
          <section id="projects" className={`${CONTAINER} scroll-mt-14 py-20 md:py-28 border-t border-[var(--n-border)]`}>
            <Reveal className="grid gap-4 md:grid-cols-12 md:items-end mb-10 md:mb-14">
              <h2 className="md:col-span-8 text-[clamp(2.4rem,5.5vw,5rem)] leading-none font-medium tracking-[-0.04em]">{t.work.title}</h2>
              <p className="md:col-span-4 text-sm leading-6 text-[var(--n-text-secondary)] md:text-right">{t.work.note}</p>
            </Reveal>

            <Reveal className="grid md:grid-cols-12 md:grid-rows-2 gap-px bg-[var(--n-border)] border border-[var(--n-border)]">
              {liveProjects.map((project, i) => (
                <article
                  key={project.title}
                  className={`group flex flex-col bg-[var(--n-bg)] ${i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}
                >
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-[360px]" : "aspect-[16/9]"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={liveCovers[i]}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <LiveSticker label={t.statusLabels.live} />
                    <h3 className={`mt-3 font-medium tracking-tight ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>{project.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--n-text-secondary)]">{project.desc}</p>
                    <p className="mt-3 font-mono text-xs text-[var(--n-text-tertiary)]">{project.tags.join(" / ")}</p>
                  </div>
                </article>
              ))}
            </Reveal>

            {/* ── More projects: dossier index ── */}
            <div className="mt-24 md:mt-32 grid gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-4">
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.035em]">{t.more.title}</h2>
                <p className="mt-5 font-mono text-xs leading-6 text-[var(--n-text-tertiary)]">
                  {t.statusLabels.dev} ({devCount})<br />
                  {t.statusLabels.case} ({otherProjects.length - devCount})
                </p>
              </Reveal>
              <Reveal className="md:col-span-8 border-t border-[var(--n-text)]">
                {otherProjects.map((project) => (
                  <div
                    key={project.title}
                    className="grid gap-1 md:grid-cols-[1fr_15rem] md:gap-8 py-6 px-1 md:px-3 -mx-1 md:-mx-3 hover:bg-[var(--n-bg-hover)] transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--n-text-secondary)]">{project.desc}</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-xs text-[var(--n-text-secondary)]">{t.statusLabels[project.status]}</p>
                      <p className="mt-1 font-mono text-xs text-[var(--n-text-tertiary)]">{project.tags.join(" / ")}</p>
                    </div>
                  </div>
                ))}
                <p className="mt-4 text-xs text-[var(--n-text-tertiary)]">{t.more.note}</p>
              </Reveal>
            </div>

            {/* Link out to the design case studies */}
            <Reveal className="mt-20 md:mt-28">
              <Link
                href="/design"
                className="group flex flex-col md:flex-row md:items-end justify-between gap-6 p-7 md:p-12 border border-[var(--n-border)] hover:border-[var(--n-accent)] transition-colors"
              >
                <div>
                  <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight font-medium tracking-[-0.03em]">{t.designCta.title}</h2>
                  <p className="mt-2 text-sm text-[var(--n-text-secondary)]">{t.designCta.body}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--n-accent)] underline underline-offset-4 shrink-0">
                  {t.designCta.link}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link href="/archive" className="inline-flex mt-4 text-sm text-[var(--n-text-secondary)] hover:text-[var(--n-accent)] transition-colors">
                {t.designCta.archive} <ArrowRight className="w-4 h-4 ml-1 self-center" />
              </Link>
            </Reveal>
          </section>

          {/* ── Career & tools ── */}
          <section id="career" className={`${CONTAINER} scroll-mt-14 py-20 md:py-28 border-t border-[var(--n-border)]`}>
            <Reveal>
              <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] leading-none font-medium tracking-[-0.04em]">{t.career.title}</h2>
            </Reveal>

            {/* Ruler timeline */}
            <Reveal className="mt-14" >
              <div aria-hidden className="space-y-2">
                {[...t.career.items].reverse().map((item, ri) => {
                  const i = t.career.items.length - 1 - ri;
                  const meta = careerMeta[i];
                  return (
                    <div key={item.period} className="relative h-8">
                      <div
                        className={`absolute inset-y-0 flex items-center px-3 text-xs font-medium whitespace-nowrap overflow-hidden ${
                          i === 0 ? "bg-[var(--n-brand)] text-white" : "border border-[var(--n-accent)] text-[var(--n-accent)]"
                        }`}
                        style={{ left: `${rulerPos(meta.from)}%`, width: `${rulerPos(meta.to) - rulerPos(meta.from)}%` }}
                      >
                        {/* labels don't fit the short bars at phone width (16px text floor) */}
                        <span className="hidden sm:inline">{item.short}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div aria-hidden className="relative mt-4 h-8 border-t border-[var(--n-text)]">
                {Array.from({ length: Math.floor((RULER_END - RULER_START) * 4) + 1 }, (_, q) => RULER_START + q / 4).map((tick) => {
                  const major = Number.isInteger(tick);
                  return (
                    <div key={tick} className="absolute top-0" style={{ left: `${rulerPos(tick)}%` }}>
                      <span className={`block w-px bg-[var(--n-text)] ${major ? "h-2.5" : "h-1 opacity-50"}`} />
                    </div>
                  );
                })}
                {rulerYears.map((year) => (
                  <span
                    key={year}
                    className={`absolute top-3.5 -translate-x-1/2 font-mono text-[11px] text-[var(--n-text-tertiary)] tabular-nums ${year % 2 ? "hidden sm:block" : ""}`}
                    style={{ left: `${rulerPos(year)}%` }}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {t.career.items.map((item, i) => (
                <Reveal key={item.period} delay={i * 0.08}>
                  <p className="font-mono text-xs text-[var(--n-text-tertiary)] tabular-nums">{item.period}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--n-text-secondary)]">{item.desc}</p>
                </Reveal>
              ))}
            </div>

            {/* Tools as a type specimen */}
            <div id="skills" className="scroll-mt-14 mt-24 md:mt-32 grid gap-12 md:grid-cols-2 md:gap-16">
              {skillGroups.map((group) => (
                <Reveal key={group.heading}>
                  <p className="pb-3 mb-5 font-mono text-xs text-[var(--n-accent)] border-b border-[var(--n-border)]">{group.heading}</p>
                  <p className="flex flex-wrap gap-x-5 gap-y-1 text-[clamp(1.35rem,2.2vw,2rem)] font-medium tracking-[-0.02em] leading-snug">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Contact (brand field) ── */}
          <section id="contact" className="scroll-mt-14 relative overflow-hidden bg-[var(--n-brand)] text-white">
            <span aria-hidden className="hidden md:block pointer-events-none absolute -right-[14vw] top-[42%] -translate-y-1/2 w-[44vw] h-[44vw] rounded-full border border-white/25" />
            <div className={`${CONTAINER} relative pt-24 md:pt-32`}>
              <p className="text-sm text-white/80">{t.contact.label}</p>
              <a
                href="mailto:samdongpm@gmail.com"
                className="group mt-6 inline-flex flex-wrap items-center gap-x-4 text-[clamp(1.6rem,7vw,6.5rem)] leading-none font-medium tracking-[-0.045em] hover:opacity-85 transition-opacity"
              >
                samdongpm@gmail.com
                <ArrowRight className="w-[0.7em] h-[0.7em] transition-transform group-hover:translate-x-2" strokeWidth={1.5} />
              </a>
              <p className="mt-8 text-sm text-white/80">{t.contact.lead}</p>
              <a href="https://github.com/ahgnodmik" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm underline underline-offset-4 decoration-white/40 hover:decoration-white">
                github.com/ahgnodmik
              </a>

              <footer className="mt-24 md:mt-32 flex flex-wrap items-center gap-x-6 gap-y-2 py-6 border-t border-white/25 text-xs text-white/70">
                <span>© 2026 Kim Dongha, {SITE_VERSION}</span>
                <div className="flex gap-5 sm:ml-auto">
                  <Link href="/design" className="hover:text-white transition-colors">{t.designCta.link}</Link>
                  <Link href="/archive" className="hover:text-white transition-colors">More Works</Link>
                </div>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
