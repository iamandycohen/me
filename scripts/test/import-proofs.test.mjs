import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { proofProjects } from '../../packages/genealogy-content/dist/index.js';
import {
  generatedFiles,
  importCandidate,
  checkGenerated,
} from '../import-proofs.mjs';
function fixture() {
  const projects = structuredClone(proofProjects);
  const mapping = projects.map((project) => ({
    id: project.id,
    claimIds: project.lineage.map((step) => `${project.id}-${step.id}`),
  }));
  return {
    schemaVersion: 1,
    projects,
    manifest: {
      claims: mapping.flatMap((project) =>
        project.claimIds.map((id) => ({ id, revision: 1 }))
      ),
      projects: mapping,
    },
  };
}
test('candidate export is deterministic and retains linear paths', () => {
  assert.deepEqual(generatedFiles(fixture()), generatedFiles(fixture()));
  const candidate = fixture();
  candidate.projects.reverse();
  assert.equal(
    generatedFiles(candidate)['meason.json'],
    generatedFiles(fixture())['meason.json']
  );
});
test('rejects private extra fields at each object boundary', () => {
  for (const mutate of [
    (c) => {
      c.privateEvidence = [];
    },
    (c) => {
      c.projects[0].privateNotes = 'secret';
    },
    (c) => {
      c.projects[0].lineage[0].gpsReview.elements.research.privatePath =
        '/private';
    },
    (c) => {
      c.projects[0].parts[0].evidence[0].artifact = 'private.jpg';
    },
    (c) => {
      c.manifest.claims[0].sourcePath = '/private';
    },
  ]) {
    const candidate = fixture();
    mutate(candidate);
    assert.throws(() => generatedFiles(candidate), /unexpected field/);
  }
});
test('fails closed on malformed statuses, broken paths, missing sources and claim provenance', () => {
  for (const mutate of [
    (c) => {
      c.projects[0].lineage[0].gpsReview.status = 'approved';
    },
    (c) => {
      c.projects[0].lineage[1].from = 'Disconnected';
    },
    (c) => {
      c.projects[0].parts[0].evidence[0].referenceId = 999999;
    },
    (c) => {
      c.manifest.claims.pop();
    },
    (c) => {
      c.manifest.claims.push(c.manifest.claims[0]);
    },
    (c) => {
      c.manifest.projects[0].claimIds.pop();
    },
    (c) => {
      c.projects[0].parts[0].researchScope = null;
    },
    (c) => {
      c.projects[0].lineage[0].gpsReview.elements.research.status = 'broken';
    },
  ]) {
    const candidate = fixture();
    mutate(candidate);
    assert.throws(() => generatedFiles(candidate));
  }
});
test('import, repeat, drift detection and rejection leave existing output intact', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'public-proofs-'));
  try {
    await importCandidate(fixture(), directory, false, true);
    await checkGenerated(directory);
    const before = await readFile(join(directory, 'meason.json'), 'utf8');
    await importCandidate(fixture(), directory, false, true);
    assert.equal(
      await readFile(join(directory, 'meason.json'), 'utf8'),
      before
    );
    const invalid = fixture();
    invalid.projects[0].privateNotes = 'secret';
    await assert.rejects(importCandidate(invalid, directory));
    assert.equal(
      await readFile(join(directory, 'meason.json'), 'utf8'),
      before
    );
    await writeFile(join(directory, 'meason.json'), `${before} `);
    await assert.rejects(checkGenerated(directory), /drift/);
    await assert.rejects(importCandidate(fixture(), directory), /drift/);
    assert.equal(
      await readFile(join(directory, 'meason.json'), 'utf8'),
      `${before} `
    );
    await writeFile(join(directory, 'unexpected.json'), '{}');
    await assert.rejects(
      importCandidate(fixture(), directory),
      /Unexpected generated file/
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('symlink outputs and directory are rejected before writing', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'public-proofs-links-'));
  const destination = `${directory}-link`;
  try {
    await symlink(directory, destination);
    await assert.rejects(
      importCandidate(fixture(), destination, false, true),
      /real directory/
    );
    await symlink('/tmp', join(directory, 'meason.json'));
    await assert.rejects(
      importCandidate(fixture(), directory, false, true),
      /regular file/
    );
  } finally {
    await rm(destination, { force: true });
    await rm(directory, { recursive: true, force: true });
  }
});
test('requires explicit initial bootstrap and rejects private strings', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'public-proofs-bootstrap-'));
  try {
    await assert.rejects(importCandidate(fixture(), directory), /bootstrap/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
  const candidate = fixture();
  candidate.projects[0].summary = 'Read /home/private/evidence';
  assert.throws(() => generatedFiles(candidate), /private provenance/);
});

test('allows supporting claim and dependency tails while checking shared lineage claims', () => {
  const candidate = fixture();
  const sharedId = candidate.manifest.projects[0].claimIds[0];
  const replaced = candidate.manifest.projects[1].claimIds[0];
  candidate.manifest.projects[1].claimIds[0] = sharedId;
  candidate.manifest.claims = candidate.manifest.claims.filter(
    (claim) => claim.id !== replaced
  );
  candidate.manifest.claims.push(
    { id: 'supporting-context', revision: 2 },
    { id: 'dependency-context', revision: 1 }
  );
  candidate.manifest.projects[0].claimIds.push(
    'supporting-context',
    'dependency-context'
  );
  assert.doesNotThrow(() => generatedFiles(candidate));
  candidate.projects[1].lineage[0].gpsReview.nextAction =
    'Contradictory review for the same canonical claim';
  assert.throws(() => generatedFiles(candidate), /Inconsistent shared claim/);
});
