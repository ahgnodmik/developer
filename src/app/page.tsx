import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  Layers,
  Phone,
  FileText,
  Home as HomeIcon,
  Briefcase,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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

function NavItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
        active
          ? "bg-[var(--n-bg-active)] text-[var(--n-text)] font-medium"
          : "text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)]"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

const skills = [
  {
    category: "Frontend & Web",
    tags: [
      { label: "React", color: "blue" },
      { label: "Next.js", color: "gray" },
      { label: "TypeScript", color: "blue" },
      { label: "Tailwind CSS", color: "purple" },
      { label: "JavaScript", color: "yellow" },
    ],
  },
  {
    category: "Serverless & Backend",
    tags: [
      { label: "Vercel", color: "gray" },
      { label: "Netlify", color: "green" },
      { label: "AWS S3", color: "orange" },
      { label: "Firebase", color: "yellow" },
      { label: "Bolt.new", color: "purple" },
    ],
  },
  {
    category: "Mobile & AI",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "Dart", color: "blue" },
      { label: "AI Integration", color: "pink" },
      { label: "Cross Platform", color: "green" },
    ],
  },
] satisfies { category: string; tags: { label: string; color: TagColor }[] }[];

const career = [
  {
    period: "2023 — 현재",
    title: "프리랜서 웹 & 모바일 개발",
    desc: "React/Next.js 기반 웹 서비스와 Flutter 크로스 플랫폼 앱 개발. AI 연동 기능 구현.",
    tags: [
      { label: "Next.js", color: "gray" },
      { label: "Flutter", color: "blue" },
      { label: "AI Integration", color: "pink" },
    ],
  },
  {
    period: "2021 — 2023",
    title: "웹 서비스 개발",
    desc: "서버리스 아키텍처 기반 웹 애플리케이션 구축 및 운영. 정적 사이트 최적화와 배포 자동화.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Serverless", color: "orange" },
      { label: "Vercel", color: "gray" },
    ],
  },
  {
    period: "2020 — 2021",
    title: "웹 개발 시작",
    desc: "HTML/CSS/JavaScript 기초부터 React 생태계까지 학습하며 개인 프로젝트 다수 진행.",
    tags: [
      { label: "JavaScript", color: "yellow" },
      { label: "React", color: "blue" },
    ],
  },
] satisfies {
  period: string;
  title: string;
  desc: string;
  tags: { label: string; color: TagColor }[];
}[];

const projects = [
  {
    title: "Modern Web Application",
    desc: "React, TypeScript, Tailwind CSS를 활용한 서버리스 웹 애플리케이션",
    tags: [
      { label: "React", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "Tailwind CSS", color: "purple" },
      { label: "Vercel", color: "gray" },
    ],
    status: { label: "완료", color: "green" },
    link: null,
  },
  {
    title: "SSR Web Service",
    desc: "Next.js SSR 렌더링을 활용한 고성능 웹 서비스 플랫폼",
    tags: [
      { label: "Next.js", color: "gray" },
      { label: "SSR", color: "blue" },
      { label: "Serverless", color: "orange" },
      { label: "Edge Functions", color: "purple" },
    ],
    status: { label: "완료", color: "green" },
    link: null,
  },
  {
    title: "AI-Powered Flutter App",
    desc: "AI 기술과 Flutter를 결합한 크로스 플랫폼 모바일 애플리케이션",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "Dart", color: "blue" },
      { label: "AI Integration", color: "pink" },
      { label: "Cross Platform", color: "green" },
    ],
    status: { label: "진행 중", color: "yellow" },
    link: null,
  },
] satisfies {
  title: string;
  desc: string;
  tags: { label: string; color: TagColor }[];
  status: { label: string; color: TagColor };
  link: string | null;
}[];

