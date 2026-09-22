import type { Metadata } from 'next';

import { EvidenceClusters } from '@/components/EvidenceClusters';
import { FamilyAtlas } from '@/components/FamilyAtlas';
import { MigrationArc } from '@/components/MigrationArc';
import { PageHero } from '@/components/PageHero';
import { ReferenceLinks } from '@/components/ReferenceLinks';
import Link from 'next/link';

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
          <section
            aria-labelledby="family-relationships-heading"
            className="rounded-[2rem] border border-ink/10 bg-paper/70 p-6 shadow-paper sm:p-8"
          >
            <p className="eyebrow">Reading the family records</p>
            <h2
              id="family-relationships-heading"
              className="mt-2 font-serif text-3xl"
            >
              How do Benjamin, George, James S., and James L. connect?
            </h2>
            <ul className="mt-6 grid gap-5 text-sm leading-relaxed text-ink/70 md:grid-cols-2 xl:grid-cols-4">
              <li className="border-t border-ink/10 pt-4">
                <h3 className="font-serif text-xl text-ink">
                  James S. · named son
                </h3>
                <p className="mt-2">
                  Benjamin’s 1853 will calls James S. Meason his son. A separate
                  1855 deed names James S. as a grantee.
                  <ReferenceLinks ids={[65, 28]} />
                </p>
              </li>
              <li className="border-t border-ink/10 pt-4">
                <h3 className="font-serif text-xl text-ink">
                  George · indirect son
                </h3>
                <p className="mt-2">
                  George’s placement as Benjamin’s son is a high-confidence
                  conclusion from indirect evidence. No reviewed record states
                  their relationship outright.{' '}
                  <Link
                    href="/cases/george-connection"
                    className="text-accent underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Follow the evidence
                  </Link>
                  <ReferenceLinks ids={[28, 33, 59, 60, 61, 62]} />
                </p>
              </li>
              <li className="border-t border-ink/10 pt-4">
                <h3 className="font-serif text-xl text-ink">
                  James L. · Missouri
                </h3>
                <p className="mt-2">
                  A Missouri James L. shares a different 1855 deed with George
                  and John Kippers, then appears in an 1860–1880 census
                  sequence. Those records do not say how James L. was related to
                  Benjamin, George, or James S.
                  <ReferenceLinks ids={[28, 62, 63, 64]} />
                </p>
              </li>
              <li className="border-t border-ink/10 pt-4">
                <h3 className="font-serif text-xl text-ink">
                  Elder James L. · Texas
                </h3>
                <p className="mt-2">
                  In Texas, an elder James L. is called James R.’s uncle in
                  1900. A likely matching 1919 death record names Benjamin as
                  his father. Whether he was the Missouri James L. remains
                  unresolved: Missouri censuses say Kentucky-born, while the
                  Texas records say Missouri-born.
                  <ReferenceLinks ids={[59, 60, 62, 63, 64]} />
                </p>
              </li>
            </ul>
            <p className="mt-6 border-t border-ink/10 pt-5 text-sm leading-relaxed text-ink/60">
              Benjamin’s 1850 household also lists a James Mason without a
              middle initial or relationship. That entry cannot yet be assigned
              to James S. or James L.
              <ReferenceLinks ids={[1]} />
            </p>
          </section>
          <FamilyAtlas />
          <MigrationArc />
          <EvidenceClusters />
        </div>
      </section>
    </>
  );
}
