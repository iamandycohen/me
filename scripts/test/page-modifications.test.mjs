import assert from 'node:assert/strict';
import test from 'node:test';
import {
  validatePageModifications,
  updatePageModifications,
  changedProofRoutes,
} from '../page-modifications.mjs';

const options = { now: new Date('2026-09-28T12:00:00Z') };
const registry = () => ({
  schemaVersion: 1,
  pages: {
    '/': '2026-09-26',
    '/proofs': '2026-09-26',
    '/sources': '2026-09-26',
    '/proofs/meason': '2026-09-26',
    '/proofs/sledge': '2026-09-26',
  },
});
const projects = () =>
  ['meason', 'sledge'].map((id) => ({
    id,
    title: id,
    summary: 'Summary',
    status: 'open',
    publication: { reviewedOn: '2026-09-26' },
    lineage: [{ to: 'Ancestor', gpsReview: { nextAction: 'Review evidence' } }],
    parts: [],
  }));

test('dates reject rollover, future dates and unsafe routes', () => {
  for (const date of [
    '2026-02-30',
    '2026-09-29',
    'today',
    '2026-09-27T25:00:00Z',
    '2026-09-27T00:00:00',
  ])
    assert.throws(
      () => updatePageModifications(registry(), ['/'], date, options),
      /date/
    );
  for (const route of [
    '//example.com',
    '/proofs/../sources',
    '/sources#1',
    '/sources?x=1',
    '/Proofs',
    '/proofs/',
  ])
    assert.throws(
      () =>
        validatePageModifications(
          { schemaVersion: 1, pages: { [route]: '2026-09-26' } },
          options
        ),
      /route/
    );
});

test('editor updates selected routes, allows backfill, preserves others, rejects regression without mutation', () => {
  const before = registry();
  const after = updatePageModifications(
    before,
    ['/sources', '/cases'],
    '2026-09-27T03:00:00Z',
    options
  );
  assert.equal(after.pages['/sources'], '2026-09-27T03:00:00Z');
  assert.equal(after.pages['/cases'], '2026-09-27T03:00:00Z');
  assert.equal(after.pages['/'], before.pages['/']);
  assert.deepEqual(before, registry());
  assert.throws(
    () =>
      updatePageModifications(
        after,
        ['/proofs', '/sources'],
        '2026-09-26',
        options
      ),
    /regress/
  );
  assert.equal(after.pages['/proofs'], '2026-09-26');
});

test('proof detail changes leave unchanged rendered summaries alone', () => {
  const before = projects();
  const after = structuredClone(before);
  after[0].lineage[0].gpsReview.nextAction = 'Updated assessment';
  assert.deepEqual(changedProofRoutes(before, after), ['/proofs/meason']);
  after[0].publication.reviewedOn = '2026-09-27';
  assert.deepEqual(changedProofRoutes(before, after), [
    '/proofs/meason',
    '/proofs',
  ]);
  after[0].summary = 'New summary';
  assert.deepEqual(changedProofRoutes(before, after), [
    '/proofs/meason',
    '/proofs',
    '/',
  ]);
});

test('semantic comparisons ignore object key order; final ancestor affects homepage', () => {
  const before = projects();
  const reordered = before.map((project) =>
    Object.fromEntries(Object.entries(project).reverse())
  );
  assert.deepEqual(changedProofRoutes(before, reordered), []);
  assert.deepEqual(changedProofRoutes(before, [...reordered].reverse()), []);
  reordered[0] = structuredClone(reordered[0]);
  reordered[0].lineage[0].to = 'Different ancestor';
  assert.deepEqual(changedProofRoutes(before, reordered), [
    '/proofs/meason',
    '/',
  ]);
});

test('invisible lineage metadata and normalized lineage-part order leave dates unchanged', () => {
  const before = projects();
  before[0].lineage[0].partId = 'first';
  before[0].lineage.push({
    to: 'Earlier ancestor',
    partId: 'second',
    gpsReview: { nextAction: 'Review' },
  });
  before[0].parts = [
    { id: 'first', summary: 'First' },
    { id: 'second', summary: 'Second' },
    { id: 'support', summary: 'Context' },
  ];
  const after = structuredClone(before);
  after[0].lineage[0].id = 'different-key';
  after[0].lineage[0].gpsReview.access = 'private';
  after[0].parts.reverse();
  assert.deepEqual(changedProofRoutes(before, after), []);
  after[0].parts[0].summary = 'Changed supporting evidence';
  assert.deepEqual(changedProofRoutes(before, after), ['/proofs/meason']);
});
