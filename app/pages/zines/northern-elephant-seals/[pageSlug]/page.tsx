import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectTabs from '@/components/ProjectTabs';
import { projectSections } from '@/data/projects';

type NorthernElephantSealsPageProps = {
  params: Promise<{
    pageSlug: string;
  }>;
};

const zineGroup = projectSections
  .find((section) => section.id === 'zines')
  ?.groups.find((group) => group.slug === 'northern-elephant-seals');
const zinePages = zineGroup?.images ?? [];

const getZinePage = (slug: string) => zinePages.find((page) => page.slug === slug);

export function generateStaticParams() {
  return zinePages.map((page) => ({
    pageSlug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: NorthernElephantSealsPageProps): Promise<Metadata> {
  const { pageSlug } = await params;
  const page = getZinePage(pageSlug);

  return {
    title: page ? `${page.alt} | Kavya Aswadhati` : 'Northern Elephant Seals | Kavya Aswadhati',
  };
}

export default async function NorthernElephantSealsPage({
  params,
}: NorthernElephantSealsPageProps) {
  const { pageSlug } = await params;

  if (!getZinePage(pageSlug)) {
    notFound();
  }

  return (
    <main>
      <ProjectTabs
        sectionId="zines"
        groupSlug="northern-elephant-seals"
        showTabs={false}
        initialZinePageSlug={pageSlug}
      />
    </main>
  );
}
