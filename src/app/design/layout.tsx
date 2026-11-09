import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 디자인 — UX/UI 케이스 스터디",
  description:
    "클라우드 커넥티드 관제 서비스의 디바이스 사전 등록, 멀티 다운로드, AI 자동화 등 문제 정의부터 결과까지 정리한 UX/UI·프로덕트 디자인 케이스 스터디.",
  alternates: { canonical: "/design" },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
