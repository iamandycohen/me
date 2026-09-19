export type CaseId = 'parentage' | 'george-connection' | 'burial-ground';
export type StoryId = 'migration' | 'between-lines' | 'texas-reconnection';

export interface EvidenceCard {
  eyebrow: string;
  title: string;
  detail: string;
  referenceIds?: readonly number[];
  tone?: 'record' | 'inference' | 'limit';
}

export interface CaseSection {
  id: string;
  label: string;
  heading: string;
  intro: string;
  cards: readonly EvidenceCard[];
}

export interface ResearchCase {
  id: CaseId;
  number: string;
  title: string;
  shortTitle: string;
  assessment: string;
  assessmentType: 'unresolved' | 'accepted' | 'conflicting';
  summary: string;
  known: string;
  unknown: string;
  relatedPeople: readonly string[];
  referenceIds: readonly number[];
  sections: readonly CaseSection[];
  relatedStories: readonly StoryId[];
}

export interface StoryEvent {
  year: string;
  place: string;
  record: string;
  interpretation: string;
  referenceIds: readonly number[];
  routeIndex: number;
}

export interface StoryChapter {
  id: StoryId;
  number: string;
  title: string;
  shortTitle: string;
  period: string;
  summary: string;
  routePlaces: readonly string[];
  events: readonly StoryEvent[];
  relatedCases: readonly CaseId[];
}

