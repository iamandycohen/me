import type { MetadataRoute } from 'next';

import { isPublic, siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPublic
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: isPublic ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
