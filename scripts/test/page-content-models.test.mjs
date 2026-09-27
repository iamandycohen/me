import assert from 'node:assert/strict';
import test from 'node:test';
import * as published from '../../packages/genealogy-content/dist/index.js';
import {
  pageContentModels,
  referenceContentModels,
} from '../page-content-models.mjs';

const data = () =>
  structuredClone(
    Object.fromEntries(
      Object.entries(published).filter(
        ([, value]) => typeof value !== 'function'
      )
    )
  );
const changed = (before, after) => {
  const a = pageContentModels(before);
  const b = pageContentModels(after);
  return Object.keys(a).filter(
    (route) => JSON.stringify(a[route]) !== JSON.stringify(b[route])
  );
};

test('covers every sitemap route, including routes with no content-package data', () => {
  const content = data();
  assert.deepEqual(
    Object.keys(pageContentModels(content)).sort(),
    [
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
      ...content.researchCases.map((item) => `/cases/${item.id}`),
      ...content.proofProjects.map((item) => `/proofs/${item.id}`),
      ...content.stories.map((item) => `/stories/${item.id}`),
    ].sort()
  );
});

test('citation dialog text changes every citing route, without changing unciting indexes', () => {
  const before = data();
  const after = data();
  after.references.find((source) => source.id === 83).limitation +=
    ' A corrected limitation.';
  const affected = changed(before, after);
  assert.ok(affected.includes('/proofs/sledge'));
  assert.ok(affected.includes('/sources'));
  assert.ok(!affected.includes('/proofs/meason'));
  assert.ok(!affected.includes('/proofs'));
  assert.ok(!affected.includes('/'));
});

test('adding an uncited catalog reference affects only the sources page', () => {
  const before = data();
  const after = data();
  after.references.push({
    id: 99999,
    title: 'Uncited source',
    citation: 'Citation',
    supports: 'Context',
    limitation: 'Not cited',
  });
  assert.deepEqual(changed(before, after), ['/sources']);
});

test('selectable person data affects the family page even when not selected initially', () => {
  const before = data();
  const after = data();
  after.people.find((person) => person.id === 'shannon').summary +=
    ' Additional public context.';
  assert.deepEqual(changed(before, after), ['/family']);
});

test('noninitial case tabs, story events, and graph nodes are tracked', () => {
  const before = data();
  const after = data();
  after.researchCases[0].sections.at(-1).cards.at(-1).detail +=
    ' Corrected detail.';
  after.stories[0].events.at(-1).interpretation += ' Revised interpretation.';
  after.highlandCreekReconstruction.nodes.at(-1).detail += ' New context.';
  const affected = changed(before, after);
  assert.ok(affected.includes(`/cases/${after.researchCases[0].id}`));
  assert.ok(affected.includes(`/stories/${after.stories[0].id}`));
  assert.ok(affected.includes('/cases/parentage/highland-creek'));
  assert.ok(!affected.includes('/cases'));
  assert.ok(!affected.includes('/stories'));
});

test('citation preview captions and displayed media credit are tracked', () => {
  const before = data();
  const after = data();
  const reference = after.references.find(
    (entry) => entry.visualAccess?.previewMediaIds?.length
  );
  const mediaId = reference.visualAccess.previewMediaIds[0];
  after.media[mediaId].caption += ' Corrected caption.';
  const affected = changed(before, after);
  const models = pageContentModels(before);
  for (const [route, model] of Object.entries(models)) {
    if (model.references?.some((entry) => entry.id === reference.id))
      assert.ok(affected.includes(route), route);
  }
  assert.ok(affected.includes('/sources'));
  const credited = data();
  credited.media['benjamin-bond'].provenance.credit += ' Corrected credit.';
  assert.ok(changed(before, credited).includes('/'));
});

test('nonrendered publication and provenance metadata do not change any page', () => {
  const before = data();
  const after = data();
  after.people[0].publication.reviewedOn = '2099-01-01';
  after.references[0].publication.reviewedOn = '2099-01-01';
  after.media['benjamin-bond'].publication.reviewedOn = '2099-01-01';
  after.media['benjamin-bond'].provenance.rightsSourcePage =
    'https://example.test/review';
  after.proofProjects[0].publication.privacy = 'internal test';
  after.proofProjects[0].lineage[0].gpsReview.access = 'internal test';
  after.sourceRevision = 'irrelevant-private-revision';
  assert.deepEqual(changed(before, after), []);
});

test('displayed review dates remain meaningful content', () => {
  const before = data();
  const after = data();
  after.proofProjects[0].publication.reviewedOn = '2026-09-27';
  assert.deepEqual(
    changed(before, after).sort(),
    ['/proofs', `/proofs/${after.proofProjects[0].id}`].sort()
  );
});

test('rendered citation discovery shares exact projections and rejects missing records', () => {
  const content = data();
  const citations = referenceContentModels(content, [83, 83, 42]);
  assert.deepEqual(
    citations.map((entry) => entry.id),
    [42, 83]
  );
  assert.deepEqual(
    citations[1],
    pageContentModels(content)['/proofs/sledge'].references.find(
      (entry) => entry.id === 83
    )
  );
  assert.throws(
    () => referenceContentModels(content, [99999]),
    /missing reference 99999/
  );
});
