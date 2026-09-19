import type { GenealogyReconstruction } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-19',
} as const;

const filmUrl = 'https://www.familysearch.org/search/film/008573278';

export const highlandCreekReconstruction: GenealogyReconstruction = {
  id: 'highland-creek',
  title: 'The Thousand Acres on Highland Creek',
  shortTitle: 'Highland Creek reconstruction',
  summary:
    'A record-led reconstruction of the family named in Thomas Meason senior’s 1779 will and the collateral inheritance network surrounding Joseph Meason’s Highland Creek tract.',
  boundary:
    'The records place Benjamin among Joseph’s heirs, but they do not name Benjamin’s parents. Matching people across the will and deeds is identity synthesis, and the proposed Thomas-to-Benjamin relationship remains a hypothesis rather than a proved tree connection.',
  nodes: [
    {
      id: 'will-thomas-senior',
      label: 'Thomas Meason senior',
      detail: 'Testator whose 1779 will names his wife and eleven children.',
      kind: 'person',
      recordGroup: 'will-1779',
      referenceIds: [18],
    },
    {
      id: 'will-ann',
      label: 'Ann',
      detail: 'Named as Thomas Meason senior’s wife.',
      kind: 'person',
      recordGroup: 'will-1779',
      referenceIds: [18],
    },
    ...[
      ['will-thomas', 'Thomas'],
      ['will-joseph', 'Joseph'],
      ['will-samuel', 'Samuel'],
      ['will-isaac', 'Isaac'],
      ['will-george', 'George'],
      ['will-john', 'John'],
      ['will-elizabeth', 'Elizabeth'],
      ['will-jane', 'Jane'],
      ['will-rachel-worthington', 'Rachel Worthington'],
      ['will-sarah-prescot', 'Sarah Prescot/Brescot'],
      ['will-mary', 'Mary'],
    ].map(([id, label]) => ({
      id,
      label,
      detail: `Named as a child of Thomas Meason senior in the 1779 will.`,
      kind: 'person' as const,
      recordGroup: 'will-1779' as const,
      referenceIds: [18],
    })),
    {
      id: 'logan-thomas',
      label: 'Thomas Mason of Logan County',
      detail: 'Named as William’s father in Joseph’s 1795 deed of gift.',
      kind: 'person',
      recordGroup: 'logan-1795',
      referenceIds: [22],
    },
    {
      id: 'logan-william',
      label: 'William Mason',
      detail: 'Called the eldest son of Thomas Mason of Logan County.',
      kind: 'person',
      recordGroup: 'logan-1795',
      referenceIds: [22],
    },
    {
      id: 'highland-tract',
      label: '1,000 acres on Highland Creek',
      detail:
        'The stable landholding that connects the 1795 gift and 1813 heir deeds.',
      kind: 'land',
      recordGroup: 'highland-creek',
      referenceIds: [22, 67, 68],
    },
    {
      id: 'highland-joseph',
      label: 'Joseph Meason, deceased',
      detail: 'Owner whose Highland Creek interest descended to heirs at law.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [67, 68],
    },
    {
      id: 'highland-john',
      label: 'John Mason',
      detail: 'Directly identified as Joseph’s brother.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    {
      id: 'highland-samuel-brother',
      label: 'Samuel Mason, Joseph’s brother',
      detail: 'Directly identified as Joseph’s brother.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    ...[
      ['highland-isaac-john-son', 'Isaac'],
      ['highland-caty-randal', 'Caty/Martha Randal'],
      ['highland-polly-devore', 'Polly/Mary Devore'],
      ['highland-betty-cherry', 'Betty/Elizabeth Cherry'],
    ].map(([id, label]) => ({
      id,
      label,
      detail: `Named as a child of John Mason in the collateral-heir deed.`,
      kind: 'person' as const,
      recordGroup: 'highland-creek' as const,
      referenceIds: [68],
    })),
    {
      id: 'highland-dorsey',
      label: 'Dorsey Mason',
      detail: 'Named as a son of Joseph’s brother Samuel.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    {
      id: 'highland-isaac-heir',
      label: 'Isaac Meason, heir',
      detail:
        'Named as Joseph’s heir without a stated degree of kinship in the neighboring heir conveyance.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    {
      id: 'highland-elizabeth-hite',
      label: 'Elizabeth Hite',
      detail:
        'Named as Joseph’s heir without a stated degree of kinship in the neighboring heir conveyance.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    {
      id: 'highland-benjamin',
      label: 'Benjamin Meason',
      detail:
        'Called one of Joseph’s heirs at law; the deed does not state the relationship degree.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [67],
    },
    {
      id: 'highland-james-grantee',
      label: 'James Meason of Claiborne County',
      detail:
        'Grantee who received Benjamin’s undivided interest; the transaction does not establish his place in Joseph’s pedigree.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [67],
    },
    {
      id: 'highland-samuel-grantee',
      label: 'Samuel Meason of Claiborne County',
      detail:
        'Recipient consolidating heir shares; he is not automatically the same man as Joseph’s brother Samuel.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [68],
    },
    {
      id: 'title-edmond-rice',
      label: 'Edmond/Edmund Rice',
      detail:
        'Named in the derivative court abstract as the patentee of the 1,000-acre parent tract; no kinship to the Mason family is stated.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [70],
    },
    {
      id: 'title-james-wardlow',
      label: 'James C. Wardlow',
      detail:
        'Henderson County grantee in William Mason’s title transfer and plaintiff in the later ejectment abstract; no kinship is stated.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [69, 70],
    },
    {
      id: 'title-leonard-jones',
      label: 'Leonard Jones',
      detail:
        'Henderson County grantee in William Mason’s title transfer and plaintiff in the later ejectment abstract; no kinship is stated.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [69, 70],
    },
    {
      id: 'title-higgins',
      label: 'Higgins',
      detail:
        'Defendant in the derivative ejectment abstract concerning the 200-acre title branch; no kinship or identity with the mapped mill owner is established.',
      kind: 'person',
      recordGroup: 'highland-creek',
      referenceIds: [70],
    },
    {
      id: 'court-1812-ejectment',
      label: 'Wardlow and Jones v. Higgins',
      detail:
        'Derivative abstract of the 1812 ejectment case naming the plaintiffs, defendant, acreage, and Edmond Rice patent; it does not directly identify Highland Creek.',
      kind: 'record',
      recordGroup: 'highland-creek',
      referenceIds: [70],
    },
  ],
  edges: [
    {
      id: 'recorded-thomas-ann',
      from: 'will-thomas-senior',
      to: 'will-ann',
      relationship: 'wife',
      connectionKind: 'spouse',
      evidenceState: 'recorded',
      statement: 'Thomas’s will names Ann as his wife.',
      limitation: 'The citation does not supply Ann’s maiden name.',
      referenceIds: [18],
    },
    ...[
      'will-thomas',
      'will-joseph',
      'will-samuel',
      'will-isaac',
      'will-george',
      'will-john',
      'will-elizabeth',
      'will-jane',
      'will-rachel-worthington',
      'will-sarah-prescot',
      'will-mary',
    ].map((to) => ({
      id: `recorded-thomas-child-${to.replace('will-', '')}`,
      from: 'will-thomas-senior',
      to,
      relationship: 'parent and child',
      connectionKind: 'parent-child' as const,
      evidenceState: 'recorded' as const,
      statement:
        'The 1779 will names this person as Thomas Meason senior’s child.',
      limitation:
        'The will establishes the stated relationship but not identity with similarly named people in later records.',
      referenceIds: [18],
    })),
    {
      id: 'recorded-thomas-william',
      from: 'logan-thomas',
      to: 'logan-william',
      relationship: 'father and son',
      connectionKind: 'parent-child',
      evidenceState: 'recorded',
      statement:
        'The 1795 deed calls William the eldest son of Thomas Mason of Logan County; the 1811 conveyance again identifies William as a son of Thomas Mason, deceased.',
      limitation:
        'Only the 1795 deed says “eldest.” Neither deed names Thomas’s other children or identifies him with the 1779 will’s Thomas.',
      referenceIds: [22, 69],
    },
    {
      id: 'recorded-joseph-gift-william',
      from: 'highland-joseph',
      to: 'logan-william',
      relationship: 'deed of gift',
      connectionKind: 'deed-property-transfer',
      evidenceState: 'recorded',
      statement:
        'Joseph conveyed 200 acres from the Highland Creek tract to William.',
      limitation:
        'The deed does not state Joseph’s relationship to William or Thomas.',
      referenceIds: [22],
    },
    ...['highland-john', 'highland-samuel-brother'].map((to) => ({
      id: `recorded-joseph-brother-${to.replace('highland-', '')}`,
      from: 'highland-joseph',
      to,
      relationship: 'brothers',
      connectionKind: 'sibling' as const,
      evidenceState: 'recorded' as const,
      statement:
        'The 1813 collateral-heir deed directly identifies this man as Joseph’s brother.',
      limitation: 'The deed does not itself identify their parents.',
      referenceIds: [68],
    })),
    ...[
      'highland-isaac-john-son',
      'highland-caty-randal',
      'highland-polly-devore',
      'highland-betty-cherry',
    ].map((to) => ({
      id: `recorded-john-child-${to.replace('highland-', '')}`,
      from: 'highland-john',
      to,
      relationship: 'parent and child',
      connectionKind: 'parent-child' as const,
      evidenceState: 'recorded' as const,
      statement:
        'The collateral-heir deed identifies this person as John Mason’s child.',
      limitation:
        'The deed does not provide a complete biography for either person.',
      referenceIds: [68],
    })),
    {
      id: 'recorded-samuel-dorsey',
      from: 'highland-samuel-brother',
      to: 'highland-dorsey',
      relationship: 'father and son',
      connectionKind: 'parent-child',
      evidenceState: 'recorded',
      statement: 'The collateral-heir deed identifies Dorsey as Samuel’s son.',
      limitation:
        'The deed does not provide a complete biography for either person.',
      referenceIds: [68],
    },
    ...[
      ['highland-isaac-heir', 68],
      ['highland-elizabeth-hite', 68],
      ['highland-benjamin', 67],
    ].map(([to, referenceId]) => ({
      id: `recorded-joseph-heir-${String(to).replace('highland-', '')}`,
      from: 'highland-joseph',
      to: String(to),
      relationship: 'heir at law',
      connectionKind: 'heirship-unknown-degree' as const,
      evidenceState: 'recorded' as const,
      statement: 'The deed names this person among Joseph’s heirs at law.',
      limitation:
        'Heir status does not by itself identify the person as Joseph’s child or state the exact degree of kinship.',
      referenceIds: [Number(referenceId)],
    })),
    {
      id: 'recorded-benjamin-to-james',
      from: 'highland-benjamin',
      to: 'highland-james-grantee',
      relationship: 'conveyed interest to',
      connectionKind: 'deed-property-transfer',
      evidenceState: 'recorded',
      statement:
        'Benjamin conveyed his undivided Highland Creek interest to James Meason.',
      limitation:
        'The conveyance does not establish a kinship relationship between Benjamin and James.',
      referenceIds: [67],
    },
    ...[
      ['will-joseph', 'highland-joseph', 'Joseph'],
      ['will-john', 'highland-john', 'John'],
      ['will-samuel', 'highland-samuel-brother', 'Samuel'],
      ['will-thomas', 'logan-thomas', 'Thomas'],
    ].map(([from, to, name]) => ({
      id: `synthesis-${name.toLowerCase()}`,
      from,
      to,
      relationship: 'possible same person',
      connectionKind: 'identity' as const,
      evidenceState: 'identity-synthesis' as const,
      statement: `The recurring ${name} identity fits the combined will and Highland Creek family structure.`,
      limitation:
        'No cited record explicitly merges these record-group identities; the match remains a reasoned synthesis.',
      referenceIds: name === 'Thomas' ? [18, 22] : [18, 68],
    })),
    {
      id: 'hypothesis-thomas-benjamin',
      from: 'logan-thomas',
      to: 'highland-benjamin',
      relationship: 'possible father and son',
      connectionKind: 'open-parentage-hypothesis',
      evidenceState: 'hypothesis',
      statement:
        'Benjamin may have inherited through Thomas’s branch and may have been William’s younger brother.',
      limitation:
        'No reviewed record names Benjamin as Thomas’s son or William’s brother. This edge must not appear as a documented pedigree relationship.',
      referenceIds: [18, 22, 67, 68],
    },
    ...[
      ['highland-isaac-heir', 'Isaac Meason'],
      ['highland-elizabeth-hite', 'Elizabeth Hite'],
    ].map(([from, name]) => ({
      id: `recorded-${from.replace('highland-', '')}-to-samuel`,
      from,
      to: 'highland-samuel-grantee',
      relationship: 'conveyed inherited share to',
      connectionKind: 'deed-property-transfer' as const,
      evidenceState: 'recorded' as const,
      statement: `${name} conveyed an inherited share in Joseph’s Highland Creek tract to Samuel Meason of Claiborne County.`,
      limitation:
        'The transfer establishes a property transaction, not kinship with the grantee or the exact degree of the grantor’s kinship to Joseph.',
      referenceIds: [68],
    })),
    ...[
      {
        to: 'title-james-wardlow',
        name: 'James C. Wardlow',
        referenceIds: [69, 70],
      },
      {
        to: 'title-leonard-jones',
        name: 'Leonard Jones',
        referenceIds: [69],
      },
    ].map(({ to, name, referenceIds }) => ({
      id: `recorded-william-to-${to.replace('title-', '')}`,
      from: 'logan-william',
      to,
      relationship: 'conveyed title interest to',
      connectionKind: 'deed-property-transfer' as const,
      evidenceState: 'recorded' as const,
      statement: `William Mason conveyed his interest in the 200 Highland Creek acres to ${name}.`,
      limitation:
        'The deed establishes a title transfer and does not state a kinship relationship between the parties.',
      referenceIds,
    })),
    ...[
      [
        'highland-joseph',
        'held the 1,000-acre Highland Creek tract from which the later interests descend',
        [22, 67, 68],
      ],
      [
        'logan-william',
        'held a 200-acre interest carved from the Highland Creek tract',
        [22, 69],
      ],
      [
        'highland-benjamin',
        'held an undivided inherited interest in the Highland Creek tract',
        [67],
      ],
      [
        'highland-james-grantee',
        'received Benjamin’s undivided Highland Creek interest',
        [67],
      ],
    ].map(([from, relationship, referenceIds]) => ({
      id: `recorded-${String(from).replace(/^(highland|logan)-/, '')}-tract-association`,
      from: String(from),
      to: 'highland-tract',
      relationship: String(relationship),
      connectionKind: 'land-title-association' as const,
      evidenceState: 'recorded' as const,
      statement: `The cited record shows that this person ${String(relationship)}.`,
      limitation:
        'This land or title association does not add a kinship relationship.',
      referenceIds: referenceIds as number[],
    })),
    ...[
      [
        'title-edmond-rice',
        'patentee of the 1,000-acre parent tract described in the derivative case abstract',
      ],
      [
        'title-james-wardlow',
        'plaintiff asserting the 200-acre title branch in the ejectment abstract',
      ],
      [
        'title-leonard-jones',
        'plaintiff asserting the 200-acre title branch in the ejectment abstract',
      ],
      [
        'title-higgins',
        'defendant in the ejectment abstract concerning the 200-acre title branch',
      ],
    ].map(([from, relationship]) => ({
      id: `recorded-${from.replace('title-', '')}-tract-association`,
      from,
      to: 'highland-tract',
      relationship,
      connectionKind: 'land-title-association' as const,
      evidenceState: 'identity-synthesis' as const,
      statement: `The derivative 1812 case abstract identifies this person as a ${relationship}; its 1,000-acre patent and 200-acre dispute strongly match, but do not directly identify, the Highland Creek title branch.`,
      limitation:
        'The abstract is derivative, does not print “Highland Creek,” does not resolve title, and establishes no kinship. It also does not identify Higgins with the person associated with the mapped mill.',
      referenceIds: [70],
    })),
    ...[
      [
        'title-james-wardlow',
        'plaintiff',
        'Named as a plaintiff in Wardlow and Jones v. Higgins.',
      ],
      [
        'title-leonard-jones',
        'plaintiff',
        'Named as a plaintiff in Wardlow and Jones v. Higgins.',
      ],
      [
        'title-higgins',
        'defendant',
        'Named as the defendant in Wardlow and Jones v. Higgins.',
      ],
      [
        'title-edmond-rice',
        'patentee named for the land',
        'Named as the patentee of the 1,000 acres containing the disputed 200 acres.',
      ],
    ].map(([from, relationship, statement]) => ({
      id: `recorded-${from.replace('title-', '')}-court-role`,
      from,
      to: 'court-1812-ejectment',
      relationship,
      connectionKind: 'legal-record-role' as const,
      evidenceState: 'recorded' as const,
      statement,
      limitation:
        'This role is recorded in a derivative case abstract, not the original case file; it does not directly identify the disputed land as Highland Creek or establish kinship.',
      referenceIds: [70],
    })),
  ],
  timeline: [
    {
      id: 'highland-1779-will',
      date: '1779',
      title: 'Thomas Meason senior names his family',
      detail:
        'The will records wife Ann and eleven children, including Thomas, Joseph, John, and Samuel; Benjamin is not named.',
      referenceIds: [18],
    },
    {
      id: 'highland-1795-gift',
      date: '2 February 1795',
      title: 'Joseph gives William part of the tract',
      detail:
        'The deed calls William the eldest son of Thomas Mason of Logan County and links him to 200 Highland Creek acres.',
      referenceIds: [22],
    },
    {
      id: 'highland-1811-sale',
      date: '27 April 1811',
      title: 'William conveys the 200-acre branch',
      detail:
        'William Mason of Ohio, identified again as Thomas Mason’s son, conveyed his Highland Creek interest to two Henderson County men, including Leonard Jones; the later case record resolves the other grantee as James C. Wardlow.',
      referenceIds: [69, 70],
    },
    {
      id: 'highland-1812-ejectment',
      date: '11 March 1812',
      title: 'The title branch reaches court',
      detail:
        'A derivative case abstract records Wardlow and Jones v. Higgins over 200 acres within Edmond Rice’s 1,000-acre patent, linking the title branch to an ejectment dispute.',
      referenceIds: [70],
    },
    {
      id: 'highland-1813-collateral',
      date: '14 May 1813',
      title: 'Joseph’s collateral heirs convey their shares',
      detail:
        'The deed names Joseph’s brothers John and Samuel and children inheriting through those branches.',
      referenceIds: [68],
    },
    {
      id: 'highland-1813-benjamin',
      date: '7 July 1813',
      title: 'Benjamin conveys his undivided interest',
      detail:
        'Benjamin is directly called one of Joseph’s heirs at law, without any stated degree of kinship.',
      referenceIds: [67],
    },
  ],
  documents: [
    {
      id: 'benjamin-heir-deed',
      referenceId: 67,
      title: 'Benjamin Meason’s Highland Creek heir deed',
      pages: [
        {
          id: 'benjamin-heir-deed-72',
          sequence: 1,
          locator: 'DGS 8573278, image 72; manuscript pp. 106–107',
          description:
            'Opening of the recorded conveyance and identification of the parties and inherited tract.',
          rightsState: 'permission-required',
          providerUrl: filmUrl,
        },
        {
          id: 'benjamin-heir-deed-73',
          sequence: 2,
          locator: 'DGS 8573278, image 73; manuscript p. 108',
          description:
            'Continuation, acknowledgment, and recording of the conveyance.',
          rightsState: 'permission-required',
          providerUrl: filmUrl,
        },
      ],
    },
    {
      id: 'joseph-collateral-heirs-deed',
      referenceId: 68,
      title: 'Joseph Meason’s collateral-heirs deed',
      pages: [
        {
          id: 'joseph-collateral-heirs-deed-74',
          sequence: 1,
          locator: 'DGS 8573278, image 74; deed begins on manuscript p. 111',
          description:
            'Opening of the deed naming the inheritance transaction.',
          rightsState: 'permission-required',
          providerUrl: filmUrl,
        },
        {
          id: 'joseph-collateral-heirs-deed-75',
          sequence: 2,
          locator: 'DGS 8573278, image 75; manuscript pp. 112–113',
          description:
            'Continuation identifying Joseph’s sibling branches and collateral heirs.',
          rightsState: 'permission-required',
          providerUrl: filmUrl,
        },
        {
          id: 'joseph-collateral-heirs-deed-76',
          sequence: 3,
          locator: 'DGS 8573278, image 76; manuscript pp. 114–115',
          description:
            'Closing terms, acknowledgment, and recording of the conveyance.',
          rightsState: 'permission-required',
          providerUrl: filmUrl,
        },
      ],
    },
  ],
  publication,
};

export const genealogyReconstructions: readonly GenealogyReconstruction[] = [
  highlandCreekReconstruction,
];
