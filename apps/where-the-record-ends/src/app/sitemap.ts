import {
  proofProjects,
  researchCases,
  stories,
} from '@where-the-record-ends/genealogy-content';
import type { MetadataRoute } from 'next';

import { absoluteUrl, isPublic } from '@/lib/site';
import modifications from '@/data/page-modifications.json';

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
  const paths = [
    ...staticPaths,
    ...researchCases.map((item) => `/cases/${item.id}`),
    ...proofProjects.map((item) => `/proofs/${item.id}`),
    ...stories.map((item) => `/stories/${item.id}`),
  ];
  const dates: Readonly<Record<string, string>> = modifications.pages;
  return paths.map((path) => ({
    url: absoluteUrl(path),
    // Unknown dates are omitted; builds and research reviews are not page edits.
    ...(dates[path] ? { lastModified: dates[path] } : {}),
  }));
}
