import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contentFingerprint,
  sitemapRoutes,
  snapshotPages,
  reconcileManifest,
  checkManifest,
  modificationRegistry,
} from '../page-content-tracking.mjs';

const page = (text = 'A record', attributes = '') =>
  `<html><head><title>Records</title><meta name="description" content="Evidence"/><link rel="canonical" href="https://example.com/"/></head><body><nav>Menu</nav><main ${attributes}><h1>${text}</h1><p>One family.</p><img src="/_next/image?url=%2Fphoto.jpg&w=640&q=75" alt="Portrait"/><button aria-label="Show evidence">Show</button></main><footer>2026</footer><script>build123</script></body></html>`;
const sha = (letter) => letter.repeat(64);
const first = '2026-01-01T00:00:00Z';
const second = '2026-02-01T00:00:00Z';
const now = new Date('2026-03-01T00:00:00Z');

test('editorial HTML and supplied hidden interactive data both affect fingerprints', () => {
  const original = contentFingerprint(page(), { evidence: ['original'] });
  assert.notEqual(
    original,
    contentFingerprint(page('Corrected record'), { evidence: ['original'] })
  );
  assert.notEqual(
    original,
    contentFingerprint(page(), { evidence: ['corrected'] })
  );
  assert.notEqual(
    original,
    contentFingerprint(
      page().replace('content="Evidence"', 'content="Correction"'),
      { evidence: ['original'] }
    )
  );
  assert.notEqual(
    original,
    contentFingerprint(
      page().replace('alt="Portrait"', 'alt="Family portrait"'),
      { evidence: ['original'] }
    )
  );
  assert.notEqual(
    original,
    contentFingerprint(
      page().replace(
        'aria-label="Show evidence"',
        'aria-label="Hide evidence"'
      ),
      { evidence: ['original'] }
    )
  );
});

test('formatting, styles, script payloads, global footer and image size transformations do not change content', () => {
  const original = contentFingerprint(page(), { a: 1, b: 2 });
  const rebuild = page('A   record', 'class="different" style="color:red"')
    .replace('One family.', '\n One   family.\n')
    .replace('w=640', 'w=1280')
    .replace('q=75', 'q=90')
    .replace('build123', 'random-build-id')
    .replace('2026', '2027');
  assert.equal(original, contentFingerprint(rebuild, { b: 2, a: 1 }));
  const imported = page().replace(
    '/_next/image?url=%2Fphoto.jpg&w=640&q=75',
    '/_next/static/media/photo.12345678.jpg'
  );
  assert.equal(
    contentFingerprint(imported, {}),
    contentFingerprint(imported.replace('12345678', 'deadbeef'), {})
  );
});

test('route inventory demands exact HTML, model and manifest coverage', () => {
  const routes = sitemapRoutes(
    '<urlset><url><loc>https://example.com/</loc></url><url><loc>https://example.com/proofs</loc></url></urlset>'
  );
  assert.deepEqual(routes, ['/', '/proofs']);
  assert.throws(() => sitemapRoutes('<urlset/>'), /nonempty/);
  assert.throws(
    () => snapshotPages({ '/': page() }, { '/': {} }, routes),
    /HTML coverage/
  );
  assert.throws(
    () => snapshotPages({ '/': page() }, { '/': {}, '/unknown': {} }),
    /Public models coverage/
  );
  assert.throws(
    () => contentFingerprint('<html><body>No main</body></html>', {}),
    /exactly one/
  );
});

test('explicit initial baseline preserves verified dates and leaves unknown history null', () => {
  const manifest = reconcileManifest(
    undefined,
    { '/': sha('a'), '/about': sha('b') },
    { initialize: true, initialDates: { '/': first }, now, date: second }
  );
  assert.equal(manifest.pages['/'].lastModified, first);
  assert.equal(manifest.pages['/about'].lastModified, null);
  assert.deepEqual(modificationRegistry(manifest), {
    schemaVersion: 1,
    pages: { '/': first },
  });
  assert.throws(
    () =>
      reconcileManifest(undefined, { '/': sha('a') }, { now, date: second }),
    /Missing manifest/
  );
});

