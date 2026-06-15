import ProjectTabs from '@/components/ProjectTabs';

export const metadata = {
  title: 'Sketchbooks | Kavya Aswadhati',
};

export default function Sketchbooks() {
  return (
    <main>
      <h1 className="mt-5 text-center font-[Avara] text-3xl font-normal text-[var(--accent)]">
        sketchbooks
      </h1>
      <ProjectTabs sectionId="sketchbooks" showTabs={false} />
    </main>
  );
}
