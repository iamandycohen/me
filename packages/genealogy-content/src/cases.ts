import type { ResearchCase } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-20',
} as const;

export const researchCases = [
  {
    id: 'parentage',
    number: '01',
    title: 'Who were Benjamin Meason’s parents?',
    shortTitle: 'Benjamin’s parents',
    assessment: 'Exact parentage unresolved',
    assessmentType: 'unresolved',
    summary:
      'The strongest record placed Benjamin in a real inheritance network and changed which explanations remain safe, but did not name his parents.',
    known:
      'Benjamin was named as one of Joseph Meason’s heirs at law in an 1813 deed.',
    unknown:
      'Which sibling branch connected Benjamin to Joseph, and who Benjamin’s parents were.',
    relatedPersonIds: ['benjamin'],
    referenceIds: [19, 20, 21, 22, 67, 68, 73],
    sections: [
      {
        id: 'record-turn',
        label: 'What records say',
        heading: 'One phrase opened the case. Its context changed the meaning.',
        intro:
          'The neighboring deeds must be read together: one names Benjamin as an heir; the other proves Joseph’s heirs included collateral descendants.',
        cards: [
          {
            id: 'benjamin-named-heir',
            eyebrow: '1813 · direct record',
            title: 'Benjamin is named as an heir',
            detail:
              'A Union County deed calls Benjamin one of Joseph Meason’s heirs at law and records his transfer of an undivided interest.',
            referenceIds: [67],
            tone: 'record',
          },
          {
            id: 'collateral-heirs',
            eyebrow: 'Adjacent deed · direct record',
            title: 'Children of Joseph’s brothers inherited too',
            detail:
              'A neighboring deed identifies John and Samuel as Joseph’s brothers and names children of both men among Joseph’s heirs.',
            referenceIds: [68],
            tone: 'record',
          },
          {
            id: 'heir-not-son',
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
          'Each explanation fits some evidence; none has the relationship record needed to occupy Benjamin’s parent position.',
        cards: [
          {
            id: 'thomas-branch',
            eyebrow: 'Serious candidate · unproved',
            title: 'Kentucky Thomas branch',
            detail:
              'The Kentucky Thomas’s record trail could place Benjamin in Joseph’s sibling-descendant network, but no reviewed record identifies this Thomas as Thomas senior’s son or calls Benjamin his son.',
            referenceIds: [20, 21, 22, 67, 68],
            tone: 'inference',
          },
          {
            id: 'hempfield-kentucky-exclusion',
            eyebrow: 'Cross-record chronology · identity exclusion',
            title: 'Hempfield Thomas cannot be Kentucky Thomas',
            detail:
              'Hempfield Thomas was dead by 21 March 1786. He therefore cannot be the living Thomas who bought Nelson County land in 1788 and conveyed it as a Logan County resident in 1795. Separating the men narrows the candidates but does not identify Benjamin’s father.',
            referenceIds: [19, 20, 21, 73],
            tone: 'inference',
          },
          {
            id: 'other-sibling-branch',
            eyebrow: 'Open explanation',
            title: 'Another sibling branch',
            detail:
              'Because children of Joseph’s brothers inherited, another sibling’s line could explain Benjamin’s status.',
            referenceIds: [68],
            tone: 'inference',
          },
        ],
      },
      {
        id: 'change',
        label: 'What would change it',
        heading: 'A new record must select a branch—not merely repeat a name.',
        intro:
          'A useful record would discriminate among explanations or break the inheritance-network interpretation.',
        cards: [
          {
            id: 'name-parent',
            eyebrow: 'Relationship record',
            title: 'Name Benjamin’s parent explicitly',
            detail:
              'A probate, court, guardianship, deed, or family record that states the relationship would change the tree directly.',
            referenceIds: [],
            tone: 'record',
          },
          {
            id: 'contrary-parentage',
            eyebrow: 'Contrary evidence',
            title: 'Rule out the leading model',
            detail:
              'An incompatible timeline, identity, or relationship record could eliminate a candidate branch or the wider model.',
            referenceIds: [],
            tone: 'limit',
          },
        ],
      },
    ],
    relatedStoryIds: ['migration'],
    publication,
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
      'No reviewed record directly states “George, son of Benjamin.” Whether the Missouri James L. was the elder James L. later recorded in Texas remains unresolved.',
    relatedPersonIds: ['benjamin', 'george'],
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
            id: 'laura-daughter',
            eyebrow: '1846 · named relationship',
            title: 'Laura is Benjamin’s documented daughter',
            detail:
              'Laura Ann Meason’s marriage return names Benjamin as her father and makes John C. Kippers his documented son-in-law.',
            referenceIds: [61],
            tone: 'record',
          },
          {
            id: 'land-households',
            eyebrow: '1855–1860 · association',
            title: 'Land and households keep the same people together',
            detail:
              'Three Hollingsworth siblings appear in Benjamin’s 1850 household and in his daughter Laura and John Kipper’s 1860 household. Nearby J. L., the Parker neighbors, and the joint deed add circumstantial support for a continuing Monroe County family network; none states George’s parentage.',
            referenceIds: [1, 28, 61, 62],
            tone: 'record',
          },
          {
            id: 'texas-statements',
            eyebrow: '1900–1919 · later statements',
            title: 'Texas records supply “uncle” and “father”',
            detail:
              'In Texas, George’s son lived with elder James L., recorded as his uncle; the elder James’s death certificate later named Benjamin as his father.',
            referenceIds: [33, 59, 60],
            tone: 'record',
          },
        ],
      },
      {
        id: 'limits',
        label: 'Limits and next tests',
        heading: 'An accepted conclusion can still carry visible gaps.',
        intro:
          'The tree can advance while the publication continues to show what would make the argument more direct.',
        cards: [
          {
            id: 'missing-sentence',
            eyebrow: 'Missing sentence',
            title: 'No direct George-to-Benjamin statement',
            detail:
              'The conclusion rests on convergence rather than a single relationship record.',
            referenceIds: [],
            tone: 'limit',
          },
          {
            id: 'complete-estate',
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
    relatedStoryIds: ['between-lines', 'texas-reconnection'],
    publication,
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
    relatedPersonIds: ['benjamin'],
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
            id: 'range-eleven-patent',
            eyebrow: '1835 · patent',
            title: 'A known Range 11 tract',
            detail:
              'A federal patent establishes Benjamin’s Section 20 land in Township 55 North, Range 11 West.',
            referenceIds: [13],
            tone: 'record',
          },
          {
            id: 'reserved-burial-square',
            eyebrow: '1853 · recorded will',
            title: 'A farm with a reserved burial square',
            detail:
              'The will-book copy devises the farm to James S. and reserves a burial ground containing Benjamin’s wife.',
            referenceIds: [65],
            tone: 'record',
          },
          {
            id: 'range-ten-survey',
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
          'A plausible geographic correction is not evidence. The publication intentionally refuses to drop a precise cemetery pin.',
        cards: [
          {
            id: 'no-silent-correction',
            eyebrow: 'Boundary',
            title: 'No silent correction and no map pin',
            detail:
              'The patent cannot be equated with the devised farm until deeds or estate records bridge them.',
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
            id: 'reverse-title-chain',
            eyebrow: 'Reverse title chain',
            title: 'Trace the farm before and after 1853',
            detail:
              'Deeds can test whether the will farm was the patent tract or a different Section 20 property.',
            referenceIds: [13, 29],
            tone: 'record',
          },
          {
            id: 'survey-provenance',
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
    relatedStoryIds: ['migration'],
    publication,
  },
] as const satisfies readonly ResearchCase[];
