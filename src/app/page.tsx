import { Github, Mail, ExternalLink, Code2, Layers, Phone, FileText, Home as HomeIcon } from "lucide-react";

const tagColors = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  gray: "bg-gray-100 text-gray-700",
  yellow: "bg-yellow-100 text-yellow-800",
  pink: "bg-pink-100 text-pink-800",
  red: "bg-red-100 text-red-800",
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
    <div className="flex gap-3 bg-[#f7f7f5] border border-[#e9e9e7] rounded-md p-4 my-4">
      <span className="text-lg flex-shrink-0 leading-6">{emoji}</span>
      <p className="text-sm text-[#37352f] leading-relaxed">{children}</p>
    </div>
  );
}

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mt-10 mb-4">
      <span className="text-xl">{emoji}</span>
      <h2 className="text-lg font-semibold text-[#37352f]">{title}</h2>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-[#e9e9e7] my-6" />;
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
          ? "bg-[#e9e9e7] text-[#37352f] font-medium"
          : "text-[#787774] hover:bg-[#f1f1ef] hover:text-[#37352f]"
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
  },
] satisfies {
  title: string;
  desc: string;
  tags: { label: string; color: TagColor }[];
  status: { label: string; color: TagColor };
}[];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-[#e9e9e7] h-screen sticky top-0 bg-[#fbfbfa] overflow-y-auto">
        {/* Workspace header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[#e9e9e7]">
          <div className="w-6 h-6 rounded bg-[#37352f] flex items-center justify-center text-white text-xs font-bold shrink-0">
            K
          </div>
          <span className="text-sm font-semibold text-[#37352f] truncate">Kim Dongha</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          <p className="px-3 mb-2 text-[11px] font-medium text-[#acaba8] uppercase tracking-widest">
            Pages
          </p>
          <NavItem href="#" icon={<HomeIcon className="w-4 h-4" />} label="홈" active />
          <NavItem href="#about" icon={<FileText className="w-4 h-4" />} label="소개" />
          <NavItem href="#skills" icon={<Code2 className="w-4 h-4" />} label="기술 스택" />
          <NavItem href="#projects" icon={<Layers className="w-4 h-4" />} label="프로젝트" />
          <NavItem href="#contact" icon={<Phone className="w-4 h-4" />} label="연락처" />
        </nav>

        <div className="px-4 py-3 border-t border-[#e9e9e7]">
          <p className="text-[11px] text-[#acaba8]">© 2025 Kim Dongha</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Cover */}
        <div
          className="h-44 w-full relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f0f0ef 0%, #e2e2df 50%, #d4d4d0 100%)",
          }}
        >
          {/* Subtle dot pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#37352f" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Page content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 pb-32">
          {/* Page icon */}
          <div className="-mt-7 mb-3 text-6xl select-none">🧑‍💻</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-[#37352f] mb-1 tracking-tight">김동하</h1>
          <p className="text-[#787774] text-base mb-6">Junior Web & Mobile Developer</p>

          {/* Properties */}
          <div className="text-sm space-y-2 mb-6">
            {[
              { key: "이메일", value: "samdongpm@gmail.com", href: "mailto:samdongpm@gmail.com" },
              { key: "GitHub", value: "github.com/ahgnodmik", href: "#" },
              { key: "경력", value: "5+ 년" },
            ].map((prop) => (
              <div key={prop.key} className="flex items-center gap-0">
                <span className="w-28 shrink-0 text-[#acaba8]">{prop.key}</span>
                {prop.href ? (
                  <a href={prop.href} className="text-[#37352f] hover:underline underline-offset-2">
                    {prop.value}
                  </a>
                ) : (
                  <span className="text-[#37352f]">{prop.value}</span>
                )}
              </div>
            ))}
            <div className="flex items-center gap-0">
              <span className="w-28 shrink-0 text-[#acaba8]">상태</span>
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

            <p className="text-sm text-[#37352f] leading-7">
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
                  className="bg-[#f7f7f5] border border-[#e9e9e7] rounded-md p-4 text-center"
                >
                  <p className="text-2xl font-bold text-[#37352f]">{stat.value}</p>
                  <p className="text-xs text-[#787774] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Skills ── */}
          <section id="skills">
            <SectionHeading emoji="⚙️" title="기술 스택" />

            <div className="divide-y divide-[#f1f1ef]">
              {skills.map((group) => (
                <div key={group.category} className="flex items-start gap-4 py-3">
                  <span className="w-44 shrink-0 text-xs text-[#acaba8] pt-0.5">{group.category}</span>
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

          {/* ── Projects ── */}
          <section id="projects">
            <SectionHeading emoji="📋" title="프로젝트" />

            <div className="space-y-1 mt-1">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 py-3 rounded-md hover:bg-[#f7f7f5] transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#37352f]">{project.title}</span>
                      <Tag label={project.status.label} color={project.status.color} />
                    </div>
                    <p className="text-xs text-[#787774] mt-0.5">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 shrink-0">
                    {project.tags.map((t) => (
                      <Tag key={t.label} label={t.label} color={t.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#acaba8] mt-4 pl-3 italic">
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
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[#f7f7f5] transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-[#f1f1ef] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#787774]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#37352f]">이메일</p>
                  <p className="text-xs text-[#787774]">samdongpm@gmail.com</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#acaba8] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-[#f7f7f5] transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-[#f1f1ef] flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4 text-[#787774]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#37352f]">GitHub</p>
                  <p className="text-xs text-[#787774]">github.com/ahgnodmik</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#acaba8] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
