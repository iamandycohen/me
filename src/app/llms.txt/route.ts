import { NextResponse } from 'next/server';
import { formatLinkedInUrl, getCurrentActiveRole } from '@/lib/data-helpers';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';
import data from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = getConfiguredSiteUrl();
  const currentRole = getCurrentActiveRole(data.resume);
  const linkedin = formatLinkedInUrl(data.contact.linkedin);

  const headline = currentRole
    ? `${currentRole.title} at ${currentRole.company}`
    : data.bio.tagline;

  const body = `# ${data.contact.name}

> ${headline}. ${data.bio.short}

Based in ${data.contact.location}.

## Pages

- [About](${siteUrl}/): Personal site home and bio
- [Resume](${siteUrl}/resume): Career history and roles
- [Projects](${siteUrl}/projects): Engineering work beyond software
- [Articles](${siteUrl}/articles): Writing on AI, DXP, and software architecture
- [Community](${siteUrl}/community): MVP awards, presentations, and media
- [Contact](${siteUrl}/contact): How to get in touch

## Elsewhere

- LinkedIn: ${linkedin}
- GitHub: https://github.com/iamandycohen
- Email: ${data.contact.email}
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
