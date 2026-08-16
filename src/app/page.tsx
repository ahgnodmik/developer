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
    ],
  },
  {
    category: "Mobile",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "Dart", color: "blue" },
      { label: "Cross Platform", color: "green" },
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
    category: "CMS",
    tags: [
      { label: "WordPress", color: "blue" },
      { label: "Divi Theme", color: "purple" },
    ],
  },
] satisfies { category: string; tags: { label: string; color: TagColor }[] }[];

const career = [
  {
    period: "2025 — 현재",
    title: "AI Builder",
    desc: "Claude, OpenAI API 등 AI를 활용한 웹 서비스 및 앱 기획·개발. Cursor 등 AI 도구 기반 고속 프로토타이핑.",
    tags: [
      { label: "Claude API", color: "pink" },
      { label: "OpenAI API", color: "green" },
      { label: "AI Integration", color: "pink" },
      { label: "Next.js", color: "gray" },
    ],
  },
  {
    period: "2020 — 2025",
    title: "UX/UI 디자이너",
    desc: "모바일·웹 서비스 UX 리서치, UI 디자인, 프로토타이핑. 디자인 시스템 구축 및 개발팀 협업.",
    tags: [
      { label: "Figma", color: "purple" },
      { label: "Prototyping", color: "orange" },
      { label: "User Research", color: "blue" },
      { label: "Design System", color: "gray" },
    ],
  },
] satisfies {
  period: string;
  title: string;
  desc: string;
  tags: { label: string; color: TagColor }[];
}[];

type ProjectStatus = "live" | "dev" | "case";

