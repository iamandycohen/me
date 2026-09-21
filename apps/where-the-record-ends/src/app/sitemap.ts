import {
  researchCases,
  stories,
} from '@where-the-record-ends/genealogy-content';
import type { MetadataRoute } from 'next';

import { absoluteUrl, isPublic } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublic) return [];

  const staticPaths = [
    '/',
    '/family',
    '/cases',
    '/stories',
    '/sources',
    '/about',
    '/cases/parentage/highland-creek',
    '/cases/parentage/three-thomases',
  ];
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...researchCases.map((item) => ({ url: absoluteUrl(`/cases/${item.id}`) })),
    ...stories.map((item) => ({ url: absoluteUrl(`/stories/${item.id}`) })),
  ];
}
