"use client";

import { useEffect, useState } from "react";
import { Github, Mail, ExternalLink, Languages } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SideNav, MobileNav } from "@/components/side-nav";

const tagColors = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  gray: "bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
  red: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
} as const;

type TagColor = keyof typeof tagColors;
type Lang = "ko" | "en";
type ProjectStatus = "live" | "dev" | "case";

function Tag({ label, color = "gray" }: { label: string; color?: TagColor }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tagColors[color]}`}>
      {label}
    </span>
  );
}

function Callout({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-[var(--n-bg-callout)] border border-[var(--n-border)] rounded-md p-4 my-4">
      <span className="text-lg flex-shrink-0 leading-6">{emoji}</span>
      <p className="text-sm text-[var(--n-text)] leading-relaxed">{children}</p>
    </div>
  );
}

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mt-10 mb-4">
      <span className="text-xl">{emoji}</span>
      <h2 className="text-lg font-semibold text-[var(--n-text)]">{title}</h2>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-[var(--n-border)] my-6" />;
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

const skillGroups = [
  {
    heading: "AI Build",
    items: [
      {
        category: "Frontend & Web",
        tags: [
          { label: "React", color: "blue" },
          { label: "TypeScript", color: "blue" },
          { label: "Tailwind CSS", color: "purple" },
          { label: "JavaScript", color: "yellow" },
        ],
      },
      {
        category: "Serverless & Backend",
        tags: [
          { label: "Netlify", color: "green" },
          { label: "AWS", color: "orange" },
          { label: "Firebase", color: "yellow" },
        ],
      },
      {
        category: "Mobile",
        tags: [
          { label: "Flutter", color: "blue" },
          { label: "Dart", color: "blue" },
        ],
      },
      {
        category: "AI",
        tags: [
          { label: "Claude API", color: "pink" },
          { label: "OpenAI API", color: "green" },
          { label: "Cursor", color: "blue" },
          { label: "AI Integration", color: "pink" },
        ],
      },
    ],
  },
  {
    heading: "Skills",
    items: [
      {
        category: "UX/UI Design",
        tags: [
          { label: "Figma", color: "purple" },
          { label: "Adobe", color: "red" },
          { label: "Prototyping", color: "orange" },
          { label: "User Research", color: "blue" },
          { label: "Design System", color: "gray" },
        ],
      },
      {
        category: "CMS Publishing",
        tags: [
          { label: "WordPress", color: "blue" },
          { label: "Divi Theme", color: "purple" },
        ],
      },
      {
        category: "Work Tools",
        tags: [
          { label: "Google Workspace", color: "green" },
          { label: "Docswave", color: "blue" },
          { label: "Monday.com", color: "red" },
        ],
      },
      {
        category: "Documentation",
        tags: [
          { label: "Notion", color: "gray" },
          { label: "Jira", color: "blue" },
          { label: "Confluence", color: "blue" },
        ],
      },
    ],
  },
] satisfies {
  heading: string | null;
  items: { category: string; tags: { label: string; color: TagColor }[] }[];
}[];

const careerTags = [
  [
    { label: "Claude API", color: "pink" },
    { label: "OpenAI API", color: "green" },
    { label: "AI Integration", color: "pink" },
    { label: "Next.js", color: "gray" },
  ],
  [
    { label: "Figma", color: "purple" },
    { label: "Prototyping", color: "orange" },
    { label: "User Research", color: "blue" },
    { label: "Design System", color: "gray" },
  ],
  [
    { label: "Marketing Design", color: "red" },
    { label: "UX/UI", color: "purple" },
    { label: "Adobe", color: "red" },
    { label: "Branding", color: "orange" },
  ],
] satisfies { label: string; color: TagColor }[][];

const projectTags = [
  [
    { label: "Flutter", color: "blue" },
    { label: "OCR", color: "orange" },
    { label: "AdMob", color: "yellow" },
  ],
  [
    { label: "Flutter", color: "blue" },
    { label: "REST API", color: "green" },
    { label: "AdMob", color: "yellow" },
  ],
  [
    { label: "Flutter", color: "blue" },
    { label: "Firebase", color: "yellow" },
    { label: "Google Maps", color: "green" },
  ],
  [
    { label: "Python", color: "blue" },
    { label: "LLM", color: "pink" },
    { label: "Automation", color: "purple" },
  ],
  [
    { label: "Node.js", color: "green" },
    { label: "Supabase", color: "green" },
    { label: "Automation", color: "purple" },
  ],
  [
    { label: "Node.js", color: "green" },
    { label: "Apify", color: "gray" },
    { label: "Telegram Bot", color: "blue" },
  ],
  [
    { label: "Flutter", color: "blue" },
    { label: "Firestore", color: "yellow" },
    { label: "Riverpod", color: "purple" },
  ],
  [
    { label: "Next.js", color: "gray" },
    { label: "Supabase", color: "green" },
    { label: "LLM", color: "pink" },
  ],
] satisfies { label: string; color: TagColor }[][];

const projectStatuses: ProjectStatus[] = [
  "live",
  "live",
  "live",
  "case",
  "dev",
  "dev",
  "case",
  "case",
];

const content = {
  ko: {
    name: "김동하",
    subtitle: "AI Builder · UX/UI Designer",
    nav: ["홈", "소개", "사용하는 도구", "경력", "프로젝트", "연락처"],
    props: { email: "이메일", github: "GitHub", experience: "경력", experienceValue: "5+ 년", status: "상태", statusValue: "구직 중" },
    sections: { about: "소개", skills: "사용하는 도구", career: "경력", projects: "프로젝트", contact: "연락처" },
    aboutCallout:
      "프로덕트 기획부터 프로토타입 개발, 서비스 환경 구축까지 전 과정을 제공합니다.",
    aboutBody:
      "AI 기술과 Flutter를 활용한 크로스 플랫폼 앱 개발에 집중하며, 웹 서비스와 모바일 앱을 통합한 디지털 솔루션을 제공합니다. 디자인 중심의 개발 철학으로 사용자 친화적인 인터페이스를 구현하고, 지속적인 기술 연구와 혁신을 통해 더 나은 디지털 경험을 만들어갑니다.",
    stats: [
      { value: "5+", label: "UX/UI 경력" },
      { value: "1+", label: "AI Builder" },
      { value: "10+", label: "사용하는 도구" },
      { value: "100%", label: "성실함" },
    ],
    career: [
      {
        period: "2025 — 현재",
        title: "AI Builder",
        desc: "Claude, OpenAI API 등 AI를 활용한 웹 서비스 및 앱 기획·개발. Cursor 등 AI 도구 기반 고속 프로토타이핑.",
      },
      {
        period: "2020 — 2025",
        title: "UX/UI 디자이너",
        desc: "모바일·웹 서비스 UX 리서치, UI 디자인, 프로토타이핑. 디자인 시스템 구축 및 개발팀 협업.",
      },
      {
        period: "2019 — 2020",
        title: "마케팅 디자인 · UX/UI 디자인 매니저",
        desc: "헬스케어 회사에서 마케팅 디자인과 UX/UI 디자인 매니저로 브랜드·프로덕트 디자인 전반을 담당.",
      },
    ],
    statusLabels: { live: "LIVE", dev: "In dev", case: "Study" },
    projectSummary: (total: number, live: number, dev: number, cs: number) =>
      `총 ${total}개 · LIVE ${live} · 개발 중 ${dev} · 케이스 스터디 ${cs}`,
    projects: [
      { title: "OCR 기반 노트 생성 앱", desc: "촬영·스캔 문서를 구조화된 노트로 변환하는 모바일 앱. 스토어 출시 및 운영 중." },
      { title: "실시간 환율 변환 앱", desc: "20개 통화 실시간 환율 조회·변환. 스토어 출시 및 운영 중." },
      { title: "장소 기록 모바일 앱", desc: "장소를 카드로 기록·탐색. 필드 암호화, 다국어, 지도 연동 포함 프로덕션 운영." },
      { title: "블로그 콘텐츠 자동 발행 파이프라인", desc: "키워드 수집부터 원고 생성·발행까지 무인 운영한 일일 자동 발행 시스템." },
      { title: "SNS 카드뉴스 자동화 파이프라인", desc: "소재 수집 → 카드 렌더링 → 게시까지 이어지는 멀티 계정 콘텐츠 자동화." },
      { title: "해외 신상품 모니터링 시스템", desc: "해외 커머스 신상품을 수집·필터링해 메신저로 발송하는 소싱 레이더." },
      { title: "단체 주문 자동화 앱", desc: "링크 공유로 참여자 주문을 자동 집계. 비회원 참여, 실시간 동기화 설계." },
      { title: "주간 식단·장보기 리스트 생성기", desc: "가구 제약(알레르기·예산·조리 실력)을 반영한 7일 식단과 합산 장보기 리스트 MVP." },
    ],
    projectsNote: "모든 프로젝트는 비공개로 운영됩니다. 상세 케이스 스터디와 시연은 문의 시 공유 가능합니다.",
    contactEmail: "이메일",
  },
  en: {
    name: "Kim Dongha",
    subtitle: "AI Builder · UX/UI Designer",
    nav: ["Home", "About", "Skills", "Career", "Projects", "Contact"],
    props: { email: "Email", github: "GitHub", experience: "Experience", experienceValue: "5+ years", status: "Status", statusValue: "Open to work" },
    sections: { about: "About", skills: "Skills", career: "Career", projects: "Projects", contact: "Contact" },
    aboutCallout:
      "I cover the full journey from product planning to prototype development and service infrastructure setup.",
    aboutBody:
      "I focus on cross-platform app development combining AI and Flutter, delivering digital solutions that unify web services and mobile apps. With a design-driven development philosophy, I craft user-friendly interfaces and keep improving digital experiences through continuous research and innovation.",
    stats: [
      { value: "5+", label: "Years in UX/UI" },
      { value: "1+", label: "AI Builder" },
      { value: "10+", label: "Tech stacks" },
      { value: "100%", label: "Commitment" },
    ],
    career: [
      {
        period: "2025 — Present",
        title: "AI Builder",
        desc: "Planning and building AI-powered web services and apps with Claude and OpenAI APIs. Rapid prototyping with AI tools such as Cursor.",
      },
      {
        period: "2020 — 2025",
        title: "UX/UI Designer",
        desc: "UX research, UI design, and prototyping for mobile and web services. Built design systems and collaborated with engineering teams.",
      },
      {
        period: "2019 — 2020",
        title: "Marketing Design · UX/UI Design Manager",
        desc: "Led marketing design and UX/UI as design manager at a healthcare company, covering brand and product design.",
      },
    ],
    statusLabels: { live: "LIVE", dev: "In dev", case: "Study" },
    projectSummary: (total: number, live: number, dev: number, cs: number) =>
      `${total} total · ${live} live · ${dev} in development · ${cs} case studies`,
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
    projectsNote: "All projects are privately operated. Detailed case studies and demos are available on request.",
    contactEmail: "Email",
  },
} satisfies Record<Lang, unknown>;

const statusMeta: Record<ProjectStatus, { dot: string; text: string }> = {
  live: {
    dot: "bg-green-500 animate-pulse",
    text: "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950",
  },
  dev: {
    dot: "bg-yellow-500",
    text: "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950",
  },
  case: {
    dot: "bg-gray-400",
    text: "text-gray-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-800",
  },
};

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${meta.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {label}
    </span>
  );
}


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
  const liveCount = projectStatuses.filter((s) => s === "live").length;
  const devCount = projectStatuses.filter((s) => s === "dev").length;
  const caseCount = projectStatuses.filter((s) => s === "case").length;

  return (
    <div className="flex min-h-screen bg-[var(--n-bg)]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Sidebar ── */}
      <SideNav lang={lang} onToggleLang={toggleLang} active="home" />

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 flex items-center gap-2 px-4 h-14 bg-[var(--n-bg-sidebar)]/90 backdrop-blur border-b border-[var(--n-border)]">
          <MobileNav lang={lang} onToggleLang={toggleLang} active="home" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Kim Dongha" className="w-6 h-6 rounded object-cover shrink-0" />
          <span className="text-sm font-semibold text-[var(--n-text)]">Kim Dongha</span>
          <div className="ml-auto flex items-center">
            <LangToggle lang={lang} onToggle={toggleLang} />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Page icon */}
          <div className="mt-12 mb-3 text-6xl select-none">🧑‍💻</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[var(--n-text)] mb-1 tracking-tight">{t.name}</h1>
          <p className="text-[var(--n-text-secondary)] text-base mb-6">{t.subtitle}</p>

          {/* Properties */}
          <div className="text-sm space-y-2 mb-6">
            {[
              { key: t.props.email, value: "samdongpm@gmail.com", href: "mailto:samdongpm@gmail.com" },
              { key: t.props.github, value: "github.com/ahgnodmik", href: "https://github.com/ahgnodmik" },
              { key: t.props.experience, value: t.props.experienceValue },
            ].map((prop) => (
              <div key={prop.key} className="flex items-center gap-0">
                <span className="w-28 shrink-0 text-[var(--n-text-tertiary)]">{prop.key}</span>
                {prop.href ? (
                  <a href={prop.href} className="text-[var(--n-text)] hover:underline underline-offset-2">
                    {prop.value}
                  </a>
                ) : (
                  <span className="text-[var(--n-text)]">{prop.value}</span>
                )}
              </div>
            ))}
            <div className="flex items-center gap-0">
              <span className="w-28 shrink-0 text-[var(--n-text-tertiary)]">{t.props.status}</span>
              <Tag label={t.props.statusValue} color="green" />
            </div>
          </div>

          <Divider />

          {/* ── About ── */}
          <section id="about">
            <SectionHeading emoji="👋" title={t.sections.about} />

            <Callout emoji="💡">{t.aboutCallout}</Callout>

            <p className="text-sm text-[var(--n-text)] leading-7">{t.aboutBody}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {t.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[var(--n-bg-callout)] border border-[var(--n-border)] rounded-md p-4 text-center"
                >
                  <p className="text-2xl font-bold text-[var(--n-text)]">{stat.value}</p>
                  <p className="text-xs text-[var(--n-text-secondary)] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Skills ── */}
          <section id="skills">
            <SectionHeading emoji="⚙️" title={t.sections.skills} />

            <div className="space-y-4">
              {skillGroups.map((group, gi) => (
                <div key={gi}>
                  {group.heading && (
                    <p className="text-sm font-medium text-[var(--n-text)] mb-1">{group.heading}</p>
                  )}
                  <div className="divide-y divide-[var(--n-divide)]">
                    {group.items.map((item) => (
                      <div key={item.category} className="flex items-start gap-4 py-3">
                        <span className="w-44 shrink-0 text-xs text-[var(--n-text-tertiary)] pt-0.5">{item.category}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Tag key={tag.label} label={tag.label} color={tag.color} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Career ── */}
          <section id="career">
            <SectionHeading emoji="💼" title={t.sections.career} />

            <div className="relative pl-6 space-y-8 before:absolute before:left-[5px] before:top-1 before:bottom-1 before:w-px before:bg-[var(--n-border)]">
              {t.career.map((item, i) => (
                <div key={item.period} className="relative">
                  <span className="absolute -left-6 top-1.5 w-[11px] h-[11px] rounded-full bg-[var(--n-bg)] border-2 border-[var(--n-text-tertiary)]" />
                  <p className="text-xs text-[var(--n-text-tertiary)] mb-0.5">{item.period}</p>
                  <p className="text-sm font-medium text-[var(--n-text)]">{item.title}</p>
                  <p className="text-xs text-[var(--n-text-secondary)] mt-1 leading-5">{item.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {careerTags[i].map((tag) => (
                      <Tag key={tag.label} label={tag.label} color={tag.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Projects ── */}
          <section id="projects">
            <SectionHeading emoji="📋" title={t.sections.projects} />

            <div className="flex items-center gap-4 mt-2 mb-3 pl-3 text-[11px] text-[var(--n-text-tertiary)]">
              <span>{t.projectSummary(t.projects.length, liveCount, devCount, caseCount)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
              {(["live", "dev", "case"] as ProjectStatus[]).flatMap((group) =>
                t.projects
                  .map((project, i) => ({ ...project, status: projectStatuses[i], tags: projectTags[i] }))
                  .filter((p) => p.status === group)
                  .map((project) => (
                    <div
                      key={project.title}
                      className="flex flex-col gap-2 p-4 rounded-lg border border-[var(--n-border)] hover:bg-[var(--n-bg-callout)] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-[var(--n-text)] leading-5">{project.title}</span>
                        <StatusBadge status={project.status} label={t.statusLabels[project.status]} />
                      </div>
                      <p className="text-xs text-[var(--n-text-secondary)] leading-5 line-clamp-2">{project.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag.label} label={tag.label} color={tag.color} />
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>

            <p className="text-xs text-[var(--n-text-tertiary)] mt-4 pl-3 italic">{t.projectsNote}</p>
          </section>

          <Divider />

          {/* ── Contact ── */}
          <section id="contact">
            <SectionHeading emoji="📬" title={t.sections.contact} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <a
                href="mailto:samdongpm@gmail.com"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[var(--n-bg-callout)] transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-[var(--n-bg-hover)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[var(--n-text-secondary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--n-text)]">{t.contactEmail}</p>
                  <p className="text-xs text-[var(--n-text-secondary)]">samdongpm@gmail.com</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--n-text-tertiary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="https://github.com/ahgnodmik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[var(--n-bg-callout)] transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-[var(--n-bg-hover)] flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4 text-[var(--n-text-secondary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--n-text)]">GitHub</p>
                  <p className="text-xs text-[var(--n-text-secondary)]">github.com/ahgnodmik</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--n-text-tertiary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
