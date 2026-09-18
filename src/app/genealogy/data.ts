export type TreeNodeStatus = 'documented' | 'review' | 'unknown';

export interface PublicTreeNode {
  title: string;
  href: string;
  period: string;
  relationship: string;
  summary: string;
  status: TreeNodeStatus;
  statusLabel: string;
  referenceIds?: readonly number[];
  connectionToNext?: 'documented' | 'review';
}

export const publicTree: PublicTreeNode[] = [
  {
    title: 'Shannon Jeremiah Meason',
    href: '/genealogy/tree#shannon-jeremiah-meason',
    period: 'Present',
    relationship: 'Starting point',
    summary:
      'My birth name is Shannon Jeremiah Meason; I grew up as Andy Cohen after being adopted. This tree follows my biological Meason ancestry.',
    status: 'documented',
    statusLabel: 'Personal knowledge',
  },
  {
    title: 'Cynthia June Meason',
    href: '/genealogy/tree#cynthia-june-meason',
    period: '1958–1991',
    relationship: 'Mother',
    summary: 'The first named generation in my direct Meason line.',
    status: 'review',
    statusLabel: 'Family lineage',
  },
  {
    title: 'James Lawrence Meason',
    href: '/genealogy/tree#james-lawrence-meason-1934',
    period: '1934–1973',
    relationship: 'Grandfather',
    summary:
      'One of two successive generations carrying the James Lawrence Meason name.',
    status: 'review',
    statusLabel: 'Family lineage',
  },
  {
    title: 'James Lawrence Meason',
    href: '/genealogy/tree#james-lawrence-meason-1892',
    period: '1892–1949',
    relationship: 'Great-grandfather',
    summary: 'The earlier James Lawrence Meason generation in the direct line.',
    status: 'review',
    statusLabel: 'Family lineage',
  },
  {
    title: 'Franklin Meason',
    href: '/genealogy/tree#franklin-meason',
    period: '1850–1933',
    relationship: 'Second great-grandfather',
    summary: 'Son of George M. Meason and Martha Reed.',
    status: 'review',
    statusLabel: 'Family lineage',
  },
  {
    title: 'George M. Meason',
    href: '/genealogy/tree#george-m-meason',
    period: 'Birth year disputed · died 1887',
    relationship: 'Third great-grandfather',
    summary:
      'Four adult censuses and a descendant-held Bible say about 1810, while George’s marker says 1818. His marriage to Martha Reed is documented; the claim that Benjamin and Hannah were his parents is not.',
    status: 'review',
    statusLabel: 'Parentage under review',
    referenceIds: [25, 26, 30, 32, 33, 34],
    connectionToNext: 'review',
  },
  {
    title: 'Benjamin Meason',
    href: '/genealogy/tree#benjamin-meason',
    period: 'Born about 1776 · living in 1850',
    relationship: 'Claimed fourth great-grandfather',
    summary:
      'Benjamin’s 1801 marriage to Hannah Doom and his Kentucky-to-Missouri migration are supported by original records. His own life is documented; his relationship to George is not.',
    status: 'review',
    statusLabel: 'Relationship unproved',
    referenceIds: [1, 2, 11, 13, 23, 25],
    connectionToNext: 'review',
  },
  {
    title: 'Benjamin’s parents',
    href: '/genealogy/tree#benjamin-parents',
    period: 'Before c. 1776',
    relationship: 'Where the record ends',
    summary:
      'No parent has been proved. Several Thomas Meason candidates have been tested, but the records do not yet establish the relationship repeated in online trees.',
    status: 'unknown',
    statusLabel: 'Active investigation',
    referenceIds: [18, 19, 20, 21, 22],
  },
];