const navLinks = [
  { href: "#", icon: <HomeIcon className="w-4 h-4" />, label: "홈", active: true },
  { href: "#about", icon: <FileText className="w-4 h-4" />, label: "소개" },
  { href: "#skills", icon: <Code2 className="w-4 h-4" />, label: "기술 스택" },
  { href: "#career", icon: <Briefcase className="w-4 h-4" />, label: "경력" },
  { href: "#projects", icon: <Layers className="w-4 h-4" />, label: "프로젝트" },
  { href: "#contact", icon: <Phone className="w-4 h-4" />, label: "연락처" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[var(--n-bg)]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-[var(--n-border)] h-screen sticky top-0 bg-[var(--n-bg-sidebar)] overflow-y-auto">
        {/* Workspace header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[var(--n-border)]">
          <div className="w-6 h-6 rounded bg-[#37352f] dark:bg-[#e6e6e4] flex items-center justify-center text-white dark:text-[#191919] text-xs font-bold shrink-0">
            K
          </div>
          <span className="text-sm font-semibold text-[var(--n-text)] truncate">Kim Dongha</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          <p className="px-3 mb-2 text-[11px] font-medium text-[var(--n-text-tertiary)] uppercase tracking-widest">
            Pages
          </p>
          {navLinks.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-[var(--n-border)]">
          <p className="text-[11px] text-[var(--n-text-tertiary)]">© 2025 Kim Dongha</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 flex items-center gap-2 px-4 py-2.5 bg-[var(--n-bg-sidebar)]/90 backdrop-blur border-b border-[var(--n-border)]">
          <div className="w-6 h-6 rounded bg-[#37352f] dark:bg-[#e6e6e4] flex items-center justify-center text-white dark:text-[#191919] text-xs font-bold shrink-0">
            K
          </div>
          <span className="text-sm font-semibold text-[var(--n-text)]">Kim Dongha</span>
          <nav className="ml-auto flex items-center gap-1 overflow-x-auto">
            {navLinks.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-2 py-1 rounded text-xs whitespace-nowrap text-[var(--n-text-secondary)] hover:bg-[var(--n-bg-hover)] hover:text-[var(--n-text)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </header>

        {/* Cover */}
        <div
          className="h-44 w-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--n-cover-a) 0%, var(--n-cover-b) 50%, var(--n-cover-c) 100%)",
          }}
        >
          {/* Subtle dot pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 text-[#37352f] dark:text-[#e6e6e4]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Page content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Page icon */}
          <div className="-mt-7 mb-3 text-6xl select-none">🧑‍💻</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[var(--n-text)] mb-1 tracking-tight">김동하</h1>
          <p className="text-[var(--n-text-secondary)] text-base mb-6">Junior Web & Mobile Developer</p>

          {/* Properties */}
          <div className="text-sm space-y-2 mb-6">
            {[
              { key: "이메일", value: "samdongpm@gmail.com", href: "mailto:samdongpm@gmail.com" },
              { key: "GitHub", value: "github.com/ahgnodmik", href: "https://github.com/ahgnodmik" },
              { key: "경력", value: "5+ 년" },
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
              <span className="w-28 shrink-0 text-[var(--n-text-tertiary)]">상태</span>
              <Tag label="구직 중" color="green" />
            </div>
          </div>

          <Divider />

          {/* ── About ── */}
          <section id="about">
            <SectionHeading emoji="👋" title="소개" />

            <Callout emoji="💡">
              React, Tailwind CSS, TypeScript를 기반으로 현대적인 웹 애플리케이션을 개발합니다.
              서버리스 아키텍처와 SSR 렌더링 기술을 연구하며 최적의 성능과 사용자 경험을 제공합니다.
            </Callout>

            <p className="text-sm text-[var(--n-text)] leading-7">
              AI 기술과 Flutter를 활용한 크로스 플랫폼 앱 개발에 집중하며, 웹 서비스와 모바일 앱을
              통합한 디지털 솔루션을 제공합니다. 디자인 중심의 개발 철학으로 사용자 친화적인 인터페이스를
              구현하고, 지속적인 기술 연구와 혁신을 통해 더 나은 디지털 경험을 만들어갑니다.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { value: "5+", label: "년 경력" },
                { value: "50+", label: "프로젝트" },
                { value: "10+", label: "기술 스택" },
                { value: "100%", label: "성실함" },
              ].map((stat) => (
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
            <SectionHeading emoji="⚙️" title="기술 스택" />

            <div className="divide-y divide-[var(--n-divide)]">
              {skills.map((group) => (
                <div key={group.category} className="flex items-start gap-4 py-3">
                  <span className="w-44 shrink-0 text-xs text-[var(--n-text-tertiary)] pt-0.5">{group.category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((t) => (
                      <Tag key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Career ── */}
          <section id="career">
            <SectionHeading emoji="💼" title="경력" />

            <div className="relative pl-6 space-y-8 before:absolute before:left-[5px] before:top-1 before:bottom-1 before:w-px before:bg-[var(--n-border)]">
              {career.map((item) => (
                <div key={item.period} className="relative">
                  <span className="absolute -left-6 top-1.5 w-[11px] h-[11px] rounded-full bg-[var(--n-bg)] border-2 border-[var(--n-text-tertiary)]" />
                  <p className="text-xs text-[var(--n-text-tertiary)] mb-0.5">{item.period}</p>
                  <p className="text-sm font-medium text-[var(--n-text)]">{item.title}</p>
                  <p className="text-xs text-[var(--n-text-secondary)] mt-1 leading-5">{item.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((t) => (
                      <Tag key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Projects ── */}
          <section id="projects">
            <SectionHeading emoji="📋" title="프로젝트" />

            <div className="space-y-1 mt-1">
              {projects.map((project) => {
                const inner = (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-[var(--n-text)]">{project.title}</span>
                        <Tag label={project.status.label} color={project.status.color} />
                        {project.link && (
                          <ExternalLink className="w-3.5 h-3.5 text-[var(--n-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--n-text-secondary)] mt-0.5">{project.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {project.tags.map((t) => (
                        <Tag key={t.label} label={t.label} color={t.color} />
                      ))}
                    </div>
                  </>
                );
                const className =
                  "group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 py-3 rounded-md hover:bg-[var(--n-bg-callout)] transition-colors";
                return project.link ? (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={project.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[var(--n-text-tertiary)] mt-4 pl-3 italic">
              대부분의 프로젝트는 대외비로 설정되어 있습니다. 상세 내용은 직접 문의해 주세요.
            </p>
          </section>

          <Divider />

          {/* ── Contact ── */}
          <section id="contact">
            <SectionHeading emoji="📬" title="연락처" />

            <div className="space-y-1 mt-1">
              <a
                href="mailto:samdongpm@gmail.com"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[var(--n-bg-callout)] transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-[var(--n-bg-hover)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[var(--n-text-secondary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--n-text)]">이메일</p>
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