export const researchCases: readonly ResearchCase[] = [
  {
    id: 'parentage',
    number: '01',
    title: 'Who were Benjamin Meason’s parents?',
    shortTitle: 'Benjamin’s parents',
    assessment: 'Exact parentage unresolved',
    assessmentType: 'unresolved',
    summary:
      'The strongest record did not answer the question. It placed Benjamin in a real inheritance network and changed which explanations remain safe.',
    known:
      'Benjamin was named as one of Joseph Meason’s heirs at law in an 1813 deed.',
    unknown:
      'Which sibling branch connected Benjamin to Joseph, and who Benjamin’s parents were.',
    relatedPeople: ['Benjamin Meason', 'Joseph Meason', 'Thomas branch'],
    referenceIds: [67, 68],
    sections: [
      {
        id: 'record-turn',
        label: 'What records say',
        heading: 'One phrase opened the case. Its context changed the meaning.',
        intro:
          'The neighboring deeds have to be read together. The first supplies direct heir language; the second proves that Joseph’s heirs included collateral descendants.',
        cards: [
          {
            eyebrow: '1813 · direct record',
            title: 'Benjamin is named as an heir',
            detail:
              'A Union County deed calls Benjamin “one of the heirs at law” of Joseph Meason and records his transfer of an undivided interest in Joseph’s Highland Creek tract.',
            referenceIds: [67],
            tone: 'record',
          },
          {
            eyebrow: 'Adjacent deed · direct record',
            title: 'Children of Joseph’s brothers inherited too',
            detail:
              'A neighboring deed identifies John and Samuel as Joseph’s brothers and names children of both men among Joseph’s heirs.',
            referenceIds: [68],
            tone: 'record',
          },
          {
            eyebrow: 'Present assessment',
            title: '“Heir” cannot safely be reduced to “son”',
            detail:
              'Benjamin belongs in Joseph’s inheritance network, while his exact branch remains unproved.',
            referenceIds: [67, 68],
            tone: 'inference',
          },
        ],
      },
      {
        id: 'explanations',
        label: 'Explanations tested',
        heading: 'Candidate branches stay in the case file—not in the tree.',
        intro:
          'Each explanation fits some of the evidence. None yet has the relationship record needed to occupy Benjamin’s parent position.',
        cards: [
          {
            eyebrow: 'Serious candidate · unproved',
            title: 'Thomas branch',
            detail:
              'Thomas Meason’s record trail could place Benjamin in Joseph’s sibling-descendant network, but no reviewed record calls Benjamin his son.',
            referenceIds: [20, 21, 22, 67, 68],
            tone: 'inference',
          },
          {
            eyebrow: 'Open explanation',
            title: 'Another sibling branch',
            detail:
              'Because children of Joseph’s brothers inherited, another sibling’s line could explain Benjamin’s status.',
            referenceIds: [68],
            tone: 'inference',
          },
          {
            eyebrow: 'Still possible',
            title: 'An unidentified Meason branch',
            detail:
              'The reviewed deeds may not expose every family step. A branch not yet identified remains possible.',
            tone: 'limit',
          },
        ],
      },
      {
        id: 'change',
        label: 'What would change it',
        heading: 'A new record must select a branch—not merely repeat a name.',
        intro:
          'A useful next record would discriminate among explanations or break the present inheritance-network interpretation.',
        cards: [
          {
            eyebrow: 'Relationship record',
            title: 'Name Benjamin’s parent explicitly',
            detail:
              'A probate, court, guardianship, deed, or family record that states the relationship would change the tree directly.',
            tone: 'record',
          },
          {
            eyebrow: 'Distribution record',
            title: 'Connect Benjamin to one sibling branch',
            detail:
              'A distribution or heir record could distinguish Thomas’s branch from Joseph’s other siblings.',
            tone: 'record',
          },
          {
            eyebrow: 'Contrary evidence',
            title: 'Rule out the leading model',
            detail:
              'An incompatible timeline, identity, or relationship record could eliminate a candidate branch or the wider model.',
            tone: 'limit',
          },
        ],
      },
    ],
    relatedStories: ['migration'],
  },
  {
    id: 'george-connection',
    number: '02',
    title: 'How does George belong to Benjamin’s family?',
    shortTitle: 'George’s connection',
    assessment: 'Accepted conclusion · indirect evidence',
    assessmentType: 'accepted',
    summary:
      'No record writes the whole relationship in one sentence. A network of named kin, land, households, work, and later Texas statements carries the conclusion.',
    known:
      'George’s placement as Benjamin’s son is accepted in the working tree as a high-confidence indirect conclusion.',
    unknown:
      'No reviewed record directly states “George, son of Benjamin,” and parts of the collateral migration remain open.',
    relatedPeople: [
      'Benjamin Meason',
      'George M. Meason',
      'Laura Ann Meason',
      'James L. Meason',
    ],
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
    sections: [
      {
        id: 'evidence-trail',
        label: 'Evidence trail',
        heading: 'The connection emerges around the direct line.',
        intro:
          'The proof is cumulative. Each record contributes a typed fact; none should be made to say more than it does.',
        cards: [
          {
            eyebrow: '1846 · named relationship',
            title: 'Laura is Benjamin’s documented daughter',
            detail:
              'Laura Ann Meason’s marriage return names Benjamin as her father and makes John C. Kippers his documented son-in-law.',
            referenceIds: [61],
            tone: 'record',
          },
          {
            eyebrow: '1855–1860 · association',
            title: 'Land and households keep the same people together',
            detail:
              'Kippers, George, James L., Parker, Hollingsworth, and Meason records form a continuing Monroe County network. The deed itself states no kinship.',
            referenceIds: [1, 28, 61, 62],
            tone: 'record',
          },
          {
            eyebrow: '1900–1919 · later statements',
            title: 'Texas records supply “uncle” and “father”',
            detail:
              'George’s son lived with elder James L., recorded as his uncle; James’s death certificate later named Benjamin as his father.',
            referenceIds: [33, 59, 60],
            tone: 'record',
          },
        ],
      },
      {
        id: 'network',
        label: 'Family around it',
        heading: 'Different links do different evidentiary work.',
        intro:
          'A marriage statement, a land association, a shared household network, and a kinship term must remain visually distinct from a parent-child edge.',
        cards: [
          {
            eyebrow: 'Named as daughter',
            title: 'Benjamin → Laura Ann',
            detail: 'Directly stated in Laura’s marriage return.',
            referenceIds: [61],
            tone: 'record',
          },
          {
            eyebrow: 'Married',
            title: 'Laura Ann ↔ John C. Kippers',
            detail:
              'The same return documents their marriage and identifies John as Benjamin’s son-in-law.',
            referenceIds: [61],
            tone: 'record',
          },
          {
            eyebrow: 'Bought land together',
            title: 'Kippers ↔ George ↔ James L.',
            detail:
              'The association strengthens the family-network argument but is not itself a kinship statement.',
            referenceIds: [28],
            tone: 'inference',
          },
        ],
      },
      {
        id: 'limits',
        label: 'Limits and next tests',
        heading: 'An accepted conclusion can still carry visible gaps.',
        intro:
          'The tree can advance while the publication continues to show what would make the argument more direct and complete.',
        cards: [
          {
            eyebrow: 'Missing sentence',
            title: 'No direct George-to-Benjamin statement',
            detail:
              'The conclusion rests on convergence rather than a single relationship record.',
            tone: 'limit',
          },
          {
            eyebrow: 'Migration gap',
            title: 'James L. after 1880',
            detail:
              'The Missouri identity is strong, but the move into the later Texas household remains undocumented.',
            referenceIds: [59, 60, 62, 63, 64],
            tone: 'limit',
          },
          {
            eyebrow: 'Next test',
            title: 'Complete the estate and land chain',
            detail:
              'Benjamin’s remaining estate and Section 11 records may expose additional relationship or property context.',
            referenceIds: [28, 65],
            tone: 'inference',
          },
        ],
      },
    ],
    relatedStories: ['between-lines', 'texas-reconnection'],
  },
  {
    id: 'burial-ground',
    number: '03',
    title: 'Where was Benjamin’s family burial ground?',
    shortTitle: 'The burial ground',
    assessment: 'Location conflict · title chain incomplete',
    assessmentType: 'conflicting',
    summary:
      'The will proves a reserved family burial square and a later survey names Benjamin and Hannah. The known patent and survey disagree by one range.',
    known:
      'Benjamin reserved a seventy-foot-square family burial ground containing his wife’s remains on the farm devised to James S.',
    unknown:
      'Whether that farm was the known Range 11 patent tract and where the surveyed Range 10 cemetery physically lay.',
    relatedPeople: ['Benjamin Meason', 'Hannah Doom Meason', 'James S. Meason'],
    referenceIds: [13, 29, 65, 66],
    sections: [
      {
        id: 'record-chain',
        label: 'What records say',
        heading:
          'Three records describe land, a burial square, and a cemetery.',
        intro:
          'They overlap, but they do not yet form a proved title-and-location chain.',
        cards: [
          {
            eyebrow: '1835 · patent',
            title: 'A known Range 11 tract',
            detail:
              'A federal patent establishes Benjamin’s Section 20 land in Township 55 North, Range 11 West.',
            referenceIds: [13],
            tone: 'record',
          },
          {
            eyebrow: '1853 · recorded will',
            title: 'A farm with a reserved burial square',
            detail:
              'The contemporary will-book copy devises “the farm” to James S. and reserves a seventy-foot-square burial ground containing Benjamin’s wife.',
            referenceIds: [65],
            tone: 'record',
          },
          {
            eyebrow: 'Later derivative survey',
            title: 'A Meason cemetery in Range 10',
            detail:
              'The survey names Hannah and Benjamin and places the cemetery in Section 20, Township 55 North, Range 10 West.',
            referenceIds: [66],
            tone: 'record',
          },
        ],
      },
      {
        id: 'conflict',
        label: 'The location conflict',
        heading: 'Range 10 and Range 11 must remain visibly unresolved.',
        intro:
          'A plausible geographic correction is not evidence. The prototype intentionally refuses to drop a precise cemetery pin.',
        cards: [
          {
            eyebrow: 'Range 11',
            title: 'The proved patent tract',
            detail:
              'Benjamin’s 1835 patent is controlled by an official land record, but the will never says this patent was “the farm.”',
            referenceIds: [13, 65],
            tone: 'record',
          },
          {
            eyebrow: 'Range 10',
            title: 'The surveyed cemetery description',
            detail:
              'The cemetery survey supplies a conflicting range and does not establish its compiler, date, or title history.',
            referenceIds: [66],
            tone: 'record',
          },
          {
            eyebrow: 'Boundary',
            title: 'No silent correction and no map pin',
            detail:
              'The known patent cannot be equated with the devised farm until deeds or estate records bridge them.',
            referenceIds: [13, 29, 65, 66],
            tone: 'limit',
          },
        ],
      },
      {
        id: 'resolve',
        label: 'What would resolve it',
        heading: 'The answer belongs in the farm’s title chain.',
        intro:
          'The next useful records connect a legal parcel, James S.’s inheritance, and the physical cemetery description.',
        cards: [
          {
            eyebrow: 'Estate series',
            title: 'Complete James S.’s executor file',
            detail:
              'An inventory, settlement, receipt, or sale record may identify the devised farm and additional relatives.',
            referenceIds: [65],
            tone: 'record',
          },
          {
            eyebrow: 'Reverse title chain',
            title: 'Trace the farm before and after 1853',
            detail:
              'Deeds can test whether the will farm was the patent tract or a different Section 20 property.',
            referenceIds: [13, 29],
            tone: 'record',
          },
          {
            eyebrow: 'Survey provenance',
            title: 'Identify who recorded Range 10 and when',
            detail:
              'The survey’s origin may reveal whether its location was observed, copied, or transcribed incorrectly.',
            referenceIds: [66],
            tone: 'inference',
          },
        ],
      },
    ],
    relatedStories: ['migration'],
  },
];

