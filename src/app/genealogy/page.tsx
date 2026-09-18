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
                Last reviewed September 18, 2026 CDT. A newly reviewed census
                adds strong indirect evidence for George&apos;s place in
                Benjamin&apos;s family; the relationship remains unproved.
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
                But when I went looking for the record that actually connected
                them, I could not find one. The relationship itself had no
                source. Some attached records belonged to different men, and two
                original wills naming large Meason families did not include
                Benjamin at all.
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
                The deeper review exposed an earlier break as well. Benjamin is
                a well-documented historical person, but no record I have
                reviewed yet calls George M. Meason his son. A 1900 census now
                calls elder James L. Meason the uncle of George&apos;s strongly
                identified son James R.; elder James&apos;s 1919 death
                certificate names Benjamin as his father. That is strong
                indirect evidence, but the census does not specify the exact
                kind or side of the uncle relationship, and neither record
                literally makes George Benjamin&apos;s son.
                <SourceFootnote referenceIds={[33, 59, 60]} />
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
                  The line—and its two open edges—as I know it today.
                </h2>
                <p className="leading-relaxed text-ink/65 mb-5">
                  This is not every person in a family database. It is the
                  working path that explains my connection to the question.
                </p>
                <p className="text-sm leading-relaxed text-ink/50">
                  The path reaches George M. Meason, then shows the claimed
                  relationship to Benjamin as unproved. Benjamin&apos;s parents
                  remain a separate open question.
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
                  George is visible. His parents are not.
                </h2>
                <p className="leading-relaxed text-ink/65">
                  The records now give George a clearer life of his own. They
                  correct copied dates, document his marriage to Martha Reed,
                  and explain why his birth year remains disputed. The new
                  elder-James evidence strengthens the case that he belonged to
                  Benjamin&apos;s family, but no reviewed record directly
                  identifies Benjamin as his father.
                  <SourceFootnote
                    referenceIds={[25, 26, 31, 32, 33, 34, 59, 60]}
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
                  Two relationships need proof.
                </h2>
                <p className="text-paper/70 text-lg leading-relaxed mb-5">
                  The tree I inherited connected George to Benjamin, then gave
                  Benjamin a father: a Thomas Meason described in copied trees
                  as born in 1755. Both links looked settled because they were
                  repeated so often.
                </p>
                <p className="text-paper/55 leading-relaxed mb-8">
                  The trouble is that plausible is not the same as proved.
                  George and Benjamin now have a strong indirect case through
                  elder James L. Meason, but no reviewed record directly names
                  their relationship. Above Benjamin, separating the same-name
                  men and reading the original wills turns one tidy answer into
                  several distinct candidates.
                </p>
                <div className="inline-flex items-center gap-3 rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/70">
                  <span className="h-2 w-2 rounded-full bg-accent-soft" />
                  Two documentary edges remain open
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <aside className="mb-8 border border-paper/15 bg-paper/[0.04] p-6 md:p-8">
                <p className="eyebrow text-accent-soft mb-3">
                  What I learned from the latest records
                </p>
                <p className="font-serif text-xl leading-relaxed text-paper/80 md:text-2xl">
                  I checked the citations on 35 public profiles and found the
                  two disputed relationships repeated without a record that
                  stated either one. Four adult censuses and a descendant-held
                  Bible say about 1810, while George&apos;s marker says 1818—but
                  those records stop with George. The newly found uncle evidence
                  strengthens one edge without closing it. The tree still has
                  two open edges.
                  <SourceFootnote referenceIds={[25, 26, 30, 33, 34, 59, 60]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  A newly reviewed original death certificate spells out
                  Benjamin Thomas Meason and names Geo M Meason and Martha Reid
                  as his parents. That resolves the full-name question and
                  strengthens his placement in their family—but it does not
                  identify the namesake or close either open ancestral edge.
                  <SourceFootnote referenceIds={[53, 55]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  Three more original death certificates name parents across
                  successive generations from Jimmy through James and Frank to
                  George and Martha. They make that part of my direct line much
                  better supported, while leaving George&apos;s parentage
                  unresolved.
                  <SourceFootnote referenceIds={[56, 57, 58]} />
                </p>
                <p className="mt-5 leading-relaxed text-paper/60">
                  A 1900 census adds a different kind of evidence: it calls
                  elder James L. Meason the uncle of George&apos;s apparent son
                  James R. Elder James&apos;s 1919 certificate names Benjamin as
                  his father. Together they make the George-to-Benjamin case
                  substantially stronger, while stopping short of a record that
                  directly states the relationship.
                  <SourceFootnote referenceIds={[33, 59, 60]} />
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
              New records strengthened the line and opened another lead.
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
              I have a documented life for Benjamin, a strong indirect but still
              unproved bridge from Benjamin to George, several weakened parent
              candidates, and no proved parent above Benjamin. That is less tidy
              than the tree I began with—and much closer to the truth.
              <SourceFootnote
                referenceIds={[18, 19, 20, 21, 22, 25, 26, 30, 33, 34, 59, 60]}
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
