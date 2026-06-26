import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectTabs from '@/components/ProjectTabs';
import { projectSections } from '@/data/projects';

type SketchbookImagePageProps = {
  params: Promise<{
    imageSlug: string;
  }>;
};

const sketchbookSection = projectSections.find((section) => section.id === 'sketchbooks');
const sketchbookImages = sketchbookSection?.groups.flatMap((group) => group.images) ?? [];

const getSketchbookImage = (slug: string) =>
  sketchbookImages.find((image) => image.slug === slug);

export function generateStaticParams() {
  return sketchbookImages.map((image) => ({
    imageSlug: image.slug,
  }));
}

export async function generateMetadata({
  params,
}: SketchbookImagePageProps): Promise<Metadata> {
  const { imageSlug } = await params;
  const image = getSketchbookImage(imageSlug);

  return {
    title: image ? `${image.alt} | Kavya Aswadhati` : 'Sketchbooks | Kavya Aswadhati',
  };
}

export default async function SketchbookImagePage({ params }: SketchbookImagePageProps) {
  const { imageSlug } = await params;

  if (!getSketchbookImage(imageSlug)) {
    notFound();
  }

  return (
    <main>
      <h1 className="mt-5 text-center font-[Avara] text-3xl font-normal text-[var(--accent)]">
        sketchbooks
      </h1>
      <ProjectTabs sectionId="sketchbooks" showTabs={false} initialImageSlug={imageSlug} />
    </main>
  );
}
