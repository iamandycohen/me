import type { EvidenceCluster } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const evidenceClusters = [
  {
    id: 'kentucky-records',
    title: 'Kentucky records take shape',
    place: 'Nelson and Shelby Counties, Kentucky',
    period: '1800–1820',
    summary:
      'Recurring tax, marriage, court, church, and census records place Benjamin and Hannah in a changing Kentucky setting before Missouri.',
    boundary:
      'Shared counties, nearby names, church service, and inherited property create research leads. Associates are not relatives, and these roles neither identify Benjamin’s parents nor prove a Mill Creek-to-Bardstown transfer.',
    nodes: [
      {
        id: 'kentucky-benjamin-hannah',
        label: 'Benjamin + Hannah',
        detail: 'Marriage and recurring household presence',
        kind: 'person',
        referenceIds: [2, 3, 4, 10],
      },
      {
        id: 'kentucky-tax-records',
        label: 'Nelson tax returns',
        detail: 'Repeated annual presence, 1800–1804',
        kind: 'record',
        referenceIds: [4],
      },
      {
        id: 'kentucky-guardian-bond',
        label: '1802 guardian bond',
        detail: 'Benjamin’s signature and court activity',
        kind: 'record',
        referenceIds: [5],
      },
      {
        id: 'kentucky-shelby-household',
        label: 'Shelby household',
        detail: 'The accepted 1820 census household',
        kind: 'household',
        referenceIds: [10],
      },
      {
        id: 'kentucky-mill-creek-roles',
        label: 'Mill Creek service',
        detail: '1810 meeting-house commission; 1812 sexton appointment',
        kind: 'record',
        referenceIds: [36],
      },
      {
        id: 'kentucky-church-associates',
        label: 'Recurring church associates',
        detail: 'Thomas Hubbard and James Nall recur; no kinship is stated',
        kind: 'person',
        referenceIds: [5, 8, 36],
      },
    ],
    links: [
      {
        from: 'kentucky-benjamin-hannah',
        to: 'kentucky-tax-records',
        label: 'recorded in',
        kind: 'documented',
      },
      {
        from: 'kentucky-benjamin-hannah',
        to: 'kentucky-guardian-bond',
        label: 'Benjamin signed',
        kind: 'documented',
      },
      {
        from: 'kentucky-benjamin-hannah',
        to: 'kentucky-shelby-household',
        label: 'household fit',
        kind: 'indirect',
      },
      {
        from: 'kentucky-benjamin-hannah',
        to: 'kentucky-mill-creek-roles',
        label: 'Benjamin served',
        kind: 'documented',
      },
      {
        from: 'kentucky-mill-creek-roles',
        to: 'kentucky-church-associates',
        label: 'served with',
        kind: 'context',
      },
    ],
    publication,
  },
  {
    id: 'missouri-network',
    title: 'A Missouri network between the lines',
    place: 'Ralls and Monroe Counties, Missouri',
    period: '1829–1880',
    summary:
      'Households, a shared land transaction, named family, and working lives repeatedly place the same people around Benjamin’s family.',
    boundary:
      'The cluster is evidence of a durable social and family network. Proximity, occupation, and shared land do not independently prove parentage.',
    nodes: [
      {
        id: 'missouri-benjamin-household',
        label: 'Benjamin’s household',
        detail:
          'Benjamin, Hannah, a James with no middle initial, and the Hollingsworth family',
        kind: 'household',
        referenceIds: [1],
      },
      {
        id: 'missouri-george',
        label: 'George M. Meason',
        detail: 'A separate household inside the wider network',
        kind: 'person',
        referenceIds: [25, 28],
      },
      {
        id: 'missouri-kippers',
        label: 'Laura + John Kippers',
        detail: 'Laura is directly named as Benjamin’s daughter',
        kind: 'person',
        referenceIds: [61],
      },
      {
        id: 'missouri-land',
        label: 'Shared land transaction',
        detail: 'Kippers, George, and James L. appear together',
        kind: 'land',
        referenceIds: [28],
      },
      {
        id: 'missouri-james-work',
        label: 'James L.’s working life',
        detail: 'Blacksmith, miller, and sawmill proprietor',
        kind: 'work',
        referenceIds: [62, 63, 64],
      },
    ],
    links: [
      {
        from: 'missouri-benjamin-household',
        to: 'missouri-kippers',
        label: 'documented daughter',
        kind: 'documented',
      },
      {
        from: 'missouri-george',
        to: 'missouri-land',
        label: 'named in deed',
        kind: 'documented',
      },
      {
        from: 'missouri-kippers',
        to: 'missouri-land',
        label: 'named in deed',
        kind: 'documented',
      },
      {
        from: 'missouri-james-work',
        to: 'missouri-land',
        label: 'same-name network',
        kind: 'indirect',
      },
      {
        from: 'missouri-benjamin-household',
        to: 'missouri-george',
        label: 'accepted indirect line',
        kind: 'indirect',
      },
    ],
    publication,
  },
  {
    id: 'texas-records',
    title: 'Texas records reconnect the line',
    place: 'Dallas, Foard, and Upshur Counties, Texas',
    period: '1880–1973',
    summary:
      'Direct-line certificates in Dallas County and a collateral uncle household in Foard County preserve different pieces of the later Texas picture.',
    boundary:
      'These records support relationships and Texas endpoints. They do not document one shared journey, reunion, migration route, or motive, or establish that the Texas elder James L. was the earlier Missouri James L.',
    nodes: [
      {
        id: 'texas-george-household',
        label: 'George’s Dallas household',
        detail: 'George, James R., and Eva in 1880',
        kind: 'household',
        referenceIds: [33],
      },
      {
        id: 'texas-franklin-line',
        label: 'Franklin’s direct line',
        detail:
          'A birth certificate, index, household, and later Dallas certificates carry the line forward',
        kind: 'person',
        referenceIds: [56, 57, 58, 74, 75, 76],
      },
      {
        id: 'texas-uncle-household',
        label: 'Foard County uncle household',
        detail: 'Elder James L. appears as James R.’s uncle',
        kind: 'household',
        referenceIds: [60],
      },
      {
        id: 'texas-death-record',
        label: 'Big Sandy death record',
        detail: 'James R. names Benjamin as elder James L.’s father',
        kind: 'record',
        referenceIds: [59],
      },
      {
        id: 'texas-george-marker',
        label: 'George’s Dallas marker',
        detail: 'A Texas endpoint with a conflicting birth year',
        kind: 'record',
        referenceIds: [26],
      },
    ],
    links: [
      {
        from: 'texas-george-household',
        to: 'texas-franklin-line',
        label: 'direct line',
        kind: 'documented',
      },
      {
        from: 'texas-george-household',
        to: 'texas-uncle-household',
        label: 'James R. bridge',
        kind: 'indirect',
      },
      {
        from: 'texas-uncle-household',
        to: 'texas-death-record',
        label: 'informant link',
        kind: 'documented',
      },
      {
        from: 'texas-george-household',
        to: 'texas-george-marker',
        label: 'same person',
        kind: 'context',
      },
    ],
    publication,
  },
] as const satisfies readonly EvidenceCluster[];
