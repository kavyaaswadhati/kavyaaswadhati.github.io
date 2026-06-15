import ProjectTabs from '@/components/ProjectTabs';

export const metadata = {
  title: 'Northern Elephant Seals | Kavya Aswadhati',
};

export default function NorthernElephantSeals() {
  return (
    <main>
      <ProjectTabs sectionId="zines" groupSlug="northern-elephant-seals" showTabs={false} />
    </main>
  );
}
