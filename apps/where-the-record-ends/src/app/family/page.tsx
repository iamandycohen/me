import type { Metadata } from 'next';

import { EvidenceClusters } from '@/components/EvidenceClusters';
import { FamilyAtlas } from '@/components/FamilyAtlas';
import { MigrationArc } from '@/components/MigrationArc';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Family atlas',
  description:
    'Explore the reviewed public Meason family line and the evidence behind each connection.',
};

export default function FamilyPage() {
  return (
    <>
      <PageHero
        eyebrow="The family atlas"
        title="A line you can question, not just admire."
        introduction="Every connection has an evidence type and an assessment. Select a person to see what supports the line—and where certainty changes."
      />
      <section className="px-5 py-10 sm:px-8 md:py-16">
        <div className="mx-auto max-w-[92rem] space-y-8">
          <FamilyAtlas />
          <MigrationArc />
          <EvidenceClusters />
        </div>
      </section>
    </>
  );
}
