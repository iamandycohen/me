import { NextRequest, NextResponse } from 'next/server';
import { getConfiguredSiteUrl } from '@/lib/url-helpers';
import modifications from '@/data/page-modifications.json';

interface SitemapEntry {
  path: string;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export async function GET(_request: NextRequest) {
  const baseUrl = getConfiguredSiteUrl();
  const dates: Record<string, string> = modifications.pages;

  // Define all URLs with their priorities and change frequencies
  const urls: SitemapEntry[] = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/resume', priority: 0.8, changefreq: 'daily' },
    { path: '/projects', priority: 0.8, changefreq: 'daily' },
    { path: '/genealogy', priority: 0.8, changefreq: 'monthly' },
    { path: '/articles', priority: 0.9, changefreq: 'weekly' },
    { path: '/contact', priority: 0.8, changefreq: 'daily' },
    { path: '/community', priority: 0.8, changefreq: 'daily' },
    { path: '/privacy', priority: 0.4, changefreq: 'yearly' },
  ];

  // Generate sitemap URLs
  const urlEntries = urls
    .map(
      ({ path, priority, changefreq }) =>
        `  <url><loc>${baseUrl}${path}</loc>${dates[path] ? `<lastmod>${dates[path]}</lastmod>` : ''}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
