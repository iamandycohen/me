import assert from 'node:assert/strict';
import test from 'node:test';
import * as content from '../../packages/genealogy-content/dist/index.js';
import { pageContentModels } from '../page-content-models.mjs';
import {
  snapshotPages,
  reconcileManifest,
  checkManifest,
} from '../page-content-tracking.mjs';

test('a source-only correction fails stale CI and advances every dependent date with unchanged HTML', () => {
  const data = structuredClone(
    Object.fromEntries(
      Object.entries(content).filter(([, value]) => typeof value !== 'function')
    )
  );
  const models = pageContentModels(data);
  const html = Object.fromEntries(
    Object.keys(models).map((route) => [
      route,
      '<html><head><title>Research</title></head><body><main><h1>Research</h1></main></body></html>',
    ])
  );
  const before = snapshotPages(html, models);
  const options = { now: new Date('2026-09-27T12:00:00Z') };
  const initial = reconcileManifest(undefined, before, {
    ...options,
    initialize: true,
    date: '2026-09-26',
    initialDates: Object.fromEntries(
      Object.keys(models).map((route) => [route, '2026-09-26'])
    ),
  });
  data.references.find((record) => record.id === 58).supports +=
    ' Corrected identification.';
  const changed = snapshotPages(html, pageContentModels(data));
  assert.throws(
    () => checkManifest(initial, changed, { ...options, base: initial }),
    /Stale content/
  );
  const next = reconcileManifest(initial, changed, {
    ...options,
    date: '2026-09-27T03:00:00Z',
  });
  for (const route of [
    '/family',
    '/stories/migration',
    '/proofs/meason',
    '/sources',
  ])
    assert.equal(next.pages[route].lastModified, '2026-09-27T03:00:00Z', route);
  for (const route of ['/', '/proofs', '/about', '/privacy'])
    assert.equal(next.pages[route].lastModified, '2026-09-26', route);
  assert.equal(
    checkManifest(next, changed, { ...options, base: initial }),
    true
  );
});
