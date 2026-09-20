import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designProjects, getDesignProject } from "@/lib/design";
import { DesignDetail } from "@/components/design-detail";

export function generateStaticParams() {
  return designProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDesignProject(slug);
  if (!project) return { title: "Design" };
  const images = project.cover ? [{ url: project.cover }] : undefined;
  return {
    title: `${project.title.ko} — ${project.title.en}`,
    description: project.summary.ko || project.summary.en,
    alternates: { canonical: `/design/${slug}` },
    openGraph: {
      title: project.title.ko,
      description: project.summary.ko || project.summary.en,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: project.cover ? "summary_large_image" : "summary",
      ...(project.cover ? { images: [project.cover] } : {}),
    },
  };
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getDesignProject(slug);
  if (!project) notFound();

  const base = "https://samdong.xyz";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title.ko,
      alternateName: project.title.en,
      description: project.summary.ko || project.summary.en,
      url: `${base}/design/${project.slug}`,
      ...(project.cover ? { image: `${base}${project.cover}` } : {}),
      author: { "@type": "Person", name: "김동하", url: base },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: base },
        { "@type": "ListItem", position: 2, name: "서비스 디자인", item: `${base}/design` },
        { "@type": "ListItem", position: 3, name: project.title.ko, item: `${base}/design/${project.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DesignDetail project={project} />
    </>
  );
}
