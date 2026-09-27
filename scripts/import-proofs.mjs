import { createHash } from 'node:crypto';
import {
  readFile,
  writeFile,
  readdir,
  lstat,
  rename,
  unlink,
} from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  publicGenealogyContent,
  references,
  validatePublicGenealogyContent,
} from '../packages/genealogy-content/dist/index.js';

import {
  defaultRegistryPath,
  validateModificationDate,
  validatePageModifications,
  updatePageModifications,
  changedProofRoutes,
  writePageModifications,
} from './page-modifications.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const directory = resolve(root, 'packages/genealogy-content/src/proofs');
const ids = ['meason', 'sledge'];
const text = 'string';
const element = { status: text, note: text };
const projectShape = {
  id: text,
  title: text,
  summary: text,
  purpose: text,
  status: text,
  publication: { status: text, privacy: text, reviewedOn: text },
  lineage: [
    {
      id: text,
      from: text,
      to: text,
      kind: text,
      'relationshipId?': text,
      'partId?': text,
      gpsReview: {
        status: text,
        access: text,
        elements: {
          research: element,
          citations: element,
          analysis: element,
          conflicts: element,
          conclusion: element,
        },
        nextAction: text,
      },
    },
  ],
  parts: [
    {
      id: text,
      question: text,
      status: text,
      evidenceType: text,
      summary: text,
      evidence: [{ referenceId: 'number', role: text, note: text }],
      researchScope: { searched: [text], limits: text },
      analysis: text,
      conflicts: [{ issue: text, resolution: text }],
      conclusion: text,
      nextTest: text,
      relatedCaseIds: [text],
    },
  ],
};
const manifestShape = {
  claims: [{ id: text, revision: 'number' }],
  projects: [{ id: text, claimIds: [text] }],
  'sourceRevision?': text,
};
const envelopeShape = {
  schemaVersion: 'number',
  projects: [projectShape],
  manifest: manifestShape,
};
function shape(value, expected, path = 'candidate') {
  if (typeof expected === 'string') {
    if (
      typeof value !== expected ||
      (expected === 'number' && !Number.isFinite(value))
    )
      throw Error(`${path}: expected ${expected}`);
  } else if (Array.isArray(expected)) {
    if (!Array.isArray(value)) throw Error(`${path}: expected array`);
    value.forEach((item, i) => shape(item, expected[0], `${path}[${i}]`));
  } else {
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw Error(`${path}: expected object`);
    const allowed = Object.keys(expected).map((key) => key.replace(/\?$/, ''));
    for (const key of Object.keys(value))
      if (!allowed.includes(key))
        throw Error(`${path}: unexpected field ${key}`);
    for (const [key, child] of Object.entries(expected)) {
      const field = key.replace(/\?$/, '');
      if (key.endsWith('?') && !Object.hasOwn(value, field)) continue;
      shape(value[field], child, `${path}.${field}`);
    }
  }
}
export function serialize(value) {
  const sort = (item) =>
    Array.isArray(item)
      ? item.map(sort)
      : item && typeof item === 'object'
        ? Object.fromEntries(
            Object.keys(item)
              .sort()
              .map((key) => [key, sort(item[key])])
          )
        : item;
  return `${JSON.stringify(sort(value), null, 2)}\n`;
}
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
function unique(values, label) {
  if (new Set(values).size !== values.length) throw Error(`Duplicate ${label}`);
}
export function validateCandidate(candidate) {
  shape(candidate, envelopeShape);
  // These narrow guards catch known forbidden content; prose still needs human review.
  const payload = JSON.stringify(candidate);
  if (
    /(?:\/home\/|\/Users\/|Meason\/research\/|mail\.google\.com|gmailMessageId|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i.test(
      payload
    )
  )
    throw Error(
      'Candidate contains restricted personal information or private provenance'
    );
  if (candidate.schemaVersion !== 1) throw Error('Unsupported schemaVersion');
  if (
    candidate.projects.length !== 2 ||
    ids.some((id) => !candidate.projects.some((project) => project.id === id))
  )
    throw Error('Expected exactly meason and sledge projects');
  const manifest = candidate.manifest;
  unique(
    manifest.claims.map((claim) => claim.id),
    'claim id'
  );
  unique(
    manifest.projects.map((project) => project.id),
    'manifest project id'
  );
  if (
    manifest.sourceRevision &&
    !/^[a-f0-9]{40}$/.test(manifest.sourceRevision)
  )
    throw Error('Invalid sourceRevision');
  for (const claim of manifest.claims)
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(claim.id) ||
      !Number.isInteger(claim.revision) ||
      claim.revision < 1
    )
      throw Error('Invalid claim id or revision');
  if (manifest.projects.length !== 2) throw Error('Missing project provenance');
  const claimIds = new Set(manifest.claims.map((claim) => claim.id));
  const used = new Set();
  const shared = new Map();

  for (const project of candidate.projects) {
    const provenance = manifest.projects.find((item) => item.id === project.id);
    if (!provenance || provenance.claimIds.length < project.lineage.length)
      throw Error(`Missing claim provenance for ${project.id}`);
    unique(provenance.claimIds, `claim in ${project.id}`);
    for (const [index, id] of provenance.claimIds.entries()) {
      if (!claimIds.has(id)) throw Error(`Missing claim ${id}`);
      used.add(id);
      // The prefix maps to the linear path; the tail covers supporting claims
      // and dependency closure without creating extra public generations.
      if (index < project.lineage.length) {
        const step = project.lineage[index];
        const signature = serialize({
          from: step.from,
          to: step.to,
          kind: step.kind,
          gpsReview: step.gpsReview,
        });
        if (shared.has(id) && shared.get(id) !== signature)
          throw Error(`Inconsistent shared claim ${id}`);
        shared.set(id, signature);
      }
    }
  }
  if (used.size !== claimIds.size) throw Error('Unused claim provenance');
  const result = validatePublicGenealogyContent({
    ...publicGenealogyContent,
    proofProjects: candidate.projects,
  });
  if (!result.valid) throw Error(result.errors.join('\n'));
  return candidate;
}
export function generatedFiles(candidate) {
  validateCandidate(candidate);
  const files = Object.fromEntries(
    ids.map((id) => [
      `${id}.json`,
      serialize(candidate.projects.find((project) => project.id === id)),
    ])
  );
  const manifest = {
    schemaVersion: 1,
    ...candidate.manifest,
    files: Object.entries(files).map(([name, bytes]) => ({
      name,
      sha256: hash(bytes),
    })),
  };
  files['provenance.json'] = serialize(manifest);
  return files;
}
async function safeDirectory(destination) {
  if (!(await lstat(destination)).isDirectory())
    throw Error('Generated directory must be a real directory');
  for (const name of await readdir(destination)) {
    if (!['meason.json', 'sledge.json', 'provenance.json'].includes(name))
      throw Error(`Unexpected generated file ${name}`);
    if (!(await lstat(resolve(destination, name))).isFile())
      throw Error(`Generated output must be a regular file: ${name}`);
  }
}
export async function importCandidate(
  candidate,
  destination = directory,
  check = false,
  bootstrap = false
) {
  const files = generatedFiles(candidate);
  await safeDirectory(destination);
  if (check) {
    for (const [name, bytes] of Object.entries(files))
      if ((await readFile(resolve(destination, name), 'utf8')) !== bytes)
        throw Error(`Generated proof drift: ${name}`);
  } else {
    const existing = await readdir(destination);
    if (existing.includes('provenance.json')) await checkGenerated(destination);
    else if (!bootstrap)
      throw Error(
        'Initial import requires explicit --bootstrap after reviewing existing JSON'
      );
    // All validation precedes mutation. Rename each complete file; publish manifest last.
    for (const [name, bytes] of Object.entries(files)) {
      const temporary = resolve(destination, `.${name}.${process.pid}.tmp`);
      try {
        await writeFile(temporary, bytes, { flag: 'wx' });
        await rename(temporary, resolve(destination, name));
      } finally {
        await unlink(temporary).catch((error) => {
          if (error.code !== 'ENOENT') throw error;
        });
      }
    }
  }
}
// The CLI couples a reviewed public import to website-owned page dates. The
// low-level importer remains usable for isolated candidate validation/tests.
export async function importWithPageModifications(
  candidate,
  {
    destination = directory,
    registryPath = defaultRegistryPath,
    check = false,
    bootstrap = false,
    date = new Date().toISOString(),
    now = new Date(),
    writeRegistry = writePageModifications,
  } = {}
) {
  validateModificationDate(date, { now });
  const registry = validatePageModifications(
    JSON.parse(await readFile(registryPath, 'utf8')),
    { now }
  );
  // Validate the candidate and existing generated content before reading the
  // old projects or calculating the complete date update, before any writes.
  generatedFiles(candidate);
  await safeDirectory(destination);
  const existing = await readdir(destination);
  if (existing.includes('provenance.json')) await checkGenerated(destination);
  else if (!bootstrap)
    throw Error('Initial import requires explicit --bootstrap');
  const before = await Promise.all(
    ids.map(async (id) => {
      try {
        return JSON.parse(
          await readFile(resolve(destination, `${id}.json`), 'utf8')
        );
      } catch (error) {
        if (bootstrap && error.code === 'ENOENT') return null;
        throw error;
      }
    })
  );
  const nextProjects = ids.map((id) =>
    candidate.projects.find((project) => project.id === id)
  );
  const routes = changedProofRoutes(before.filter(Boolean), nextProjects);
  const next = updatePageModifications(registry, routes, date, { now });
  if (check) {
    await importCandidate(candidate, destination, true, bootstrap);
    return routes;
  }
  // Preserve preimages so a failed date write cannot leave imported content
  // looking unchanged on retry while its modification dates are still stale.
  const names = ['meason.json', 'sledge.json', 'provenance.json'];
  const previous = await Promise.all(
    names.map(async (name) => {
      try {
        return await readFile(resolve(destination, name));
      } catch (error) {
        if (error.code === 'ENOENT') return null;
        throw error;
      }
    })
  );
  const registryBytes = await readFile(registryPath);
  try {
    await importCandidate(candidate, destination, false, bootstrap);
    if (routes.length) await writeRegistry(registryPath, next);
  } catch (error) {
    const restored = await Promise.allSettled([
      ...names.map((name, index) =>
        previous[index] === null
          ? unlink(resolve(destination, name)).catch((failure) => {
              if (failure.code !== 'ENOENT') throw failure;
            })
          : writeFile(resolve(destination, name), previous[index])
      ),
      writeFile(registryPath, registryBytes),
    ]);
    const failures = restored.filter((result) => result.status === 'rejected');
    if (failures.length)
      throw new AggregateError(
        [error, ...failures.map((result) => result.reason)],
        `Import failed and rollback was incomplete: ${error.message}`
      );
    throw error;
  }
  return routes;
}

