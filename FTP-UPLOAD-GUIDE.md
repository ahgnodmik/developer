# FTP 업로드 가이드

## 📁 빌드된 파일들

웹 호스팅 FTP 업로드를 위한 정적 파일들이 준비되었습니다.

### 📦 파일 위치
- **빌드 폴더**: `out/` (1.3MB)
- **압축 파일**: `developer-portfolio-ftp.tar.gz` (422KB)

### 📋 포함된 파일들
```
out/
├── index.html              # 메인 페이지
├── 404.html               # 404 에러 페이지
├── app-ads.txt            # 광고 승인 파일
├── googlee7338c0238e8364f.html  # Google 검증 파일
├── favicon.ico            # 파비콘
├── .nojekyll              # Jekyll 비활성화
├── _next/                 # Next.js 정적 자산
│   ├── static/           # CSS, JS 파일들
│   └── [hash]/           # 빌드 해시 폴더
└── *.svg                  # 아이콘 파일들
```

## 🚀 FTP 업로드 방법

### 방법 1: 압축 파일 사용 (권장)
1. `developer-portfolio-ftp.tar.gz` 다운로드
2. 웹 호스팅 서버에 업로드
3. 서버에서 압축 해제:
   ```bash
   tar -xzf developer-portfolio-ftp.tar.gz
   ```

### 방법 2: 폴더 직접 업로드
1. `out/` 폴더 전체를 웹 서버 루트에 업로드
2. 모든 파일과 폴더 구조 유지

## 🌐 호스팅 후 확인사항

### 필수 확인 URL
- **메인 사이트**: `https://yourdomain.com/`
- **app-ads.txt**: `https://yourdomain.com/app-ads.txt`
- **Google 검증**: `https://yourdomain.com/googlee7338c0238e8364f.html`

### 📱 테스트 항목
- [ ] 메인 페이지 로딩
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 다크 모드 전환
- [ ] 네비게이션 링크 작동
- [ ] app-ads.txt 파일 접근 가능
- [ ] Google 검증 파일 접근 가능

## 🔧 호스팅 서버 요구사항

### 최소 요구사항
- **웹 서버**: Apache, Nginx, IIS 등
- **지원 파일**: HTML, CSS, JS, SVG, ICO
- **용량**: 최소 2MB 여유 공간

### 권장 설정
- **HTTPS**: SSL 인증서 권장
- **Gzip 압축**: 활성화 권장
- **캐싱**: 정적 파일 캐싱 설정

## 📞 문제 해결

### 일반적인 문제들
1. **404 에러**: 파일 경로 확인
2. **CSS/JS 로딩 실패**: `_next/` 폴더 업로드 확인
3. **이미지 로딩 실패**: `public/` 폴더 내용 확인

### 지원되는 호스팅 서비스
- ✅ 일반 웹 호스팅 (cPanel, Plesk 등)
- ✅ VPS/전용 서버
- ✅ CDN (Cloudflare, AWS CloudFront 등)
- ✅ 정적 호스팅 (Netlify, Vercel, GitHub Pages)

---

**빌드 완료 시간**: $(date)
**빌드 크기**: 1.3MB (압축: 422KB)
**Next.js 버전**: 15.5.3



