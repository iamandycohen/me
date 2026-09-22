import type { Metadata } from 'next';

import { ArrowLink } from '@/components/ArrowLink';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About the research',
  description:
    'The origin, editorial method, evidence boundaries, and privacy commitments behind Where the Record Ends.',
};

const principles = [
  {
    title: 'The record speaks first',
    text: 'A transcription, image, index, family account, and inference do different work. The site names those differences instead of flattening them into a single idea of “proof.”',
  },
  {
    title: 'A conclusion can remain revisable',
    text: 'High confidence is not the same as direct evidence. Current assessments carry their support, limitations, and the kind of new record that could change them.',
  },
  {
    title: 'Context is not evidence',
    text: 'A period map or regional photograph may help a place feel real, but it is never presented as the family’s property, route, or likeness without a direct basis.',
  },
  {
    title: 'Privacy outranks completeness',
    text: 'The public site contains a deliberately reviewed subset. Private records, living-person details, restricted artifacts, and raw research data do not become public merely because they exist.',
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the research"
        title="Family, identity, and an unfinished record."
        introduction="My birth name is Shannon Jeremiah Meason. I grew up as Andy Cohen after being adopted. This project follows one biological line without displacing the Cohen family that raised me."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <p className="eyebrow">Why this exists</p>
            <h2 className="balanced mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              The mystery is real. So is the responsibility to tell it
              carefully.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ink/70">
            <p>
              Where the Record Ends is researched and maintained by me, Andy
              Cohen. I was born Shannon Jeremiah Meason, and my interest in my
              biological family history grew into this ongoing evidence-led
              research project. You can read more about that personal context on{' '}
              <a
                className="font-medium text-accent underline decoration-accent/25 underline-offset-4 transition-colors hover:text-ink"
                href="https://www.iamandycohen.com/genealogy"
              >
                my genealogy page
              </a>
              .
            </p>
            <p>
              The search began with a personal question and grew into a record
              trail across Kentucky, Missouri, and Texas. Some discoveries
              supplied names and dates. The most interesting ones changed the
              shape of the question.
            </p>
            <p>
              Where the Record Ends is the public, editorial layer of that work:
              a place to show the family line, preserve unresolved cases, and
              write the narrative that the evidence can actually support. It is
              not a dump of a private tree or a claim that every open question
              has been solved.
            </p>
            <p>
              The first-person voice matters. This is research about identity as
              well as ancestry, and it is written from inside that experience.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <p className="eyebrow">Editorial method</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Four promises to the reader.
          </h2>
          <div className="mt-9 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 md:grid-cols-2">
            {principles.map((principle, index) => (
              <article key={principle.title} className="bg-paper p-7 sm:p-9">
                <p className="font-serif text-4xl text-ink/15">0{index + 1}</p>
                <h3 className="mt-8 font-serif text-2xl">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-4xl gap-8 rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-paper sm:p-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow">Contribute to the research</p>
            <h2 className="balanced mt-4 font-serif text-4xl leading-tight">
              Have a record I haven&apos;t seen?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/65">
              Original documents, family records, photographs, cemetery
              information, and corrections can all help move an open question
              forward.
            </p>
          </div>
          <ArrowLink href="/contact">Share a record or correction</ArrowLink>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-4xl gap-8 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow !text-accent-soft">
              Start where the evidence changes
            </p>
            <h2 className="mt-4 font-serif text-4xl">
              Benjamin belongs in an inheritance network. His parents are still
              unknown.
            </h2>
          </div>
          <div className="[&_a]:!text-accent-soft">
            <ArrowLink href="/cases/parentage">
              Open the parentage case
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
