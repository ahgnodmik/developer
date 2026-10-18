# Developer Portfolio

김동하 포트폴리오 사이트. Next.js 정적 export, GitHub Pages 배포.

## 스택

- Next.js 15 (App Router, `output: "export"`), React 19, TypeScript
- Tailwind CSS 4, shadcn/ui, motion
- Notion API: 빌드 시 `scripts/fetch-notion.mjs`가 데이터를 가져와 `src/lib/*.generated.ts` 생성

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 소개, 바이브코딩 작업, 경력, 연락처 |
| `/design` | 서비스 디자인 케이스 스터디 |
| `/graphics` | 그래픽 작업 |
| `/mugs` | 머그컵 컬렉션 (Notion DB) |
| `/archive` | More works |

## 실행

```bash
npm install
npm run dev          # 개발 서버
npm run fetch:notion # Notion 데이터 갱신 (NOTION_TOKEN, NOTION_DATA_SOURCE_ID 필요)
npm run build        # prebuild로 fetch:notion 실행 후 out/ 생성
```

## 배포

`.github/workflows/deploy.yml`: `main` push 또는 매시간 cron으로 빌드 후 GitHub Pages 배포.
리포지토리 시크릿 `NOTION_TOKEN`, `NOTION_DATA_SOURCE_ID` 필요.
