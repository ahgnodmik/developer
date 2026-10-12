import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mugs - 머그컵 컬렉션과 디자인",
  description: "여행지와 카페에서 모은 머그컵 컬렉션과 직접 디자인한 머그컵 기록.",
  alternates: { canonical: "/mugs" },
};

export default function MugsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
