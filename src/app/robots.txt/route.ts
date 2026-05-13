import { NextResponse } from 'next/server';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';

export async function GET() {
  const siteUrl = getConfiguredSiteUrl();

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml

# Plain-text site summary for LLMs: ${siteUrl}/llms.txt
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
