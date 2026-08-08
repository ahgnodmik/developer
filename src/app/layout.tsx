import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://samdong.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "김동하 | Web & Mobile Developer",
    template: "%s | 김동하",
  },
  description:
    "React, Next.js, TypeScript 기반 웹 개발과 Flutter 크로스 플랫폼 앱 개발을 하는 김동하의 포트폴리오입니다.",
  keywords: [
    "김동하",
    "웹 개발자",
    "프론트엔드",
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
    "포트폴리오",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "김동하 포트폴리오",
    title: "김동하 | Web & Mobile Developer",
    description:
      "React, Next.js, TypeScript 기반 웹 개발과 Flutter 크로스 플랫폼 앱 개발 포트폴리오",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "김동하 | Web & Mobile Developer",
    description:
      "React, Next.js, TypeScript 기반 웹 개발과 Flutter 크로스 플랫폼 앱 개발 포트폴리오",
  },
  robots: { index: true, follow: true },
};

// runs before paint so the stored/system theme applies without a flash
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "김동하",
  alternateName: "Kim Dongha",
  url: siteUrl,
  email: "mailto:samdongpm@gmail.com",
  jobTitle: "Web & Mobile Developer",
  sameAs: ["https://github.com/ahgnodmik"],
  knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
