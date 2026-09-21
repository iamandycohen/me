import type { Person } from './types.js';

const published = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const people = [
  {
    id: 'benjamin',
    name: 'Benjamin Meason',
    period: 'Born about 1776 · died 1853',
    relation: 'Fourth great-grandfather · working conclusion',
    place: 'Kentucky → Missouri',
    summary:
      'Benjamin’s life is documented in Kentucky and Missouri. His place in the direct line is an accepted working conclusion built from converging records—not from a single record naming George as his son.',
    evidenceType: 'indirect',
    assessment: 'high-confidence',
    referenceIds: [1, 2, 11, 13, 28, 33, 59, 60, 61, 62, 63, 64, 65, 66],
    publication: published,
  },
  {
    id: 'george',
    name: 'George M. Meason',
    period: 'Birth year disputed · died 1887',
    relation: 'Third great-grandfather',
    place: 'Missouri → Texas',
    summary:
      'George’s own records lead to a wider family network. His place in Benjamin’s family is accepted as a high-confidence indirect conclusion.',
    evidenceType: 'indirect',
    assessment: 'high-confidence',
    referenceIds: [25, 28, 33, 59, 60, 61, 62, 63, 64],
    publication: published,
  },
  {
    id: 'franklin',
    name: 'Franklin Meason',
    period: '1850–1933',
    relation: 'Second great-grandfather',
    place: 'Missouri → Texas',
    summary:
      'Recorded as Frank Meason in his death certificate, which names George M. Meason and Martha Reed as his parents.',
    evidenceType: 'direct',
    assessment: 'documented',
    referenceIds: [57, 58],
    publication: published,
  },
  {
    id: 'james-1892',
    name: 'James Lawrence Meason',
    period: '1892–1949',
    relation: 'Great-grandfather',
    place: 'Texas',
    summary: 'The earlier James Lawrence Meason generation in the direct line.',
    evidenceType: 'direct',
    assessment: 'documented',
    referenceIds: [75, 74, 76, 56, 57],
    publication: published,
  },
  {
    id: 'james-1934',
    name: 'James Lawrence “Jimmy” Meason',
    period: '1934–1973',
    relation: 'Grandfather',
    place: 'Texas',
    summary:
      'One of two successive generations carrying the James Lawrence Meason name.',
    evidenceType: 'direct',
    assessment: 'documented',
    referenceIds: [75, 74, 76, 56],
    publication: published,
  },
  {
    id: 'cynthia',
    name: 'Cynthia June Meason',
    period: '1958–1991',
    relation: 'Mother',
    place: 'United States',
    summary:
      'Reviewed vital records directly document her place in the Meason line.',
    evidenceType: 'direct',
    assessment: 'documented',
    referenceIds: [38],
    publication: published,
  },
  {
    id: 'shannon',
    name: 'Shannon Jeremiah Meason',
    period: 'Present',
    relation: 'Starting point',
    place: 'United States',
    summary:
      'My birth name is Shannon Jeremiah Meason; I grew up as Andy Cohen after being adopted. This tree follows my biological Meason ancestry.',
    evidenceType: 'direct',
    assessment: 'documented',
    referenceIds: [],
    publication: published,
  },
] as const satisfies readonly Person[];
