import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "More Works — 브랜드·그래픽·사이드 프로젝트",
  description:
    "메인 포트폴리오 외 별도로 진행한 브랜드, 그래픽, 마케팅 디자인, Instagram 채널 운영 프로젝트 모음.",
  alternates: { canonical: "/archive" },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
