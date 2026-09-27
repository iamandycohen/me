// Public personal-site data displayed by each route, including every Community
// tab. Authored copy, rendered HTML, and local image bytes are tracked separately.
const pick = (value, keys) =>
  Object.fromEntries(
    keys
      .filter((key) => value?.[key] !== undefined)
      .map((key) => [key, value[key]])
  );
const linkedIn = (value) =>
  value.startsWith('http') ? value : `https://${value}`;

/** Mirrors root page/component data use without importing browser or TS code. */
export function personalPageContentModels(data) {
  const currentRole = data.resume.find((role) =>
    role.period.toLowerCase().includes('present')
  );
  const featured = data.projects.find((project) => project.featured);
  // RootLayout embeds this Person data on all pages. These are substantive SEO
  // dependencies, unlike navigation/footer chrome and analytics configuration.
  const shared = {
    person: {
      ...pick(data.contact, ['name', 'email', 'location']),
      linkedin: linkedIn(data.contact.linkedin),
      ...pick(data.resume[0], ['title', 'company']),
      description: data.bio.short,
      skills: data.professional.skills,
      expertise: data.professional.expertise,
    },
    keywords: data.professional.keywords,
  };
  const community = data.community;
  const models = {
    '/': {
      displayTitle: currentRole
        ? `${currentRole.title} · ${currentRole.company}`
        : data.bio.tagline,
      bio: data.bio.full.split('\n\n').filter((paragraph) => paragraph.trim()),
      recent: data.resume
        .slice(0, 4)
        .map((role) =>
          pick(role, ['period', 'title', 'company', 'description'])
        ),
      featured: featured
        ? pick(featured, [
            'title',
            'homepageEyebrow',
            'homepageSummary',
            'homepageCta',
          ])
        : null,
    },
    '/resume': {
      roles: data.resume.map((role) =>
        pick(role, ['period', 'title', 'company', 'description', 'highlights'])
      ),
    },
    '/projects': {
      introduction: pick(data.projectsPage, [
        'eyebrow',
        'title',
        'introduction',
        'philosophy',
      ]),
      projects: data.projects.map((project) => ({
        ...pick(project, [
          'period',
          'title',
          'description',
          'image',
          'imageAlt',
          'highlights',
        ]),
        imageFit: project.imageFit === 'contain' ? 'contain' : 'cover',
        highlightsLabel: project.highlightsLabel ?? 'Highlights',
        ...(project.pageUrl
          ? {
              pageUrl: project.pageUrl,
              pageCta: project.pageCta ?? 'Explore project',
            }
          : {}),
        ...Object.fromEntries(
          ['liveUrl', 'sourceUrl', 'archiveUrl']
            .filter((key) => project[key])
            .map((key) => [key, project[key]])
        ),
      })),
    },
    '/articles': {
      articles: (data.thoughtLeadership ?? []).map((article) => ({
        ...pick(article, ['platform', 'date', 'title', 'url', 'summary']),
        highlights: article.highlights ?? [],
        topics: article.topics ?? [],
      })),
    },
    '/community': {
      mvpProfileUrl: community?.mvpProfileUrl || '#',
      awards: (community?.mvpAwards ?? []).map((award) => ({
        ...pick(award, ['year', 'type', 'description']),
        current: award.status === 'Current',
        ...(award.quote
          ? {
              quote: award.quote,
              ...(award.quoteSource ? { quoteSource: award.quoteSource } : {}),
            }
          : {}),
        ...(award.announcementUrl
          ? { announcementUrl: award.announcementUrl }
          : {}),
      })),
      presentations: (community?.presentations ?? []).map((presentation) => ({
        ...pick(presentation, [
          'date',
          'organization',
          'location',
          'sessionTitle',
          'title',
          'description',
        ]),
        historic: Boolean(presentation.isHistoric),
        upcoming: Boolean(presentation.isUpcoming),
        topics: presentation.topics ?? [],
        liveDemo: Boolean(
          presentation.topics?.length && presentation.isLiveDemo
        ),
        ...(presentation.documentationQuote
          ? {
              documentationQuote: presentation.documentationQuote,
              ...(presentation.documentationSource
                ? { documentationSource: presentation.documentationSource }
                : {}),
            }
          : {}),
        ...Object.fromEntries(
          ['videoUrl', 'sessionizeUrl', 'documentationUrl']
            .filter((key) => presentation[key])
            .map((key) => [key, presentation[key]])
        ),
      })),
      featuredMedia: community?.featuredMedia
        ? {
            ...pick(community.featuredMedia, ['episode', 'title']),
            description: community.featuredMedia.description || '',
            ...Object.fromEntries(
              ['podcastUrl', 'blogUrl']
                .filter((key) => community.featuredMedia[key])
                .map((key) => [key, community.featuredMedia[key]])
            ),
          }
        : null,
      podcasts: (community?.mediaResources?.podcasts ?? []).map((podcast) => ({
        ...pick(podcast, ['title', 'description']),
        links: podcast.links.map((link) => pick(link, ['label', 'url'])),
      })),
    },
    '/contact': {
      // The displayed LinkedIn label preserves its authored form; JSON-LD uses
      // the normalized URL. No bio.tagline is rendered when no active role exists.
      linkedinLabel: data.contact.linkedin,
      currentRole: currentRole
        ? pick(currentRole, ['title', 'company', 'description', 'highlights'])
        : null,
    },
    '/genealogy': {},
    '/privacy': {},
  };
  return Object.fromEntries(
    Object.entries(models).map(([route, model]) => [
      route,
      { ...model, shared },
    ])
  );
}
