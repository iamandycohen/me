/** @jest-environment node */
import { NextRequest } from 'next/server';
import { GET } from '../route';
import modifications from '@/data/page-modifications.json';

describe('personal sitemap content dates', () => {
  afterEach(() => jest.useRealTimers());

  it('uses recorded per-page dates and stays unchanged as the clock advances', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2030-01-01T00:00:00Z'));
    const request = new NextRequest('https://www.iamandycohen.com/sitemap.xml');
    const first = await (await GET(request)).text();
    jest.setSystemTime(new Date('2031-06-10T00:00:00Z'));
    expect(await (await GET(request)).text()).toBe(first);
    const entries = [...first.matchAll(/<url>(.*?)<\/url>/g)].map(
      (match) => match[1]
    );
    expect(entries).toHaveLength(8);
    for (const entry of entries) {
      const path = new URL(entry.match(/<loc>(.*?)<\/loc>/)![1]).pathname;
      const date = (modifications.pages as Record<string, string>)[path];
      if (date) expect(entry).toContain(`<lastmod>${date}</lastmod>`);
      else expect(entry).not.toContain('<lastmod>');
    }
    expect(first).not.toContain('2030-01-01');
    expect(first).not.toContain('2031-06-10');
  });
});
