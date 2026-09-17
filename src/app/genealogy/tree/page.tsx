import Link from 'next/link';

import { generatePageMetadata } from '@/lib/metadata-generators';
import data from '@/lib/data';
import EvidenceLegend from '../_components/EvidenceLegend';
import VisualFamilyTree from '../_components/VisualFamilyTree';

export const metadata = generatePageMetadata(
  'My Working Family Tree',
  'The direct Meason family line as currently supported, including the point where documentary certainty ends.',
  data.contact,
  {},
  '/genealogy/tree'
);

export default function GenealogyTreePage() {
  return (
    <>
      <section className="pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">The documented line</p>
              <h1 className="text-balance mb-8">
                My family tree,{' '}
                <span className="italic text-ink/60">as I know it today.</span>
              </h1>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink/75 text-balance max-w-3xl">
                A public view of the direct Meason line—showing what is
                established, what is still being prepared, and the exact point
                where the records stop supporting another generation.
              </p>
            </div>
            <aside className="lg:col-span-4">
              <Link href="/genealogy" className="link-underline">
                Read the investigation →
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink/[0.025] py-10">
        <div className="container-max">
          <EvidenceLegend />
        </div>
      </section>

      <section className="section-padding bg-[#f4efe7]">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">Reading the tree</p>
              <h2 className="text-balance mb-6">
                Relationships first. Certainty made visible.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-8">
              <p className="leading-relaxed text-ink/65 mb-5">
                The larger cards form one continuous Meason spine. Smaller
                connected cards show the spouses who join that direct line.
                Solid connections represent relationships I can support; dashed
                connections show the precise place where the evidence breaks:
                the identities of Benjamin&apos;s parents.
              </p>
              <p className="text-sm leading-relaxed text-ink/50">
                This is the direct line as I currently understand it, not every
                person in the family database. Only spouses needed to explain
                the ancestral path appear here. Dates and relationships will
                gain citations as the publication review continues.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                I was born Shannon Jeremiah Meason and grew up as Andy Cohen
                after being adopted. This tree follows my biological Meason
                lineage; it does not replace the Cohen family that raised me.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                Initialed portrait circles hold the place for family photographs
                while identity, provenance, and permission are confirmed.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                <Link href="/genealogy#references" className="link-underline">
                  Review the evidence and detailed references →
                </Link>
              </p>
            </div>
          </div>

          <VisualFamilyTree />

          <div className="mt-20 rounded-2xl border border-ink/10 bg-paper p-7 md:mt-28 md:p-10 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className="eyebrow">The frontier</p>
            </div>
            <div className="md:col-span-8">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-ink/80 text-balance mb-5">
                Benjamin is not the end of the family. He is the end of what I
                can currently demonstrate.
              </p>
              <p className="leading-relaxed text-ink/60 mb-6">
                A future parent will appear above him only when the evidence can
                distinguish that person from the other Thomas, William, Joseph,
                Mason, and Meason identities found in the same records.
              </p>
              <Link href="/genealogy#investigation" className="btn-primary">
                See the Benjamin investigation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
