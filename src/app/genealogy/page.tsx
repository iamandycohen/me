import Link from 'next/link';

import { generatePageMetadata } from '@/lib/metadata-generators';
import data from '@/lib/data';
import DocumentedTree from './_components/DocumentedTree';
import EvidenceLegend from './_components/EvidenceLegend';
import ReferencesList from './_components/ReferencesList';
import SourceFootnote from './_components/SourceFootnote';
import {
  chronology,
  evidenceLedger,
  familyNetworkScenes,
  georgeChronology,
  latestResearchUpdates,
  nextResearchSteps,
  publicTree,
  researchBlockers,
  researchThreads,
} from './data';
import { genealogyReferences } from './references';

export const metadata = generatePageMetadata(
  'Where the Record Ends',
  'A working family tree and an evidence-led investigation into the Meason family line.',
  data.contact,
  {},
  '/genealogy'
);

export default function GenealogyPage() {
  return (
    <>
      <section className="pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">
                Family history · Ongoing investigation
              </p>
              <h1 className="text-balance mb-8">
                Where the record{' '}
                <span className="italic text-ink/60">ends.</span>
              </h1>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink/75 text-balance max-w-3xl">
                I&apos;m tracing the Meason line backward—preserving what the
                records establish, challenging what copied trees repeat, and
                leaving the unanswered parts honestly open.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link href="/genealogy/tree" className="btn-primary">
                  Explore my working family tree
                </Link>
                <a href="#investigation" className="btn-secondary">
                  Follow the investigation
                </a>
                <a href="#references" className="btn-secondary">
                  Review the references
                </a>
              </div>
            </div>
            <aside className="lg:col-span-4 border-l border-accent/40 pl-6">
              <p className="text-xs uppercase tracking-widest text-ink/45 mb-2">
                Research status
              </p>
              <p className="font-serif text-xl mb-2">In progress</p>
              <p className="text-sm leading-relaxed text-ink/60">
                Last reviewed September 19, 2026 CDT. The evidence reviewed to
                date supports George&apos;s place in Benjamin&apos;s family as a
                high-confidence indirect conclusion. Benjamin&apos;s own parents
                remain unknown.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Why Meason</p>
              <h2 className="text-balance">
                I began life with one name and grew up with another.
              </h2>
            </div>
            <article className="prose-editorial max-w-prose lg:col-span-8">
              <p>
                I was born Shannon Jeremiah Meason in Montgomery, Alabama, in
                1978, to Cynthia June Meason. I was adopted by the Cohen family,
                a Jewish family from the San Francisco Bay Area, and grew up as
                Andy Cohen.
              </p>
              <p>
                Adoption was never a secret in my family. My parents were always
                open about it, and I cannot remember a time when I did not know
                I was adopted. That openness gave me room to be curious—not
                because I felt that something was being withheld, but because I
                knew there was another part of my story waiting to be
                understood.
              </p>
              <p>
                That curiosity became serious research when the internet began
                making genealogical records accessible. Services such as
                Ancestry gave me a way to move beyond family fragments and
                copied names—to follow records, compare competing stories, and
                reconstruct the Meason line one document at a time.
              </p>
              <p>
                This tree follows my biological Meason lineage. It does not
                replace the Cohen family that raised me; it helps me understand
                the history that came before my adoption.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Why this line</p>
              <h2 className="text-balance">
                A tree can make uncertainty look finished.
              </h2>
            </div>
            <article className="lg:col-span-8 prose-editorial max-w-prose">
              <p>
                The family tree I started from gave Benjamin Meason a father: a
                Thomas Meason described in copied trees as born in 1755. The
                name appeared often enough—and in enough other trees—that it
                looked like an answer rather than a question.
              </p>
              <p>
                The claim did not begin with the internet. A published reader
                query in 1980 already listed George among Benjamin&apos;s
                children—but it supplied no record for that relationship and was
                itself still asking who Benjamin&apos;s parents were.
                <SourceFootnote referenceIds={[48]} />
              </p>
              <p>
                But when I first went looking for the record that actually
                connected them, I found no cited source stating the
                relationship. Some attached records belonged to different men,
                and two original wills naming large Meason families did not
                include Benjamin at all.
                <SourceFootnote referenceIds={[18, 19]} />
              </p>
              <p>
                I tested that repetition directly. Every one of 25 sampled
                George profiles named Benjamin and Hannah as his parents, and
                all ten sampled Thomas profiles attached Benjamin as a child.
                None exposed a record stating either relationship. Agreement
                across trees showed repetition without independent proof in the
                visible sources.
                <SourceFootnote referenceIds={[30]} />
              </p>
              <p>
                The answer emerged only when I stopped looking for a single
                sentence and followed the family around it. Laura Ann&apos;s
                marriage return names her as Benjamin&apos;s daughter. Her
                husband, John C. Kippers, later acquired land with George and
                James L. Meason. The same Kipper, Hollingsworth, Parker, and
                Meason circle remained close in the 1860 census. Over the next
                two decades, James moved from blacksmithing into mill work.
                Decades later in Texas, George&apos;s son called that elder
                James his uncle, and James&apos;s death certificate named
                Benjamin as his father. Taken together, those records are strong
                enough for me to accept George&apos;s place in Benjamin&apos;s
                family as a high-confidence indirect conclusion.
                <SourceFootnote
                  referenceIds={[28, 33, 59, 60, 61, 62, 63, 64]}
                />
              </p>
              <p>
                I do not want to replace one confident story with another. I
                want to show the line I can support, the assumptions I have had
                to let go, and the places where the evidence still refuses to
                give a simple answer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink/[0.025] py-10">
        <div className="container-max">
          <EvidenceLegend />
        </div>
      </section>

      <section className="section-padding border-y border-ink/10 bg-[#f4efe7]">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Benjamin&apos;s will · 1853</p>
              <h2 className="text-balance">A household, not just a name.</h2>
            </div>
            <article className="prose-editorial max-w-prose lg:col-span-8">
              <p>
                Benjamin&apos;s recorded will gives the family story a human
                scale. James S. received the farm and most of the personal
                property, along with the obligation to pay Benjamin&apos;s debts
                and the other bequests. Virginia Ann Hollingsworth received a
                bed, bedstead, and furnishings. Emily Jane received the same,
                plus the silverware and a saddle horse.
                <SourceFootnote referenceIds={[65]} />
              </p>
              <p>
                Benjamin also reserved forever a seventy-foot-square family
                burial ground on James&apos;s farm, where his wife already lay.
                A later cemetery survey names both Hannah Doom Meason and
                Benjamin in a Meason Family Cemetery, but its Range 10 location
                conflicts with Benjamin&apos;s known Range 11 patent. I am
                preserving that conflict rather than turning it into a map pin.
                <SourceFootnote referenceIds={[13, 65, 66]} />
              </p>
              <p>
                The copy I reviewed is the contemporary will-book record and
                probate order, not Benjamin&apos;s surviving loose original. It
                names James S., Virginia, and Emily, but omits Laura—whose own
                marriage record independently proves she was Benjamin&apos;s
                daughter. That makes the omission of George or James L. a fact
                to investigate, not a reason to erase them.
                <SourceFootnote referenceIds={[61, 65]} />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="documented-tree"
        className="section-padding bg-[#f4efe7] border-b border-ink/10"
      >
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-4">My working family tree</p>
                <h2 className="mb-6 text-balance">
                  The line—and the evidence behind it—as I know it today.
                </h2>
                <p className="leading-relaxed text-ink/65 mb-5">
                  This is not every person in a family database. It is the
                  working path that explains my connection to the question.
                </p>
                <p className="text-sm leading-relaxed text-ink/50">
                  The path reaches George M. Meason, then shows the
                  high-confidence indirect conclusion that places him with
                  Benjamin. The identities of Benjamin&apos;s parents remain a
                  genuinely open question.
                </p>
                <Link
                  href="/genealogy/tree"
                  className="link-underline inline-block mt-6"
                >
                  Open the tree on its own page →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <DocumentedTree nodes={publicTree} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-ink/10">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-4">The bridge generation</p>
                <h2 className="mb-6 text-balance">
                  George no longer stands alone.
                </h2>
                <p className="leading-relaxed text-ink/65">
                  George&apos;s own records correct copied dates, document his
                  marriage to Martha Reed, and explain why his birth year
                  remains disputed. Around him, a wider network of relatives,
                  shared land, neighboring households, occupations, and a later
                  reunion in Texas places him in Benjamin&apos;s family even
                  though no single reviewed record calls him Benjamin&apos;s
                  son.
                  <SourceFootnote
                    referenceIds={[
                      25, 26, 28, 31, 32, 33, 34, 59, 60, 61, 62, 63, 64,
                    ]}
                  />
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-t border-ink/15">
                {georgeChronology.map((event) => (
                  <li
                    key={`${event.year}-${event.title}`}
                    className="grid gap-3 border-b border-ink/10 py-7 sm:grid-cols-12 sm:gap-8"
                  >
                    <div className="sm:col-span-3">
                      <p className="font-serif text-2xl text-accent">
                        {event.year}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-ink/45">
                        {event.place}
                      </p>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="mb-2 text-xl">{event.title}</h3>
                      <p className="leading-relaxed text-ink/65">
                        {event.detail}
                        <SourceFootnote referenceIds={event.referenceIds} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-ink/10 bg-ink/[0.025]">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-4">The family between the lines</p>
                <h2 className="mb-6 text-balance">
                  A marriage, a patch of land, and a life built around mills.
                </h2>
                <p className="leading-relaxed text-ink/65">
                  Genealogy can flatten people into names and dates. Here, the
                  details do the opposite. They show relatives sharing property,
                  households, work, migration, and responsibility across more
                  than seventy years.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-t border-ink/15">
                {familyNetworkScenes.map((scene) => (
                  <li
                    key={`${scene.year}-${scene.title}`}
                    className="grid gap-4 border-b border-ink/10 py-8 sm:grid-cols-12 sm:gap-8"
                  >
                    <div className="sm:col-span-3">
                      <p className="font-serif text-2xl text-accent">
                        {scene.year}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-ink/45">
                        {scene.place}
                      </p>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="mb-3 text-xl">{scene.title}</h3>
                      <p className="leading-relaxed text-ink/65">
                        {scene.detail}
                        <SourceFootnote referenceIds={scene.referenceIds} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm leading-relaxed text-ink/50">
                These records support the conclusion only when read together.
                The 1860 census does not label every relationship, the deed does
                not call George and James brothers, and the record of
                James&apos;s move from Missouri to Texas is still missing. Those
                limits remain part of the story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-ink/10">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">A life in motion</p>
              <h2 className="text-balance mb-6">
                Following Benjamin through the records.
              </h2>
              <p className="leading-relaxed text-ink/65">
                Parentage is unresolved, but Benjamin himself is not a shadow.
                Original records trace a coherent life from Kentucky into
                northeast Missouri.
                <SourceFootnote
                  referenceIds={[1, 2, 4, 10, 11, 12, 13, 14, 15]}
                />
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="border-t border-ink/15">
                {chronology.map((event) => (
                  <li
                    key={`${event.year}-${event.title}`}
                    className="grid sm:grid-cols-12 gap-3 sm:gap-8 py-7 border-b border-ink/10"
                  >
                    <div className="sm:col-span-3">
                      <p className="font-serif text-2xl text-accent">
                        {event.year}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-ink/45 mt-1">
                        {event.place}
                      </p>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="text-xl mb-2">{event.title}</h3>
                      <p className="leading-relaxed text-ink/65">
                        {event.detail}
                        <SourceFootnote referenceIds={event.referenceIds} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section
        id="investigation"
        className="section-padding bg-ink text-paper scroll-mt-24"
      >
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-accent-soft mb-4">
                  The inherited branch
                </p>
                <h2 className="text-paper mb-6 text-balance">
                  One conclusion strengthened. One frontier remains.
                </h2>
                <p className="text-paper/70 text-lg leading-relaxed mb-5">
                  The tree I inherited connected George to Benjamin, then gave
                  Benjamin a father: a Thomas Meason described in copied trees
                  as born in 1755. The two links once looked equally settled—and
                  equally unsupported—because they were repeated so often.
                </p>
                <p className="text-paper/55 leading-relaxed mb-8">
                  They are no longer equal. Records created at different times
                  and for different purposes now converge on George&apos;s place
                  in Benjamin&apos;s family, so I carry that relationship as a
                  high-confidence indirect conclusion. Above Benjamin, the 1813
                  deeds now place him inside Joseph Meason&apos;s inheritance
                  network, but collateral heirs prove that “heir at law” cannot
                  be read as “son.” His exact branch remains unresolved.
                </p>
                <div className="inline-flex items-center gap-3 rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/70">
                  <span className="h-2 w-2 rounded-full bg-accent-soft" />
                  One indirect conclusion · one unknown generation
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <aside className="mb-8 border border-paper/15 bg-paper/[0.04] p-6 md:p-8">
                <p className="eyebrow text-accent-soft mb-3">
                  What I learned from the latest records
                </p>
                <p className="font-serif text-xl leading-relaxed text-paper/80 md:text-2xl">
                  The deed did not give me Benjamin&apos;s father. It gave me
                  something more useful than another copied name: a place inside
                  a real family inheritance.
                  <SourceFootnote referenceIds={[67, 68]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  In 1813 Benjamin conveyed his interest in Joseph Meason&apos;s
                  1,000-acre Highland Creek tract as one of Joseph&apos;s heirs
                  at law. An adjacent deed identifies children of Joseph&apos;s
                  brothers John and Samuel among the heirs. Descent through one
                  of Joseph&apos;s sibling branches is now the leading model,
                  but no record yet assigns Benjamin to a particular branch.
                  <SourceFootnote referenceIds={[67, 68]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  Three more original death certificates name parents across
                  successive generations from Jimmy through James and Frank to
                  George and Martha. They make that part of my direct line much
                  better supported. George&apos;s parents remain unstated in
                  those records; the indirect family network is what carries the
                  line to Benjamin.
                  <SourceFootnote referenceIds={[56, 57, 58]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  No single document writes the sentence “George was
                  Benjamin&apos;s son.” The conclusion is indirect because it
                  comes from the agreement of records created across different
                  decades and for different purposes. Their combined story is
                  now stronger than the credible alternatives I have found, so I
                  accept the relationship while keeping its evidentiary
                  character visible.
                  <SourceFootnote
                    referenceIds={[28, 33, 59, 60, 61, 62, 63, 64]}
                  />
                </p>
              </aside>
              <div className="grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2">
                {researchThreads.map((thread) => (
                  <article
                    key={thread.name}
                    className="bg-ink p-6 last:sm:col-span-2 md:p-8"
                  >
                    <p className="text-xs uppercase tracking-widest text-accent-soft mb-3">
                      {thread.category} · {thread.status}
                    </p>
                    <h3 className="text-paper text-xl mb-4">{thread.name}</h3>
                    <p className="max-w-2xl text-paper/60 leading-relaxed text-sm">
                      {thread.detail}
                      <SourceFootnote referenceIds={thread.referenceIds} />
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">The evidence ledger</p>
              <h2 className="text-balance mb-6">
                What a record says—and what it doesn&apos;t.
              </h2>
              <p className="leading-relaxed text-ink/65">
                A document can be genuine and still not answer the question I am
                asking. Each conclusion needs a boundary.
              </p>
            </div>
            <div className="lg:col-span-8 border-t border-ink/15">
              {evidenceLedger.map((item) => (
                <article
                  key={item.record}
                  className="grid md:grid-cols-12 gap-5 md:gap-8 py-7 border-b border-ink/10"
                >
                  <h3 className="md:col-span-3 text-lg">{item.record}</h3>
                  <div className="md:col-span-9 grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-accent mb-2">
                        Establishes
                      </p>
                      <p className="text-sm leading-relaxed text-ink/70">
                        {item.establishes}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink/45 mb-2">
                        Does not establish
                      </p>
                      <p className="text-sm leading-relaxed text-ink/55">
                        {item.limit}
                        <SourceFootnote referenceIds={item.referenceIds} />
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-ink/10 bg-ink/[0.025]">
        <div className="container-max">
          <div className="mb-16 md:mb-20">
            <p className="eyebrow mb-4">What I found most recently</p>
            <h2 className="mb-8 text-balance">
              The records turned a cluster of names into a family.
            </h2>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
              {latestResearchUpdates.map((update) => (
                <article
                  key={update.title}
                  className="bg-paper p-6 last:md:col-span-2 md:p-7"
                >
                  <p className="mb-3 text-xs uppercase tracking-widest text-accent">
                    {update.status}
                  </p>
                  <h3 className="mb-3 text-lg">{update.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-ink/60">
                    {update.detail}
                    <SourceFootnote referenceIds={update.referenceIds} />
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="eyebrow mb-4">Why the answer is still missing</p>
              <h2 className="mb-8 text-balance">The blockers are specific.</h2>
              <div className="space-y-7">
                {researchBlockers.map((blocker, index) => (
                  <article key={blocker.title} className="flex gap-5">
                    <span className="font-serif text-accent pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-lg mb-2">{blocker.title}</h3>
                      <p className="text-sm leading-relaxed text-ink/60">
                        {blocker.detail}
                        <SourceFootnote referenceIds={blocker.referenceIds} />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">What I&apos;m pursuing now</p>
              <h2 className="mb-8 text-balance">
                The next records are specific.
              </h2>
              <div className="space-y-4">
                {nextResearchSteps.map((step) => (
                  <article
                    key={step.title}
                    className="rounded-2xl border border-ink/10 bg-paper p-6"
                  >
                    <h3 className="text-lg mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/60">
                      {step.detail}
                      <SourceFootnote referenceIds={step.referenceIds} />
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Research checkpoint · September 2026</p>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-ink/80 text-balance mb-8">
              I have a documented life for Benjamin and a high-confidence
              indirect conclusion connecting him to George. Above Benjamin, I
              now have a legal record placing him among Joseph Meason&apos;s
              heirs and a collateral network that makes Thomas born in 1755 a
              serious candidate again. I still have no proved parent. That is
              less tidy than the tree I began with—and much closer to the truth.
              <SourceFootnote
                referenceIds={[
                  18, 19, 20, 21, 22, 25, 26, 28, 30, 33, 34, 59, 60, 61, 62,
                  63, 64, 67, 68,
                ]}
              />
            </p>
            <p className="leading-relaxed text-ink/60 max-w-2xl mb-8">
              One descendant-held Bible now takes the family story back to
              George, but not beyond him. Other Bible entries, letters,
              photographs, church records, or material connected to the Mason or
              Meason families of Nelson, Logan, Ralls, or Monroe Counties may
              hold the missing connection.
              <SourceFootnote referenceIds={[34]} />
            </p>
            <Link href="/contact" className="btn-primary">
              Share a family lead
            </Link>
          </div>
        </div>
      </section>

      <section
        id="references"
        className="section-padding scroll-mt-24 border-t border-ink/10 bg-[#f4efe7]"
      >
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-4">References</p>
                <h2 className="mb-6 text-balance">
                  The records behind the story.
                </h2>
                <p className="leading-relaxed text-ink/65 mb-5">
                  Each footnote leads here. These citations identify the record,
                  where it can be found, what it supports, and the boundary of
                  what it can establish.
                </p>
                <p className="text-sm leading-relaxed text-ink/50">
                  Links point to public provider or repository pages. Some
                  services require a free account, subscription, or affiliate
                  library access. No private tree export, living-person data, or
                  restricted image is published here.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ReferencesList references={genealogyReferences} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
