import { createHash } from 'node:crypto';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import {
  validateModificationDate,
  writePageModifications,
} from './page-modifications.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const defaultStatePath = resolve(
  root,
  'apps/where-the-record-ends/src/data/page-content-state.json'
);
export const defaultRegistryPath = resolve(
  root,
  'apps/where-the-record-ends/src/data/page-modifications.json'
);
export function siteTrackingPaths(site = 'genealogy', repoRoot = root) {
  if (!['genealogy', 'personal'].includes(site))
    throw Error(`Unknown site: ${site}`);
  const appRoot =
    site === 'personal'
      ? repoRoot
      : resolve(repoRoot, 'apps/where-the-record-ends');
  return {
    state: resolve(appRoot, 'src/data/page-content-state.json'),
    registry: resolve(appRoot, 'src/data/page-modifications.json'),
    build: resolve(appRoot, '.next/server/app'),
    publicRoots:
      site === 'personal'
        ? [resolve(repoRoot, 'public')]
        : [resolve(appRoot, 'public'), resolve(repoRoot, 'public')],
  };
}

const canonical = (value) =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === 'object'
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, canonical(value[key])])
        )
      : value;
const stable = (value) => JSON.stringify(canonical(value));
const attrs = (node) =>
  Object.fromEntries(
    (node.attrs ?? []).map(({ name, value }) => [name, value])
  );
const descendants = (node) => [
  node,
  ...(node.childNodes ?? []).flatMap(descendants),
];
const whitespace = (text) => text.replace(/\s+/g, ' ').trim();

function imageSource(source) {
  if (!source) return source;
  const url = new URL(source, 'https://content.invalid');
  if (url.pathname === '/_next/image' && url.searchParams.has('url'))
    return imageSource(url.searchParams.get('url'));
  // Next static-import filenames contain build-generated hashes, not editorial identity.
  return source.replace(
    /(\/_next\/static\/media\/[^/?]+)\.[a-f0-9]{8,}(\.[a-z0-9]+)(?=\?|$)/gi,
    '$1$2'
  );
}

function visible(node) {
  if (node.nodeName === '#text') return whitespace(node.value) || null;
  if (node.nodeName.startsWith('#')) return null;
  if (['script', 'style', 'noscript', 'nav', 'footer'].includes(node.tagName))
    return null;
  const properties = attrs(node);
  if (properties['data-content-tracking-ignore'] !== undefined) return null;
  // Presentation wrappers and CSS changes do not constitute editorial changes.
  const semanticTags = new Set([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'li',
    'ul',
    'ol',
    'table',
    'tr',
    'th',
    'td',
    'blockquote',
    'a',
    'img',
    'button',
    'input',
    'select',
    'option',
    'label',
    'summary',
    'details',
  ]);
  const kept = {};
  for (const name of [
    'href',
    'alt',
    'title',
    'aria-label',
    'role',
    'type',
    'placeholder',
    'value',
    'name',
  ]) {
    if (properties[name] !== undefined)
      kept[name] = whitespace(properties[name]);
  }
  if (
    properties.src !== undefined &&
    ['img', 'source', 'video', 'audio'].includes(node.tagName)
  )
    kept.src = imageSource(properties.src);
  if (properties.poster) kept.poster = imageSource(properties.poster);
  const children = (node.childNodes ?? [])
    .flatMap(visible)
    .filter((child) => child !== null);
  if (!children.length && !Object.keys(kept).length) return null;
  if (!semanticTags.has(node.tagName) && !Object.keys(kept).length)
    return children;
  return {
    ...(semanticTags.has(node.tagName) ? { tag: node.tagName } : {}),
    ...(Object.keys(kept).length ? { attributes: kept } : {}),
    children,
  };
}

export function normalizedPageContent(html) {
  const nodes = descendants(parse(html));
  const mains = nodes.filter((node) => node.tagName === 'main');
  if (mains.length !== 1)
    throw Error(
      `Expected exactly one main content element, found ${mains.length}`
    );
  const head = nodes.find((node) => node.tagName === 'head');
  const metadata = descendants(head ?? { childNodes: [] })
    .flatMap((node) => {
      const a = attrs(node);
      if (node.tagName === 'title')
        return [
          [
            'title',
            whitespace(
              (node.childNodes ?? []).map((child) => child.value ?? '').join('')
            ),
          ],
        ];
      if (
        node.tagName === 'meta' &&
        (a.name === 'description' || a.property?.startsWith('og:'))
      )
        return [[a.name ?? a.property, a.content ?? '']];
      if (node.tagName === 'link' && a.rel === 'canonical')
        return [['canonical', a.href]];
      return [];
    })
    .sort((a, b) => stable(a).localeCompare(stable(b)));
  return { metadata, main: visible(mains[0]) };
}

