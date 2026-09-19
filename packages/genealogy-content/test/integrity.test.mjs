import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertValidPublicGenealogyContent,
  evidenceClusters,
  media,
  people,
  publicGenealogyContent,
  references,
  researchCases,
  stories,
  validatePublicGenealogyContent,
} from '../dist/index.js';

test('the canonical public content passes integrity validation', () => {
  assert.deepEqual(validatePublicGenealogyContent(), {
    valid: true,
    errors: [],
  });
  assert.doesNotThrow(() => assertValidPublicGenealogyContent());
});

test('the package carries the complete reviewed public reference catalog', () => {
  assert.equal(references.length, 68);
  assert.deepEqual(
    references.map(({ id }) => id),
    Array.from({ length: 68 }, (_, index) => index + 1)
  );
});

test('the collection-scale prototype entities are represented', () => {
  assert.equal(people.length, 7);
  assert.equal(researchCases.length, 3);
  assert.equal(stories.length, 3);
  assert.equal(evidenceClusters.length, 3);
  assert.equal(Object.keys(media).length, 10);
  assert.ok(
    stories.every((story) => story.events.every((event) => event.id.length > 0))
  );
});

test('runtime validation reports a broken relationship reference', () => {
  const broken = {
    ...publicGenealogyContent,
    relationships: [
      ...publicGenealogyContent.relationships,
      {
        ...publicGenealogyContent.relationships[0],
        id: 'broken-test-relationship',
        from: 'not-a-public-person',
      },
    ],
  };
  const result = validatePublicGenealogyContent(broken);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) => error.includes('missing from person'))
  );
});

test('runtime validation reports missing media rights metadata', () => {
  const firstId = Object.keys(media)[0];
  const broken = {
    ...publicGenealogyContent,
    media: {
      ...publicGenealogyContent.media,
      [firstId]: {
        ...publicGenealogyContent.media[firstId],
        provenance: {
          ...publicGenealogyContent.media[firstId].provenance,
          rightsStatement: '',
        },
      },
    },
  };
  const result = validatePublicGenealogyContent(broken);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('rightsStatement')));
});
