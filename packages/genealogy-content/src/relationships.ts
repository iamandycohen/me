import type { Relationship } from './types.js';

const published = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const relationships = [
  {
    id: 'benjamin-george',
    from: 'benjamin',
    to: 'george',
    kind: 'parent-child',
    evidenceType: 'indirect',
    assessment: 'high-confidence',
    statement:
      'George’s placement as Benjamin’s son is accepted because multiple independent records converge around the same family network.',
    support: [
      'Benjamin’s proved son-in-law acquired land with George and James L. Meason.',
      'The Kipper, Hollingsworth, Parker, and Meason households remained closely associated.',
      'George’s son later called elder James L. Meason his uncle; James’s death record named Benjamin as his father.',
    ],
    limitation:
      'No reviewed record states in one sentence that George was Benjamin’s son.',
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
    publication: published,
  },
  {
    id: 'george-franklin',
    from: 'george',
    to: 'franklin',
    kind: 'parent-child',
    evidenceType: 'direct',
    assessment: 'documented',
    statement:
      'Franklin’s death certificate names George M. Meason and Martha Reed as his parents.',
    support: [
      'The parent names appear in the original death record reviewed for the public tree.',
    ],
    limitation:
      'The informant-supplied statement is evaluated alongside identity and chronology.',
    referenceIds: [57, 58],
    publication: published,
  },
  {
    id: 'franklin-james-1892',
    from: 'franklin',
    to: 'james-1892',
    kind: 'parent-child',
    evidenceType: 'direct',
    assessment: 'documented',
    statement:
      'The reviewed public tree identifies the parent relationship from original records.',
    support: [
      'James Lawrence Meason’s death certificate names Frank Meason as his father.',
    ],
    limitation: 'The parentage statement was supplied after the 1892 birth.',
    referenceIds: [56, 57],
    publication: published,
  },
  {
    id: 'james-1892-james-1934',
    from: 'james-1892',
    to: 'james-1934',
    kind: 'parent-child',
    evidenceType: 'direct',
    assessment: 'documented',
    statement:
      'Jimmy’s contemporaneous 1934 Texas birth certificate records the older James Lawrence Meason as his father and Mary Estelle Sledge as his mother.',
    support: [
      'The statewide birth index independently repeats the same child, date, county, and parents.',
      'The 1940 census places James L. Meason, Mary, and young Jimmie in one Richardson household.',
      'The 1973 death certificate later names the parents in shortened form as Lawrence Meason and Mary Sledge.',
    ],
    limitation:
      'The birth-certificate form does not separately identify who supplied the parent details; the death-certificate information was supplied later, none of the records uses a Sr. suffix, and the census coordinates remain unverified.',
    referenceIds: [75, 74, 76, 56],
    publication: published,
  },
  {
    id: 'james-1934-cynthia',
    from: 'james-1934',
    to: 'cynthia',
    kind: 'parent-child',
    evidenceType: 'family',
    assessment: 'known',
    statement:
      'This known family relationship is retained from the reviewed public tree.',
    support: [
      'The relationship retains the family-evidence status used in the public tree.',
    ],
    limitation: 'The public package intentionally omits private vital records.',
    referenceIds: [],
    publication: published,
  },
  {
    id: 'cynthia-shannon',
    from: 'cynthia',
    to: 'shannon',
    kind: 'parent-child',
    evidenceType: 'family',
    assessment: 'known',
    statement:
      'This known family relationship is retained from the reviewed public tree.',
    support: [
      'The relationship is also supported by the narrator’s personal knowledge.',
    ],
    limitation: 'The public package intentionally omits private vital records.',
    referenceIds: [],
    publication: published,
  },
] as const satisfies readonly Relationship[];