test('rebuilds preserve dates; content and newly introduced pages acquire modification dates', () => {
  const base = reconcileManifest(
    undefined,
    { '/': sha('a'), '/about': sha('b') },
    { initialize: true, initialDates: { '/': first }, now, date: first }
  );
  assert.deepEqual(
    reconcileManifest(
      base,
      { '/': sha('a'), '/about': sha('b') },
      { now, date: second }
    ),
    base
  );
  const updated = reconcileManifest(
    base,
    { '/': sha('a'), '/about': sha('c'), '/new': sha('d') },
    { now, date: second }
  );
  assert.equal(updated.pages['/'].lastModified, first);
  assert.equal(updated.pages['/about'].lastModified, second);
  assert.equal(updated.pages['/new'].lastModified, second);
  assert.equal(
    checkManifest(
      updated,
      { '/': sha('a'), '/about': sha('c'), '/new': sha('d') },
      { base, registry: modificationRegistry(updated), now }
    ),
    true
  );
});

test('check catches stale hashes, date-only churn, removed routes, and registry divergence', () => {
  const base = {
    schemaVersion: 1,
    pages: { '/': { sha256: sha('a'), lastModified: first } },
  };
  assert.throws(
    () => checkManifest(base, { '/': sha('b') }, { now }),
    /Stale content/
  );
  assert.throws(
    () => checkManifest(base, { '/': sha('a'), '/new': sha('b') }, { now }),
    /Manifest coverage/
  );
  assert.throws(
    () =>
      checkManifest(
        { ...base, pages: { '/': { sha256: sha('a'), lastModified: second } } },
        { '/': sha('a') },
        { base, now }
      ),
    /Unchanged content/
  );
  assert.throws(
    () =>
      checkManifest(
        base,
        { '/': sha('a') },
        { registry: { schemaVersion: 1, pages: {} }, now }
      ),
    /registry does not match/
  );
  assert.throws(
    () => reconcileManifest(base, {}, { now, date: second }),
    /Tracked route disappeared/
  );
});

test('changed pages cannot keep old dates, regress dates, or lose established dates', () => {
  const base = {
    schemaVersion: 1,
    pages: { '/': { sha256: sha('a'), lastModified: first } },
  };
  for (const lastModified of [null, first, '2025-01-01']) {
    const next = {
      schemaVersion: 1,
      pages: { '/': { sha256: sha('b'), lastModified } },
    };
    assert.throws(
      () => checkManifest(next, { '/': sha('b') }, { base, now }),
      /date/i
    );
  }
});

