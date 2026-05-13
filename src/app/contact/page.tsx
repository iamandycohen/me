import { generatePageMetadata } from '@/lib/metadata-generators';
import { formatLinkedInUrl, getCurrentActiveRole } from '@/lib/data-helpers';
import { addSitecoreLinks } from '@/lib/utils';
import data from '@/lib/data';

export const metadata = generatePageMetadata(
  'Contact',
  `Get in touch with ${data.contact.name}`,
  data.contact,
  {},
  '/contact'
);

export default function Contact() {
  const currentRole = getCurrentActiveRole(data.resume);
  const displayTitle = currentRole
    ? `${currentRole.title} · ${currentRole.company}`
    : data.bio.tagline;
  const linkedinUrl = formatLinkedInUrl(data.contact.linkedin);

  return (
    <section className="pt-20 md:pt-28 lg:pt-32 pb-24">
      <div className="container-max">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow mb-6">Reach out</p>
          <h1 className="text-balance mb-6">
            Let&apos;s <span className="italic text-ink/60">talk shop.</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
            CMS platform challenges, AI integration, agentic workflows,
            architecture review — or just a conversation about where things are
            headed. I&apos;m up for it.
          </p>
        </div>

        <div className="rule mb-16"></div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Channels */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Channels</p>

            <dl className="space-y-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="font-serif text-xl md:text-2xl text-ink hover:text-accent transition-colors break-all"
                  >
                    {data.contact.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  LinkedIn
                </dt>
                <dd>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl md:text-2xl text-ink hover:text-accent transition-colors"
                  >
                    {data.contact.linkedin}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  GitHub
                </dt>
                <dd>
                  <a
                    href="https://github.com/iamandycohen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl md:text-2xl text-ink hover:text-accent transition-colors"
                  >
                    github.com/iamandycohen
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-widest text-ink/50 mb-2">
                  Location
                </dt>
                <dd className="font-serif text-xl md:text-2xl text-ink/80 italic">
                  {data.contact.location}
                </dd>
              </div>
            </dl>
          </div>

          {/* Current focus */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">
              {currentRole ? 'Current focus' : 'Open to new opportunities'}
            </p>

            {currentRole && (
              <h2 className="font-serif text-2xl md:text-3xl text-ink mb-2 leading-tight">
                {displayTitle}
              </h2>
            )}

            <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-8 text-pretty">
              {currentRole
                ? addSitecoreLinks(currentRole.description)
                : "I'm exploring roles in AI-native product development, platform architecture, and innovation leadership. I help teams build systems that serve both humans and AI agents — leveraging structured data, intelligent orchestration, and modern development practices."}
            </p>

            <h3 className="font-serif text-base font-medium text-ink/70 uppercase tracking-widest mb-4">
              {currentRole ? 'Recent highlights' : 'Areas of focus'}
            </h3>
            <ul className="space-y-2.5 text-ink/75">
              {currentRole ? (
                currentRole.highlights.map((highlight, index) => (
                  <li key={index} className="flex gap-3 leading-relaxed">
                    <span
                      className="text-accent select-none pt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{addSitecoreLinks(highlight)}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex gap-3 leading-relaxed">
                    <span
                      className="text-accent select-none pt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>
                      AI-native architecture and agentic workflow design
                    </span>
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <span
                      className="text-accent select-none pt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>
                      Digital experience platforms and content management
                      systems
                    </span>
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <span
                      className="text-accent select-none pt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>Product strategy and innovation leadership</span>
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <span
                      className="text-accent select-none pt-1"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>
                      Technical thought leadership and community building
                    </span>
                  </li>
                </>
              )}
            </ul>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href={`mailto:${data.contact.email}`} className="btn-primary">
                Send an email
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Message on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
