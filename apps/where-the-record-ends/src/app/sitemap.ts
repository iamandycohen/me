import {
  proofProjects,
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
    '/proofs',
    '/cases',
    '/stories',
    '/sources',
    '/about',
    '/contact',
    '/privacy',
    '/cases/parentage/highland-creek',
    '/cases/parentage/three-thomases',
  ];
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...researchCases.map((item) => ({ url: absoluteUrl(`/cases/${item.id}`) })),
    ...proofProjects.map((item) => ({
      url: absoluteUrl(`/proofs/${item.id}`),
    })),
    ...stories.map((item) => ({ url: absoluteUrl(`/stories/${item.id}`) })),
  ];
}
