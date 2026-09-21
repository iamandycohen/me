import Link from 'next/link';
import Image from 'next/image';
import {
  getBioParagraphs,
  getCurrentActiveRole,
  formatLinkedInUrl,
} from '@/lib/data-helpers';
import { addProfileLinks } from '@/lib/utils';
import data from '@/lib/data';

const genealogyHighlights = [
  {
    marker: 'Family atlas',
    title: 'Follow the documented line',
    detail:
      'Move through generations, relationships, places, and the evidence neighborhoods that connect them.',
    href: 'https://www.wheretherecordends.com/family',
    cta: 'Explore the family',
  },
  {
    marker: 'Family chronicle',
    title: 'Read the story the records can support',
    detail:
      'Trace the family across places and generations without smoothing over uncertainty or contradiction.',
    href: 'https://www.wheretherecordends.com/stories',
    cta: 'Read the chronicle',
  },
  {
    marker: 'Open cases',
    title: 'See where the investigation is still alive',
    detail:
      'Examine competing explanations, unresolved questions, and the records that might move the research forward.',
    href: 'https://www.wheretherecordends.com/cases',
    cta: 'View the cases',
  },
];

export default function Home() {
  const bioParagraphs = getBioParagraphs(data.bio.full);
  const currentRole = getCurrentActiveRole(data.resume);

  const displayTitle = currentRole
    ? `${currentRole.title} · ${currentRole.company}`
    : data.bio.tagline;

  const linkedinUrl = formatLinkedInUrl(data.contact.linkedin);

  const recent = data.resume.slice(0, 4);
  const latestProject = data.projects.find((project) => project.featured);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-28 lg:pt-32">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="eyebrow mb-6">
                {data.contact.location} · Principal, Technical Innovation
              </p>
              <h1 className="text-balance mb-8">
                <span className="block">{data.contact.name}</span>
                <span className="block italic text-ink/60 text-3xl md:text-4xl lg:text-5xl mt-3">
                  builds the systems behind the systems.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-pretty max-w-2xl mb-10">
                {displayTitle}. I work across AI, chat, digital workers, and the
                platform capabilities that turn emerging technology into
                software people can depend on.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Get in touch
                </Link>
                <Link href="/resume" className="btn-secondary">
                  Read the work
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-accent/10 blur-2xl"></div>
                <Image
                  src="/headshot.jpg"
                  alt={`Professional headshot photo of ${data.contact.name}`}
                  width={420}
                  height={420}
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full object-cover ring-1 ring-ink/10 shadow-sm"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 352px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull quote / positioning ─────────────────────────── */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rule mb-12"></div>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-ink text-balance">
              <span className="text-accent">“</span>
              The interesting question isn’t what AI can generate. It’s what
              software can understand, anticipate, and do on someone’s behalf.
              <span className="text-accent">”</span>
            </blockquote>
            <div className="rule mt-12"></div>
          </div>
        </div>
      </section>

      {/* ── Bio / Essay ──────────────────────────────────────── */}
      <section className="pb-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3 lg:sticky lg:top-24 self-start">
              <p className="eyebrow mb-3">About</p>
              <h2 className="text-3xl md:text-4xl mb-4">
                A career in three sentences.
              </h2>
              <p className="text-sm text-ink/60 leading-relaxed">
                Built staffing software early in my career. Founding architect
                of Sitecore XM Cloud. Now building AI-native staffing
                experiences at Bullhorn.
              </p>
            </aside>

            <article className="lg:col-span-9 prose-editorial max-w-prose">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{addProfileLinks(paragraph)}</p>
              ))}
            </article>
          </div>
        </div>
      </section>

      {latestProject && (
        <section className="pb-16">
          <div className="container-max">
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center border-y border-ink/10 py-8">
              <div className="md:col-span-3">
                <p className="eyebrow">{latestProject.homepageEyebrow}</p>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-serif text-2xl md:text-3xl mb-2">
                  {latestProject.title}
                </h2>
                <p className="text-ink/65 leading-relaxed">
                  {latestProject.homepageSummary}
                </p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <Link href="/projects" className="link-underline">
                  {latestProject.homepageCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Genealogy feature ───────────────────────────────── */}
      <section className="section-padding border-y border-ink/10 bg-[#f4efe7]">
        <div className="container-max">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">A personal investigation</p>
              <h2 className="mb-6 text-balance">Where the record ends.</h2>
              <p className="mb-5 font-serif text-xl leading-relaxed text-ink/75 md:text-2xl">
                I grew up as Andy Cohen, but I was born Shannon Jeremiah Meason.
              </p>
              <p className="mb-8 leading-relaxed text-ink/65">
                Adoption was never a secret in my family. A lifelong curiosity
                about my biological lineage eventually became Where the Record
                Ends: an evidence-led investigation into the Meason family—what
                the records establish, what copied trees repeat, and what
                remains unknown.
              </p>
              <div className="flex flex-wrap gap-x-7 gap-y-4">
                <a
                  href="https://www.wheretherecordends.com"
                  className="btn-primary"
                >
                  Explore Where the Record Ends
                </a>
                <Link href="/genealogy" className="link-underline py-3">
                  Read the personal introduction →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-ink/10 bg-paper px-6 py-2 shadow-[0_12px_40px_rgba(26,26,26,0.035)] md:px-8">
                {genealogyHighlights.map((item) => (
                  <article
                    key={item.marker}
                    className="grid gap-2 border-b border-ink/10 py-6 last:border-b-0 md:grid-cols-12 md:gap-6"
                  >
                    <p className="eyebrow md:col-span-3">{item.marker}</p>
                    <div className="md:col-span-9">
                      <h3 className="mb-2 text-lg">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-ink/60">
                        {item.detail}
                      </p>
                      <a
                        href={item.href}
                        className="link-underline mt-4 inline-block text-sm"
                      >
                        {item.cta} →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent career arc ──────────────────────────────── */}
      <section className="section-padding bg-ink text-paper">
        <div className="container-max">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-3 text-accent-soft">The work</p>
              <h2 className="text-paper mb-6">The recent arc.</h2>
              <p className="text-paper/70 leading-relaxed">
                From enterprise cloud platforms to agentic systems and back to
                staffing software — building products that ship and scale.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {recent.map((role) => (
                <div
                  key={`${role.company}-${role.period}`}
                  className="border-t border-paper/15 pt-6 grid md:grid-cols-12 gap-4"
                >
                  <p className="md:col-span-3 text-sm text-paper/50 font-medium">
                    {role.period}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-paper font-serif text-xl md:text-2xl mb-1">
                      {role.title}
                    </h3>
                    <p className="text-paper/70 mb-3">{role.company}</p>
                    <p className="text-paper/60 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper transition-all"
                >
                  Full resume →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connect ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Connect</p>
            <h2 className="text-balance mb-8">
              Still curious. Still building.{' '}
              <span className="italic text-ink/60">Reach out.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/iamandycohen"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                GitHub
              </a>
              <Link href="/contact" className="link-underline">
                Email & contact
              </Link>
              <Link href="/articles" className="link-underline">
                Articles
              </Link>
              <Link href="/community" className="link-underline">
                Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
