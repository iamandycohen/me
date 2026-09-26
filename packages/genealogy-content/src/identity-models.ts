import type { GenealogyIdentityModel } from './types.js';

const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-20',
} as const;

export const threeThomasesIdentityModel: GenealogyIdentityModel = {
  id: 'three-thomases',
  title: 'The Three Thomases',
  shortTitle: 'Three Thomases',
  summary:
    'Three documented identities clarify the parentage search: Thomas Meason senior, Thomas Meason of Hempfield, and the later Thomas Mason or Meason of Kentucky. The records prove that the Hempfield and Kentucky Thomases were different men. The overlapping Joseph\u2013John\u2013Samuel\u2013Isaac\u2013Elizabeth family network strongly favors the Kentucky Thomas as the son named in Thomas senior\u2019s 1779 will, but no reviewed record yet states that identity directly.',
  boundary:
    '\u201cThomas senior\u2019s named son Thomas\u201d is a documented role in the 1779 will, not automatically a fourth person. The wider family network strongly favors the Kentucky man for that role; the Hempfield man or another same-name man remains possible because no reviewed record states the identity directly. No reviewed record names Benjamin\u2019s father.',
  subjects: [
    {
      id: 'thomas-senior',
      name: 'Thomas Meason senior',
      period: 'Died 1779',
      place: 'Westmoreland County, Pennsylvania',
      summary:
        'His 1779 will names twelve children, including a son Thomas and a daughter Ann. It names no wife.',
      recordBoundary:
        'The will establishes the son Thomas as a family role but does not identify that son with either later same-name man.',
      referenceIds: [18],
    },
    {
      id: 'hempfield-thomas',
      name: 'Thomas Meason of Hempfield',
      period: 'Will dated 1785 · dead by 1786',
      place: 'Hempfield Township, Westmoreland County, Pennsylvania',
      summary:
        'His will names wife Ann and eight children. A separate agreement dated 21 March 1786 calls Ann his widow and relict.',
      recordBoundary:
        'His death by March 1786 excludes him from being the Thomas who personally acted in Kentucky in 1788 and 1795. His connection to Thomas senior remains unproved.',
      referenceIds: [19, 73],
    },
    {
      id: 'kentucky-thomas',
      name: 'Thomas Mason or Meason of Kentucky',
      period: 'Documented 1788–1795',
      place: 'Nelson and Logan counties, Kentucky',
      summary:
        'He bought a Rough Creek tract in 1788 and was living in Logan County when it was sold in 1795. In the same Logan County setting, Joseph\u2019s Highland Creek deed names William as the eldest son of Thomas Mason.',
      recordBoundary:
        'The repeated Joseph\u2013John\u2013Samuel\u2013Isaac\u2013Elizabeth network strongly favors this man as Thomas senior\u2019s named son, but no reviewed record states that identity directly or calls Benjamin his son.',
      referenceIds: [20, 21, 22, 67, 68, 69],
    },
  ],
  connections: [
    {
      id: 'senior-son-to-hempfield',
      subjectIds: ['thomas-senior', 'hempfield-thomas'],
      endpointLabels: [
        'Thomas senior\u2019s named son Thomas',
        'Thomas Meason of Hempfield',
      ],
      assessment: 'possible',
      label: 'Possible identity',
      statement:
        'Thomas senior\u2019s named son Thomas could be the later Hempfield testator.',
      limitation:
        'Shared name and compatible chronology do not prove the identity; no reviewed record links the Hempfield man to Thomas senior.',
      referenceIds: [18, 19, 73],
    },
    {
      id: 'senior-son-to-kentucky',
      subjectIds: ['thomas-senior', 'kentucky-thomas'],
      endpointLabels: [
        'Thomas senior\u2019s named son Thomas',
        'Thomas Mason or Meason of Kentucky',
      ],
      assessment: 'strong-indirect',
      label: 'Strongly favored identity',
      statement:
        'The recurring Joseph\u2013John\u2013Samuel\u2013Isaac\u2013Elizabeth family network, together with Joseph\u2019s 1795 deed to William, eldest son of Thomas Mason, strongly favors Thomas senior\u2019s named son as the later Kentucky Thomas.',
      limitation:
        'No reviewed record directly calls Kentucky Thomas a son of Thomas senior. Connecting the Nelson and Logan landholder with William\u2019s father also remains an identity synthesis from the tract, place, name, and timing.',
      referenceIds: [18, 20, 21, 22, 67, 68, 69],
    },
    {
      id: 'hempfield-not-kentucky',
      subjectIds: ['hempfield-thomas', 'kentucky-thomas'],
      endpointLabels: [
        'Thomas Meason of Hempfield',
        'Thomas Mason or Meason of Kentucky',
      ],
      assessment: 'excluded',
      label: 'Excluded identity',
      statement:
        'Hempfield Thomas was dead by 21 March 1786, so he cannot be the living Kentucky Thomas who bought land in 1788 and conveyed it in 1795.',
      limitation:
        'This chronology separates the two men; the wider network strongly favors Kentucky Thomas as Thomas senior\u2019s son but does not state that identity directly or name Benjamin\u2019s father.',
      referenceIds: [19, 20, 21, 73],
    },
  ],
  timeline: [
    {
      id: 'senior-will-1779',
      date: '14–15 March 1779',
      title: 'Thomas senior\u2019s will',
      detail:
        'The will names twelve children, including son Thomas and daughter Ann, and names no wife.',
      referenceIds: [18],
    },
    {
      id: 'hempfield-will-1785',
      date: '18 September 1785',
      title: 'Hempfield Thomas executes his will',
      detail:
        'The will names wife Ann and eight children. At this date Ann is documented as his wife, not yet as his widow.',
      referenceIds: [19],
    },
    {
      id: 'hempfield-widow-1786',
      date: '21 March 1786',
      title: 'Ann is documented as Thomas\u2019s widow',
      detail:
        'A premarital agreement between Ann Meason and Hugh Quigley calls her the widow and relict of deceased Thomas Meason, establishing his death by this date.',
      referenceIds: [73],
    },
    {
      id: 'kentucky-purchase-1788',
      date: '23 October 1788',
      title: 'Kentucky Thomas buys the Rough Creek tract',
      detail:
        'Thomas Meason of Nelson County purchases 300 acres on Rough Creek.',
      referenceIds: [20],
    },
    {
      id: 'william-deed-1795',
      date: '2 February 1795',
      title: 'William is called Thomas\u2019s eldest son',
      detail:
        'Joseph Meason\u2019s Highland Creek deed of gift identifies William Mason as the eldest son of Thomas Mason.',
      referenceIds: [22],
    },
    {
      id: 'kentucky-sale-1795',
      date: '27 July 1795',
      title: 'Kentucky Thomas sells the Rough Creek tract',
      detail:
        'The same 300 acres are conveyed by Thomas Mason of Logan County through attorney Samuel Haycraft.',
      referenceIds: [21],
    },
    {
      id: 'agreement-acknowledged-1798',
      date: '11 June 1798',
      title: 'The 1786 agreement is acknowledged',
      detail:
        'A subscribing witness acknowledges the agreement twelve years after it was made.',
      referenceIds: [73],
    },
    {
      id: 'agreement-recorded-1798',
      date: '20 June 1798',
      title: 'The 1786 agreement is recorded',
      detail:
        'The clerk records the agreement; this recording date does not change its 21 March 1786 execution date or widow statement.',
      referenceIds: [73],
    },
    {
      id: 'hempfield-will-proved-1805',
      date: '22 November 1805',
      title: 'The 1785 will is proved',
      detail:
        'The delayed probate notation is not Thomas\u2019s death date and does not show that he survived until 1805.',
      referenceIds: [19, 73],
    },
  ],
  annBoundary:
    'Thomas senior\u2019s 1779 will names a daughter Ann. The Hempfield records name an Ann first as that Thomas\u2019s wife in 1785 and then as his widow in 1786. These are distinct roles in distinct record groups; the reviewed evidence does not establish whether they describe the same woman or different women.',
  referenceIds: [18, 19, 20, 21, 22, 67, 68, 69, 73],
  publication,
};

export const genealogyIdentityModels: readonly GenealogyIdentityModel[] = [
  threeThomasesIdentityModel,
];
