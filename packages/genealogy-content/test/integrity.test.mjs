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
  relationships,
  researchCases,
  stories,
  threeThomasesIdentityModel,
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
  assert.equal(references.length, 76);
  assert.deepEqual(
    references.map(({ id }) => id),
    Array.from({ length: 76 }, (_, index) => index + 1)
  );
});

test('reviewed citation visuals expose only approved public media', () => {
  const visualAccessByReference = Object.fromEntries(
    references
      .filter(({ visualAccess }) => visualAccess)
      .map(({ id, visualAccess }) => [id, visualAccess])
  );

  assert.deepEqual(
    Object.keys(visualAccessByReference).map(Number),
    [5, 26, 38, 39, 40, 42, 67, 68, 71, 73, 74, 75, 76]
  );
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(visualAccessByReference).map(([id, access]) => [
        id,
        access.status,
      ])
    ),
    {
      5: 'reviewed-preview',
      26: 'reviewed-preview',
      38: 'reviewed-preview',
      39: 'reviewed-preview',
      40: 'reviewed-preview',
      42: 'reviewed-preview',
      67: 'external-volume-only',
      68: 'external-volume-only',
      71: 'reviewed-preview',
      73: 'external-original-only',
      74: 'text-only-deferred',
      75: 'external-original-only',
      76: 'text-only-deferred',
    }
  );
  assert.deepEqual(
    Object.fromEntries(
      references
        .filter(
          ({ visualAccess }) => visualAccess?.status === 'reviewed-preview'
        )
        .map(({ id, visualAccess }) => [id, visualAccess.previewMediaIds])
    ),
    {
      5: ['benjamin-bond'],
      26: ['george-marker'],
      38: ['cynthia-school'],
      39: ['jimmy-studio'],
      40: ['james-1892-porch'],
      42: ['franklin-home'],
      71: ['highland-creek-map-1818'],
    }
  );
  assert.ok(
    [67, 68]
      .map((id) => references.find((reference) => reference.id === id))
      .every(
        (reference) =>
          reference?.visualAccess?.status === 'external-volume-only' &&
          reference.visualAccess.note.includes('rights remain pending') &&
          reference.visualAccess.note.includes('provider-bound') &&
          reference.visualAccess.note.includes('not public hosted previews') &&
          !('previewMediaIds' in reference.visualAccess)
      )
  );
  assert.deepEqual(
    [67, 68].map((id) => {
      const reference = references.find((item) => item.id === id);
      return [reference?.url, reference?.accessLinks];
    }),
    [
      [
        'https://www.familysearch.org/search/film/008573278',
        [
          {
            label: 'Open image 72 in the FamilySearch film',
            url: 'https://www.familysearch.org/search/film/008573278?i=71',
          },
          {
            label: 'Open image 73 in the FamilySearch film',
            url: 'https://www.familysearch.org/search/film/008573278?i=72',
          },
        ],
      ],
      [
        'https://www.familysearch.org/search/film/008573278',
        [
          {
            label: 'Open image 74 in the FamilySearch film',
            url: 'https://www.familysearch.org/search/film/008573278?i=73',
          },
          {
            label: 'Open image 75 in the FamilySearch film',
            url: 'https://www.familysearch.org/search/film/008573278?i=74',
          },
          {
            label: 'Open image 76 in the FamilySearch film',
            url: 'https://www.familysearch.org/search/film/008573278?i=75',
          },
        ],
      ],
    ]
  );
  assert.equal(
    references.find(({ id }) => id === 73)?.visualAccess?.status,
    'external-original-only'
  );
  assert.equal(
    references.find(({ id }) => id === 74)?.visualAccess?.status,
    'text-only-deferred'
  );
  assert.equal(
    references.find(({ id }) => id === 75)?.visualAccess?.status,
    'external-original-only'
  );
  assert.equal(
    references.find(({ id }) => id === 76)?.visualAccess?.status,
    'text-only-deferred'
  );
});

