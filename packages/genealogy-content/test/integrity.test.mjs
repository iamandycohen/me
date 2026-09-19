import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertValidPublicGenealogyContent,
  evidenceClusters,
  highlandCreekReconstruction,
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
  assert.equal(references.length, 72);
  assert.deepEqual(
    references.map(({ id }) => id),
    Array.from({ length: 72 }, (_, index) => index + 1)
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

test('the Highland Creek reconstruction preserves evidence boundaries', () => {
  assert.deepEqual(
    highlandCreekReconstruction.nodes.map(({ id, kind }) => [id, kind]),
    [
      ['will-thomas-senior', 'person'],
      ['will-ann', 'person'],
      ['will-thomas', 'person'],
      ['will-joseph', 'person'],
      ['will-samuel', 'person'],
      ['will-isaac', 'person'],
      ['will-george', 'person'],
      ['will-john', 'person'],
      ['will-elizabeth', 'person'],
      ['will-jane', 'person'],
      ['will-rachel-worthington', 'person'],
      ['will-sarah-prescot', 'person'],
      ['will-mary', 'person'],
      ['logan-thomas', 'person'],
      ['logan-william', 'person'],
      ['highland-tract', 'land'],
      ['highland-joseph', 'person'],
      ['highland-john', 'person'],
      ['highland-samuel-brother', 'person'],
      ['highland-isaac-john-son', 'person'],
      ['highland-caty-randal', 'person'],
      ['highland-polly-devore', 'person'],
      ['highland-betty-cherry', 'person'],
      ['highland-dorsey', 'person'],
      ['highland-isaac-heir', 'person'],
      ['highland-elizabeth-hite', 'person'],
      ['highland-benjamin', 'person'],
      ['highland-james-grantee', 'person'],
      ['highland-samuel-grantee', 'person'],
      ['title-edmond-rice', 'person'],
      ['title-james-wardlow', 'person'],
      ['title-leonard-jones', 'person'],
      ['title-higgins', 'person'],
      ['court-1812-ejectment', 'record'],
    ]
  );
  assert.equal(highlandCreekReconstruction.edges.length, 46);
  assert.deepEqual(
    new Set(
      highlandCreekReconstruction.edges.map((edge) => edge.evidenceState)
    ),
    new Set(['recorded', 'identity-synthesis', 'hypothesis'])
  );

  const courtAbstractBridges = highlandCreekReconstruction.edges.filter(
    (edge) =>
      edge.connectionKind === 'land-title-association' &&
      edge.referenceIds.length === 1 &&
      edge.referenceIds[0] === 70
  );
  assert.deepEqual(courtAbstractBridges.map((edge) => edge.from).sort(), [
    'title-edmond-rice',
    'title-higgins',
    'title-james-wardlow',
    'title-leonard-jones',
  ]);
  assert.ok(
    courtAbstractBridges.every(
      (edge) =>
        edge.evidenceState === 'identity-synthesis' &&
        edge.statement.includes('strongly match') &&
        edge.limitation.includes('does not print') &&
        edge.limitation.includes('Highland Creek')
    )
  );

  const wardlowTransfer = highlandCreekReconstruction.edges.find(
    (edge) => edge.id === 'recorded-william-to-james-wardlow'
  );
  const jonesTransfer = highlandCreekReconstruction.edges.find(
    (edge) => edge.id === 'recorded-william-to-leonard-jones'
  );
  assert.deepEqual(wardlowTransfer?.referenceIds, [69, 70]);
  assert.deepEqual(jonesTransfer?.referenceIds, [69]);

  const thomasWilliamRelationship = highlandCreekReconstruction.edges.find(
    (edge) => edge.id === 'recorded-thomas-william'
  );
  assert.deepEqual(thomasWilliamRelationship?.referenceIds, [22, 69]);
  assert.equal(thomasWilliamRelationship?.relationship, 'father and son');
  assert.match(thomasWilliamRelationship?.statement ?? '', /1795.*eldest/);
  assert.match(thomasWilliamRelationship?.statement ?? '', /1811.*son/);

  const courtRoles = highlandCreekReconstruction.edges.filter(
    (edge) => edge.connectionKind === 'legal-record-role'
  );
  assert.deepEqual(
    courtRoles.map((edge) => [edge.from, edge.relationship]).sort(),
    [
      ['title-edmond-rice', 'patentee named for the land'],
      ['title-higgins', 'defendant'],
      ['title-james-wardlow', 'plaintiff'],
      ['title-leonard-jones', 'plaintiff'],
    ]
  );
  assert.ok(
    courtRoles.every(
      (edge) =>
        edge.to === 'court-1812-ejectment' &&
        edge.evidenceState === 'recorded' &&
        edge.referenceIds.length === 1 &&
        edge.referenceIds[0] === 70
    )
  );
  const recordedOnlyEdges = highlandCreekReconstruction.edges.filter(
    (edge) => edge.evidenceState === 'recorded'
  );
  assert.ok(courtRoles.every((edge) => recordedOnlyEdges.includes(edge)));
  assert.ok(
    recordedOnlyEdges.every(
      (edge) =>
        !(
          edge.to === 'highland-tract' &&
          [
            'title-edmond-rice',
            'title-higgins',
            'title-james-wardlow',
            'title-leonard-jones',
          ].includes(edge.from)
        )
    )
  );
  assert.deepEqual(
    Object.fromEntries(
      Array.from(
        Map.groupBy(
          highlandCreekReconstruction.edges,
          (edge) => edge.connectionKind
        ),
        ([kind, edges]) => [kind, edges.length]
      )
    ),
    {
      spouse: 1,
      'parent-child': 17,
      sibling: 2,
      'heirship-unknown-degree': 3,
      'deed-property-transfer': 6,
      identity: 4,
      'open-parentage-hypothesis': 1,
      'land-title-association': 8,
      'legal-record-role': 4,
    }
  );

  const unknownDegreeHeirs = highlandCreekReconstruction.edges.filter(
    (edge) => edge.connectionKind === 'heirship-unknown-degree'
  );
  assert.deepEqual(unknownDegreeHeirs.map((edge) => edge.to).sort(), [
    'highland-benjamin',
    'highland-elizabeth-hite',
    'highland-isaac-heir',
  ]);
  assert.ok(
    unknownDegreeHeirs.every(
      (edge) =>
        edge.relationship === 'heir at law' &&
        edge.connectionKind !== 'parent-child'
    )
  );

  const nonPedigreeParties = new Set([
    'highland-james-grantee',
    'highland-samuel-grantee',
    'title-edmond-rice',
    'title-james-wardlow',
    'title-leonard-jones',
    'title-higgins',
  ]);
  const pedigreeKinds = new Set([
    'spouse',
    'parent-child',
    'sibling',
    'heirship-unknown-degree',
    'open-parentage-hypothesis',
  ]);
  assert.ok(
    highlandCreekReconstruction.edges.every(
      (edge) =>
        !(
          nonPedigreeParties.has(edge.from) || nonPedigreeParties.has(edge.to)
        ) || !pedigreeKinds.has(edge.connectionKind)
    )
  );

  const connectedNodeIds = new Set(
    highlandCreekReconstruction.edges.flatMap((edge) => [edge.from, edge.to])
  );
  assert.deepEqual(
    highlandCreekReconstruction.nodes
      .filter((node) => !connectedNodeIds.has(node.id))
      .map((node) => node.id),
    []
  );
  assert.deepEqual(
    highlandCreekReconstruction.timeline
      .flatMap((event) => event.referenceIds)
      .filter((id, index, ids) => ids.indexOf(id) === index),
    [18, 22, 69, 70, 68, 67]
  );
  assert.deepEqual(
    highlandCreekReconstruction.documents.map((document) => ({
      referenceId: document.referenceId,
      sequences: document.pages.map((page) => page.sequence),
      rights: document.pages.map((page) => page.rightsState),
    })),
    [
      {
        referenceId: 67,
        sequences: [1, 2],
        rights: ['permission-required', 'permission-required'],
      },
      {
        referenceId: 68,
        sequences: [1, 2, 3],
        rights: [
          'permission-required',
          'permission-required',
          'permission-required',
        ],
      },
    ]
  );
});

test('runtime validation reports an invalid reconstruction connection kind', () => {
  const [reconstruction, ...otherReconstructions] =
    publicGenealogyContent.reconstructions;
  const [edge, ...otherEdges] = reconstruction.edges;
  const broken = {
    ...publicGenealogyContent,
    reconstructions: [
      {
        ...reconstruction,
        edges: [
          { ...edge, connectionKind: 'ambiguous-relationship' },
          ...otherEdges,
        ],
      },
      ...otherReconstructions,
    ],
  };
  const result = validatePublicGenealogyContent(broken);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) => error.includes('invalid connection kind'))
  );
});

test('the removed Dallas cotton image is absent from public content', () => {
  assert.equal('near-dallas-cotton-1907' in media, false);
  assert.ok(
    Object.values(media).every(
      (item) => !item.src.includes('near-dallas-cotton-1907')
    )
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
