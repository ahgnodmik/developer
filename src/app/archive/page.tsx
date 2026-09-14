"use client";

import { CaseGrid, type CaseGridCopy } from "@/components/case-grid";
import { archivedDesignProjects } from "@/lib/design";

const copy: CaseGridCopy = {
  ko: {
    home: "홈",
    crumb: "Extra Proj",
    eyebrow: "ARCHIVE",
    title: "Extra Proj",
    subtitle: "지난 프로젝트 케이스",
    note: "썸네일을 선택하면 상세 케이스를 볼 수 있습니다. 모든 사례는 비공개로 운영되며 익명화되었습니다.",
    all: "전체",
    open: "열기",
  },
  en: {
    home: "Home",
    crumb: "Extra Proj",
    eyebrow: "ARCHIVE",
    title: "Extra Proj",
    subtitle: "Past project cases",
    note: "Select a thumbnail to view the full case. All cases are privately operated and anonymized.",
    all: "All",
    open: "Open",
  },
};

export default function ArchiveGrid() {
  return <CaseGrid projects={archivedDesignProjects} copy={copy} active="archive" />;
}
