import type { CaseId, StoryId } from './prototypeData';

export interface PublicMedia {
  id: string;
  kind: 'portrait' | 'place' | 'document' | 'map' | 'marker';
  role: 'evidence' | 'context';
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  title: string;
  caption: string;
  limitation?: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
  referenceIds?: readonly number[];
  provenance: {
    sourcePage?: string;
    rightsSourcePage?: string;
    creator?: string;
    collection: string;
    rightsStatement: string;
    credit: string;
  };
}

export interface PublicImageNeed {
  id: string;
  label: string;
  title: string;
  description: string;
}

export const mediaCatalog = {
  'kentucky-map-1818': {
    id: 'kentucky-map-1818',
    kind: 'map',
    role: 'context',
    src: '/genealogy/places/kentucky-map-1818.jpg',
    width: 1800,
    height: 780,
    alt: 'Detail of an 1818 map of Kentucky, with parts of Indiana and Illinois',
    label: 'Place context · 1818 map',
    title: 'Kentucky near the beginning of the trail',
    caption:
      'This 1818 Kentucky map, attributed to Luke Munsell and Hugh Anderson, falls between the family’s documented Nelson and Shelby County periods.',
    limitation:
      'The map provides period geography. It does not mark a Meason residence or prove a migration route.',
    fit: 'cover',
    objectPosition: '55% 55%',
    provenance: {
      sourcePage: 'https://www.loc.gov/item/75653132/',
      creator: 'Luke Munsell and Hugh Anderson',
      collection: 'Library of Congress Geography and Map Division',
      rightsStatement:
        'The digitized Geography and Map Division item is free to use and reuse; no contrary rights advisory is present.',
      credit: 'Library of Congress, Geography and Map Division',
    },
  },
  'ralls-map-1878': {
    id: 'ralls-map-1878',
    kind: 'map',
    role: 'context',
    src: '/genealogy/places/ralls-county-atlas-1878.jpg',
    width: 1200,
    height: 1482,
    alt: 'Page from an 1878 illustrated atlas of Ralls County, Missouri',
    label: 'Place context · 1878 atlas',
    title: 'Ralls County on paper',
    caption:
      'This public-domain atlas page shows part of Ralls County almost fifty years after Benjamin was identified there in a federal patent.',
    limitation:
      'It is later geographic context, not a map of Benjamin’s patent tract or the family’s precise route.',
    fit: 'cover',
    objectPosition: '50% 42%',
    provenance: {
      sourcePage: 'https://digital.shsmo.org/digital/collection/plat/id/3858/',
      rightsSourcePage:
        'https://digital.shsmo.org/digital/collection/plat/id/3894/',
      creator: 'Edwards Brothers of Missouri',
      collection: 'Plat Maps of Missouri, State Historical Society of Missouri',
      rightsStatement: 'The item page identifies the atlas as public domain.',
      credit: 'The State Historical Society of Missouri',
    },
  },
  'near-dallas-cotton-1907': {
    id: 'near-dallas-cotton-1907',
    kind: 'place',
    role: 'context',
    src: '/genealogy/places/near-dallas-cotton-1907.jpg',
    width: 1024,
    height: 822,
    alt: 'Cotton pickers with baskets in a field near Dallas, Texas, around 1907',
    label: 'Place context · near Dallas · 1907',
    title: 'The landscape around the Texas years',
    caption:
      'A stereograph published around 1907 shows cotton production near Dallas during the same broad period as the family’s Texas records.',
    limitation:
      'This is regional context. The people, land, and work shown are not identified as part of the Meason family.',
    fit: 'cover',
    objectPosition: '50% 48%',
    provenance: {
      sourcePage: 'https://www.loc.gov/item/00652640/',
      creator: 'Berry, Kelley & Chadwick, publishers',
      collection: 'Library of Congress Prints and Photographs Division',
      rightsStatement:
        'The Library of Congress item has no known restriction noted for publication.',
      credit: 'Library of Congress, Prints and Photographs Division',
    },
  },
  'benjamin-bond': {
    id: 'benjamin-bond',
    kind: 'document',
    role: 'evidence',
    src: '/genealogy/evidence/benjamin-meason-1802-guardian-bond.jpg',
    width: 3242,
    height: 2538,
    alt: 'Facing pages of a Nelson County bond book with Benjamin Meason’s signature on the left page',
    label: 'Original record · 1802',
    title: 'Benjamin’s name in his own hand',
    caption:
      'Benjamin signed this Nelson County guardian bond “Benjn Meason.” It documents his presence and handwriting—not his parents.',
    fit: 'contain',
    referenceIds: [5],
    provenance: {
      collection: 'Nelson County Court Bond Book, FamilySearch image group',
      rightsStatement:
        'Reviewed public-site evidence image; publication remains limited to this contextual crop.',
      credit: 'Nelson County court record; public-site research copy',
    },
  },
  'george-marker': {
    id: 'george-marker',
    kind: 'marker',
    role: 'evidence',
    src: '/genealogy/evidence/george-m-meason-marker.jpg',
    width: 691,
    height: 922,
    alt: 'Broken grave marker for George M. Meason at Mount Calvary Cemetery in Dallas',
    label: 'Marker photograph · Dallas',
    title: 'A date that does not settle the question',
    caption:
      'George’s marker gives 10 May 1818–11 November 1887. Census and family evidence instead point to birth about 1810.',
    limitation:
      'The marker contributes chronology, not a direct statement connecting George to Benjamin.',
    fit: 'contain',
    referenceIds: [26],
    provenance: {
      collection: 'Find a Grave memorial 5786133',
      rightsStatement:
        'Reviewed public-site evidence image; original photographer and reuse history remain as described in the reference catalog.',
      credit: 'Mount Calvary Cemetery marker photograph',
    },
  },
  'franklin-home': {
    id: 'franklin-home',
    kind: 'portrait',
    role: 'context',
    src: '/genealogy/people/franklin-meason-at-home.jpg',
    width: 737,
    height: 1284,
    alt: 'Full seated portrait attributed to Franklin Meason outside a family home',
    label: 'Family photograph · Richardson',
    title: 'Franklin at home',
    caption:
      'The family-tree title identifies Franklin seated at his home in Richardson, Texas.',
    limitation:
      'The exact Richardson location, date, photographer, and original custodian remain undocumented.',
    fit: 'contain',
    referenceIds: [42],
    provenance: {
      collection: 'Family Ancestry media collection',
      rightsStatement:
        'Family-held working attribution; not asserted to be public domain.',
      credit: 'Family photograph',
    },
  },
  'james-1892-porch': {
    id: 'james-1892-porch',
    kind: 'portrait',
    role: 'context',
    src: '/genealogy/people/james-lawrence-meason-1892-porch.jpg',
    width: 939,
    height: 1203,
    alt: 'Full porch photograph attributed to James Lawrence Meason, born 1892',
    label: 'Family photograph · porch portrait',
    title: 'A later Texas generation',
    caption:
      'The handwritten caption identifies James Lawrence Meason, born in 1892, in the Texas descendant line.',
    limitation:
      'The writing is not treated as an autograph; the photograph’s date, place, and photographer remain unknown.',
    fit: 'contain',
    referenceIds: [40],
    provenance: {
      collection: 'Family photograph collection',
      rightsStatement:
        'Family-held working attribution; not asserted to be public domain.',
      credit: 'Family photograph',
    },
  },
  'jimmy-studio': {
    id: 'jimmy-studio',
    kind: 'portrait',
    role: 'context',
    src: '/genealogy/people/jimmy-meason-studio-portrait.jpg',
    width: 524,
    height: 820,
    alt: 'Studio portrait of James Lawrence “Jimmy” Meason',
    label: 'Family photograph · studio portrait',
    title: 'James Lawrence “Jimmy” Meason',
    caption:
      'A family-held studio portrait attributed to Jimmy Meason, a later generation in the direct line.',
    limitation:
      'The photographer, studio, original date, and print custodian remain undocumented.',
    fit: 'cover',
    objectPosition: '50% 22%',
    referenceIds: [39],
    provenance: {
      collection: 'Family photograph collection',
      rightsStatement:
        'Family-held working attribution; not asserted to be public domain.',
      credit: 'Family photograph',
    },
  },
  'cynthia-school': {
    id: 'cynthia-school',
    kind: 'portrait',
    role: 'context',
    src: '/genealogy/people/cynthia-june-meason-school-portrait.jpg',
    width: 563,
    height: 813,
    alt: 'Formal school portrait of Cynthia June “Cindee” Meason',
    label: 'Family photograph · school portrait',
    title: 'Cynthia June “Cindee” Meason',
    caption:
      'The family collection carries a working identification of Cynthia, while the school, studio, and exact date are still being documented.',
    fit: 'cover',
    objectPosition: '50% 28%',
    referenceIds: [38],
    provenance: {
      collection: 'Family photograph collection',
      rightsStatement:
        'Family-held working attribution; not asserted to be public domain.',
      credit: 'Family photograph',
    },
  },
  'andy-headshot': {
    id: 'andy-headshot',
    kind: 'portrait',
    role: 'context',
    src: '/headshot.jpg',
    width: 891,
    height: 1284,
    alt: 'Andy Cohen',
    label: 'Present day',
    title: 'Andy Cohen',
    caption:
      'Born Shannon Jeremiah Meason and raised in the Cohen family, Andy is the present-day narrator of this research.',
    fit: 'cover',
    objectPosition: '50% 28%',
    provenance: {
      collection: 'Personal site portrait',
      rightsStatement: 'Site-owner portrait.',
      credit: 'Personal photograph',
    },
  },
} as const satisfies Record<string, PublicMedia>;

