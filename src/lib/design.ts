// Design portfolio data — bilingual (ko/en), used by /design grid and /design/[slug] detail.
// Drop real images into /public/design/<slug>/ and set `cover` / `gallery` paths to use them;
// otherwise the gradient + emoji placeholder renders.

import { generated } from "./design.generated";

export type Lang = "ko" | "en";

export type DesignProject = {
  slug: string;
  year: string;
  /** Optional thumbnail image path under /public. Falls back to gradient + emoji. */
  cover?: string;
  /** Tailwind gradient classes for the placeholder tile. */
  gradient: string;
  emoji: string;
  role: Record<Lang, string>;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  overview: Record<Lang, string>;
  tags: string[];
  /** Optional detail-page gallery image paths under /public. */
  gallery?: string[];
};

const fallbackProjects: DesignProject[] = [
  {
    slug: "mobile-banking-redesign",
    year: "2024",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    emoji: "🏦",
    role: { ko: "리드 UX/UI 디자이너", en: "Lead UX/UI Designer" },
    title: { ko: "모바일 뱅킹 리디자인", en: "Mobile Banking Redesign" },
    summary: {
      ko: "복잡한 송금·조회 플로우를 3단계로 단축한 뱅킹 앱 개편.",
      en: "Banking app overhaul that cut transfer and inquiry flows to three steps.",
    },
    overview: {
      ko: "기존 앱의 이탈 지점을 리서치로 진단하고, 정보 구조를 재설계했다. 핵심 태스크를 카드 기반 홈으로 끌어올려 첫 화면에서 바로 접근하도록 했으며, 접근성 대비와 모션 가이드를 포함한 디자인 시스템을 구축했다.",
      en: "Diagnosed drop-off points through research and restructured the information architecture. Surfaced core tasks on a card-based home for one-tap access, and built a design system covering accessibility contrast and motion guidelines.",
    },
    tags: ["Figma", "Design System", "User Research", "Prototyping"],
  },
  {
    slug: "health-tracker-app",
    year: "2024",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    emoji: "🩺",
    role: { ko: "프로덕트 디자이너", en: "Product Designer" },
    title: { ko: "헬스 트래킹 앱", en: "Health Tracking App" },
    summary: {
      ko: "일일 지표를 한눈에 보는 대시보드와 습관 형성 루프 설계.",
      en: "Dashboard for daily metrics at a glance with a habit-forming loop.",
    },
    overview: {
      ko: "사용자가 매일 돌아오게 만드는 리텐션 루프를 중심으로 설계했다. 데이터 시각화를 단순화하고, 목표 달성을 축하하는 마이크로 인터랙션으로 동기를 부여했다.",
      en: "Designed around a retention loop that brings users back daily. Simplified data visualization and added celebratory micro-interactions to drive motivation.",
    },
    tags: ["Figma", "Data Viz", "Micro-interaction", "iOS"],
  },
  {
    slug: "ecommerce-checkout",
    year: "2023",
    gradient: "from-orange-400 via-amber-500 to-rose-500",
    emoji: "🛒",
    role: { ko: "UX 디자이너", en: "UX Designer" },
    title: { ko: "이커머스 체크아웃 최적화", en: "E-commerce Checkout Optimization" },
    summary: {
      ko: "결제 단계 이탈률을 A/B 테스트로 검증하며 개선한 프로젝트.",
      en: "Reduced checkout abandonment, validated through A/B testing.",
    },
    overview: {
      ko: "게스트 체크아웃, 실시간 유효성 검사, 진행 표시를 도입해 결제 마찰을 줄였다. 정량 데이터와 사용성 테스트를 병행해 각 변경의 효과를 검증했다.",
      en: "Introduced guest checkout, real-time validation, and progress indicators to reduce payment friction. Paired quantitative data with usability testing to validate each change.",
    },
    tags: ["UX Research", "A/B Testing", "Conversion", "Web"],
  },
  {
    slug: "design-system-foundation",
    year: "2023",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    emoji: "🧩",
    role: { ko: "디자인 시스템 리드", en: "Design System Lead" },
    title: { ko: "디자인 시스템 파운데이션", en: "Design System Foundation" },
    summary: {
      ko: "토큰·컴포넌트·문서를 통합한 멀티 브랜드 디자인 시스템.",
      en: "Multi-brand design system unifying tokens, components, and docs.",
    },
    overview: {
      ko: "컬러·타이포·스페이싱을 토큰화하고, 다크 모드와 멀티 브랜드를 하나의 소스로 관리했다. 개발팀과 협업해 코드 컴포넌트와 1:1로 매핑되는 라이브러리를 구축했다.",
      en: "Tokenized color, type, and spacing, managing dark mode and multiple brands from a single source. Collaborated with engineering to build a library that maps 1:1 to code components.",
    },
    tags: ["Design Tokens", "Figma Variables", "Documentation", "Dark Mode"],
  },
  {
    slug: "saas-analytics-dashboard",
    year: "2023",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    emoji: "📊",
    role: { ko: "프로덕트 디자이너", en: "Product Designer" },
    title: { ko: "SaaS 애널리틱스 대시보드", en: "SaaS Analytics Dashboard" },
    summary: {
      ko: "밀도 높은 데이터를 읽기 쉽게 정리한 B2B 대시보드.",
      en: "B2B dashboard that makes dense data readable.",
    },
    overview: {
      ko: "정보 위계를 명확히 하고, 커스터마이즈 가능한 위젯 레이아웃을 설계했다. 필터·세그먼트·드릴다운을 일관된 패턴으로 통일해 학습 비용을 낮췄다.",
      en: "Clarified the information hierarchy and designed a customizable widget layout. Unified filters, segments, and drill-downs into consistent patterns to lower the learning curve.",
    },
    tags: ["B2B", "Data Viz", "Design System", "Web"],
  },
  {
    slug: "onboarding-flow",
    year: "2022",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    emoji: "🚀",
    role: { ko: "UX 디자이너", en: "UX Designer" },
    title: { ko: "온보딩 플로우 설계", en: "Onboarding Flow Design" },
    summary: {
      ko: "첫 사용자 활성화율을 높인 단계별 온보딩 경험.",
      en: "Stepwise onboarding that lifted first-time activation.",
    },
    overview: {
      ko: "가치를 빠르게 체감시키는 프로그레시브 온보딩을 설계했다. 필수 입력을 최소화하고, 빈 상태(empty state)를 가이드로 전환해 초기 마찰을 제거했다.",
      en: "Designed progressive onboarding that delivers value fast. Minimized required input and turned empty states into guidance to remove early friction.",
    },
    tags: ["Activation", "Prototyping", "Empty States", "Mobile"],
  },
  {
    slug: "brand-landing-page",
    year: "2022",
    gradient: "from-slate-500 via-gray-600 to-zinc-700",
    emoji: "✨",
    role: { ko: "비주얼 디자이너", en: "Visual Designer" },
    title: { ko: "브랜드 랜딩 페이지", en: "Brand Landing Page" },
    summary: {
      ko: "스크롤 내러티브와 모션으로 제품 가치를 전달한 랜딩.",
      en: "Landing that conveys product value through scroll narrative and motion.",
    },
    overview: {
      ko: "스크롤에 반응하는 섹션 전환과 타이포그래피 중심의 레이아웃으로 브랜드 톤을 구축했다. 성능을 고려한 모션 가이드를 개발팀에 전달했다.",
      en: "Built the brand tone with scroll-reactive section transitions and typography-led layout. Handed off a performance-conscious motion guide to engineering.",
    },
    tags: ["Landing", "Motion", "Typography", "Web"],
  },
  {
    slug: "ai-chat-interface",
    year: "2025",
    gradient: "from-indigo-400 via-violet-500 to-purple-600",
    emoji: "🤖",
    role: { ko: "프로덕트 디자이너", en: "Product Designer" },
    title: { ko: "AI 채팅 인터페이스", en: "AI Chat Interface" },
    summary: {
      ko: "스트리밍 응답과 도구 호출을 직관적으로 보여준 대화형 UI.",
      en: "Conversational UI surfacing streaming responses and tool calls intuitively.",
    },
    overview: {
      ko: "LLM의 스트리밍·도구 사용·인용을 사용자가 신뢰할 수 있게 시각화했다. 에러·중단·재시도 상태를 명확한 피드백으로 설계하고, 접근성을 고려한 대화 흐름을 구성했다.",
      en: "Visualized LLM streaming, tool use, and citations in a way users can trust. Designed clear feedback for error, interruption, and retry states, with accessible conversation flow.",
    },
    tags: ["AI", "Conversational UI", "Figma", "Accessibility"],
  },
];

// Prefer Notion-sourced data (written at build time by scripts/fetch-notion.mjs).
// Falls back to the static list above when Notion isn't configured.
export const designProjects: DesignProject[] =
  generated.length > 0 ? generated : fallbackProjects;

export function getDesignProject(slug: string): DesignProject | undefined {
  return designProjects.find((p) => p.slug === slug);
}
