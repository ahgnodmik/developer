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
  return {
    title: project.title.en,
    description: project.summary.en,
    openGraph: { title: project.title.en, description: project.summary.en },
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
  return <DesignDetail project={project} />;
}
