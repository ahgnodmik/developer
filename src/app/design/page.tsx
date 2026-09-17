"use client";

import { CaseGrid, type CaseGridCopy } from "@/components/case-grid";
import { visibleDesignProjects } from "@/lib/design";

const copy: CaseGridCopy = {
  ko: {
    home: "홈",
    crumb: "서비스 디자인",
    eyebrow: "SELECTED WORKS",
    title: "서비스 디자인",
    subtitle: "UX/UI · 프로덕트 디자인 케이스",
    note: "썸네일을 선택하면 상세 케이스를 볼 수 있습니다. 모든 사례는 비공개로 운영되며 익명화되었습니다.",
    all: "전체",
    open: "열기",
  },
  en: {
    home: "Home",
    crumb: "Service Design",
    eyebrow: "SELECTED WORKS",
    title: "Service Design",
    subtitle: "UX/UI · Product design cases",
    note: "Select a thumbnail to view the full case. All cases are privately operated and anonymized.",
    all: "All",
    open: "Open",
  },
};

// Grid shows at most 12 cases; extras stay routable but off the grid.
const MAX_GRID_CASES = 12;

export default function DesignGrid() {
  return (
    <CaseGrid projects={visibleDesignProjects.slice(0, MAX_GRID_CASES)} copy={copy} active="design" />
  );
}
