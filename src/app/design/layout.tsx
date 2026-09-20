import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 디자인 — UX/UI 케이스 스터디",
  description:
    "클라우드 커넥티드 관제 시스템, UI Lottie 모션, 건강유형 MBTI 등 문제 정의부터 솔루션까지 정리한 UX/UI·프로덕트 디자인 케이스 스터디.",
  alternates: { canonical: "/design" },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