export async function checkGenerated(destination = directory) {
  await safeDirectory(destination);
  const provenance = JSON.parse(
    await readFile(resolve(destination, 'provenance.json'), 'utf8')
  );
  shape(
    provenance,
    {
      schemaVersion: 'number',
      ...manifestShape,
      files: [{ name: text, sha256: text }],
    },
    'provenance'
  );
  if (
    provenance.files.length !== 2 ||
    ids.some(
      (id) => !provenance.files.some((file) => file.name === `${id}.json`)
    )
  )
    throw Error('Invalid generated file inventory');
  const { files, schemaVersion, ...manifest } = provenance;
  const candidate = {
    schemaVersion,
    manifest,
    projects: await Promise.all(
      ids.map((id) =>
        readFile(resolve(destination, `${id}.json`), 'utf8').then(JSON.parse)
      )
    ),
  };
  for (const file of files)
    if (hash(await readFile(resolve(destination, file.name))) !== file.sha256)
      throw Error(`Generated proof drift: ${file.name}`);
  await importCandidate(candidate, destination, true);
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const args = process.argv.slice(2);
    let date;
    const dateIndex = args.indexOf('--date');
    if (dateIndex !== -1) {
      date = args[dateIndex + 1];
      validateModificationDate(date);
      args.splice(dateIndex, 2);
    }
    const bootstrap = args.includes('--bootstrap');
    if (bootstrap) args.splice(args.indexOf('--bootstrap'), 1);
    if (args.length === 2 && args[0] === '--references' && !bootstrap && !date)
      await writeFile(
        resolve(args[1]),
        serialize(references.map((reference) => reference.id))
      );
    else if (args.length === 1 && args[0] === '--check' && !bootstrap && !date)
      await checkGenerated();
    else if (
      args.length === 2 &&
      ['--check', '--write'].includes(args[1]) &&
      !args[0].startsWith('--')
    )
      await importWithPageModifications(
        JSON.parse(await readFile(resolve(args[0]), 'utf8')),
        { check: args[1] === '--check', bootstrap, ...(date ? { date } : {}) }
      );
    else
      throw Error(
        'Usage: import-proofs.mjs CANDIDATE.json --write|--check [--bootstrap] [--date DATE]; or --check; or --references OUTPUT.json'
      );
    console.log('Public proof import check passed.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