const statusMeta: Record<ProjectStatus, { label: string; dot: string; text: string }> = {
  live: {
    label: "LIVE",
    dot: "bg-green-500 animate-pulse",
    text: "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950",
  },
  dev: {
    label: "개발 중",
    dot: "bg-yellow-500",
    text: "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950",
  },
  case: {
    label: "케이스 스터디",
    dot: "bg-gray-400",
    text: "text-gray-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-800",
  },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${meta.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

const projects = [
  {
    title: "OCR 기반 노트 생성 앱",
    desc: "촬영·스캔 문서를 구조화된 노트로 변환하는 모바일 앱. 스토어 출시 및 운영 중.",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "OCR", color: "orange" },
      { label: "AdMob", color: "yellow" },
    ],
    status: "live" as ProjectStatus,
  },
  {
    title: "실시간 환율 변환 앱",
    desc: "20개 통화 실시간 환율 조회·변환. 스토어 출시 및 운영 중.",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "REST API", color: "green" },
      { label: "AdMob", color: "yellow" },
    ],
    status: "live" as ProjectStatus,
  },
  {
    title: "장소 기록 모바일 앱",
    desc: "장소를 카드로 기록·탐색. 필드 암호화, 다국어, 지도 연동 포함 프로덕션 운영.",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "Firebase", color: "yellow" },
      { label: "Google Maps", color: "green" },
    ],
    status: "live" as ProjectStatus,
  },
  {
    title: "블로그 콘텐츠 자동 발행 파이프라인",
    desc: "키워드 수집부터 원고 생성·발행까지 무인 운영한 일일 자동 발행 시스템.",
    tags: [
      { label: "Python", color: "blue" },
      { label: "LLM", color: "pink" },
      { label: "Automation", color: "purple" },
    ],
    status: "case" as ProjectStatus,
  },
  {
    title: "SNS 카드뉴스 자동화 파이프라인",
    desc: "소재 수집 → 카드 렌더링 → 게시까지 이어지는 멀티 계정 콘텐츠 자동화.",
    tags: [
      { label: "Node.js", color: "green" },
      { label: "Supabase", color: "green" },
      { label: "Automation", color: "purple" },
    ],
    status: "dev" as ProjectStatus,
  },
  {
    title: "해외 신상품 모니터링 시스템",
    desc: "해외 커머스 신상품을 수집·필터링해 메신저로 발송하는 소싱 레이더.",
    tags: [
      { label: "Node.js", color: "green" },
      { label: "Apify", color: "gray" },
      { label: "Telegram Bot", color: "blue" },
    ],
    status: "dev" as ProjectStatus,
  },
  {
    title: "멀티 에이전트 협업 시각화 도구",
    desc: "AI 에이전트들이 논의·합의해 작업을 수행하는 과정을 실시간 캔버스로 보여주는 웹 도구.",
    tags: [
      { label: "React", color: "blue" },
      { label: "FastAPI", color: "green" },
      { label: "Supabase", color: "green" },
      { label: "LLM", color: "pink" },
    ],
    status: "dev" as ProjectStatus,
  },
  {
    title: "구어 코퍼스 기반 영어 학습 플랫폼",
    desc: "팟캐스트 전사 코퍼스를 구축해 실사용 영어 빈도를 데이터로 증명하는 파이프라인.",
    tags: [
      { label: "Python", color: "blue" },
      { label: "Whisper", color: "pink" },
      { label: "SQLite FTS5", color: "gray" },
    ],
    status: "dev" as ProjectStatus,
  },
  {
    title: "단체 주문 자동화 앱",
    desc: "링크 공유로 참여자 주문을 자동 집계. 비회원 참여, 실시간 동기화 설계.",
    tags: [
      { label: "Flutter", color: "blue" },
      { label: "Firestore", color: "yellow" },
      { label: "Riverpod", color: "purple" },
    ],
    status: "case" as ProjectStatus,
  },
  {
    title: "주간 식단·장보기 리스트 생성기",
    desc: "가구 제약(알레르기·예산·조리 실력)을 반영한 7일 식단과 합산 장보기 리스트 MVP.",
    tags: [
      { label: "Next.js", color: "gray" },
      { label: "Supabase", color: "green" },
      { label: "LLM", color: "pink" },
    ],
    status: "case" as ProjectStatus,
  },
  {
    title: "앱 마켓 분석 내부 도구",
    desc: "스토어 상위 앱을 기능 단위로 분해해 구현 난이도·시장성 점수를 산출하는 분석 도구.",
    tags: [
      { label: "TypeScript", color: "blue" },
      { label: "Data Analysis", color: "orange" },
    ],
    status: "case" as ProjectStatus,
  },
] satisfies {
  title: string;
  desc: string;
  tags: { label: string; color: TagColor }[];
  status: ProjectStatus;
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

        {/* Page content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Page icon */}
          <div className="mt-12 mb-3 text-6xl select-none">🧑‍💻</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[var(--n-text)] mb-1 tracking-tight">김동하</h1>
          <p className="text-[var(--n-text-secondary)] text-base mb-6">AI Builder · UX/UI Designer</p>

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
                { value: "5+", label: "UX/UI 경력" },
                { value: "1+", label: "AI Builder" },
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

            <div className="flex items-center gap-4 mt-2 mb-3 pl-3 text-[11px] text-[var(--n-text-tertiary)]">
              <span>
                총 {projects.length}개 · LIVE {projects.filter((p) => p.status === "live").length} · 개발 중{" "}
                {projects.filter((p) => p.status === "dev").length} · 케이스 스터디{" "}
                {projects.filter((p) => p.status === "case").length}
              </span>
            </div>

            <div className="space-y-1 mt-1">
              {(["live", "dev", "case"] as ProjectStatus[]).flatMap((group) =>
                projects
                  .filter((p) => p.status === group)
                  .map((project) => (
                    <div
                      key={project.title}
                      className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 py-3 rounded-md hover:bg-[var(--n-bg-callout)] transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-[var(--n-text)]">{project.title}</span>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="text-xs text-[var(--n-text-secondary)] mt-0.5">{project.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 shrink-0">
                        {project.tags.map((t) => (
                          <Tag key={t.label} label={t.label} color={t.color} />
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>

            <p className="text-xs text-[var(--n-text-tertiary)] mt-4 pl-3 italic">
              모든 프로젝트는 비공개로 운영됩니다. 상세 케이스 스터디와 시연은 문의 시 공유 가능합니다.
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
