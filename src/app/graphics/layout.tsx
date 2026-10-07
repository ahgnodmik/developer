import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphics & GUI - 브랜드·마케팅·GUI 그래픽 작업",
  description: "브랜드, 마케팅, 전시, 앱·웹 GUI 그래픽 작업을 회사와 프로젝트별로 정리한 이미지 모음.",
  alternates: { canonical: "/graphics" },
};

export default function GraphicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
