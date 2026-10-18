import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Build - AI로 만든 프로젝트와 워크플로",
  description: "Claude, OpenAI API, Flutter, Next.js로 기획부터 출시까지 직접 만든 AI 프로젝트, 작업 도구와 워크플로, AI 경험 디자인 모음.",
  alternates: { canonical: "/build" },
};

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return children;
}
