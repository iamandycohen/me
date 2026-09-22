import type { Story } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const stories = [
  {
    id: 'joseph-boat',
    number: '01',
    title: 'A deed out of reach',
    shortTitle: 'Joseph’s boat',
    period: '1799–1813',
    summary:
      'Joseph Meason died aboard a riverboat after asking for a deed no one could reach. Fourteen years later, Benjamin and other relatives conveyed claimed interests in the Highland Creek land.',
    opening: [
      'On 29 March 1799, Joseph Meason was very sick aboard a Kentucky boat on the Monongahela River, about a mile above Pittsburgh. Mary Hartle later testified that he appeared to be in his right mind. About an hour before he died, Joseph asked for a deed drawn to convey land to Joseph Worthington. The document could not be reached among the packed belongings aboard the boat.',
      'Asked whether he could state his wishes before witnesses, Joseph did. Hartle and two other witnesses later gave depositions, and a Kentucky court ordered their accounts recorded. The entry preserves his wishes for his estate and, specifically, a thousand acres on Highland Creek.',
      'The record gives no cause of illness. It does not tell us where Joseph boarded, where the boat came from, where it was headed, or whether it was moving. “Kentucky boat” was a name for an inland flatboat; it does not establish Joseph’s itinerary.',
    ],
    routePlaces: [
      'Monongahela River · near Pittsburgh',
      'Henderson County court · Kentucky',
      'Highland Creek · Kentucky',
    ],
    events: [
      {
        id: 'joseph-boat-declaration-1799',
        year: '29 March 1799',
        place: 'Monongahela River · near Pittsburgh',
        record:
          'Three later witness depositions describe Joseph Meason’s final declaration aboard a Kentucky boat. Mary Hartle said a deed drawn for Joseph Worthington could not be reached among the packed belongings. John Carnahan and Rachel Thompson also described Joseph’s stated wish for Worthington to have his 1,000-acre Highland Creek tract.',
        interpretation:
          'The court entry is a clerk’s copy of depositions proving an oral will, not Joseph’s handwritten will. The deed’s signing, delivery, recovery, and legal effect remain unknown.',
        referenceIds: [80, 82],
        routeIndex: 0,
      },
      {
        id: 'joseph-court-order-1799',
        year: '6 August 1799',
        place: 'Henderson County court · Kentucky',
        record:
          'Henderson County Court ordered the three depositions recorded. Kentucky’s 1797 wills act required a land devise to be written and signed.',
        interpretation:
          'Joseph’s spoken declaration alone did not meet that requirement for Highland Creek. The court entry does not establish the legal status of the requested deed.',
        referenceIds: [80, 81],
        routeIndex: 1,
      },
      {
        id: 'joseph-highland-claim-1813',
        year: '1813',
        place: 'Highland Creek · Kentucky',
        record:
          'Benjamin Meason conveyed his undivided interest as one of Joseph’s heirs at law. A neighboring deed named children of Joseph’s brothers John and Samuel among other claimants.',
        interpretation:
          'These private deeds show a collateral inheritance network, but they are not a court decree or a complete heir list. They do not name Benjamin’s father or identify his exact branch.',
        referenceIds: [67, 68],
        routeIndex: 2,
      },
    ],
    closing: [
      'The scene on the boat feels like the moment a family history changed. The records support a narrower conclusion: Joseph asked for a document that was out of reach, witnesses preserved his spoken wishes, and later relatives conveyed claimed interests in the land. What became of the deed, and why the later title took the course it did, remain questions.',
      'This is where my search meets the wider Meason family. Highland Creek binds Benjamin to Joseph’s inheritance story without giving me the parent-child link I am looking for. The deeds name branches worth following, while Benjamin’s parents remain unknown.',
    ],
    recordReader: {
      says: 'Three witness depositions describe Joseph’s final declaration aboard a Kentucky boat near Pittsburgh. The court ordered the depositions recorded on 6 August 1799. Hartle said Joseph asked for a deed to Worthington that could not be reached.',
      inference:
        'The 1813 Highland Creek deeds place Benjamin within Joseph’s inheritance network. The requested deed could matter to the land’s legal history, but its status is unknown.',
      unknown:
        'Joseph’s illness, the boat’s origin and destination, the deed’s execution and fate, the full title history, and Benjamin’s exact branch.',
      referenceIds: [80, 81, 82, 67, 68],
    },
    relatedCaseIds: ['parentage'],
    publication: { ...publication, reviewedOn: '2026-09-22' },
  },
  {
    id: 'migration',
    number: '02',
    title: 'A family line from Kentucky to Texas',
    shortTitle: 'The generations west',
    period: '1800–present',
    summary:
      'Seven generations emerge from tax lists, marriages, households, death records, and reviewed private vital records. The geographic trail reaches Texas; after that, the story names no place the public evidence can carry.',
    routePlaces: [
      'Nelson County, Kentucky',
      'Shelby County, Kentucky',
      'Ralls and Monroe Counties, Missouri',
      'Dallas County, Texas',
      'Later generations · place not asserted',
    ],
    events: [
      {
        id: 'migration-nelson-tax-1800-1804',
        year: '1800–1804',
        place: 'Nelson County, Kentucky',
        record:
          'Tax returns place Benjamin in Nelson County every year from 1800 through 1804 and record two enslaved people in his taxable household in 1803 and 1804.',
        interpretation:
          'The repeated entries establish a sustained Kentucky presence. Nearby households cannot be treated as relatives from proximity alone.',
        referenceIds: [4],
        routeIndex: 0,
      },
      {
        id: 'migration-marriage-1801',
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
        id: 'migration-mill-creek-1810-1812',
        year: '1810–1812',
        place: 'Mill Creek Baptist Church · Nelson County, Kentucky',
        record:
          'A derivative church transcript names B. Meason on the June 1810 meeting-house commission and Ben Meason as a church sexton on 18 July 1812. The name, chronology, recurring Thomas Hubbard and James Nall associates, and independent 1811 association record strongly identify both entries as Benjamin.',
        interpretation:
          'These are trusted operational roles, while Hubbard and Nall are documented associates—not relatives. The transcript is not the original minute book and proves neither Benjamin’s admission or parents nor a later transfer from Mill Creek to Bardstown Salem.',
        referenceIds: [5, 8, 36],
        routeIndex: 0,
      },
      {
        id: 'migration-shelby-census-1820',
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
        id: 'migration-missouri-1829-1835',
        year: '1829–1835',
        place: 'Ralls and Monroe Counties, Missouri',
        record:
          'An 1829 patent identifies Benjamin as a Ralls County resident. A separate 1835 patent grants him Monroe County land.',
        interpretation:
          'The sequence supports migration from Kentucky to Missouri. It establishes residence and landholding—not motive.',
        referenceIds: [11, 12, 13, 14],
        routeIndex: 2,
      },
      {
        id: 'migration-george-missouri-1837-1850',
        year: '1837–1850',
        place: 'Clark and Monroe Counties, Missouri',
        record:
          'George M. Meason married Elizabeth Hay in Clark County in 1837 and Martha Reed there in 1840. By 1850, George headed a separate household with Martha and children in Monroe County.',
        interpretation:
          'These records establish George’s own Missouri household before its later move west. They do not name his parents or prove a relationship to Benjamin.',
        referenceIds: [31, 32, 25],
        routeIndex: 2,
      },
      {
        id: 'migration-george-texas-1860-1887',
        year: '1860–1887',
        place: 'Missouri → Dallas County, Texas',
        record:
          'George’s household appears in Shelby County, Missouri, in 1860 and Monroe County in 1870, then in Dallas County, Texas, in 1880. His marker at Mount Calvary Cemetery records his death in Dallas in 1887.',
        interpretation:
          'The Missouri and Texas endpoints document the household’s move between 1870 and 1880. They do not reveal the route, date, motive, or prove that George was Benjamin’s son; the marker’s birth year also conflicts with the census sequence.',
        referenceIds: [33, 26],
        routeIndex: 3,
      },
      {
        id: 'migration-franklin-james-1933-1949',
        year: '1933–1949',
        place: 'Texas',
        record:
          'Frank Meason’s 1933 death certificate names George Mason and Martha Reed as his parents. James Lawrence Meason’s 1949 Dallas County death certificate names Frank Meason and Nancy A. Huffines as his parents.',
        interpretation:
          'Together, the two certificates document the next two generational handoffs in Texas. Their parentage statements were supplied after the births, and they do not document when Franklin arrived or every place either family lived.',
        referenceIds: [58, 57],
        routeIndex: 3,
      },
      {
        id: 'migration-jimmy-1934-1973',
        year: '1934–1973',
        place: 'Texas',
        record:
          'Jimmy’s 1934 Texas birth certificate records the child and father as James Lawrence Meason and the mother as Mary Estelle Sledge. The statewide index repeats those details, a 1940 Richardson census places James, Mary, and young Jimmie together, and his 1973 death certificate later names the parents in shortened form.',
        interpretation:
          'The contemporaneous certificate is the principal source for this generational handoff; the index, household, and later death certificate corroborate it. The census coordinates remain unverified.',
        referenceIds: [75, 74, 76, 56],
        routeIndex: 3,
      },
      {
        id: 'migration-cynthia-andy-present',
        year: '1958–present',
        place: 'Reviewed private records · location not asserted',
        record:
          'Reviewed vital records directly document Jimmy as Cynthia’s father. Reviewed original and amended birth records directly document Cynthia as the mother of Shannon Jeremiah Meason, later Andy Cohen.',
        interpretation:
          'These final handoffs are directly documented. The private certificates, adoption records, identifying details, and specific modern locations remain intentionally omitted from this public chapter.',
        referenceIds: [],
        routeIndex: 4,
      },
    ],
    relatedCaseIds: ['parentage', 'burial-ground'],
    publication,
  },
  {
    id: 'between-lines',
    number: '03',
    title: 'The family between the lines',
    shortTitle: 'Land, households, and mills',
    period: '1846–1880',
    summary:
      'A named daughter, shared land, repeated households, and James L.’s working life reveal a network no single family statement preserves.',
    opening: [
      'In 1850, Benjamin and Hannah Mason’s Missouri home held more than one family group. James and Emily Mason lived there alongside George and Elizabeth Hollingsworth and four Hollingsworth children: David, Benjamin, Virginia, and Edwin. The census lists who shared the home, but it gives no relationship labels.',
      'Three years later, Benjamin’s recorded will named Virginia Ann Hollingsworth as his daughter. That proves one daughter bore the Hollingsworth surname. It does not identify her as Elizabeth in the 1850 census or explain every relationship in that household.',
    ],
    routePlaces: ['Family named', 'Land & neighbors', 'Work', 'Naming memory'],
    events: [
      {
        id: 'network-laura-marriage-1846',
        year: '1846',
        place: 'Monroe County, Missouri',
        record:
          'Laura Ann Meason’s marriage return identifies her as Benjamin Meason’s daughter and John C. Kippers as her husband.',
        interpretation:
          'This turns Laura and John into documented family anchors for evaluating people who repeatedly appear around them.',
        referenceIds: [61],
        routeIndex: 0,
      },
      {
        id: 'network-benjamin-household-1850',
        year: '1850',
        place: 'Benjamin and Hannah’s household',
        record:
          'Benjamin and Hannah Mason’s household includes James and Emily Mason; George and Elizabeth Hollingsworth; and the Hollingsworth children David, Benjamin, Virginia, and Edwin.',
        interpretation:
          'The mixed household matters when these people reappear later. The census does not explain their relationships.',
        referenceIds: [1],
        routeIndex: 0,
      },
      {
        id: 'network-virginia-will-1853',
        year: '1853',
        place: 'Monroe County, Missouri',
        record:
          'Benjamin’s recorded will names Virginia Ann Hollingsworth as his daughter.',
        interpretation:
          'This establishes a Meason–Hollingsworth surname connection, but does not identify Virginia Ann with Elizabeth Hollingsworth in the 1850 census.',
        referenceIds: [65],
        routeIndex: 0,
      },
      {
        id: 'network-land-1855',
        year: '1855',
        place: 'Monroe County land',
        record:
          'A deed names John C. Kippers, George M. Meason, and James L. Meason as joint grantees of a Monroe County parcel. A neighboring deed names James S. Meason separately.',
        interpretation:
          'The transaction connects named people through land. It does not call the men brothers, identify James S. with James L., or explain any working arrangement.',
        referenceIds: [28],
        routeIndex: 1,
      },
      {
        id: 'network-blacksmith-1860',
        year: '1860',
        place: 'Clay Township · census page 111',
        record:
          'On line 10, the census lists “J. L. Mason,” age 36, born in Kentucky, living alone in dwelling 746. His occupation is written as “Blacksmith.” B. H. Hollingsworth lived two family numbers away; the Parker deed grantors lived five away. On the next census page, John and Laura Kipper shared a household with David, Virginia, and Edwin Hollingsworth.',
        interpretation:
          'The census gives initials, not the full name James L. Age, Kentucky birthplace, Monroe County, the neighboring Parker couple, and the land record strongly support that identification. B. H. is strongly identified as Benjamin Hollingsworth from the 1850 home; the other three siblings recur with the Kippers. The census does not explain their relationships or say James worked with John Kipper.',
        referenceIds: [62],
        routeIndex: 1,
      },
      {
        id: 'network-miller-1870',
        year: '1870',
        place: 'Washington Township · Monroe County',
        record:
          'The census lists 46-year-old Kentucky-born James L. Mason as a miller, followed in the household by three mill laborers. One was James E. Hollingsworth.',
        interpretation:
          'Name, age, birthplace, and county continue the Missouri J. L. record sequence. James E. is not the B. H. Hollingsworth near J. L. in 1860; his relationship to the 1850 household is unproved. The schedule does not identify the mill or its owner.',
        referenceIds: [63],
        routeIndex: 2,
      },
      {
        id: 'network-sawmill-1880',
        year: '1880',
        place: 'Jackson Township · Monroe County',
        record:
          'The census lists 55-year-old Kentucky-born James L. Meason as “Proprietor of Saw Mill,” boarding with two men recorded as working in that sawmill.',
        interpretation:
          'The age, birthplace, county, and name strongly continue the 1860–1870 Missouri sequence. The occupation does not identify a mill site, prove legal title, or document a later move to Texas.',
        referenceIds: [64],
        routeIndex: 2,
      },
      {
        id: 'network-hollingsworth-name',
        year: 'Later family memory',
        place: 'George M. Meason’s family',
        record:
          'George M. and Martha Reed Meason’s reported child names include James Reed Meason and George Hollingsworth Meason. A descendant-held family Bible page names George Hollingsworth Meason.',
        interpretation:
          'Reed is independently documented as Martha’s surname. Hollingsworth may preserve a valued family association, but the descendant-held page lacks a title page and ownership chain, and no record identifies the name’s intended honoree.',
        referenceIds: [32, 34],
        routeIndex: 3,
      },
    ],
    closing: [
      'A decade after the crowded 1850 home, the household had dispersed without disappearing. Its members recur in a close neighborhood of Meason, Hollingsworth, Kipper, and Parker households, while land and mill work connect parts of the group. The records do not tell us whether John Kipper trained, employed, financed, or partnered with James.',
      'The Hollingsworth name may also have stayed in family memory. Its use as a Meason middle name is a clue to an association, not proof of whom the family meant to honor. I can see a durable family, property, and work network here without supplying the relationships the records leave unstated.',
    ],
    relatedCaseIds: ['george-connection'],
    publication: { ...publication, reviewedOn: '2026-09-22' },
  },
  {
    id: 'texas-reconnection',
    number: '04',
    title: 'A Texas record cluster bridges the branches',
    shortTitle: 'The Texas evidence cluster',
    period: '1880–1919',
    summary:
      'The words “son,” “uncle,” and “father,” spread across three records and four decades, create an indirect bridge back to Benjamin without proving a documented reunion.',
    routePlaces: ['George’s Texas home', 'Missouri gap', 'Texas household'],
    events: [
      {
        id: 'texas-george-household-1880',
        year: '1880',
        place: 'Dallas County, Texas',
        record:
          'George’s household records James R. as his son and Eva as his daughter-in-law.',
        interpretation:
          'This anchors James R. to George before James R. later becomes the informant and household link around elder James L.',
        referenceIds: [33],
        routeIndex: 0,
      },
      {
        id: 'texas-james-missouri-1880',
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
        id: 'texas-uncle-household-1900',
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
        id: 'texas-james-death-1919',
        year: '1919',
        place: 'Big Sandy, Texas',
        record:
          'Elder James L.’s death certificate, informed by J. R. Meason, names Benjamin Meason as his father.',
        interpretation:
          'Together with the uncle household and earlier network, this supports George’s placement indirectly. No record literally calls George and elder James brothers.',
        referenceIds: [59],
        routeIndex: 2,
      },
    ],
    relatedCaseIds: ['george-connection'],
    publication,
  },
] as const satisfies readonly Story[];

// Compatibility with the exploratory prototype's earlier export name.
export const storyChapters = stories;