test('same-path media replacement changes its fingerprint, including hidden data assets', async () => {
  const { mkdtemp, writeFile, mkdir, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { localAssetPaths, assetFingerprints } =
    await import('../page-content-tracking.mjs');
  const directory = await mkdtemp(join(tmpdir(), 'page-assets-'));
  try {
    await mkdir(join(directory, 'media'));
    await writeFile(join(directory, 'media/portrait.jpg'), 'original photo');
    const paths = localAssetPaths('<main>Text</main>', {
      hiddenPortrait: '/media/portrait.jpg',
    });
    assert.deepEqual(paths, ['/media/portrait.jpg']);
    const before = await assetFingerprints(paths, [directory]);
    await writeFile(join(directory, 'media/portrait.jpg'), 'corrected photo');
    assert.notDeepEqual(await assetFingerprints(paths, [directory]), before);
    await assert.rejects(
      () => assetFingerprints(['/media/missing.jpg'], [directory]),
      /missing/
    );
    assert.throws(
      () => localAssetPaths(page(), { image: '/media/../secret' }),
      /Unsafe/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('dynamic routes use only an explicitly supplied local production server', async () => {
  const { readBuiltPage } = await import('../page-content-tracking.mjs');
  const { mkdtemp, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { createServer } = await import('node:http');
  const directory = await mkdtemp(join(tmpdir(), 'page-build-'));
  const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end(page('Contact'));
  });
  await new Promise((accept) => server.listen(0, '127.0.0.1', accept));
  try {
    assert.equal(
      await readBuiltPage(
        '/contact',
        directory,
        `http://127.0.0.1:${server.address().port}`
      ),
      page('Contact')
    );
    await assert.rejects(
      () => readBuiltPage('/contact', directory),
      /No static HTML/
    );
    await assert.rejects(
      () => readBuiltPage('/contact', directory, 'https://example.com'),
      /local production/
    );
  } finally {
    await new Promise((accept) => server.close(accept));
    await rm(directory, { recursive: true, force: true });
  }
});

test('rendered source links enroll reference content automatically', async () => {
  const { renderedReferenceIds } = await import('../page-content-tracking.mjs');
  assert.deepEqual(
    renderedReferenceIds(
      '<main><a href="/sources#reference-91">91</a><a href="/sources#reference-2">2</a><a href="/sources#reference-91">91</a></main><footer><a href="/sources#reference-8">8</a></footer>'
    ),
    [2, 91]
  );
});

test('asset discovery ignores prose and incomplete URL-like authored literals', async () => {
  const { localAssetPaths } = await import('../page-content-tracking.mjs');
  assert.deepEqual(
    localAssetPaths('<main>Text</main>', {
      strings: [
        'http:',
        'https:',
        'https://',
        'A source at http:',
        '//',
        '/not-media',
        '/media/portrait.jpg',
      ],
    }),
    ['/media/portrait.jpg']
  );
});

test('asset discovery includes real genealogy paths, root images, documents and extensionless src', async () => {
  const { localAssetPaths } = await import('../page-content-tracking.mjs');
  assert.deepEqual(
    localAssetPaths(
      '<main><img src="/_next/image?url=%2Fheadshot.jpg&amp;w=640&amp;q=75" alt="Andy"/><img src="/dynamic-portrait" alt="Portrait"/></main>',
      {
        hidden: '/genealogy/people/cynthia-june-meason-school-portrait.jpg',
        document: '/genealogy/evidence/will.pdf',
      }
    ),
    [
      '/dynamic-portrait',
      '/genealogy/evidence/will.pdf',
      '/genealogy/people/cynthia-june-meason-school-portrait.jpg',
      '/headshot.jpg',
    ]
  );
});

test('inert presentation wrappers do not change content fingerprints', () => {
  const original = page();
  const wrapped = original
    .replace('<h1>', '<div class="grid"><section style="color:red"><h1>')
    .replace('</p>', '</p></section></div>');
  assert.equal(
    contentFingerprint(original, {}),
    contentFingerprint(wrapped, {})
  );
  assert.notEqual(
    contentFingerprint(original, {}),
    contentFingerprint(
      wrapped.replace(
        '<section style="color:red">',
        '<section aria-label="Evidence">'
      ),
      {}
    )
  );
});

test('unsupported static-import media fails closed until its byte mapping is defined', async () => {
  const { localAssetPaths } = await import('../page-content-tracking.mjs');
  assert.throws(
    () =>
      localAssetPaths(
        '<main><img src="/_next/static/media/portrait.deadbeef.jpg" alt="Portrait"/></main>',
        {}
      ),
    /explicit asset-byte mapping/
  );
  assert.throws(
    () =>
      localAssetPaths('<main>Text</main>', {
        image: '/_next/static/media/portrait.deadbeef.jpg',
      }),
    /explicit asset-byte mapping/
  );
});

test('site configuration separates personal and genealogy registries, builds and public roots', async () => {
  const { siteTrackingPaths } = await import('../page-content-tracking.mjs');
  assert.equal(
    siteTrackingPaths('personal', '/repo').state,
    '/repo/src/data/page-content-state.json'
  );
  assert.equal(
    siteTrackingPaths('genealogy', '/repo').build,
    '/repo/apps/where-the-record-ends/.next/server/app'
  );
  assert.deepEqual(siteTrackingPaths('personal', '/repo').publicRoots, [
    '/repo/public',
  ]);
  assert.throws(() => siteTrackingPaths('unknown', '/repo'), /Unknown site/);
});

test('dynamic sitemap uses a local production XML response when build artifact is absent', async () => {
  const { readBuiltSitemap } = await import('../page-content-tracking.mjs');
  const { mkdtemp, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { createServer } = await import('node:http');
  const directory = await mkdtemp(join(tmpdir(), 'sitemap-build-'));
  const xml = '<urlset><url><loc>https://example.com/</loc></url></urlset>';
  const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text/xml');
    response.end(xml);
  });
  await new Promise((accept) => server.listen(0, '127.0.0.1', accept));
  try {
    assert.equal(
      await readBuiltSitemap(
        directory,
        `http://127.0.0.1:${server.address().port}`
      ),
      xml
    );
    await assert.rejects(() => readBuiltSitemap(directory), /No built sitemap/);
    await assert.rejects(
      () => readBuiltSitemap(directory, 'https://example.com'),
      /local production/
    );
  } finally {
    await new Promise((accept) => server.close(accept));
    await rm(directory, { recursive: true, force: true });
  }
});