export const chronology = [
  {
    year: '1800–1804',
    place: 'Nelson County, Kentucky',
    title: 'An original-record foothold',
    detail:
      'Tax returns place Benjamin in Nelson County in every year from 1800 through 1804. The 1803 and 1804 returns also record two enslaved people in his taxable household—a part of this family history that should not be omitted. Other Mason and Mayson households appear nearby, but proximity does not establish kinship.',
    referenceIds: [4],
  },
  {
    year: '1801',
    place: 'Nelson County, Kentucky',
    title: 'Benjamin and Hannah marry',
    detail:
      'An original bond dated August 18 says Benjamin Mason and Hannah Doom were both over 21, ruling out the often-copied 1783 birth year for Hannah. The county register records their marriage on August 27.',
    referenceIds: [2, 3],
  },
  {
    year: '1802',
    place: 'Nelson County, Kentucky',
    title: 'A signature and an associate network',
    detail:
      'Benjamin signs a guardian bond as “Benjn Meason” alongside members of the Weller, Hubbard, and Langley network. The record establishes presence, not kinship.',
    referenceIds: [5],
  },
  {
    year: '1811–1817',
    place: 'Bardstown area, Kentucky',
    title: 'Public and church life',
    detail:
      'Records place Benjamin in civic and Baptist networks. In 1811 the annual names him in association work and strongly indicates that “B. Mason” represented Mill Creek. In October 1815 he was seated when the new Salem Church at Bardstown entered the association, then represented Salem again in 1816. Other messengers were selected in 1817; that is not evidence he left the church.',
    referenceIds: [7, 8, 9, 24, 35],
  },
  {
    year: '1820',
    place: 'Shelby County, Kentucky',
    title: 'The family moves east',
    detail:
      'The accepted census household fits Benjamin, Hannah, and their growing family. A same-name Nelson County household belongs to someone else.',
    referenceIds: [10],
  },
  {
    year: '1829–1835',
    place: 'Ralls and Monroe Counties, Missouri',
    title: 'A documented Missouri migration',
    detail:
      'The 1829 patent identifies Benjamin as a Ralls County resident. A separate 1835 patent grants him Monroe County land, where the 1840 census later records his household.',
    referenceIds: [11, 12, 13, 14],
  },
  {
    year: '1835/36',
    place: 'Monroe County, Missouri',
    title: 'A remembered church beginning',
    detail:
      'An eyewitness recollection written in 1884 places Benjamin and his wife among Union Christian Church’s founders in May 1835 or 1836 and says Benjamin served as an elder.',
    referenceIds: [16],
  },
  {
    year: '1847–1850',
    place: 'Woodlawn, Monroe County, Missouri',
    title: 'Postmaster and household head',
    detail:
      'Federal registers name Benjamin as Woodlawn postmaster in 1847 and 1849, and the 1850 census records his household in Monroe County.',
    referenceIds: [1, 15],
  },
  {
    year: 'After 1850',
    place: 'Monroe County, Missouri',
    title: 'An estate and burial lead awaits the original',
    detail:
      'A later family account reports that Benjamin’s 1853 will directed burial beside Hannah on a Monroe County farm. The original Will Book B entry remains restricted, and neither its wording, the farm, nor the burial ground has been verified.',
    referenceIds: [23, 27, 29],
  },
];

export const georgeChronology = [
  {
    year: '1837',
    place: 'Clark County, Missouri',
    title: 'A first marriage, but no parent named',
    detail:
      'A recorded minister’s return establishes George M. Meason’s marriage to Elizabeth Hay on November 16. It corrects a copied date and county, but contains no age, parent, guardian, witness, or consent.',
    referenceIds: [31],
  },
  {
    year: '1840',
    place: 'Clark County, Missouri',
    title: 'George marries Martha Reed',
    detail:
      'A second recorded return establishes their October 27 marriage and says both lived in Clark County. The original names her only as Martha Reed, without the middle initial repeated in later trees.',
    referenceIds: [32],
  },
  {
    year: '1850–1887',
    place: 'Missouri to Texas',
    title: 'One life, two birth traditions',
    detail:
      'Four adult censuses consistently imply birth about 1810, and a descendant-held Bible repeats 1810. George’s photographed marker says 1818. The conflict remains unresolved—and neither chronology names his parents.',
    referenceIds: [25, 26, 33, 34],
  },
];

export const candidateAssessments = [
  {
    name: 'Benjamin as George’s father',
    status: 'Plausible, not proved',
    detail:
      'George and Benjamin share a coherent Kentucky-to-Missouri pattern, but no reviewed record calls George a son or heir. Four adult censuses and a descendant-held Bible say 1810; his marker says 1818. The earlier chronology keeps the household-slot theory plausible without proving it.',
    referenceIds: [1, 25, 26, 30, 33, 34],
  },
  {
    name: 'Thomas Meason senior',
    status: 'Strongly disfavored',
    detail:
      'His 1779 will names eleven children but not Benjamin. That omission weighs strongly against him as Benjamin’s direct father, but a will need not name every child and is not categorical proof.',
    referenceIds: [18],
  },
  {
    name: 'The Hempfield Thomas',
    status: 'Strongly disfavored',
    detail:
      'His will explicitly identifies his six youngest children. Benjamin—who would have been a child—is not among them.',
    referenceIds: [19],
  },
  {
    name: 'The 1788 Nelson County Thomas',
    status: 'Still open',
    detail:
      'An original 1788 deed places Thomas Meason in Nelson County. In 1795, Thomas Mason of Logan County sold the same 300-acre Rough Creek tract. The exact-property match strengthens the identity trail, but neither deed names Benjamin.',
    referenceIds: [20, 21],
  },
  {
    name: 'Another Mason or Meason family',
    status: 'Increasingly important',
    detail:
      'The records expose several distinct same-name families and men later combined in online trees. Benjamin may belong to a different line altogether.',
    referenceIds: [18, 19, 22],
  },
];

