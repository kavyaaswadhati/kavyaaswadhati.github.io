import Link from 'next/link';
import ProjectTabs from '@/components/ProjectTabs';

export const metadata = {
  title: 'Zines | Kavya Aswadhati',
};

export default function Zines() {
  return (
    <main>
      <div className="mx-auto mt-5 max-w-[1200px] px-5 text-center">
        <h1 className="font-[Avara] text-3xl font-normal text-[var(--accent)]">zines</h1>
        <Link
          className="mt-2 inline-block text-lg font-bold text-[var(--link)] no-underline hover:text-[#004f91]"
          href="/pages/zines/northern-elephant-seals"
        >
          northern elephant seals
        </Link>
      </div>
      <ProjectTabs sectionId="zines" showTabs={false} />
    </main>
  );
}
