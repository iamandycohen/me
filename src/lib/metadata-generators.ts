import type { Metadata } from 'next';
import type { Contact, Role, Bio } from '@/types';
import { getDisplayName, formatLinkedInUrl } from './data-helpers';
import { absoluteUrl, getConfiguredSiteUrl } from './url-helpers';

// Professional data interface for type safety
interface ProfessionalData {
  keywords: string[];
  expertise: string[];
  skills: string[];
}

// Generate JSON-LD structured data
export function generateJsonLd(
  contact: Contact,
  currentRole: Role,
  bio: Bio,
  professional: ProfessionalData
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contact.name,
    image: {
      '@type': 'ImageObject',
      url: `${getConfiguredSiteUrl()}/headshot.jpg`,
      width: 800,
      height: 800,
      caption: `Professional headshot of ${contact.name}`,
      description: `Professional photograph of ${contact.name}, ${currentRole.title} at ${currentRole.company}`,
    },
    jobTitle: currentRole.title,
    worksFor: {
      '@type': 'Organization',
      name: currentRole.company,
    },
    description: bio.short,
    url: getConfiguredSiteUrl(),
    email: contact.email,
    sameAs: [formatLinkedInUrl(contact.linkedin)],
    knowsAbout: professional.skills,
    hasOccupation: {
      '@type': 'Occupation',
      name: currentRole.title,
      occupationLocation: {
        '@type': 'Place',
        name: contact.location,
      },
      skills: professional.expertise,
    },
  };
}

// Generate base metadata for all pages
export function generateBaseMetadata(
  contact: Contact,
  currentRole: Role,
  bio: Bio,
  professional: ProfessionalData
): Metadata {
  const displayName = getDisplayName(contact);

  return {
    metadataBase: new URL(getConfiguredSiteUrl()),
    title: {
      default: `${displayName} — ${currentRole.title}`,
      template: `%s · ${displayName}`,
    },
    description: `${displayName}. ${bio.short}`,
    keywords: professional.keywords,
    authors: [{ name: contact.name }],

    openGraph: {
      title: `${displayName} — ${currentRole.title}`,
      description: bio.short,
      type: 'profile',
      url: getConfiguredSiteUrl(),
      images: [
        {
          url: '/headshot.jpg',
          width: 800,
          height: 800,
          alt: `Professional headshot of ${contact.name}`,
        },
      ],
    },

    twitter: {
      card: 'summary',
      title: `${displayName} — ${currentRole.title}`,
      description: bio.short,
      images: ['/headshot.jpg'],
    },

    alternates: {
      canonical: absoluteUrl('/'),
    },
  };
}

// Generate page-specific metadata
export function generatePageMetadata(
  pageTitle: string,
  description: string,
  contact: Contact,
  additional: Partial<Metadata> = {},
  path: string = ''
): Metadata {
  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} | ${contact.name}`,
      description,
      siteName: `${contact.name}`,
      url: absoluteUrl(path),
      images: [
        {
          url: '/headshot.jpg',
          width: 800,
          height: 800,
          alt: `Professional headshot of ${contact.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${pageTitle} | ${contact.name}`,
      description,
      images: ['/headshot.jpg'],
    },
    alternates: {
      canonical: absoluteUrl(path),
    },
    ...additional,
  };
}
