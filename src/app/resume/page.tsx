import { generatePageMetadata } from '@/lib/metadata-generators';
import { getRoleDuration, getDisplayName } from '@/lib/data-helpers';
import { addSitecoreLinks } from '@/lib/utils';
import data from '@/lib/data';

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  'Resume',
  `Professional experience and career history for ${displayName}`,
  data.contact,
  {},
  '/resume'
);

export default function Resume() {
  return (
    <section className="pt-20 md:pt-28 lg:pt-32 pb-20">
      <div className="container-max">
        <div className="max-w-4xl">
          <p className="eyebrow mb-6">Curriculum vitae</p>
          <h1 className="text-balance mb-6">
            <span className="block">Two decades of</span>
            <span className="block italic text-ink/60">
              building things that last.
            </span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
            From applicant tracking systems written as a kid, to enterprise CMS
            platforms serving millions — the throughline is engineering
            craftsmanship and systems that scale.
          </p>
        </div>

        <div className="rule my-16"></div>

        <ol className="space-y-16">
          {data.resume.map((role, index) => (
            <li
              key={`${role.company}-${role.period}-${index}`}
              className="grid md:grid-cols-12 gap-6 md:gap-10"
            >
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-accent tracking-wide">
                  {getRoleDuration(role)}
                </p>
                <p className="text-sm text-ink/50 mt-1">{role.period}</p>
              </div>

              <article className="md:col-span-9">
                <h2 className="font-serif text-2xl md:text-3xl text-ink mb-1 leading-tight">
                  {role.title}
                </h2>
                <p className="text-lg text-ink/70 mb-6 italic">
                  {role.company}
                </p>

                <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-6 text-pretty">
                  {addSitecoreLinks(role.description)}
                </p>

                <ul className="space-y-2.5 text-ink/75">
                  {role.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 leading-relaxed">
                      <span
                        className="text-accent select-none pt-1"
                        aria-hidden="true"
                      >
                        —
                      </span>
                      <span>{addSitecoreLinks(highlight)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        {data.resume.length === 1 && (
          <p className="mt-16 text-center text-ink/50 italic font-serif">
            More experience details coming soon…
          </p>
        )}
      </div>
    </section>
  );
}