export type MediaId = keyof typeof mediaCatalog;

export const personMediaIds: Partial<Record<string, MediaId>> = {
  benjamin: 'benjamin-bond',
  george: 'george-marker',
  franklin: 'franklin-home',
  'james-1892': 'james-1892-porch',
  'james-1934': 'jimmy-studio',
  cynthia: 'cynthia-school',
  shannon: 'andy-headshot',
};

export const caseMediaIds: Record<CaseId, readonly MediaId[]> = {
  parentage: ['benjamin-bond', 'kentucky-map-1818'],
  'george-connection': ['george-marker', 'near-dallas-cotton-1907'],
  'burial-ground': [],
};

export const storyMediaIds: Record<StoryId, readonly MediaId[]> = {
  migration: ['kentucky-map-1818', 'ralls-map-1878'],
  'between-lines': ['ralls-map-1878', 'franklin-home'],
  'texas-reconnection': ['near-dallas-cotton-1907', 'george-marker'],
};

export const caseImageNeeds: Partial<Record<CaseId, PublicImageNeed>> = {
  'burial-ground': {
    id: 'burial-ground-location',
    label: 'Image sought · high priority',
    title: 'A documented burial-ground survey or landscape',
    description:
      'The right visual would connect the Range 10 survey, the Range 11 patent, and the farm title chain without pretending the cemetery has been precisely located.',
  },
};

export const storyImageNeeds: Partial<Record<StoryId, PublicImageNeed>> = {
  migration: {
    id: 'kentucky-county-records',
    label: 'Image sought',
    title: 'Nelson and Shelby County at the family’s dates',
    description:
      'A period town, road, tax-book, or land image tied to the correct county would add texture beyond the statewide map.',
  },
  'between-lines': {
    id: 'monroe-county-mill',
    label: 'Image sought · high priority',
    title: 'A Monroe County mill or working landscape',
    description:
      'A documented local mill, sawmill, or pre-1880 town view would make James L.’s occupational trail tangible without implying it was his property.',
  },
  'texas-reconnection': {
    id: 'foard-county-period',
    label: 'Image sought',
    title: 'Foard County during the 1900 household',
    description:
      'A rights-cleared county map, courthouse, street, or landscape from roughly 1890–1919 would ground the uncle household in place.',
  },
};