test('the 1934 certificate and corroborating records document Jimmy’s parents', () => {
  const birthIndex = references.find((reference) => reference.id === 74);
  const birthCertificate = references.find((reference) => reference.id === 75);
  const census = references.find((reference) => reference.id === 76);
  const deathCertificate = references.find((reference) => reference.id === 56);
  const relationship = relationships.find(
    ({ id }) => id === 'james-1892-james-1934'
  );
  const migration = stories.find(({ id }) => id === 'migration');
  const jimmyEvent = migration?.events.find(
    ({ id }) => id === 'migration-jimmy-1934-1973'
  );

  assert.match(birthIndex?.supports ?? '', /father as James Lawrence Meason/);
  assert.match(birthIndex?.supports ?? '', /mother as Mary Estelle Sledge/);
  assert.match(birthIndex?.citation ?? '', /26 October 1934/);
  assert.match(birthIndex?.citation ?? '', /p\. 1279/);
  assert.match(birthIndex?.citation ?? '', /collection 8781/);
  assert.match(birthIndex?.citation ?? '', /image TXBTH_1934_000514l/);
  assert.match(birthIndex?.citation ?? '', /record 152492117/);
  assert.match(
    birthIndex?.limitation ?? '',
    /index entry, not the underlying birth certificate/
  );
  assert.match(
    birthIndex?.limitation ?? '',
    /None of the reviewed records uses a Sr\. suffix/
  );
  assert.equal(
    birthIndex?.url,
    'https://www.ancestry.com/search/collections/8781/records/152492117'
  );

  assert.match(birthCertificate?.citation ?? '', /state file no\. 80844/);
  assert.match(birthCertificate?.citation ?? '', /register no\. 29/);
  assert.match(birthCertificate?.supports ?? '', /strongest reviewed source/);
  assert.match(
    birthCertificate?.limitation ?? '',
    /does not separately identify who supplied the parent details/
  );
  assert.equal(
    birthCertificate?.url,
    'https://www.familysearch.org/ark:/61903/1:1:K6GQ-G18'
  );

  assert.match(
    census?.supports ?? '',
    /James L\. Meason, Mary, and young Jimmie/
  );
  assert.match(census?.limitation ?? '', /enumeration district, sheet, line/);
  assert.deepEqual(census?.accessLinks, [
    {
      label: 'Open the Ancestry record',
      url: 'https://www.ancestry.com/search/collections/2442/records/155810441',
    },
    {
      label: 'Open the FamilySearch record',
      url: 'https://www.familysearch.org/ark:/61903/1:1:KWJL-2PF',
    },
  ]);

  const publicDirectLineUrls = [
    birthIndex?.url,
    birthCertificate?.url,
    ...(census?.accessLinks ?? []).map(({ url }) => url),
    ...(deathCertificate?.accessLinks ?? []).map(({ url }) => url),
  ].filter(Boolean);
  for (const url of publicDirectLineUrls) {
    assert.doesNotMatch(
      url,
      /[?&](treeid|personid|tid|pid|ssrc|usePUB|usePUBJs)=/i
    );
  }

  assert.match(
    deathCertificate?.supports ?? '',
    /contemporaneous 1934 birth certificate/
  );
  assert.match(
    deathCertificate?.limitation ?? '',
    /does not use a Sr\. suffix/
  );
  assert.deepEqual(relationship?.referenceIds, [75, 74, 76, 56]);
  assert.match(
    relationship?.statement ?? '',
    /birth certificate records.*father/
  );
  assert.match(
    relationship?.limitation ?? '',
    /does not separately identify who supplied the parent details/
  );
  assert.deepEqual(jimmyEvent?.referenceIds, [75, 74, 76, 56]);
  assert.match(jimmyEvent?.record ?? '', /Mary Estelle Sledge/);
  assert.match(
    jimmyEvent?.interpretation ?? '',
    /none of the records uses a Sr\. suffix/
  );
});

test('runtime validation enforces coherent citation visual states', () => {
  const [firstReference, ...otherReferences] =
    publicGenealogyContent.references;
  const missingPreview = {
    ...publicGenealogyContent,
    references: [
      {
        ...firstReference,
        visualAccess: {
          status: 'reviewed-preview',
          previewMediaIds: [],
          note: 'Test state',
        },
      },
      ...otherReferences,
    ],
  };
  const missingMedia = {
    ...publicGenealogyContent,
    references: [
      {
        ...firstReference,
        visualAccess: {
          status: 'reviewed-preview',
          previewMediaIds: ['not-public-media'],
          note: 'Test state',
        },
      },
      ...otherReferences,
    ],
  };
  const forbiddenPreview = {
    ...publicGenealogyContent,
    references: [
      {
        ...firstReference,
        visualAccess: {
          status: 'external-volume-only',
          previewMediaIds: ['benjamin-bond'],
          note: 'Test state',
        },
      },
      ...otherReferences,
    ],
  };

  assert.ok(
    validatePublicGenealogyContent(missingPreview).errors.some((error) =>
      error.includes('has no preview media')
    )
  );
  assert.ok(
    validatePublicGenealogyContent(missingMedia).errors.some((error) =>
      error.includes('references missing media')
    )
  );
  assert.ok(
    validatePublicGenealogyContent(forbiddenPreview).errors.some((error) =>
      error.includes('must not include preview media')
    )
  );
});

