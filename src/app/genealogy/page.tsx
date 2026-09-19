import { generatePageMetadata } from '@/lib/metadata-generators';
import data from '@/lib/data';
import LegacyGenealogyHashRedirect from './LegacyGenealogyHashRedirect';

const publicationUrl = 'https://www.wheretherecordends.com';

const entrances = [
  {
    eyebrow: 'Family atlas',
    title: 'Follow the documented line',
    description:
      'Move through the generations, places, relationships, and evidence neighborhoods that shape the family story.',
    href: `${publicationUrl}/family`,
    cta: 'Explore the family',
  },
  {
    eyebrow: 'Open questions',
    title: 'Enter the active cases',
    description:
      'See what the records support, where they conflict, and which questions remain genuinely unresolved.',
    href: `${publicationUrl}/cases`,
    cta: 'View the cases',
  },
  {
    eyebrow: 'Family chronicle',
    title: 'Read the stories',
    description:
      'Trace the family through Kentucky, Missouri, Texas, and the later generations without outrunning the evidence.',
    href: `${publicationUrl}/stories`,
    cta: 'Read the chronicle',
  },
];

export const metadata = generatePageMetadata(
  'Genealogy',
  'The personal story behind Where the Record Ends, an evidence-led investigation into the Meason family line.',
  data.contact,
  {},
  '/genealogy'
);

export default function GenealogyPage() {
  return (
    <>
      <LegacyGenealogyHashRedirect />
      <section className="pb-16 pt-20 md:pb-20 md:pt-28 lg:pt-32">
        <div className="container-max">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">A personal history</p>
              <h1 className="mb-8 text-balance">
                I grew up as Andy Cohen. I was born{' '}
                <span className="italic text-ink/60">
                  Shannon Jeremiah Meason.
                </span>
              </h1>
              <p className="max-w-3xl text-balance font-serif text-xl leading-relaxed text-ink/75 md:text-2xl">
                Following the Meason line helps me understand the history that
                came before my adoption. It complements—not replaces—the Cohen
                family who raised me and made me who I am.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={publicationUrl} className="btn-primary">
                  Visit Where the Record Ends
                </a>
                <a href={`${publicationUrl}/family`} className="btn-secondary">
                  Explore the family atlas
                </a>
              </div>
            </div>

            <aside className="border-l border-accent/40 pl-6 lg:col-span-4">
              <p className="mb-2 text-xs uppercase tracking-widest text-ink/45">
                The research now lives at
              </p>
              <p className="mb-3 font-serif text-xl">Where the Record Ends</p>
              <p className="text-sm leading-relaxed text-ink/60">
                A separate, evolving publication about evidence, memory, and the
                honest limits of the record.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-max">
          <div className="grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Why I research</p>
              <h2 className="text-balance">
                Another part of my story, approached carefully.
              </h2>
            </div>
            <article className="prose-editorial max-w-prose lg:col-span-8">
              <p>
                Adoption was never a secret in my family. My parents gave me
                room to be curious about where I came from without making that
                curiosity a rejection of the family and life they gave me.
              </p>
              <p>
                What began with fragments of family history became a serious
                investigation: reading original records, testing inherited
                claims, and learning to distinguish a documented relationship
                from a plausible one. The work keeps changing as new evidence
                appears—and sometimes as an old assumption falls away.
              </p>
              <p>
                I created Where the Record Ends to make that process visible. It
                holds the detailed family atlas, the narrative chronicle, the
                sources behind the claims, and the open cases where the evidence
                still stops short of an answer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding border-y border-ink/10 bg-[#f4efe7]">
        <div className="container-max">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">Choose an entrance</p>
              <h2 className="text-balance">
                One investigation, seen from different angles.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-ink/60 lg:col-span-4">
              The complete research experience now lives on its own site. Start
              with the view that best matches your curiosity.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {entrances.map((entrance) => (
              <article
                key={entrance.href}
                className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-7 shadow-[0_12px_40px_rgba(26,26,26,0.035)]"
              >
                <p className="eyebrow mb-4">{entrance.eyebrow}</p>
                <h3 className="mb-3 text-2xl">{entrance.title}</h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-ink/60">
                  {entrance.description}
                </p>
                <a href={entrance.href} className="link-underline self-start">
                  {entrance.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-2">
            <article
              id="investigation"
              className="scroll-mt-28 border-l border-accent/40 pl-6"
            >
              <p className="eyebrow mb-3">
                Following an old investigation link?
              </p>
              <h2 className="mb-4 text-2xl">
                The active questions moved with the research.
              </h2>
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-ink/60">
                The case files preserve the current assessment, competing
                explanations, and the next records worth pursuing.
              </p>
              <a href={`${publicationUrl}/cases`} className="link-underline">
                Continue to the open cases →
              </a>
            </article>

            <article
              id="references"
              className="scroll-mt-28 border-l border-accent/40 pl-6"
            >
              <p className="eyebrow mb-3">Looking for a citation?</p>
              <h2 className="mb-4 text-2xl">
                The source catalog has a new home.
              </h2>
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-ink/60">
                The standalone catalog explains what each public source
                establishes—and what it cannot establish on its own.
              </p>
              <a href={`${publicationUrl}/sources`} className="link-underline">
                Review the sources →
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