export function contentFingerprint(html, model) {
  if (model === undefined) throw Error('A public content model is required');
  return createHash('sha256')
    .update(stable({ page: normalizedPageContent(html), model }))
    .digest('hex');
}

// Fingerprint approved public media bytes too: replacing an image under its old
// filename changes the page even when no text/data URL changes.
export function localAssetPaths(html, model) {
  const paths = new Set();
  function consider(value, field) {
    if (
      typeof value !== 'string' ||
      !value.startsWith('/') ||
      value.startsWith('//')
    )
      return;
    // Models also contain prose and routes. Only local asset paths enter URL
    // parsing; src/poster attributes additionally support extensionless media.
    let path = value;
    if (path.startsWith('/_next/image?')) {
      path =
        new URL(path, 'https://content.invalid').searchParams.get('url') ?? '';
      if (!path.startsWith('/') || path.startsWith('//')) return;
    }
    path = decodeURIComponent(path.split(/[?#]/)[0]);
    if (
      path.split('/').some((part) => part === '..' || part === '.') ||
      path.includes('\\')
    )
      throw Error(`Unsafe public asset path: ${path}`);
    if (path.startsWith('/_next/static/media/'))
      throw Error(
        `Static-import media needs an explicit asset-byte mapping before publication: ${path}`
      );
    if (path.startsWith('/_next/')) return;
    if (
      !['src', 'poster'].includes(field) &&
      !/\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp|tiff?|pdf|mp3|mp4|m4a|mov|ogg|wav|webm)(?:$)/i.test(
        path
      )
    )
      return;
    paths.add(path);
  }
  function walk(value, field) {
    if (Array.isArray(value)) value.forEach((item) => walk(item, field));
    else if (value && typeof value === 'object')
      Object.entries(value).forEach(([key, item]) => walk(item, key));
    else consider(value, field);
  }
  walk(normalizedPageContent(html));
  walk(model);
  return [...paths].sort();
}

export async function assetFingerprints(paths, publicRoots) {
  return Object.fromEntries(
    await Promise.all(
      paths.map(async (path) => {
        for (const publicRoot of publicRoots) {
          const file = resolve(publicRoot, `.${path}`);
          const child = relative(publicRoot, file);
          if (child.startsWith('..') || isAbsolute(child))
            throw Error(`Unsafe public asset path: ${path}`);
          try {
            return [
              path,
              createHash('sha256')
                .update(await readFile(file))
                .digest('hex'),
            ];
          } catch (error) {
            if (error.code !== 'ENOENT') throw error;
          }
        }
        throw Error(`Referenced public asset is missing: ${path}`);
      })
    )
  );
}

export async function readBuiltPage(route, buildDir, origin) {
  const file = resolve(
    buildDir,
    route === '/' ? 'index.html' : `${route.slice(1)}.html`
  );
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!origin)
    throw Error(
      `No static HTML for ${route}; supply --origin for a local production server`
    );
  const base = new URL(origin);
  if (
    !['http:', 'https:'].includes(base.protocol) ||
    !['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)
  )
    throw Error('--origin must be a local production server');
  const response = await fetch(new URL(route, base), {
    signal: AbortSignal.timeout(30000),
    redirect: 'error',
  });
  if (
    !response.ok ||
    !response.headers.get('content-type')?.includes('text/html')
  )
    throw Error(
      `Production route ${route} did not return HTML: ${response.status}`
    );
  return response.text();
}

export async function readBuiltSitemap(buildDir, origin) {
  try {
    return await readFile(resolve(buildDir, 'sitemap.xml.body'), 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!origin)
    throw Error(
      'No built sitemap; supply --origin for a local production server'
    );
  const base = new URL(origin);
  if (
    !['http:', 'https:'].includes(base.protocol) ||
    !['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)
  )
    throw Error('--origin must be a local production server');
  const response = await fetch(new URL('/sitemap.xml', base), {
    signal: AbortSignal.timeout(30000),
    redirect: 'error',
  });
  if (!response.ok || !response.headers.get('content-type')?.includes('xml'))
    throw Error(`Production sitemap did not return XML: ${response.status}`);
  return response.text();
}

export function renderedReferenceIds(html) {
  const main = descendants(parse(html)).find((node) => node.tagName === 'main');
  return [
    ...new Set(
      descendants(main ?? { childNodes: [] }).flatMap((node) => {
        const href = attrs(node).href;
        if (!href) return [];
        const url = new URL(href, 'https://content.invalid');
        const match =
          url.pathname === '/sources' && url.hash.match(/^#reference-(\d+)$/);
        return match ? [Number(match[1])] : [];
      })
    ),
  ].sort((a, b) => a - b);
}

export function sitemapRoutes(xml) {
  const routes = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(
    (match) => {
      const url = new URL(match[1].trim().replaceAll('&amp;', '&'));
      if (url.search || url.hash)
        throw Error(`Sitemap URL is not a page route: ${url}`);
      return url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
    }
  );
  if (!routes.length || new Set(routes).size !== routes.length)
    throw Error('Sitemap must contain a nonempty set of unique page routes');
  return routes.sort();
}

export function assertCoverage(routes, entries, label) {
  const expected = new Set(routes);
  const missing = routes.filter((route) => !Object.hasOwn(entries, route));
  const unknown = Object.keys(entries).filter((route) => !expected.has(route));
  if (missing.length || unknown.length)
    throw Error(
      `${label} coverage mismatch; missing: ${missing.join(', ') || 'none'}; unknown: ${unknown.join(', ') || 'none'}`
    );
}

export function snapshotPages(
  htmlByRoute,
  models,
  routes = Object.keys(htmlByRoute).sort()
) {
  assertCoverage(routes, htmlByRoute, 'HTML');
  assertCoverage(routes, models, 'Public models');
  return Object.fromEntries(
    routes.map((route) => [
      route,
      contentFingerprint(htmlByRoute[route], models[route]),
    ])
  );
}

export function validateManifest(manifest, options = {}) {
  if (
    !manifest ||
    manifest.schemaVersion !== 1 ||
    !manifest.pages ||
    Array.isArray(manifest.pages) ||
    typeof manifest.pages !== 'object' ||
    Object.keys(manifest).some(
      (key) => !['schemaVersion', 'pages'].includes(key)
    )
  )
    throw Error('Invalid page content manifest');
  for (const [route, entry] of Object.entries(manifest.pages)) {
    if (
      !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(
        route
      ) ||
      !entry ||
      !/^[a-f0-9]{64}$/.test(entry.sha256) ||
      Object.keys(entry).sort().join(',') !== 'lastModified,sha256'
    )
      throw Error(`Invalid page content entry: ${route}`);
    if (entry.lastModified !== null)
      validateModificationDate(entry.lastModified, options);
  }
  return manifest;
}

export function reconcileManifest(
  previous,
  snapshots,
  {
    date = new Date().toISOString(),
    initialize = false,
    initialDates = {},
    now = new Date(),
  } = {}
) {
  if (previous) validateManifest(previous, { now });
  if (initialize && previous)
    throw Error('Cannot initialize an existing manifest');
  if (!previous && !initialize)
    throw Error('Missing manifest; use --initialize for an explicit baseline');
  validateModificationDate(date, { now });
  for (const route of Object.keys(previous?.pages ?? {}))
    if (!Object.hasOwn(snapshots, route))
      throw Error(
        `Tracked route disappeared: ${route}; explicitly review and remove its manifest entry`
      );
  const pages = Object.fromEntries(
    Object.entries(snapshots)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([route, sha256]) => {
        const old = previous?.pages[route];
        const lastModified =
          old?.sha256 === sha256
            ? old.lastModified
            : initialize
              ? (initialDates[route] ?? null)
              : date;
        if (
          old?.sha256 !== sha256 &&
          old?.lastModified &&
          lastModified &&
          new Date(lastModified) <= new Date(old.lastModified)
        )
          throw Error(`Modification date would regress for ${route}`);
        return [route, { sha256, lastModified }];
      })
  );
  return validateManifest({ schemaVersion: 1, pages }, { now });
}

export function modificationRegistry(manifest) {
  return {
    schemaVersion: 1,
    pages: Object.fromEntries(
      Object.entries(manifest.pages)
        .filter(([, entry]) => entry.lastModified !== null)
        .map(([route, entry]) => [route, entry.lastModified])
    ),
  };
}

export function checkManifest(
  manifest,
  snapshots,
  { base, registry, now = new Date() } = {}
) {
  validateManifest(manifest, { now });
  assertCoverage(Object.keys(snapshots), manifest.pages, 'Manifest');
  if (base) validateManifest(base, { now });
  for (const [route, sha256] of Object.entries(snapshots)) {
    const entry = manifest.pages[route];
    if (entry.sha256 !== sha256)
      throw Error(`Stale content fingerprint for ${route}; run pages:update`);
    const old = base?.pages[route];
    if (old?.sha256 === sha256 && old.lastModified !== entry.lastModified)
      throw Error(
        `Unchanged content has a changed modification date: ${route}`
      );
    if (base && old?.sha256 !== sha256 && entry.lastModified === null)
      throw Error(`Changed or new page needs a modification date: ${route}`);
    if (
      old?.sha256 !== sha256 &&
      old?.lastModified &&
      (!entry.lastModified ||
        new Date(entry.lastModified) <= new Date(old.lastModified))
    )
      throw Error(`Modification date regressed: ${route}`);
  }
  if (registry && stable(registry) !== stable(modificationRegistry(manifest)))
    throw Error('Sitemap date registry does not match the content manifest');
  return true;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

export async function run(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (['--write', '--check', '--initialize'].includes(arg))
      options[arg.slice(2)] = true;
    else if (
      [
        '--date',
        '--base',
        '--state',
        '--registry',
        '--build-dir',
        '--origin',
        '--site',
      ].includes(arg) &&
      argv[i + 1] &&
      !argv[i + 1].startsWith('--')
    )
      options[arg.slice(2)] = argv[++i];
    else throw Error(`Unknown or incomplete option: ${arg}`);
  }
  if (
    Boolean(options.write) === Boolean(options.check) ||
    (options.initialize && !options.write)
  )
    throw Error(
      'Use --check or --write [--initialize] [--date DATE] [--base MANIFEST]'
    );
  const site = options.site ?? 'genealogy';
  const paths = siteTrackingPaths(site);
  const statePath = resolve(options.state ?? paths.state);
  const registryPath = resolve(options.registry ?? paths.registry);
  const buildDir = resolve(options['build-dir'] ?? paths.build);
  const routes = sitemapRoutes(
    await readBuiltSitemap(buildDir, options.origin)
  );
  const html = Object.fromEntries(
    await Promise.all(
      routes.map(async (route) => [
        route,
        await readBuiltPage(route, buildDir, options.origin),
      ])
    )
  );
  let dataModels;
  let renderedReferencesFor = () => undefined;
  if (site === 'personal') {
    const { personalPageContentModels } =
      await import('./personal-page-content-models.mjs');
    dataModels = personalPageContentModels(
      await readJson(resolve(root, 'content/data.json'))
    );
  } else {
    const { pageContentModels, referenceContentModels } =
      await import('./page-content-models.mjs');
    const content = await import('@where-the-record-ends/genealogy-content');
    dataModels = pageContentModels(content);
    renderedReferencesFor = (pageHtml) =>
      referenceContentModels(content, renderedReferenceIds(pageHtml));
  }
  const { authoredContentForRoute } =
    await import('./page-authored-content.mjs');
  assertCoverage(routes, dataModels, 'Public models');
  const models = Object.fromEntries(
    await Promise.all(
      routes.map(async (route) => {
        const model = {
          data: dataModels[route],
          ...(site === 'genealogy'
            ? { renderedReferences: renderedReferencesFor(html[route]) }
            : {}),
          authored: await authoredContentForRoute(route, root, site),
        };
        return [
          route,
          {
            ...model,
            assets: await assetFingerprints(
              localAssetPaths(html[route], model),
              paths.publicRoots
            ),
          },
        ];
      })
    )
  );
  const snapshots = snapshotPages(html, models, routes);
  const previous = (await exists(statePath))
    ? await readJson(statePath)
    : undefined;
  const registry = await readJson(registryPath);
  const base = options.base ? await readJson(resolve(options.base)) : undefined;
  if (options.check) checkManifest(previous, snapshots, { base, registry });
  else {
    const next = reconcileManifest(previous, snapshots, {
      initialize: options.initialize,
      initialDates: registry.pages,
      ...(options.date ? { date: options.date } : {}),
    });
    if (base) checkManifest(next, snapshots, { base });
    // Each file uses atomic replacement. An interruption between replacements is detected by --check.
    await writePageModifications(statePath, next);
    await writePageModifications(registryPath, modificationRegistry(next));
  }
  console.log(
    `Page content tracking ${options.check ? 'checked' : 'updated'}: ${routes.length} routes.`
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  run(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