export const evidenceLedger = [
  {
    record: '1801 marriage bond',
    establishes:
      'Benjamin Mason and Hannah Doom intended to marry and were both over 21.',
    limit: 'It names no parent, guardian, residence, or family relationship.',
    referenceIds: [2],
  },
  {
    record: 'Nelson tax and civic records',
    establishes:
      'Benjamin’s Nelson County presence from 1800 through 1804 and a recurring network of associates.',
    limit:
      'People who signed bonds or served beside Benjamin cannot be treated as relatives without additional evidence.',
    referenceIds: [4, 5, 6, 7],
  },
  {
    record: '1829 and 1835 land patents',
    establishes:
      'The 1829 patent explicitly identifies Ralls County residence; the 1835 patent establishes Monroe County land ownership, followed by a Monroe household in 1840.',
    limit:
      'Land ownership alone does not prove residence, place of origin, parentage, or a relationship to neighboring patentees.',
    referenceIds: [11, 13, 14],
  },
  {
    record: 'Thomas Meason wills',
    establishes:
      'Two prominent Thomas candidates named extensive groups of children without naming Benjamin.',
    limit:
      'Negative evidence can weaken candidates, but it does not identify the correct father.',
    referenceIds: [18, 19],
  },
  {
    record: '1788–1795 Rough Creek deeds',
    establishes:
      'The exact 300-acre tract passed from a Nelson County Thomas Meason to a Logan County Thomas Mason identity trail.',
    limit:
      'Neither deed names Benjamin, and the records do not independently identify the seller as Thomas born in 1755.',
    referenceIds: [20, 21],
  },
  {
    record: '1795 Logan County deed',
    establishes:
      'William Mason was expressly the eldest son of a Thomas Mason of Logan County.',
    limit:
      'It does not establish that this Thomas sold the Rough Creek tract or that Benjamin was another son.',
    referenceIds: [22],
  },
  {
    record: '1825 Jacob Doom heirs deed',
    establishes:
      'Hannah, wife of Benjamin Mason, was formerly a Doom and was an heir or representative of Jacob Doom.',
    limit:
      'The deed does not literally call Hannah a daughter or identify her mother.',
    referenceIds: [17],
  },
  {
    record: 'George’s census and grave marker',
    establishes:
      'George M. Meason’s adult census sequence and a descendant-held Bible give birth about 1810; his Texas marker gives 1818, while the Bible note and marker agree on an 1887 death.',
    limit:
      'None of these sources names George’s parents. The Bible lacks a title page and ownership chain, and the marker’s informant and erection date are unknown.',
    referenceIds: [25, 26, 33, 34],
  },
  {
    record: 'Public-tree citation audit',
    establishes:
      'The disputed relationships are widely repeated: all 25 sampled George profiles named Benjamin and Hannah, and all ten sampled Thomas profiles attached Benjamin.',
    limit:
      'None exposed a record stating either parent-child relationship. Repetition across trees is not independent corroboration.',
    referenceIds: [30],
  },
];

export const researchBlockers = [
  {
    title: 'The decisive records are not remotely accessible',
    detail:
      'Benjamin’s reported will and key probate volumes remain restricted to archive or affiliate-library access. Search results and derivative summaries cannot substitute for the original estate images.',
    referenceIds: [23],
  },
  {
    title: 'The records often stop one sentence short',
    detail:
      'Bonds, deeds, church minutes, and land patents place Benjamin precisely, but the records reviewed so far do not state who his parents were.',
    referenceIds: [2, 5, 8, 9, 11, 13, 18, 19, 20, 21, 22],
  },
  {
    title: 'Name matches are unusually dangerous',
    detail:
      'Benjamin, Thomas, William, Joseph, Mason, and Meason recur across distinct households and families. County and surname alone are not enough.',
    referenceIds: [4, 18, 19, 22],
  },
  {
    title: 'The inherited tree needs record-by-record review',
    detail:
      'A controlled citation audit found the same relationships repeated across 35 sampled profiles without a relationship-specific source. Original records also separate incompatible same-name households from the target family.',
    referenceIds: [1, 10, 12, 14, 18, 19, 30],
  },
];

export const nextResearchSteps = [
  {
    title: 'Recover Benjamin’s Missouri estate',
    detail:
      'Obtain Monroe Will Book B and the connected probate, settlement, inventory, and bond records.',
    referenceIds: [23],
  },
  {
    title: 'Retrieve the Mill Creek church article',
    detail:
      'Obtain the complete March 1990 article, read its notes and source description, and follow only a concrete lead into admissions, dismissals, letters, membership, or family entries.',
    referenceIds: [36],
  },
  {
    title: 'Read three publications from Benjamin’s death period',
    detail:
      'Inspect the October and November 1853 Christian Evangelist issues and the surviving 23 November 1853 Paris Mercury issue for a notice, elder’s sketch, survivors, or estate announcement.',
    referenceIds: [43, 44, 45],
  },
];