test('the Hempfield records separate execution, widow, and recording dates', () => {
  const will = references.find((reference) => reference.id === 19);
  const agreement = references.find((reference) => reference.id === 73);

  assert.match(will?.citation ?? '', /18 September 1785/);
  assert.match(will?.citation ?? '', /22 November 1805/);
  assert.match(will?.supports ?? '', /Wife Ann and eight children/);
  assert.match(will?.supports ?? '', /Hugh Quigley/);
  assert.match(will?.supports ?? '', /James Westbay/);
  assert.match(will?.limitation ?? '', /not a death date, a survival date/);
  assert.match(will?.limitation ?? '', /21 March 1786/);

  assert.match(agreement?.citation ?? '', /21 March 1786/);
  assert.match(agreement?.citation ?? '', /acknowledged 11 June 1798/);
  assert.match(agreement?.citation ?? '', /recorded 20 June 1798/);
  assert.match(agreement?.citation ?? '', /DGS 8085360, images 676–677/);
  assert.match(agreement?.supports ?? '', /“widow and relict”/);
  assert.match(agreement?.supports ?? '', /dead by 21 March 1786/);
  assert.match(agreement?.limitation ?? '', /does not name Benjamin/);
  assert.match(
    agreement?.limitation ?? '',
    /prove that Ann and Hugh later married/
  );
  assert.deepEqual(agreement?.accessLinks, [
    {
      label: 'Opening page · image 676',
      url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSNP-DSM3-9',
    },
    {
      label: 'Continuation · image 677',
      url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSNP-DSMC-H',
    },
  ]);
  assert.equal(agreement?.url, agreement?.accessLinks?.[0]?.url);
});

test('the Three Thomases model preserves identities and open boundaries', () => {
  assert.equal(threeThomasesIdentityModel.id, 'three-thomases');
  assert.deepEqual(
    threeThomasesIdentityModel.subjects.map(({ id }) => id),
    ['thomas-senior', 'hempfield-thomas', 'kentucky-thomas']
  );
  assert.deepEqual(
    threeThomasesIdentityModel.connections.map(
      ({ id, assessment, subjectIds }) => [id, assessment, subjectIds]
    ),
    [
      [
        'senior-son-to-hempfield',
        'possible',
        ['thomas-senior', 'hempfield-thomas'],
      ],
      [
        'senior-son-to-kentucky',
        'strong-indirect',
        ['thomas-senior', 'kentucky-thomas'],
      ],
      [
        'hempfield-not-kentucky',
        'excluded',
        ['hempfield-thomas', 'kentucky-thomas'],
      ],
    ]
  );
  assert.match(
    threeThomasesIdentityModel.summary,
    /strongly favors the Kentucky Thomas/
  );
  assert.match(
    threeThomasesIdentityModel.connections[1].statement,
    /Joseph.*John.*Samuel.*Isaac.*Elizabeth.*strongly favors/
  );
  assert.match(
    threeThomasesIdentityModel.connections[1].limitation,
    /No reviewed record directly calls Kentucky Thomas a son of Thomas senior/
  );
  assert.deepEqual(
    threeThomasesIdentityModel.referenceIds,
    [18, 19, 20, 21, 22, 67, 68, 69, 73]
  );
  assert.deepEqual(
    threeThomasesIdentityModel.connections.map(({ endpointLabels }) =>
      endpointLabels.join(' ↔ ')
    ),
    [
      'Thomas senior\u2019s named son Thomas ↔ Thomas Meason of Hempfield',
      'Thomas senior\u2019s named son Thomas ↔ Thomas Mason or Meason of Kentucky',
      'Thomas Meason of Hempfield ↔ Thomas Mason or Meason of Kentucky',
    ]
  );
  assert.match(
    threeThomasesIdentityModel.boundary,
    /documented role.*not automatically a fourth person/
  );
  assert.match(
    threeThomasesIdentityModel.annBoundary,
    /distinct roles in distinct record groups/
  );
  assert.match(
    threeThomasesIdentityModel.annBoundary,
    /does not establish whether they describe the same woman or different women/
  );

  assert.deepEqual(
    threeThomasesIdentityModel.timeline.map(({ date }) => date),
    [
      '14–18 March 1779',
      '18 September 1785',
      '21 March 1786',
      '23 October 1788',
      '2 February 1795',
      '27 July 1795',
      '11 June 1798',
      '20 June 1798',
      '22 November 1805',
    ]
  );
  assert.match(
    threeThomasesIdentityModel.timeline[1].detail,
    /wife, not yet as his widow/
  );
  assert.match(
    threeThomasesIdentityModel.timeline[2].detail,
    /widow and relict/
  );
  assert.match(
    threeThomasesIdentityModel.timeline.at(-1)?.detail ?? '',
    /not Thomas’s death date/
  );

  assert.equal(publicGenealogyContent.identityModels.length, 1);
  assert.equal(relationships.length, 6);
  assert.equal(
    relationships.some(
      (relationship) =>
        relationship.kind === 'parent-child' && relationship.to === 'benjamin'
    ),
    false
  );
});

