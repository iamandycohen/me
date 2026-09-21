import type { Story } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const stories = [
  {
    id: 'migration',
    number: '01',
    title: 'A family line from Kentucky to Texas',
    shortTitle: 'The generations west',
    period: '1800–present',
    summary:
      'Seven generations emerge from tax lists, marriages, households, death records, family evidence, and personal knowledge. The geographic trail reaches Texas; after that, the story names no place the public evidence cannot carry.',
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
          'The contemporaneous certificate is the principal source for this generational handoff; the index, household, and death certificate corroborate it. The birth form identifies no separate parentage informant, the later death information is secondary, none of the records uses a Sr. suffix, and the census coordinates remain unverified.',
        referenceIds: [75, 74, 76, 56],
        routeIndex: 3,
      },
      {
        id: 'migration-cynthia-andy-present',
        year: '1958–present',
        place: 'Family and personal evidence · location not asserted',
        record:
          'A family-held portrait preserves the working identification of Cynthia June “Cindee” Meason. The narrator’s personal knowledge carries the line from Cynthia to her son, born Shannon Jeremiah Meason and raised as Andy Cohen after adoption.',
        interpretation:
          'These final handoffs rest on family evidence and personal knowledge. Private vital records are intentionally omitted, and this public chapter does not make a more specific geographic claim for either generation.',
        referenceIds: [38],
        routeIndex: 4,
      },
    ],
    relatedCaseIds: ['parentage', 'burial-ground'],
    publication,
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
          'The household includes James and four Hollingsworth children alongside Benjamin and Hannah.',
        interpretation:
          'The composition matters when the same people reappear later, but the census does not explain every relationship.',
        referenceIds: [1],
        routeIndex: 1,
      },
      {
        id: 'network-land-households-1855-1860',
        year: '1855–1860',
        place: 'Land and neighboring households',
        record:
          'Kippers, George, and James L. appear in a shared land transaction; Parker, Hollingsworth, Kipper, and Meason households recur across census pages.',
        interpretation:
          'The cluster strengthens the family-network argument. The deed and proximity do not literally call the men brothers.',
        referenceIds: [28, 61, 62],
        routeIndex: 1,
      },
      {
        id: 'network-james-work-1860-1880',
        year: '1860–1880',
        place: 'Monroe County, Missouri',
        record:
          'James L. appears as a blacksmith, then a miller, and finally a sawmill proprietor with coherent age, birthplace, county, and middle initial.',
        interpretation:
          'The occupational sequence creates a strong Missouri identity. It does not prove ownership of a particular mill or the later move to Texas.',
        referenceIds: [62, 63, 64],
        routeIndex: 2,
      },
    ],
    relatedCaseIds: ['george-connection'],
    publication,
  },
  {
    id: 'texas-reconnection',
    number: '03',
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