export const storyChapters: readonly StoryChapter[] = [
  {
    id: 'migration',
    number: '01',
    title: 'From Kentucky to Missouri',
    shortTitle: 'The move west',
    period: '1800–1835',
    summary:
      'Tax lists, a marriage bond, a census household, and land patents trace movement without inventing the family’s motive.',
    routePlaces: ['Nelson County', 'Shelby County', 'Missouri'],
    events: [
      {
        year: '1800–1804',
        place: 'Nelson County, Kentucky',
        record:
          'Tax returns place Benjamin in Nelson County in every year from 1800 through 1804 and record two enslaved people in his taxable household in 1803 and 1804.',
        interpretation:
          'The repeated entries establish a sustained Kentucky presence. Nearby Mason or Meason households cannot be treated as relatives from proximity alone.',
        referenceIds: [4],
        routeIndex: 0,
      },
      {
        year: '1801',
        place: 'Nelson County, Kentucky',
        record:
          'A marriage bond and county register record Benjamin Mason and Hannah Doom’s marriage; the bond says both were over twenty-one.',
        interpretation:
          'The bond corrects copied age claims but does not identify either person’s parents or explain why they settled there.',
        referenceIds: [2, 3],
        routeIndex: 0,
      },
      {
        year: '1820',
        place: 'Shelby County, Kentucky',
        record:
          'A census household fits Benjamin, Hannah, and their growing family. A same-name Nelson County household belongs to someone else.',
        interpretation:
          'With earlier and later records, the household shows movement within Kentucky before the family appears in Missouri.',
        referenceIds: [10],
        routeIndex: 1,
      },
      {
        year: '1829–1835',
        place: 'Ralls and Monroe Counties, Missouri',
        record:
          'An 1829 patent identifies Benjamin as a Ralls County resident. A separate 1835 patent grants him Monroe County land.',
        interpretation:
          'The sequence supports a Kentucky-to-Missouri migration. It establishes residence and landholding—not the family’s motive for moving.',
        referenceIds: [11, 12, 13, 14],
        routeIndex: 2,
      },
    ],
    relatedCases: ['parentage', 'burial-ground'],
  },
  {
    id: 'between-lines',
    number: '02',
    title: 'The family between the lines',
    shortTitle: 'Land, households, and mills',
    period: '1846–1880',
    summary:
      'A named daughter, shared land, repeated households, and James L.’s working life reveal a network no single family statement preserves.',
    routePlaces: ['Family named', 'Households & land', 'Mill work'],
    events: [
      {
        year: '1846',
        place: 'Monroe County, Missouri',
        record:
          'Laura Ann Meason’s marriage return identifies her as Benjamin Meason’s daughter and John C. Kippers as her husband.',
        interpretation:
          'This turns Laura and John into documented family anchors for evaluating the people who repeatedly appear around them.',
        referenceIds: [61],
        routeIndex: 0,
      },
      {
        year: '1850',
        place: 'Benjamin and Hannah’s household',
        record:
          'The household includes James and four Hollingsworth children alongside Benjamin and Hannah.',
        interpretation:
          'The composition matters when the same people reappear later, but the census does not explain every relationship.',
        referenceIds: [1],
        routeIndex: 1,
      },
      {
        year: '1855–1860',
        place: 'Land and neighboring households',
        record:
          'Kippers, George, and James L. appear in a shared land transaction; Parker, Hollingsworth, Kipper, and Meason households recur across consecutive census pages.',
        interpretation:
          'The continuing cluster strengthens the family-network argument. The deed and proximity do not literally call the men brothers.',
        referenceIds: [28, 61, 62],
        routeIndex: 1,
      },
      {
        year: '1860–1880',
        place: 'Monroe County, Missouri',
        record:
          'James L. appears as a blacksmith, then a miller, and finally a sawmill proprietor with coherent age, birthplace, county, and middle initial.',
        interpretation:
          'The occupational sequence creates a strong Missouri identity. It does not prove legal ownership of a particular mill or his later move to Texas.',
        referenceIds: [62, 63, 64],
        routeIndex: 2,
      },
    ],
    relatedCases: ['george-connection'],
  },
  {
    id: 'texas-reconnection',
    number: '03',
    title: 'Two branches meet again in Texas',
    shortTitle: 'The Texas reconnection',
    period: '1880–1919',
    summary:
      'The words “son,” “uncle,” and “father,” spread across three records and four decades, assemble the indirect bridge back to Benjamin.',
    routePlaces: ['George’s Texas home', 'Missouri gap', 'Texas household'],
    events: [
      {
        year: '1880',
        place: 'Dallas County, Texas',
        record:
          'George’s household records James R. as his son and Eva as his daughter-in-law.',
        interpretation:
          'This directly anchors James R. to George before James R. later becomes the informant and household link around elder James L.',
        referenceIds: [33],
        routeIndex: 0,
      },
      {
        year: '1880',
        place: 'Monroe County, Missouri',
        record:
          'Elder James L. remains in Missouri as a sawmill proprietor—the last high-confidence record in his Missouri sequence.',
        interpretation:
          'The identity through 1880 is strong, but the move from Missouri to Texas has not been documented.',
        referenceIds: [64],
        routeIndex: 1,
      },
      {
        year: '1900',
        place: 'Foard County, Texas',
        record:
          'Elder James L. lives in James R. Meason’s household and is recorded as James R.’s uncle.',
        interpretation:
          '“Uncle” connects the branches but does not specify side, blood versus marriage, or a complete sibling statement.',
        referenceIds: [60],
        routeIndex: 2,
      },
      {
        year: '1919',
        place: 'Big Sandy, Texas',
        record:
          'Elder James L.’s death certificate, informed by J. R. Meason, names Benjamin Meason as his father.',
        interpretation:
          'Together with the uncle household and earlier network, this supports George’s family placement indirectly. No record literally calls George and elder James brothers.',
        referenceIds: [59],
        routeIndex: 2,
      },
    ],
    relatedCases: ['george-connection'],
  },
];
