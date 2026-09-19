export type TreeNodeStatus = 'documented' | 'indirect' | 'review' | 'unknown';

export interface PublicTreeNode {
  title: string;
  href: string;
  period: string;
  relationship: string;
  summary: string;
  status: TreeNodeStatus;
  statusLabel: string;
  referenceIds?: readonly number[];
  connectionToNext?: 'documented' | 'indirect' | 'review';
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
    statusLabel: 'Family relationship',
  },
  {
    title: 'James Lawrence Meason',
    href: '/genealogy/tree#james-lawrence-meason-1934',
    period: '1934–1973',
    relationship: 'Grandfather',
    summary:
      'One of two successive generations carrying the James Lawrence Meason name.',
    status: 'documented',
    statusLabel: 'Parents named in original record',
    referenceIds: [56],
  },
  {
    title: 'James Lawrence Meason',
    href: '/genealogy/tree#james-lawrence-meason-1892',
    period: '1892–1949',
    relationship: 'Great-grandfather',
    summary: 'The earlier James Lawrence Meason generation in the direct line.',
    status: 'documented',
    statusLabel: 'Parents named in original record',
    referenceIds: [56, 57],
  },
  {
    title: 'Franklin Meason',
    href: '/genealogy/tree#franklin-meason',
    period: '1850–1933',
    relationship: 'Second great-grandfather',
    summary:
      'Recorded as Frank Meason in his death certificate, which names George M. Meason and Martha Reed as his parents.',
    status: 'documented',
    statusLabel: 'Parents named in original record',
    referenceIds: [57, 58],
  },
  {
    title: 'George M. Meason',
    href: '/genealogy/tree#george-m-meason',
    period: 'Birth year disputed · died 1887',
    relationship: 'Third great-grandfather',
    summary:
      'George’s own records lead to a wider family network: his son called elder James L. Meason an uncle; James named Benjamin as his father; and Benjamin’s proved son-in-law held land with George and James. I accept George’s place in Benjamin’s family as a high-confidence indirect conclusion.',
    status: 'indirect',
    statusLabel: 'High-confidence indirect conclusion',
    referenceIds: [25, 28, 33, 59, 60, 61, 62, 63, 64],
    connectionToNext: 'indirect',
  },
  {
    title: 'Benjamin Meason',
    href: '/genealogy/tree#benjamin-meason',
    period: 'Born about 1776 · living in 1850',
    relationship: 'Fourth great-grandfather · working conclusion',
    summary:
      'Benjamin’s life is documented in Kentucky and Missouri. His place in my direct line is an accepted working conclusion built from converging marriage, land, household, occupational, census, and death records—not from a single record that names George as his son.',
    status: 'indirect',
    statusLabel: 'Direct-line placement accepted',
    referenceIds: [1, 2, 11, 13, 23, 28, 33, 59, 60, 61, 62, 63, 64],
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
    title: 'A foothold in the original records',
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
      'Records place Benjamin in civic and Baptist networks. In 1811 the annual names him in association work and strongly indicates that “B. Mason” represented Mill Creek. In October 1815 he was seated when the new Salem Church at Bardstown entered the association; a mission receipt the next day names “Benj. Meason” of Nelson County. He represented Salem again in 1816. Other messengers were selected in 1817; that is not evidence he left the church.',
    referenceIds: [7, 8, 9, 24, 35, 50],
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
      'A later family account reports that Benjamin’s 1853 will directed burial beside Hannah on a Monroe County farm. The original Will Book B entry remains restricted, and my search of the deed index did not identify the reported farm or burial ground.',
    referenceIds: [23, 27, 28, 29],
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

export const familyNetworkScenes = [
  {
    year: '1846',
    place: 'Monroe County, Missouri',
    title: 'Laura’s marriage gives the family a named daughter',
    detail:
      'When preacher Henry Thomas recorded the marriage of John C. Kippers and Laura Ann Meason, he identified Laura as the daughter of Benjamin Meason. That brief phrase turns Laura from a nearby surname into a documented member of Benjamin’s family—and John into Benjamin’s son-in-law.',
    referenceIds: [61],
  },
  {
    year: '1850–1860',
    place: 'Households and land around Granville',
    title: 'The same people keep gathering around one another',
    detail:
      'Benjamin and Hannah’s 1850 household included James and four Hollingsworth children. Five years later, John C. Kippers, George M. Meason, and James L. Meason acquired Section 11 land together. In 1860, James, the Parker deed grantors, the Kippers, and those Hollingsworth siblings appear across two consecutive census pages. No record labels every relationship, but this no longer looks like a chance collection of names.',
    referenceIds: [1, 28, 61, 62],
  },
  {
    year: '1860–1880',
    place: 'Monroe County, Missouri',
    title: 'James builds a life around iron, grain, and timber',
    detail:
      'James appears first as a blacksmith, then as a miller with a crew of mill laborers, and finally as the proprietor of a sawmill, boarding beside two men who worked there. The steady ages, Kentucky birthplace, county, middle initial, and changing trade create a remarkably coherent thirty-year identity—and give the records the texture of an actual working life.',
    referenceIds: [62, 63, 64],
  },
  {
    year: '1880–1919',
    place: 'Missouri to Texas',
    title: 'Two branches meet again in Texas',
    detail:
      'George’s son James R. and his wife Eva moved into the Texas story. By 1900, elder James L. was living in their household and was recorded as James R.’s uncle. When elder James died in 1919, J. R. Meason supplied the information naming Benjamin as his father. The records never write the whole family sentence in one place; across decades, they assemble it.',
    referenceIds: [33, 59, 60, 64],
  },
];

export const researchThreads = [
  {
    name: 'Benjamin as George’s father',
    category: 'Working lineage conclusion',
    status: 'High confidence · indirect evidence',
    detail:
      'I now accept George as Benjamin’s son in my working tree. The conclusion rests on Laura’s documented relationship to Benjamin; her husband’s land dealings with George and James L.; the continuing Kipper, Hollingsworth, Parker, and James household network; James’s Missouri identity and mill career; and the Texas uncle and father statements. No single record says “George, son of Benjamin,” so the conclusion remains explicitly indirect and open to further testing.',
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
  },
  {
    name: 'Thomas Meason senior',
    category: 'Parent candidate',
    status: 'Strongly disfavored',
    detail:
      'His 1779 will names eleven children but not Benjamin. That omission weighs strongly against him as Benjamin’s direct father, but a will need not name every child and is not categorical proof.',
    referenceIds: [18],
  },
  {
    name: 'The Hempfield Thomas',
    category: 'Parent candidate',
    status: 'Strongly disfavored',
    detail:
      'His will explicitly identifies his six youngest children. Benjamin—who would have been a child—is not among them.',
    referenceIds: [19],
  },
  {
    name: 'The 1788 Nelson County Thomas',
    category: 'Parent candidate',
    status: 'Still open',
    detail:
      'An original 1788 deed places Thomas Meason in Nelson County. In 1795, Thomas Mason of Logan County sold the same 300-acre Rough Creek tract. The exact-property match strengthens the identity trail, but neither deed names Benjamin.',
    referenceIds: [20, 21],
  },
  {
    name: 'Another Mason or Meason family',
    category: 'Alternate line',
    status: 'Increasingly important',
    detail:
      'The records expose several distinct same-name families and men later combined in online trees. Benjamin may belong to a different line altogether.',
    referenceIds: [18, 19, 22],
  },
  {
    name: 'Benjamin Thomas “Uncle Ben” Meason',
    category: 'Naming clue',
    status: 'Full name confirmed · naming theory open',
    detail:
      'An original 1940 Texas death certificate spells out Benjamin Thomas Meason and names his parents as Geo M Meason and Martha Reid; his daughter Mrs. L. P. Glover was the informant. The record resolves the full-name question and strongly corroborates his placement in George and Martha’s family. The paired name remains only an indirect clue: it does not reveal whom Thomas honored or prove either disputed ancestral relationship.',
    referenceIds: [33, 53, 54, 55],
  },
  {
    name: 'The elder James Lawrence Meason',
    category: 'Collateral family line',
    status: 'Missouri identity strong · Texas bridge still open',
    detail:
      'The records now follow a Kentucky-born James L. from Benjamin’s 1850 household through the 1855 deed, an 1860 blacksmith household, an 1870 mill, and an 1880 sawmill. The same occupation and family network reappear around the elder James in Texas. The remaining gap is his move after 1880—not his place as a richly documented collateral witness to the family story.',
    referenceIds: [1, 28, 33, 59, 60, 62, 63, 64],
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
      'Their omission makes these candidates less likely, but it does not identify the correct father.',
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
    record: 'Jacob Doom will and heirs’ deed',
    establishes:
      'Jacob’s 1798 will names his wife Abigail and executor Jacob Yoder. The 1825 deed later identifies Hannah, wife of Benjamin Mason, as formerly a Doom and as an heir or representative of Jacob Doom.',
    limit:
      'The will handles most children as an unnamed class, so Hannah’s omission is neutral. The deed does not literally call her a daughter or identify her mother.',
    referenceIds: [2, 17, 49],
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
    record: 'Benjamin Thomas Meason death certificate',
    establishes:
      'The original 1940 Texas certificate spells out Benjamin Thomas Meason and explicitly names Geo M Meason and Martha Reid as his parents.',
    limit:
      'His daughter supplied the biographical information decades after his birth. The certificate does not name George’s parents, identify a Thomas namesake, establish the George-to-Benjamin relationship on its own, or identify Benjamin’s parents.',
    referenceIds: [55],
  },
  {
    record: 'Three direct-line death certificates',
    establishes:
      'The 1973 certificate names Lawrence Meason and Mary Sledge as Jimmy’s parents; the 1949 certificate names Frank Meason and Nancy A. Huffines as the older James Lawrence Meason’s parents; and the 1933 certificate names George Mason and Martha Reed as Frank Meason’s parents. Together they form a linked set of original records from Jimmy back to George and Martha.',
    limit:
      'The parent details were supplied by informants after each person’s birth, so they are strong relationship evidence rather than birth-time proof. Frank’s certificate calls him Frank, not Franklin, and its spelling of names and places still needs to be compared with other records.',
    referenceIds: [56, 57, 58],
  },
  {
    record: 'The Laura–Kippers–James family network',
    establishes:
      'Laura’s marriage return directly names Benjamin as her father. Her husband later held land with George and James L.; connected households preserve the same Kipper, Hollingsworth, Parker, and Meason network; and James’s records continue through Missouri before the Texas uncle and father statements.',
    limit:
      'The records do not literally call Laura, George, and James siblings or state that George was Benjamin’s son. The conclusion depends on the combined evidence, and James’s post-1880 move from Missouri to Texas remains undocumented.',
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
  },
  {
    record: 'What the public trees cite',
    establishes:
      'The disputed relationships are widely repeated: all 25 sampled George profiles named Benjamin and Hannah, and all ten sampled Thomas profiles attached Benjamin.',
    limit:
      'None exposed a record stating either parent-child relationship. Repetition across trees is not independent corroboration.',
    referenceIds: [30],
  },
];

export const researchBlockers = [
  {
    title: 'The highest-value records are not remotely accessible',
    detail:
      'Benjamin’s reported will and key probate volumes remain restricted to archive or affiliate-library access. Search results and derivative summaries cannot substitute for the original estate images.',
    referenceIds: [23, 52],
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
      'I checked the citations on 35 public profiles and found the same relationships repeated without a source that actually stated them. Original records also separate incompatible same-name households from the family I am tracing.',
    referenceIds: [1, 10, 12, 14, 18, 19, 30],
  },
];

export const nextResearchSteps = [
  {
    title: 'Bridge James’s move from Missouri to Texas',
    detail:
      'The Missouri identity is now strong through his 1880 sawmill household. I am looking for the land sale, tax departure, newspaper notice, directory, probate record, or other trace that follows James into the 1900 Texas household. The complete 1860 Book R deed and earlier Parker conveyance may also clarify his Section 11 property story.',
    referenceIds: [28, 59, 60, 62, 63, 64],
  },
  {
    title: 'Await Benjamin’s Missouri estate records',
    detail:
      'I submitted separate Missouri Archives requests for Benjamin’s full recorded will and his connected estate proceedings. Both are awaiting a response; the next step is to review the returned records, not send duplicate requests.',
    referenceIds: [23],
  },
  {
    title: 'Await the Mill Creek church article',
    detail:
      'I requested the complete March 1990 article from the Nelson County Genealogical Roundtable. When it arrives, I will read its notes and follow only a concrete lead into admissions, dismissals, letters, membership, or family entries.',
    referenceIds: [36, 52],
  },
  {
    title: 'Reach three access-limited publications',
    detail:
      'The October and November 1853 Christian Evangelist issue records and the surviving 23 November 1853 Paris Mercury issue are identified, but their interiors remain inaccessible through the tested public routes. They still need inspection for a notice, elder’s sketch, survivors, or estate announcement.',
    referenceIds: [43, 44, 45],
  },
];

export const latestResearchUpdates = [
  {
    status: 'Direct line strengthened',
    title: 'Three certificates now support the line below George',
    detail:
      'Original Texas death certificates name the parents of Jimmy, the older James Lawrence Meason, and Frank Meason. Read together, they strengthen the documented path from Jimmy through James and Frank to George M. Meason and Martha Reed.',
    referenceIds: [56, 57, 58],
  },
  {
    status: 'Working conclusion advanced',
    title: 'The family network now carries the line to Benjamin',
    detail:
      'Laura’s original marriage return, the corrected Kippers deed, the 1860 household cluster, James’s mill career, and the Texas uncle and father statements now converge. I accept George as Benjamin’s son in my working tree as a high-confidence indirect conclusion while continuing to test the missing estate and migration records.',
    referenceIds: [1, 28, 33, 59, 60, 61, 62, 63, 64],
  },
  {
    status: 'Requests pending',
    title: 'Three targeted requests are awaiting replies',
    detail:
      'I submitted two Missouri Archives requests covering Benjamin’s will and estate proceedings and a third request for the 1990 Mill Creek church article. I have not yet received the records.',
    referenceIds: [23, 36, 52],
  },
  {
    status: 'Access limited',
    title: 'The death-period publications remain unread',
    detail:
      'I could not download the two Christian Evangelist issue files, and the surviving Paris Mercury issue is available on microfilm rather than freely online. I have not been able to read them, so they cannot yet tell us whether a notice exists.',
    referenceIds: [43, 44, 45],
  },
  {
    status: 'No tree change',
    title: 'The Nelson court-record gap was tested',
    detail:
      'I searched the available handwriting-recognition results for 1798–1802 and found no entry connecting Benjamin to the proposed Meason relatives. I did not read every page, so this does not prove that no such entry exists.',
    referenceIds: [51],
  },
];
