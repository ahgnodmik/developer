"use client";

import { CaseGrid, type CaseGridCopy } from "@/components/case-grid";
import { archivedDesignProjects } from "@/lib/design";

const copy: CaseGridCopy = {
  ko: {
    home: "홈",
    crumb: "Extra Proj",
    eyebrow: "ARCHIVE",
    title: "Extra Proj",
    subtitle: "메인 포트폴리오 외 별도로 진행한 프로젝트",
    note: "브랜드·그래픽 등 별도 진행 프로젝트 모음입니다. 썸네일을 선택하면 상세 케이스를 볼 수 있습니다.",
    all: "전체",
    open: "열기",
  },
  en: {
    home: "Home",
    crumb: "Extra Proj",
    eyebrow: "ARCHIVE",
    title: "Extra Proj",
    subtitle: "Side projects beyond the main portfolio",
    note: "A collection of separate projects such as brand and graphic work. Select a thumbnail to view the full case.",
    all: "All",
    open: "Open",
  },
};

export default function ArchiveGrid() {
  return <CaseGrid projects={archivedDesignProjects} copy={copy} active="archive" />;
}
