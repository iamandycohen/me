import { generatePageMetadata } from '@/lib/metadata-generators';
import { getDisplayName } from '@/lib/data-helpers';
import data from '@/lib/data';
import CommunityTabs from './_components/CommunityTabs';
import { MVPAward, Presentation } from '@/types';

interface Podcast {
  title: string;
  url: string;
  description: string;
}

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  'Community Leadership',
  `Community recognition and thought leadership by ${data.contact.name} — MVP awards, conference presentations, and media appearances in enterprise CMS.`,
  data.contact,
  {
    openGraph: {
      title: `${displayName}'s Community Leadership — Recognition & Impact`,
      description: `MVP awards, conference presentations, and thought leadership in enterprise CMS by ${data.contact.name}.`,
    },
  },
  '/community'
);

const mvpAwards = data.community?.mvpAwards;
const mvpProfileUrl = data.community?.mvpProfileUrl || '#';
const presentations = data.community?.presentations || [];
const featuredMedia = data.community?.featuredMedia;
const podcasts = data.community?.mediaResources?.podcasts || [];

export default function Community() {
  const MVPAwardsContent = () => (
    <div>
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Sitecore</p>
        <h2 className="mb-4">MVP recognition.</h2>
        <a
          href={mvpProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-sm"
        >
          View official MVP profile →
        </a>
      </div>

      <ol className="space-y-12">
        {mvpAwards &&
          mvpAwards.map((award: MVPAward) => (
            <li
              key={award.year}
              className="grid md:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-ink/10 last:border-b-0 last:pb-0"
            >
              <div className="md:col-span-3">
                <p className="font-serif text-3xl md:text-4xl text-accent leading-none">
                  {award.year}
                </p>
                <p className="text-sm text-ink/60 mt-2">{award.type} MVP</p>
                {award.status === 'Current' && (
                  <p className="mt-3 inline-block text-xs uppercase tracking-widest text-accent border border-accent/40 px-2 py-0.5 rounded-full">
                    Current
                  </p>
                )}
              </div>

              <div className="md:col-span-9">
                <p
                  className="text-base md:text-lg text-ink/80 leading-relaxed mb-5 text-pretty"
                  dangerouslySetInnerHTML={{
                    __html: addSitecoreLinksHtml(award.description),
                  }}
                />

                {award.quote && (
                  <blockquote className="border-l-2 border-accent/50 pl-6 my-6 font-serif italic text-lg md:text-xl text-ink/80 leading-relaxed">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `“${addSitecoreLinksHtml(award.quote)}”`,
                      }}
                    />
                    {award.quoteSource && (
                      <cite className="block text-sm text-ink/60 mt-3 not-italic font-sans">
                        — {award.quoteSource}
                      </cite>
                    )}
                  </blockquote>
                )}

                {award.announcementUrl && (
                  <a
                    href={award.announcementUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    Official announcement →
                  </a>
                )}
              </div>
            </li>
          ))}
      </ol>
    </div>
  );

  const PresentationsContent = () => (
    <div>
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Stage</p>
        <h2 className="mb-4">Conference presentations.</h2>
        <p className="text-ink/70 leading-relaxed">
          Technical presentations and live demonstrations at industry
          conferences and community events.
        </p>
      </div>

      <ol className="space-y-12">
        {presentations.map((presentation: Presentation, index: number) => (
          <li
            key={index}
            className="grid md:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-ink/10 last:border-b-0 last:pb-0"
          >
            <div className="md:col-span-3">
              <p className="text-sm font-medium text-accent tracking-wide">
                {presentation.date}
              </p>
              <p className="text-sm text-ink/60 mt-1">
                {presentation.organization}
              </p>
              <p className="text-sm text-ink/50 mt-0.5">
                {presentation.location}
              </p>
              {presentation.isHistoric && (
                <p className="mt-3 inline-block text-xs uppercase tracking-widest text-accent border border-accent/40 px-2 py-0.5 rounded-full">
                  Historic
                </p>
              )}
              {presentation.isUpcoming && (
                <p className="mt-3 inline-block text-xs uppercase tracking-widest text-accent border border-accent/40 px-2 py-0.5 rounded-full">
                  Upcoming
                </p>
              )}
            </div>

            <article className="md:col-span-9">
              <h3 className="font-serif text-xl md:text-2xl text-ink mb-2 leading-tight">
                {presentation.sessionTitle}
              </h3>
              <p className="text-ink/60 italic mb-5">{presentation.title}</p>

              {presentation.topics && presentation.topics.length > 0 && (
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-ink/50 mb-5">
                  {presentation.topics.map((topic: string, i: number) => (
                    <li key={i}>{topic}</li>
                  ))}
                  {presentation.isLiveDemo && (
                    <li className="text-accent">Live demo</li>
                  )}
                </ul>
              )}

              <p
                className="text-base text-ink/80 leading-relaxed mb-5 text-pretty"
                dangerouslySetInnerHTML={{
                  __html: addSitecoreLinksHtml(presentation.description),
                }}
              />

              {presentation.documentationQuote && (
                <blockquote className="border-l-2 border-ink/20 pl-6 my-5 font-serif italic text-ink/75 leading-relaxed">
                  &ldquo;{presentation.documentationQuote}&rdquo;
                  {presentation.documentationSource && (
                    <cite className="block text-sm text-ink/60 mt-2 not-italic font-sans">
                      — {presentation.documentationSource}
                    </cite>
                  )}
                </blockquote>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm pt-2">
                {presentation.videoUrl && (
                  <a
                    href={presentation.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Watch video →
                  </a>
                )}
                {presentation.sessionizeUrl && (
                  <a
                    href={presentation.sessionizeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Session details →
                  </a>
                )}
                {presentation.documentationUrl && (
                  <a
                    href={presentation.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Read more →
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );

  const MediaContent = () => (
    <div>
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">On the air</p>
        <h2 className="mb-4">Media &amp; podcasts.</h2>
        <p className="text-ink/70 leading-relaxed">
          Featured podcast appearances and media coverage on CMS architecture
          and technology leadership.
        </p>
      </div>

      {featuredMedia && (
        <article className="mb-16 grid md:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-ink/10">
          <div className="md:col-span-3">
            <p className="eyebrow mb-2">Featured</p>
            <p className="text-sm text-ink/60">{featuredMedia.episode}</p>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 leading-tight text-balance">
              {featuredMedia.title}
            </h3>
            <p
              className="text-base md:text-lg text-ink/80 leading-relaxed mb-6 text-pretty"
              dangerouslySetInnerHTML={{
                __html: addSitecoreLinksHtml(featuredMedia.description || ''),
              }}
            />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {featuredMedia.podcastUrl && (
                <a
                  href={featuredMedia.podcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Listen to podcast →
                </a>
              )}
              {featuredMedia.blogUrl && (
                <a
                  href={featuredMedia.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Read blog post →
                </a>
              )}
            </div>
          </div>
        </article>
      )}

      {podcasts.length > 0 && (
        <ol className="space-y-10">
          {podcasts.map((podcast: Podcast, index: number) => (
            <li
              key={index}
              className="grid md:grid-cols-12 gap-6 md:gap-10 pb-10 border-b border-ink/10 last:border-b-0 last:pb-0"
            >
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-accent tracking-wide">
                  Podcast
                </p>
              </div>
              <div className="md:col-span-9">
                <h4 className="font-serif text-xl text-ink mb-3 leading-tight">
                  {podcast.title}
                </h4>
                <p className="text-ink/70 leading-relaxed mb-4">
                  {podcast.description}
                </p>
                <a
                  href={podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm"
                >
                  Listen now →
                </a>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );

  const tabs = [
    {
      id: 'mvp-awards',
      label: 'MVP Awards',
      content: <MVPAwardsContent />,
    },
    {
      id: 'presentations',
      label: 'Presentations',
      content: <PresentationsContent />,
    },
    {
      id: 'media',
      label: 'Media',
      content: <MediaContent />,
    },
  ];

  return (
    <>
      <section className="pt-20 md:pt-28 lg:pt-32">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Community</p>
            <h1 className="text-balance mb-6">
              Leadership{' '}
              <span className="italic text-ink/60">in the field.</span>
            </h1>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              Recognition and contributions to the enterprise CMS community
              through technical leadership, education, and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <CommunityTabs tabs={tabs} />
        </div>
      </section>
    </>
  );
}

// Local helper: returns HTML string with Sitecore XM Cloud mentions linkified.
// Used by sections that render data containing inline HTML (server component).
function addSitecoreLinksHtml(text: string): string {
  if (!text) return '';
  return text.replace(
    /(Sitecore XM Cloud|XM Cloud)/g,
    '<a href="https://www.sitecore.com/products/xm-cloud" target="_blank" rel="noopener noreferrer" class="text-accent underline decoration-accent/30 hover:decoration-accent underline-offset-4 transition-all">$1</a>'
  );
}
