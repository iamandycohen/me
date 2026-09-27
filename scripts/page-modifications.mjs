import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const defaultRegistryPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../apps/where-the-record-ends/src/data/page-modifications.json'
);

export function validateModificationDate(value, { now = new Date() } = {}) {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?$/.test(value)
  )
    throw Error(`Invalid modification date: ${value}`);
  const parsed = new Date(value);
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value.slice(0, 10) ||
    (value.includes('T') &&
      parsed.toISOString().replace('.000Z', 'Z') !==
        value.replace('.000Z', 'Z'))
  )
    throw Error(`Invalid modification date: ${value}`);
  if (parsed.getTime() > new Date(now).getTime())
    throw Error(`Modification date is in the future: ${value}`);
  return parsed.getTime();
}

export function validatePageModifications(registry, options = {}) {
  if (
    !registry ||
    registry.schemaVersion !== 1 ||
    Object.keys(registry).some(
      (key) => !['schemaVersion', 'pages'].includes(key)
    ) ||
    !registry.pages ||
    typeof registry.pages !== 'object' ||
    Array.isArray(registry.pages)
  )
    throw Error('Invalid page modification registry');
  for (const [route, date] of Object.entries(registry.pages)) {
    if (
      !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(
        route
      )
    )
      throw Error(`Invalid page route: ${route}`);
    validateModificationDate(date, options);
  }
  return registry;
}

export function updatePageModifications(registry, routes, date, options = {}) {
  validatePageModifications(registry, options);
  const timestamp = validateModificationDate(date, options);
  const next = structuredClone(registry);
  for (const route of routes) {
    validatePageModifications(
      { schemaVersion: 1, pages: { [route]: date } },
      options
    );
    if (
      Object.hasOwn(registry.pages, route) &&
      timestamp < new Date(registry.pages[route]).getTime()
    )
      throw Error(`Modification date would regress for ${route}`);
    next.pages[route] = date;
  }
  return next;
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])])
    );
  return value;
}
const equal = (a, b) =>
  JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
const card = (project) => ({
  id: project.id,
  title: project.title,
  summary: project.summary,
  status: project.status,
  links: project.lineage.length,
});

function detail(project) {
  if (!project) return project;
  const lineagePartIds = project.lineage
    .map(
      (step) =>
        project.parts.find(
          (part) => part.id === (step.partId ?? step.relationshipId)
        )?.id
    )
    .filter(Boolean);
  const parts = [
    ...project.parts
      .filter((part) => lineagePartIds.includes(part.id))
      .sort(
        (a, b) => lineagePartIds.indexOf(a.id) - lineagePartIds.indexOf(b.id)
      ),
    ...project.parts.filter((part) => !lineagePartIds.includes(part.id)),
  ];
  return {
    ...project,
    publication: { reviewedOn: project.publication.reviewedOn },
    lineage: project.lineage.map(({ id, gpsReview, ...step }) => {
      const { access, ...review } = gpsReview;
      return { ...step, gpsReview: review };
    }),
    parts,
  };
}

// Match the content actually rendered by each page; provenance is not page content.
export function changedProofRoutes(beforeProjects, afterProjects) {
  // The content package renders Meason then Sledge, irrespective of the
  // candidate envelope's project order.
  beforeProjects = [...beforeProjects].sort((a, b) => a.id.localeCompare(b.id));
  afterProjects = [...afterProjects].sort((a, b) => a.id.localeCompare(b.id));
  const routes = [];
  for (const project of afterProjects) {
    if (
      !equal(
        detail(beforeProjects.find((old) => old.id === project.id)),
        detail(project)
      )
    )
      routes.push(`/proofs/${project.id}`);
  }
  const index = (projects) =>
    projects.map((project) => ({
      ...card(project),
      questions: project.parts.length,
      reviewedOn: project.publication.reviewedOn,
    }));
  const home = (projects) =>
    projects.map((project) => ({
      ...card(project),
      ancestor: project.lineage.at(-1)?.to,
    }));
  if (!equal(index(beforeProjects), index(afterProjects)))
    routes.push('/proofs');
  if (!equal(home(beforeProjects), home(afterProjects))) routes.push('/');
  return routes;
}

export async function writePageModifications(path, registry) {
  const temporary = `${path}.${process.pid}.tmp`;
  let created = false;
  try {
    await writeFile(temporary, `${JSON.stringify(registry, null, 2)}\n`, {
      flag: 'wx',
    });
    created = true;
    await rename(temporary, path);
  } finally {
    if (created)
      await unlink(temporary).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const args = process.argv.slice(2);
    const registry = JSON.parse(await readFile(defaultRegistryPath, 'utf8'));
    if (args.length === 1 && args[0] === '--check')
      validatePageModifications(registry);
    else if (args.length >= 3 && args[0] === '--date')
      await writePageModifications(
        defaultRegistryPath,
        updatePageModifications(registry, args.slice(2), args[1])
      );
    else
      throw Error(
        'Usage: page-modifications.mjs --check; or --date DATE /route [/route ...]'
      );
    console.log('Page modification dates checked.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
