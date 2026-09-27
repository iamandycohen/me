import sitemap from './sitemap';
import modifications from '@/data/page-modifications.json';
import * as site from '@/lib/site';

jest.mock('@/lib/site', () => ({
  isPublic: true,
  absoluteUrl: (path: string) => `https://www.wheretherecordends.com${path}`,
}));

test('sitemap uses recorded dates and leaves unknown modification dates absent', () => {
  const entries = sitemap();
  for (const [path, date] of Object.entries(modifications.pages)) {
    expect(
      entries.find((entry) => entry.url === site.absoluteUrl(path))
    ).toEqual({ url: site.absoluteUrl(path), lastModified: date });
  }
  expect(
    entries.find((entry) => entry.url.endsWith('/about'))
  ).not.toHaveProperty('lastModified');
  expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
});

test('rebuilding on a later day does not advance sitemap dates', () => {
  jest.useFakeTimers();
  try {
    jest.setSystemTime(new Date('2026-09-28T12:00:00Z'));
    const before = sitemap();
    jest.setSystemTime(new Date('2027-01-01T12:00:00Z'));
    expect(sitemap()).toEqual(before);
  } finally {
    jest.useRealTimers();
  }
});

test('non-public deployments keep an empty sitemap', async () => {
  jest.resetModules();
  jest.doMock('@/lib/site', () => ({
    isPublic: false,
    absoluteUrl: site.absoluteUrl,
  }));
  const { default: previewSitemap } = await import('./sitemap');
  expect(previewSitemap()).toEqual([]);
});