test('the parentage case separates the Kentucky and Hempfield Thomases', () => {
  const parentageCase = researchCases.find(({ id }) => id === 'parentage');
  const cards = parentageCase?.sections.flatMap(({ cards }) => cards) ?? [];
  const kentuckyCard = cards.find(({ id }) => id === 'thomas-branch');
  const exclusionCard = cards.find(
    ({ id }) => id === 'hempfield-kentucky-exclusion'
  );

  assert.equal(kentuckyCard?.title, 'Kentucky Thomas branch');
  assert.match(
    kentuckyCard?.detail ?? '',
    /no reviewed record.*calls Benjamin his son/
  );
  assert.deepEqual(exclusionCard?.referenceIds, [19, 20, 21, 73]);
  assert.match(exclusionCard?.detail ?? '', /dead by 21 March 1786/);
  assert.match(
    exclusionCard?.detail ?? '',
    /does not identify Benjamin’s father/
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
  const thomasWillReference = references.find(
    (reference) => reference.id === 18
  );
  assert.match(thomasWillReference?.supports ?? '', /daughter Ann/);
  assert.match(
    thomasWillReference?.limitation ?? '',
    /daughter Ann as a spouse/
  );
  assert.doesNotMatch(
    `${thomasWillReference?.supports} ${thomasWillReference?.limitation}`,
    /wife Ann/i
  );

  assert.deepEqual(
    highlandCreekReconstruction.nodes.map(({ id, kind }) => [id, kind]),
    [
      ['will-thomas-senior', 'person'],
      ['will-thomas', 'person'],
      ['will-joseph', 'person'],
      ['will-samuel', 'person'],
      ['will-isaac', 'person'],
      ['will-george', 'person'],
      ['will-john', 'person'],
      ['will-hannah', 'person'],
      ['will-rachel-worthington', 'person'],
      ['will-sarah-prescot', 'person'],
      ['will-ann', 'person'],
      ['will-mary', 'person'],
      ['will-elizabeth', 'person'],
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
      'parent-child': 18,
      sibling: 2,
      'heirship-unknown-degree': 3,
      'deed-property-transfer': 6,
      identity: 4,
      'open-parentage-hypothesis': 1,
      'land-title-association': 8,
      'legal-record-role': 4,
    }
  );
  assert.equal(
    highlandCreekReconstruction.edges.some(
      (edge) => edge.connectionKind === 'spouse'
    ),
    false
  );
  assert.deepEqual(
    highlandCreekReconstruction.edges
      .filter(
        (edge) =>
          edge.from === 'will-thomas-senior' &&
          edge.connectionKind === 'parent-child'
      )
      .map((edge) => edge.to),
    [
      'will-thomas',
      'will-joseph',
      'will-samuel',
      'will-isaac',
      'will-george',
      'will-john',
      'will-hannah',
      'will-rachel-worthington',
      'will-sarah-prescot',
      'will-ann',
      'will-mary',
      'will-elizabeth',
    ]
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
      providerUrls: document.pages.map((page) => page.providerUrl),
    })),
    [
      {
        referenceId: 67,
        sequences: [1, 2],
        rights: ['permission-required', 'permission-required'],
        providerUrls: [
          'https://www.familysearch.org/search/film/008573278?i=71',
          'https://www.familysearch.org/search/film/008573278?i=72',
        ],
      },
      {
        referenceId: 68,
        sequences: [1, 2, 3],
        rights: [
          'permission-required',
          'permission-required',
          'permission-required',
        ],
        providerUrls: [
          'https://www.familysearch.org/search/film/008573278?i=73',
          'https://www.familysearch.org/search/film/008573278?i=74',
          'https://www.familysearch.org/search/film/008573278?i=75',
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

test('runtime validation reports an identity connection with a missing subject', () => {
  const [identityModel, ...otherIdentityModels] =
    publicGenealogyContent.identityModels;
  const [connection, ...otherConnections] = identityModel.connections;
  const broken = {
    ...publicGenealogyContent,
    identityModels: [
      {
        ...identityModel,
        connections: [
          {
            ...connection,
            subjectIds: ['unreviewed-thomas', connection.subjectIds[1]],
          },
          ...otherConnections,
        ],
      },
      ...otherIdentityModels,
    ],
  };
  const result = validatePublicGenealogyContent(broken);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('missing subject')));
});

test('runtime validation reports an invalid identity assessment', () => {
  const [identityModel, ...otherIdentityModels] =
    publicGenealogyContent.identityModels;
  const [connection, ...otherConnections] = identityModel.connections;
  const broken = {
    ...publicGenealogyContent,
    identityModels: [
      {
        ...identityModel,
        connections: [
          { ...connection, assessment: 'equally-likely' },
          ...otherConnections,
        ],
      },
      ...otherIdentityModels,
    ],
  };
  const result = validatePublicGenealogyContent(broken);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) => error.includes('invalid assessment'))
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
