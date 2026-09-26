import type { Reference } from './types.js';

const referenceCatalog: readonly Omit<Reference, 'publication'>[] = [
  {
    id: 1,
    title: '1850 United States census — Benjamin Mason household',
    citation:
      '1850 U.S. census, District 59, Monroe County, Missouri, p. 139a; NARA microfilm publication M432, roll 407.',
    supports:
      'Benjamin’s age of 74, reported Virginia birthplace, Hannah’s presence, 25-year-old Kentucky-born James Mason without a middle initial, and George and Elizabeth Hollingsworth with children David, Benjamin, Virginia, and Edwin in one Monroe County household.',
    limitation:
      'The census supports an approximate birth year, not an exact birth date, and it does not identify Benjamin’s parents. It gives the household member James Mason no middle initial or relationship, so this entry alone cannot assign him to the separately documented James S. or James L.',
    url: 'https://archive.org/details/populationschedu0407unix/page/n280/mode/1up',
    accessLabel: 'Open census image',
  },
  {
    id: 2,
    title: 'Benjamin Mason–Hannah Doom marriage bond',
    citation:
      'Nelson County, Kentucky, marriage bond, 18 August 1801; Kentucky, County Marriages, 1786–1965; FHL film 9666, DGS 4705518, image 829.',
    supports:
      'The intended marriage, Benjamin and Hannah’s names, their status as adults over 21, Jacob Yoder’s surety role, and Benjamin’s signature.',
    limitation:
      'The bond names no parent, guardian, residence, or family relationship. A surety is not necessarily a relative.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:939K-BSCB-M',
    accessLabel: 'Open record image',
  },
  {
    id: 3,
    title: 'Nelson County marriage register',
    citation:
      'Nelson County, Kentucky, marriage register, Benjamin Mason and Hannah Dooms, 27 August 1801; Ancestry collection 61372, record 1656492.',
    supports:
      'The solemnized marriage date and the register’s identification of the officiant as “J. Ferguson.”',
    limitation:
      'The image is a register entry, not the couple’s individual return. Joseph Ferguson’s full identity is established contextually from a separate signed list.',
    url: 'https://www.ancestry.com/search/collections/61372/records/1656492',
    accessLabel: 'Open indexed record',
  },
  {
    id: 4,
    title: 'Nelson County tax books, 1799–1805',
    citation:
      'Nelson County, Kentucky, tax books; FamilySearch catalog 156788, FHL film 8178, DGS 7763746; both commissioner M-surname runs reviewed for 1799–1805.',
    supports:
      'Benjamin’s presence in every annual return from 1800 through 1804, including the Mason and Meason spellings; the 1803 and 1804 returns each record two enslaved people in his taxable household.',
    limitation:
      'I found no entry for him in the fully reviewed 1799 and 1805 returns, but those absences do not prove his age, migration, death, or kinship. Proximity to other taxpayers does not establish a relationship.',
    url: 'https://www.familysearch.org/en/records/images/search-results?imageGroupNumbers=7763746',
    accessLabel: 'Browse image group',
  },
  {
    id: 5,
    title: 'Weller children’s guardian bond',
    citation:
      'Nelson County, Kentucky, Court Bond Book, volume 2, p. 113, 17 July 1802; DGS 7553304, image 177.',
    supports:
      'Benjamin’s Nelson County presence, the “Benjn Meason” signature, and his fiduciary association with John and Samuel Weller, Thomas Hubbard, and Thomas Langley.',
    limitation:
      'The bond states no relationship between Benjamin and the Weller family and names neither of his parents.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3QS7-99DP-K23',
    accessLabel: 'Open record image',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['benjamin-bond'],
      note: 'A reviewed contextual crop is available here; the external link opens the original bond-book image.',
    },
  },
  {
    id: 6,
    title: 'Nelson County administration bond',
    citation:
      'Nelson County, Kentucky, Court Bond Book, volume 2, p. 142, 21 November 1809; DGS 7553304, image 174.',
    supports:
      'Benjamin’s “Benja Meason” signature and his role as surety for administrator John Kercheval.',
    limitation:
      'The faded decedent name is unresolved, and the bond states no residence, parentage, or kinship.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3QS7-89DP-K2X?view=index&lang=en',
    accessLabel: 'Open record image',
  },
  {
    id: 7,
    title: '“B. Meason J.P.N.C.” certificate',
    citation:
      'Nelson County, Kentucky, Deed Book 9, p. 184, 22 May 1811; FHL film 482738, DGS 8571833, image 413.',
    supports:
      'A B. Meason acting as a Nelson County justice of the peace during Benjamin’s documented Nelson County chronology.',
    limitation:
      'The clerk’s copy gives only the initial “B.” and is not Benjamin’s autograph; identification with Benjamin is strongly compatible but not explicit.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-C373-K9KG-4',
    accessLabel: 'Open record image',
  },
  {
    id: 8,
    title: 'Salem Association minutes, 1811',
    citation:
      'Minutes of the Salem Association of Baptists, Kentucky, 1811; James P. Boyce Centennial Library repository handle 10392/6307.',
    supports:
      'Benjamin Meason’s association service and the likely connection to Nelson County’s Mill Creek congregation.',
    limitation:
      'The church-table reading is supported by repository OCR and context; a final page-image check remains desirable.',
    url: 'https://hdl.handle.net/10392/6307',
    accessLabel: 'Open repository item',
  },
  {
    id: 9,
    title: 'Salem Association minutes, 1816',
    citation:
      'Minutes of the Salem Association of Baptists, Kentucky, 1816, first printed table page; James P. Boyce Centennial Library repository handle 10392/6312.',
    supports:
      '“Benj. Meason” and Joseph Lewis as messengers from the newly formed Bardstown Salem church.',
    limitation:
      'The entry establishes congregational representation, not family relationships or Benjamin’s place of origin.',
    url: 'https://hdl.handle.net/10392/6312',
    accessLabel: 'Open repository item',
  },
  {
    id: 10,
    title: '1820 United States census — Shelby County household',
    citation:
      '1820 U.S. census, Shelby County, Kentucky, stamped p. 128; NARA microfilm publication M33, roll 24.',
    supports:
      'An age-compatible Benjamin Mason household in Shelby County and the accepted Kentucky migration sequence.',
    limitation:
      'Early censuses name only the household head and cannot identify the remaining household members by themselves.',
    url: 'https://archive.org/details/populationsc18200024unit/page/n137/mode/1up',
    accessLabel: 'Open census image',
  },
  {
    id: 11,
    title: '1829 Ralls County federal land patent',
    citation:
      'United States General Land Office patent to Benjamin Meason, document 933, accession MO0260__.421, 1 June 1829; T56N R5W, section 7, 82.06 acres.',
    supports:
      'Benjamin’s stated residence in Ralls County and a precise Missouri land location before the 1830 census.',
    limitation:
      'The patent establishes land ownership and residence, not parentage or relationships to neighboring patentees.',
    url: 'https://glorecords.blm.gov/s/advanced-search?searchTerm=%2Fsearch%3Fq%3DMO0260__.421%26page%3D1%26pageSize%3D25',
    accessLabel: 'Search official patent record',
  },
  {
    id: 12,
    title: '1830 United States census — Ralls County household',
    citation:
      '1830 U.S. census, Spencer Township, Ralls County, Missouri, stamped p. 363; NARA microfilm publication M19, roll 73.',
    supports:
      'An age-compatible Benjamin Meason household in the predecessor county from which Monroe County was formed.',
    limitation:
      'The schedule names only the household head and does not itself prove continuity with every earlier record.',
    url: 'https://archive.org/details/populationsc18300073unit/page/n701/mode/1up',
    accessLabel: 'Open census image',
  },
  {
    id: 13,
    title: '1835 Monroe County federal land patent',
    citation:
      'United States General Land Office patent to Benjamin Meason, document 6582, accession MO0370__.406, 21 October 1835; T55N R11W, section 20, 80 acres.',
    supports: 'Benjamin’s ownership of a specific Monroe County tract by 1835.',
    limitation:
      'The patent establishes land ownership, not by itself household residence, family relationships, or parentage.',
    url: 'https://glorecords.blm.gov/s/advanced-search?searchTerm=%2Fsearch%3Fq%3DMO0370__.406%26page%3D1%26pageSize%3D25',
    accessLabel: 'Search official patent record',
  },
  {
    id: 14,
    title: '1840 United States census — Monroe County household',
    citation:
      '1840 U.S. census, Marion Township, Monroe County, Missouri, stamped p. 123; NARA microfilm publication M704, roll 226.',
    supports:
      'An age-compatible Benjamin Meason household residing in Monroe County.',
    limitation:
      'The schedule names only the household head and cannot identify every person in the household.',
    url: 'https://archive.org/details/populationsc18400226unit/page/n254/mode/1up',
    accessLabel: 'Open census image',
  },
  {
    id: 15,
    title: 'Official registers of the United States, 1847 and 1849',
    citation:
      'Register of Officers and Agents, Civil, Military, and Naval, in the Service of the United States, 1847, part 2, p. 442; 1849, part 2, p. 508.',
    supports:
      'Benjamin Meason’s federal appointment as postmaster at Woodlawn, Monroe County, Missouri.',
    limitation:
      'The registers establish office and location, not appointment circumstances, sureties, family, or parentage.',
    url: 'https://www.govinfo.gov/app/details/GOVPUB-CS1-511c3e6960ca70bec6e2625e2f96b84a',
    accessLabel: 'Open 1849 official register',
  },
  {
    id: 16,
    title: 'Union Christian Church recollection',
    citation:
      'Historical and Biographical Sketches of the Early Churches and Pioneer Preachers of the Christian Church in Missouri (1888), pp. 172–174, preserving an 1884 eyewitness recollection.',
    supports:
      'Benjamin Mason and his wife among Union Christian Church’s founders and Benjamin’s remembered service as an elder.',
    limitation:
      'This is a later eyewitness recollection published decades after the church’s organization, not a surviving contemporary membership register.',
    url: 'https://archive.org/details/historicalbiogra00hale/page/172/mode/2up',
    accessLabel: 'Open published history',
  },
  {
    id: 17,
    title: 'Jacob Doom heirs’ deed',
    citation:
      'Washington County, Kentucky, Deed Book I, pp. 278–279, 14 June 1825; FHL film 241393, DGS 8568117, images 395–396.',
    supports:
      '“Benjamin Mason and Hannah his wife late Doom” among the heirs and representatives of Jacob Doom deceased.',
    limitation:
      'The deed does not literally call Hannah Jacob’s daughter and does not identify her mother.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-C3QY-J3V2-F?view=fullText&lang=en',
    accessLabel: 'Open deed image',
  },
  {
    id: 18,
    title: 'Will of Thomas Meason senior',
    citation:
      'Westmoreland County, Pennsylvania, Will Book 1, p. 17, entry 28; dated 14 March and proved 15 March 1779; FamilySearch DGS 7727205, FHL 1316409, item 5, image 417.',
    supports:
      'Twelve named children—six sons and six daughters—including son Thomas and daughter Ann; Benjamin is absent from the extensive list. Review of the complete recorded will entry confirms that it names no wife and no daughter Jane.',
    limitation:
      'The omission weighs strongly against the testator as Benjamin’s direct father, but a will need not name every child. It does not categorically exclude him, identify Benjamin’s parents, or exclude another family line. The earlier recorded entry and the cataloged copy-volume rendering on pp. 16–17 (Ancestry collection 8802, record 2042575) are two versions of one will, not independent wills or the loose signed original. Neither proof notation establishes an exact death date. Earlier relationship indexing misclassified daughter Ann as a spouse, while adjacent will text supplied Jane; those claims are superseded by review of the recorded entries.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-C9BL-69P5-F',
    accessLabel: 'Open earlier recorded will entry',
  },
  {
    id: 19,
    title: 'Will of Thomas Meason of Hempfield',
    citation:
      'Westmoreland County, Pennsylvania, Will Book 1, p. 192, item 308; will dated 18 September 1785 and proved 22 November 1805; Ancestry collection 8802, media 007727205_00506.',
    supports:
      'Wife Ann and eight children—Sarah, John, Thomas, Elizabeth, Ann, Synthia, Mary, and Eliza—including an expressly enumerated group of six youngest children; Benjamin is absent. Hugh Quigley witnessed the will, and James Westbay was an executor, providing two specific bridges to Ann’s 1786 agreement.',
    limitation:
      'The omission strongly disfavors this testator as Benjamin’s father but does not identify Benjamin’s actual parents or connect this man to Thomas Meason senior. The 22 November 1805 notation is delayed proof or recording—not a death date, a survival date, or the date Ann was first documented as a widow. A separate agreement dated 21 March 1786 already calls Ann the widow and relict of deceased Thomas.',
    url: 'https://www.ancestry.com/imageviewer/collections/8802/images/007727205_00506',
    accessLabel: 'Open probate image',
  },
  {
    id: 20,
    title: 'Thomas Meason’s Rough Creek purchase',
    citation:
      'Nelson County, Kentucky, Deed Book 2, pp. 76–77, 23 October 1788; FamilySearch catalog 273862, FHL film 482734, DGS 8150844.',
    supports:
      'Thomas Meason of Nelson County purchasing 300 acres on Rough Creek, waters of Green River, from Joseph and Abigail Barnett.',
    limitation:
      'The deed names no Benjamin, former residence, age, wife, child, or other kinship.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSKX-S3C7-1',
    accessLabel: 'Open deed image',
  },
  {
    id: 21,
    title: 'Sale of the Rough Creek tract',
    citation:
      'Hardin County, Kentucky, Deed Book A, pp. 110–111, 27 July 1795; Thomas Mason of Logan County to Peter Watts of Mercer County.',
    supports:
      'The later sale of the same 300-acre tract, matched through acreage, watercourse, and Tardiveau boundary calls.',
    limitation:
      'The deed names no Benjamin or family relationship and does not by itself identify the seller with Thomas born in 1755.',
    url: 'https://hccoky.org/archives/ViewPage.asp?Book=DBA&varA=110&SType=DB&Submit=Open+Page',
    accessLabel: 'Open county deed scan',
  },
  {
    id: 22,
    title: 'Joseph Meason’s deed of gift to William Mason',
    citation:
      'Logan County, Kentucky, Deed Book A-1, pp. 138–140, 2 February 1795; FHL film 364581, DGS 7900779, images 81–82.',
    supports:
      'William Mason as the “eldest son of Thomas Mason” of Logan County and Thomas’s payment connected to the conveyance.',
    limitation:
      'The deed does not name Benjamin, state Joseph’s relationship to Thomas and William, or prove this Thomas was the Rough Creek seller.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CS4R-597D-D',
    accessLabel: 'Open deed image',
  },
  {
    id: 23,
    title: 'Monroe County Will Book B access locator',
    citation:
      'Monroe County, Missouri, Will Books A–B, 1832–1870; FamilySearch catalog 94979, FHL film 972876, DGS 7831818; Missouri Archives reel C 4667.',
    supports:
      'The catalog work identified a Monroe County will-book route for the period after Benjamin’s 1850 census appearance and helped guide the later recovery of his recorded will in a different FamilySearch image group.',
    limitation:
      'This locator did not itself establish a Benjamin entry or any will contents. The recorded will has since been reviewed separately and is cited in reference 65; the complete estate remains unfinished.',
    url: 'https://www.familysearch.org/en/search/catalog/94979',
    accessLabel: 'Open catalog entry',
  },
  {
    id: 24,
    title: 'Salem Association minutes, 1815',
    citation:
      'Minutes of the Salem Association of Baptists, Kentucky, Wilson’s Creek Meeting-House, 13–14 October 1815, printed pp. 1–3; Boyce Digital Repository, handle 10392/6311.',
    supports:
      'Benjamin Meason was seated as one of two messengers when the newly organized Salem Church at Bardstown entered the association and was appointed to supervise printing the minutes.',
    limitation:
      'The minutes do not call Benjamin a charter member, identify his prior congregation, or state any family relationship.',
    url: 'https://hdl.handle.net/10392/6311',
    accessLabel: 'Open repository item',
  },
  {
    id: 25,
    title: '1850 United States census — George M. Meason household',
    citation:
      '1850 U.S. census, District 59, Monroe County, Missouri, p. 119b, dwelling and family 655; NARA microfilm publication M432, roll 407.',
    supports:
      'George M. Meason as a separate Monroe County household head, reported age 40 and born in Kentucky, with Martha and children in the household.',
    limitation:
      'The schedule does not state relationships or name George’s parents. It does not prove that Benjamin was his father.',
    url: 'https://archive.org/details/populationschedu0407unix/page/n241/mode/1up',
    accessLabel: 'Open census image',
  },
  {
    id: 26,
    title: 'George M. Meason grave marker',
    citation:
      'George M. Meason marker, Mount Calvary Cemetery, Dallas, Texas; photographed 19 April 2002 and published with Find a Grave memorial 5786133.',
    supports:
      'The marker inscription gives 10 May 1818–11 November 1887 and establishes the burial location represented by the memorial.',
    limitation:
      'The marker names no parents, does not expand the middle initial, and gives no birthplace. Its birth year conflicts with census evidence, and its informant and erection date are unknown.',
    url: 'https://www.findagrave.com/memorial/5786133/george_mansfield-meason',
    accessLabel: 'Open memorial and marker',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['george-marker'],
      note: 'A reviewed marker photograph is available here; the memorial remains the external source context.',
    },
  },
  {
    id: 27,
    title: 'Reported Benjamin Meason will and burial account',
    citation:
      '“Benjamin Meason 1776,” Meason Grampas family compilation, reporting a will written 19 August 1853 and recorded 25 January 1854.',
    supports:
      'A derivative research lead that pointed toward a reserved burial square on a Monroe County farm devised to James S. Meason and helped focus the original-record search.',
    limitation:
      'This is a derivative family account, not the controlling source. The recorded will and probate order in reference 65 now verify the devise and burial reservation while correcting the reported signing and recording dates; the cemetery location and complete farm chain remain unresolved.',
    url: 'https://measongrampas.yolasite.com/benjamin-1776.php',
    accessLabel: 'Open derivative account',
  },
  {
    id: 28,
    title: 'Separate 1855 Monroe County deeds to James S. and James L.',
    citation:
      'Monroe County, Missouri, Deed Book O, pp. 338–340; two Parker deeds dated 28 December 1855 and filed separately in February 1856; FamilySearch DGS 8196789, images 205–206. The James S. entry was located through the grantee index, DGS 8196783, image 265.',
    supports:
      'One original deed conveys land to James S. Meason. A separate adjacent deed conveys land to J. C. Kippers, George M. Meason, and James L. Meason as joint grantees and refers to a lot previously sold to James L. The transactions use different middle initials and neither states kinship.',
    limitation:
      'The deeds do not identify the 1850 household’s James, establish a relationship among the joint grantees, or identify James S.’s Section 11 parcel as Benjamin’s candidate Section 20 farm. The index does not exhaust mentions within deeds indexed under other parties.',
    url: 'https://www.familysearch.org/search/film/008196789',
    accessLabel: 'Open recorded deed volume at FamilySearch',
  },
  {
    id: 29,
    title: '1876 Monroe County plat — Township 55 North, Range 11 West',
    citation:
      'Illustrated Historical Atlas of Monroe County, Missouri (Edwards Brothers, 1876), p. 45; State Historical Society of Missouri, item 3370.',
    supports:
      'Later ownership labels for the two forty-acre halves of Benjamin’s proved 1835 patent tract in the Woodlawn area.',
    limitation:
      'The plat does not establish that this was the farm described in the recorded will, show the 1853 title chain, or prove the presence or absence of a burial ground.',
    url: 'https://digital.shsmo.org/digital/collection/plat/id/3370/rec/1',
    accessLabel: 'Open historical plat',
  },
  {
    id: 30,
    title: 'Public member-tree citation review',
    citation:
      'Review of visible citations in 25 public George M. Meason profiles and 10 public Thomas Meason profiles on Ancestry, 17 September 2026.',
    supports:
      'Every sampled profile repeated the disputed relationship assigned to it, but none exposed a record that stated the parent-child relationship. The Thomas profiles also carried incompatible death claims.',
    limitation:
      'This was a sample of accessible public profiles, not every online tree. Missing citations do not disprove a relationship; the audit shows that numerical agreement is not independent evidence.',
    url: 'https://www.ancestry.com/search/collections/1030/',
    accessLabel: 'Search public member trees',
  },
  {
    id: 31,
    title: 'George M. Meason–Elizabeth Hay marriage return',
    citation:
      'Clark County, Missouri, Marriage Book A, manuscript p. 4, entry 11; marriage solemnized 16 November 1837 and recorded 20 November 1837; Ancestry collection 1171, record 9386577.',
    supports:
      'George M. Meason and Elizabeth Hay married in Clark County on 16 November 1837. The document is a recorded minister’s return.',
    limitation:
      'The return gives no age, parent, guardian, consent, bondsman, witness, or couple signature and therefore does not identify George’s parents.',
    url: 'https://www.ancestry.com/search/collections/1171/records/9386577',
    accessLabel: 'Open indexed marriage record',
  },
  {
    id: 32,
    title: 'George M. Meason–Martha Reed marriage return',
    citation:
      'Clark County, Missouri, Marriage Book A, manuscript p. 21, entry 91; marriage solemnized 27 October 1840 and recorded 7 November 1840; Ancestry collection 1171, record 9386657.',
    supports:
      'George M. Meason and Martha Reed, both described as residents of Clark County, married on 27 October 1840.',
    limitation:
      'The return does not give Martha a middle initial and names no parent, guardian, consent, bondsman, witness, or couple signature.',
    url: 'https://www.ancestry.com/search/collections/1171/records/9386657',
    accessLabel: 'Open indexed marriage record',
  },
  {
    id: 33,
    title: 'George M. Meason census sequence, 1860–1880',
    citation:
      '1860 U.S. census, Clay Township, Shelby County, Missouri, p. 192, NARA M653, roll 657; 1870 U.S. census, Marion Township, Monroe County, Missouri, p. 658A, NARA M593, roll 793; 1880 U.S. census, Precinct 2, Dallas County, Texas, p. 157A, ED 60, NARA T9, roll 1299.',
    supports:
      'George is reported as age 50, 60, and 70 across the three schedules, consistently implying birth about 1810. The 1880 relationship column directly records 24-year-old James as George’s son, Eva as James’s wife and George’s daughter-in-law, and Fannie as George’s granddaughter; it also reports both of George’s parents born in Kentucky without naming them.',
    limitation:
      'Census ages and parental birthplaces depend on an unknown informant, and the 1860 and 1870 schedules predate the relationship column used in 1880. None of the schedules names George’s parents or proves a relationship to Benjamin.',
    url: 'https://www.ancestry.com/search/collections/6742/records/10544467',
    accessLabel: 'Open 1880 indexed census record',
  },
  {
    id: 34,
    title: 'Nowell–Sedberry descendant family-Bible page',
    citation:
      'Publicly shared “NOWELL/SEDBERRY FAMILY BIBLE PAGE 3,” reviewed through Ancestry Public Member Photos and Scanned Documents; shared 19 June 2020.',
    supports:
      'A descendant-held lineage note expands George’s middle initial as Mansfield, repeats a 10 May 1810 birth and 11 November 1887 death tradition, and names George Hollingsworth Meason in the later family.',
    limitation:
      'The page does not name Benjamin or Hannah as George’s parents or identify whom the Hollingsworth middle name was meant to honor. No title page, publication date, repository, or ownership chain was exposed, so it is family testimony rather than contemporary proof.',
    url: 'https://www.ancestry.com/search/collections/1093/',
    accessLabel: 'Search public member media',
  },
  {
    id: 35,
    title: 'Salem Association minutes, 1817',
    citation:
      'Minutes of the Salem Association of Baptists, Kentucky, Mill Creek Meeting-House, Nelson County, 26–27 September 1817; Boyce Digital Repository, handle 10392/6313.',
    supports:
      'The Salem row names William Kendall and Joseph Lewis as the congregation’s selected messengers in 1817, after Benjamin served in 1815 and 1816.',
    limitation:
      'Annual messenger selection is not a complete membership roll. Benjamin’s omission does not prove dismissal, migration, death, or absence from the congregation.',
    url: 'https://hdl.handle.net/10392/6313',
    accessLabel: 'Open repository item',
  },
  {
    id: 36,
    title: 'Mill Creek Baptist Church derivative transcript',
    citation:
      '“Mill Creek Baptist Church, Nelson Co., KY,” The Nelson County Genealogist 6, no. 3 (Spring 1990): 45–48.',
    supports:
      'The derivative transcript names B. Meason with Thomas Hubbard, James Nall, Ben Edwards, and Henry Cotton on the June 1810 meeting-house commission and Ben Meason with John Batsel as church sextons on 18 July 1812. The exact Nelson County chronology, recurring associates, and independent 1811 association record strongly identify the first two names as Benjamin. It also prints Bro Meason bringing an April 1813 discipline charge, where expanding the omitted given name to Benjamin is probable context rather than verbatim wording.',
    limitation:
      'This is a derivative transcript, not the original minutes or an independent source vote equal to the 1811 annual. The supplied pages have no byline, underlying church-book citation, manuscript image, transcriber, or custodian. They do not establish Benjamin’s admission, baptism, charter status, dismissal, transfer to Bardstown Salem, wife, family, birthplace, parents, or destination congregation. The privately preserved article scan is not cleared for republication or hotlinking.',
    url: 'https://www.ncgrky.com/_files/ugd/399665_4aeda8947d004116a5a1489004c959c3.pdf',
    accessLabel: 'Open the official contents document',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'The official contents document verifies the article citation; the reviewed article scan remains private and is not reproduced or hotlinked here.',
    },
  },
  {
    id: 37,
    title: 'James Lawrence “Jimmy” Meason senior yearbook entry',
    citation:
      'Family-held scan of a senior yearbook entry for Jimmy Meason; digital image in my family collection.',
    supports:
      'Provides a contemporary school portrait and records Jimmy’s participation in football, basketball, class leadership, the annual staff, and FFA.',
    limitation:
      'The surviving image does not show the yearbook title, school, publication year, or page number. Those publication details still need to be identified from the original volume.',
  },
  {
    id: 38,
    title: 'Cynthia June “Cindee” Meason formal school portrait',
    citation:
      'Family photograph preserved in my Google Photos collection; display-resolution copy reviewed 17 September 2026.',
    supports:
      'Provides the working portrait identification and full formal school portrait for Cynthia June “Cindee” Meason (1958–1991). The full image is the source of the tighter portrait-circle crop.',
    limitation:
      'The school, studio, exact date, original print custodian, and photographer have not yet been documented. This is a display-resolution copy rather than the original scan.',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['cynthia-school'],
      note: 'A reviewed display-resolution family photograph is available here with the identification limits stated above.',
    },
  },
  {
    id: 39,
    title: 'James Lawrence “Jimmy” Meason studio portrait',
    citation:
      'Family photograph preserved in my Google Photos collection; source filename “20200127_174408.jpg”; display-resolution copy reviewed 17 September 2026.',
    supports:
      'Provides the working portrait identification for James Lawrence “Jimmy” Meason (1934–1973) and visually agrees with his senior-year portrait.',
    limitation:
      'The photographer, studio, original date, and original print custodian have not yet been documented. This is a display-resolution copy rather than the full-resolution scan.',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['jimmy-studio'],
      note: 'A reviewed display-resolution family photograph is available here with the identification limits stated above.',
    },
  },
  {
    id: 40,
    title: 'James Lawrence Meason portrait',
    citation:
      'Family photograph from my family collection under the filename “2014-03-02 James Lawrence Meason 001.jpg”; full 939×1203 digital copy reviewed 17 September 2026.',
    supports:
      'Provides the working identification and full porch photograph for James Lawrence Meason (1892–1949). The handwritten caption reads “James Lawrence Meason,” and the full image is the source of the tighter portrait-circle crop.',
    limitation:
      'The filename date is not established as the photograph date, and the handwritten caption is not assumed to be James’s autograph. The date, place, photographer, original custodian, and independent identification remain to be documented.',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['james-1892-porch'],
      note: 'A reviewed full-frame family photograph is available here; its date and original provenance remain unresolved.',
    },
  },
  {
    id: 41,
    title: 'Mary Estelle Sledge Meason portrait',
    citation:
      'Family-tree photograph titled “elizabeth’s Mother,” preserved in my Ancestry media collection; full digital copy reviewed 17 September 2026.',
    supports:
      'Provides the working portrait identification and full standing photograph for Mary Estelle Sledge Meason (1896–1952), wife of James Lawrence Meason.',
    limitation:
      'The title identifies her only through a family relationship. The approximate date, place, photographer, original custodian, and independent identification remain to be documented.',
  },
  {
    id: 42,
    title: 'Franklin Meason portrait',
    citation:
      'Family-tree photograph titled “franklin meason at his home in Richardson, X,” preserved in my Ancestry media collection; full digital copy reviewed 17 September 2026.',
    supports:
      'Provides the working portrait identification and full seated home photograph for Franklin Meason (1850–1933). The image is the source of the tighter crop used in his portrait circle.',
    limitation:
      'The exact Richardson location, approximate date, photographer, original custodian, and independent identification remain to be documented.',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['franklin-home'],
      note: 'A reviewed family photograph is available here with the location and provenance limits stated above.',
    },
  },
  {
    id: 43,
    title: 'Christian Evangelist, October 1853',
    citation:
      'Christian Evangelist, volume 9, number 10 (October 1853); Abilene Christian University Special Collections digital repository.',
    supports:
      'Identifies a finite denominational issue to inspect for a death notice or life sketch near Benjamin Meason’s reported death.',
    limitation:
      'I verified the issue record, but the public PDF route returned HTTP 403 on 17 September 2026. I could not inspect any interior pages, so this does not show that no notice exists.',
    url: 'https://digitalcommons.acu.edu/sc_arc_journals/10/',
    accessLabel: 'Open issue record',
  },
  {
    id: 44,
    title: 'Christian Evangelist, November 1853',
    citation:
      'Christian Evangelist, volume 9, number 11 (November 1853); Abilene Christian University Special Collections digital repository.',
    supports:
      'Identifies the second finite denominational issue to inspect for a death notice or life sketch near Benjamin Meason’s reported death.',
    limitation:
      'I verified the issue record, but the public PDF route returned HTTP 403 on 17 September 2026. I could not inspect any interior pages, so this does not show that no notice exists.',
    url: 'https://digitalcommons.acu.edu/sc_arc_journals/9/',
    accessLabel: 'Open issue record',
  },
  {
    id: 45,
    title: 'Paris Mercury issue locator, 23 November 1853',
    citation:
      'Paris Mercury, 23 November 1853; State Historical Society of Missouri, Monroe County newspaper holdings, microfilm reel 33369.',
    supports:
      'Identifies the surviving local issue nearest Benjamin’s reported death for a focused notice and estate search.',
    limitation:
      'The issue is listed as available on microfilm rather than freely online. I could not inspect its interior pages through the public portal, so this does not show that no notice exists.',
    url: 'https://files.shsmo.org/research/newspapers/counties/Monroe.pdf',
    accessLabel: 'Open official holdings list',
  },
  {
    id: 46,
    title: 'James Lawrence “Jimmy” Meason and Julie Ann Lipke wedding portrait',
    citation:
      'Family photograph from my family collection under the filename “james and julie ann lipke.JPG”; digital copy reviewed 17 September 2026.',
    supports:
      'Provides a working identification of James Lawrence “Jimmy” Meason and Julie Ann Lipke together on their wedding day; the attribution agrees with the family-tree media title “Jimmy and Julie wedding.”',
    limitation:
      'The wedding date and place, photographer, original custodian, and independent identification of both likenesses remain to be documented.',
  },
  {
    id: 47,
    title: 'Franklin and Nancy Meason shared grave marker',
    citation:
      'Family-tree photograph titled “Franklin Meason and Nancy Meason Headstone,” preserved in my Ancestry media collection; digital copy reviewed 17 September 2026.',
    supports:
      'Shows the shared marker identifying Frank Meason and Nancy A. Meason as husband and wife. Nancy’s dates, 1852–1930, are legible.',
    limitation:
      'Franklin’s terminal year is weathered or obscured in this photograph. The cemetery, marker installation date, photographer, and original file provenance remain to be documented.',
  },
  {
    id: 48,
    title: 'Nelson County Pioneer reader query, 1980',
    citation:
      'The Nelson County Pioneer, volume 4, number 2 (Fall 1980), p. 43, reader query concerning Benjamin Meason and Hannah Doom.',
    supports:
      'Shows that the tradition naming George M. among Benjamin and Hannah’s children was in print before online family trees and that Benjamin’s parentage was already an open question.',
    limitation:
      'The item is a reader’s query, not a documented answer. It supplies no source for the George–Benjamin relationship or for the parentage claims it repeats.',
    url: 'https://www.ancestry.com/imageviewer/collections/62282/images/114577_fl4041597_1430854-00020?usePUB=true',
    accessLabel: 'Open published query image',
  },
  {
    id: 49,
    title: 'Will of Jacob Doom',
    citation:
      'Washington County, Kentucky, Will Book A, pp. 123–126; signed 4 June 1798 and proved 4 September 1798; Ancestry collection 9066, images 318–320.',
    supports:
      'Names Jacob’s wife Abigail, appoints Jacob Yoder executor, and directs a future equal division among Jacob’s children or their heirs while naming Sarah Grimes separately as a child and legal heir.',
    limitation:
      'Hannah is not named, but most children are deliberately handled as an unnamed class. Her omission therefore neither proves nor disproves that she was Jacob’s daughter, and the will gives no maiden surname for Abigail.',
    url: 'https://www.ancestry.com/imageviewer/collections/9066/images/004819653_00318?usePUB=true',
    accessLabel: 'Open will image',
  },
  {
    id: 50,
    title: 'Baptist Board mission receipt, 1815',
    citation:
      'Second Annual Report of the Baptist Board of Foreign Missions for the United States (1815), printed pp. 87 and 95, receipt dated 15 October 1815.',
    supports:
      'The receipt identifies “Benj. Meason” of Nelson County, Kentucky, as the person through whose hand a fifty-cent contribution was received immediately after the Salem Association meeting.',
    limitation:
      'The receipt gives no parent, relative, or local church and is contextual evidence of Benjamin’s Baptist network, not a membership or kinship record.',
    url: 'https://archive.org/details/annualreportofba00amer',
    accessLabel: 'Open digitized annual report',
  },
  {
    id: 51,
    title: 'Nelson circuit and chancery OCR search, 1798–1802',
    citation:
      'Nelson County, Kentucky, Circuit Court minutes, 1790–1805, FamilySearch DGS 8188441; chancery and court issue dockets, 1795–1817, DGS 8188442; OCR-guided search completed 17 September 2026.',
    supports:
      'None of the OCR results I reviewed in the target years connected Benjamin to Thomas, William, George, John, or Joseph Mason or Meason. The Benjamin results I opened fell in 1805 or 1816–1817 and stated no kinship.',
    limitation:
      'I used OCR to locate possible entries in difficult handwritten volumes, and the year filters also returned results from outside the target period. I did not read every page, so a relevant entry could still exist.',
  },
  {
    id: 52,
    title: 'My research-request log',
    citation:
      'My research log, 17 September 2026, recording two Missouri Archives requests and one Nelson County Genealogical Roundtable article request.',
    supports:
      'Documents that I submitted requests for the will, the broader estate file, and the Mill Creek article and was awaiting responses at that research checkpoint.',
    limitation:
      'This is a historical workflow record, not current evidence status. The recorded will was later recovered independently and is cited in reference 65; the Mill Creek article was later received and is cited in reference 36. The complete estate remains outstanding. Submission alone did not establish that any requested record existed or would answer a relationship question.',
  },
  {
    id: 53,
    title: 'B. T. “Uncle Ben” Meason in Foard County records',
    citation:
      'Foard County News, 11 July 1930, 14 June 1934, 3 September 1936, and 14 and 21 March 1940; Southwest Collection/Special Collections Library, Texas Tech University.',
    supports:
      'Contemporary coverage identifies the man as B. T. Meason and “Uncle Ben,” calls Ben a brother of James Reed Meason, and gives migration and family details consistent with the Benjamin or Ben in George M. and Martha Meason’s 1860 and 1870 households.',
    limitation:
      'The reviewed newspaper items use initials or “Ben” and never expand the T. His obituary does not name his parents, and the early censuses lack relationship columns.',
    url: 'https://newspapers.swco.ttu.edu/handle/20.500.12255/44107',
    accessLabel: 'Open the 1936 sibling obituary',
  },
  {
    id: 54,
    title: 'Benjamin Thomas name tradition and county-history locator',
    citation:
      'Imported Meason Family Tree and attached media titles reviewed 18 September 2026; one title attributes a B. T. Meason portrait to Bailey Phelps, They Loved the Land: Foard County History (1969), p. 216.',
    supports:
      'Preserves the inherited expansion “Benjamin Thomas Meason” and identifies a specific county-history page that may reveal whether Thomas appeared in print before the later family-tree title.',
    limitation:
      'The imported person cites only member trees, and the underlying county-history page has not been reviewed. The media title may be an uploader’s expansion. Even a contemporary Thomas expansion would not identify the intended honoree or prove either disputed ancestral edge.',
  },
  {
    id: 55,
    title: 'Benjamin Thomas Meason 1940 Texas death certificate',
    citation:
      'Texas Department of Health, Bureau of Vital Statistics, standard certificate of death no. 14422, Benjamin Thomas Meason, 12 March 1940, Hardeman County; FamilySearch image group 005144961, image 556 of 3537.',
    supports:
      'The original certificate spells out Benjamin Thomas Meason, gives his birth as 8 July 1857 in Missouri, and names his parents as Geo M Meason and Martha Reid. His daughter Mrs. L. P. Glover was the informant.',
    limitation:
      'The parentage fields are direct statements in an original official record, but the information is secondary because the daughter did not witness the 1857 birth. The certificate does not identify whom Thomas honored or establish either disputed ancestral relationship above George.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:33S7-9B9Z-QTS1?view=index',
    accessLabel: 'Open the original death certificate',
  },
  {
    id: 56,
    title: 'James Lawrence “Jimmy” Meason 1973 Texas death certificate',
    citation:
      'Texas Department of Health, Bureau of Vital Statistics, standard certificate of death no. 01993, James Lawrence Meason, 17 January 1973, Dallas County; “Texas, United States records, images,” FamilySearch, image 733 of 3497, image group 005145688; indexed-record ARK K3ZR-XYM.',
    supports:
      'The original certificate identifies James Lawrence Meason (1934–1973) and names his parents as Lawrence Meason and Mary Sledge. It independently corroborates the fuller parent names recorded on his contemporaneous 1934 birth certificate and birth-index entry.',
    limitation:
      'The parentage is a direct statement in an original official record, but it is secondary information supplied after the 1934 birth. The certificate gives the father only as Lawrence, not James Lawrence. I link to the original at FamilySearch rather than reproduce it here, and omit residential addresses and cause-and-manner details because they are not needed for the lineage.',
    accessLinks: [
      {
        label: 'Open the FamilySearch record',
        url: 'https://www.familysearch.org/ark:/61903/1:1:K3ZR-XYM',
      },
      {
        label: 'Open the original death certificate',
        url: 'https://www.familysearch.org/ark:/61903/3:1:33SQ-GY1S-39R9',
      },
    ],
  },
  {
    id: 57,
    title: 'James Lawrence Meason 1949 Texas death certificate',
    citation:
      'Texas Department of Health, Bureau of Vital Statistics, standard certificate of death no. 56380, James Lawrence Meason, 30 October 1949, Dallas County; “Texas, United States records, images,” FamilySearch, image 1952 of 3530; Texas State Registrar Office, image group 005145069.',
    supports:
      'The original certificate identifies James Lawrence Meason (1892–1949) and names his parents as Frank Meason and Nancy A. Huffines. Together with the 1973 certificate, it creates an explicit two-certificate chain from Jimmy to the older James Lawrence and then to Frank and Nancy.',
    limitation:
      'The parentage is a direct statement in an original official record, but it is secondary information supplied by Mary Meason about an 1892 birth. This certificate does not name Frank’s parents or prove that George M. Meason was Benjamin Meason’s son. I link to the FamilySearch image rather than reproduce the certificate or unnecessary medical and residential details.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:33S7-9YBB-9KDV?view=index',
    accessLabel: 'Open the original death certificate',
  },
  {
    id: 58,
    title: 'Frank Meason 1933 Texas death certificate',
    citation:
      'Texas State Department of Health, Bureau of Vital Statistics, standard certificate of death no. 27128, Frank Meason, 29 June 1933, Dallas County; “Texas, United States records, images,” FamilySearch, image 678 of 3622; Texas State Registrar Office, image group 005145224.',
    supports:
      'The original certificate identifies Frank Meason (1850–1933), names Nancy Ann Huffhines as his wife, and names his parents as George Mason and Martha Reed. Read with James Lawrence Meason’s 1949 certificate, it documents the direct chain from James Lawrence to Frank and then to George and Martha.',
    limitation:
      'The parentage is a direct statement in an original official record, but it is secondary information supplied after Frank’s 1850 birth. The certificate calls him Frank rather than Franklin, spells his father’s surname Mason, and contains an age inconsistent with its exact dates. George’s reported Moberly birthplace is not independently proved. The record does not name George’s parents or prove George was Benjamin Meason’s son. I link to FamilySearch rather than reproduce the certificate or unnecessary medical and residential details.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:33S7-9YB1-3G1R?view=index',
    accessLabel: 'Open the original death certificate',
  },
  {
    id: 59,
    title: 'Elder James Lawrence Meason 1919 Texas death certificate',
    citation:
      'Texas State Board of Health, Bureau of Vital Statistics, standard certificate of death no. 5174, James Lawrence Meason, 12 January 1919, Upshur County; “Texas, United States records, images,” FamilySearch, image 2333 of 3229; Texas State Registrar Office, image group 005145707.',
    supports:
      'The original certificate identifies an elder James Lawrence Meason, born about 1820 in Missouri according to the informant, and names Benjamin Meason as his father. Read with the 1900 Foard County census, it supports an indirect case that this elder James belonged to George M. Meason’s family cluster.',
    limitation:
      'The parentage and birthplace are secondary information supplied roughly a century after the reported birth. The certificate gives its informant only as J. R. Meason and states no relationship. This man has not been proved to be the 1855 James L.; Missouri records call that man Kentucky-born, and no migration record bridges them. Nor should he be merged with the separately recorded James S. Meason. The certificate does not mention George or prove that George was Benjamin’s son. I link to FamilySearch rather than reproduce the certificate or unnecessary medical and residential details.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:33SQ-GY14-6WDP?view=index',
    accessLabel: 'Open the original death certificate',
  },
  {
    id: 60,
    title: '1900 Foard County census — James L. Meason as uncle',
    citation:
      '1900 U.S. census, Foard County, Texas, Justice Precinct 1, supervisor’s district 3, enumeration district 27, sheets 7A–7B, dwelling and family 120, lines 44–52, James R. Meason household; enumerated 18 June 1900; National Archives microfilm publication T623.',
    supports:
      'The original two-page schedule records James R. Meason with his wife Eva and places a 76-year-old Missouri-born James L. Meason in their household, explicitly describing the elder James as James R.’s uncle. James R.’s age, spouse, birthplace, and family context strongly continue George M. and Martha Reed Meason’s son James and daughter-in-law Eva from the 1880 census.',
    limitation:
      '“Uncle” does not specify the paternal or maternal side, a blood or marriage relationship, or a looser family usage. Identifying the 1900 elder James with the 1919 decedent is strongly supported but still requires a cross-record conclusion, and the records disagree about whether he was widowed or single. The Missouri James L. was consistently recorded as Kentucky-born; this census does not bridge that birthplace conflict or the 1880–1900 record gap, or literally name George as the elder James’s brother or Benjamin’s son. The authenticated census images remain in the private research archive and are not reproduced here.',
    url: 'https://www.ancestry.com/imageviewer/collections/7602/images/4118464_00591?pId=43457280',
    accessLabel: 'Open the census at Ancestry',
  },
  {
    id: 61,
    title: 'John C. Kippers–Laura Ann Meason marriage return',
    citation:
      'Monroe County, Missouri, Marriage Book A, p. 222; marriage solemnized 5 March 1846 and filed 10 July 1846; Ancestry collection 1171, image vrmmo1833_c34891-0293.',
    supports:
      'The contemporary minister’s return directly calls Laura Ann Meason the daughter of Benjamin Meason, records her marriage to John C. Kippers, and states that both spouses were of lawful age and residents of Monroe County.',
    limitation:
      'The return does not name Laura’s mother, give her birth date, identify any sibling, or state a relationship between Benjamin and either George M. or James L. Meason. I link to the provider’s record rather than reproduce the privately preserved image.',
    url: 'https://www.ancestry.com/imageviewer/collections/1171/images/vrmmo1833_c34891-0293',
    accessLabel: 'Open the original marriage return',
  },
  {
    id: 62,
    title:
      '1860 Monroe County census — J. L. Mason, blacksmith, and neighboring households',
    citation:
      '1860 U.S. census, Clay Township, Monroe County, Missouri, post office Granville, p. 111, line 10, dwelling/family 746 (J. L. Mason); neighboring households continue on pp. 111–112; enumerated 16–17 July 1860; Ancestry collection 7667, images 4233984_00115–00116.',
    supports:
      'Page 111, line 10 explicitly lists 36-year-old Kentucky-born “J. L. Mason” living alone with occupation “Blacksmith.” The consecutive schedules place him near the Parker couple from the 1855 deeds, B. H. Hollingsworth, and John and Laura Kipper. The Kipper household includes David, Virginia, and Edwin Hollingsworth, who had lived with Benjamin and Hannah Mason in 1850. Their presence with Benjamin’s documented daughter Laura supports a continuing family network by cross-record inference. Age, place, and the deed network strongly support identifying J. L. as the Missouri James L.',
    limitation:
      'The census writes initials, not the full name James L.; that identity is a cross-record assessment. The household pattern contributes circumstantial support for linking J. L. to the 1850 James, but does not establish it or identify him with Benjamin’s will-named son James S. The schedule states no relationships among neighboring households, does not explain why the children lived with the Kippers or say that James worked with John, and does not prove that this Missouri man was the elder James later recorded in Texas. The Hollingsworth identifications depend on cross-record comparison. I link to the provider rather than reproduce the privately preserved census images.',
    url: 'https://www.ancestry.com/imageviewer/collections/7667/images/4233984_00115?pId=40504012',
    accessLabel: 'Open page 111, line 10 at Ancestry',
    accessLinks: [
      {
        label: 'Open page 112, Kipper household at Ancestry',
        url: 'https://www.ancestry.com/imageviewer/collections/7667/images/4233984_00116',
      },
    ],
  },
  {
    id: 63,
    title: '1870 Monroe County census — James L. Mason, miller',
    citation:
      '1870 U.S. census, Washington Township, Monroe County, Missouri, post office Shelbina, p. 31, printed p. 731, line 18, dwelling 199, family 206; enumerated 4 June 1870; NARA microfilm publication M593, roll 793; Ancestry collection 7163, image 4273712_00723.',
    supports:
      'The schedule records 46-year-old Kentucky-born James L. Mason as a miller in a Monroe County household immediately followed by three mill laborers. His name, age, birthplace, and county strongly continue the 1860 J. L. Mason identity.',
    limitation:
      'The census does not define James’s relationship to the household, identify the mill’s owner, or prove that his reported $1,000 in personal estate represented mill equipment. It does not by itself connect the Missouri man to the elder James later recorded in Texas. I link to the provider rather than reproduce the privately preserved image.',
    url: 'https://www.ancestry.com/imageviewer/collections/7163/images/4273712_00723',
    accessLabel: 'Open the census image at Ancestry',
  },
  {
    id: 64,
    title: '1880 Monroe County census — James L. Meason, sawmill proprietor',
    citation:
      '1880 U.S. census, Jackson Township, Monroe County, Missouri, enumeration district 54, p. 35, line 41, dwelling 344, family 360; enumerated 17 June 1880; Ancestry collection 6742, record 25450172.',
    supports:
      'The schedule records 55-year-old Kentucky-born James L. Meason as a single boarder and proprietor of a sawmill, followed by two boarders whose occupations are working in that sawmill. The consistent age, birthplace, county, and name complete a high-confidence Missouri working-life sequence from 1860 through 1880.',
    limitation:
      'The schedule does not name or locate the sawmill, establish legal ownership beyond the stated occupation, or prove that this was the elder James living in Texas in 1900 and 1919. Its single status conflicts with the 1900 census’s widowed entry, and the Missouri-to-Texas migration remains undocumented. I link to the provider rather than reproduce the privately preserved image.',
    url: 'https://www.ancestry.com/imageviewer/collections/6742/images/4242025-00559?pId=25450172',
    accessLabel: 'Open the census image at Ancestry',
  },
  {
    id: 65,
    title: 'Benjamin Meason’s recorded will and probate order',
    citation:
      'Monroe County, Missouri, recorded will-book copy, manuscript pp. 557–558; will dated 17 August 1853 and proved and recorded 7 September 1853; FamilySearch DGS 7646958, image 673.',
    supports:
      'The will directly names son James S. Meason and daughters Virginia Ann Hollingsworth and Emily Jane Meason. It gives James the farm and most personal property subject to debts and distributions, gives the daughters household bequests, adds silverware and a saddle horse for Emily, appoints James sole executor, and reserves forever a seventy-foot-square family burial ground containing Benjamin’s wife’s remains. The attached court order establishes probate and recording on 7 September 1853.',
    limitation:
      'This is a contemporary recorded will-book copy and probate order, not the surviving loose original. The recorded “B. Meason” signature is therefore not a verified autograph. A will need not name every child, so the omission of Laura, George, James L., or others does not exclude them; it also does not identify Benjamin’s wife or parents.',
    url: 'https://www.familysearch.org/search/film/007646958',
    accessLabel: 'Open FamilySearch film',
  },
  {
    id: 66,
    title: 'Meason Family Cemetery survey',
    citation:
      'Missouri DAR and cemetery records, typescript p. 102, “III. Meason Family Cemetery”; FamilySearch DGS 8218733, image 480.',
    supports:
      'The later survey names Hannah Doom Meason and Benjamin Meason, records Benjamin as having died in 1853, and places the cemetery in the northeast corner of the southeast quarter of the southeast quarter of Section 20, Township 55, Range 10. Read with the will’s reserved burial square, it strongly supports a shared family burial place.',
    limitation:
      'This is a derivative typescript survey, not a contemporary burial register or marker photograph; the page gives no survey date, compiler, coordinates, or inscription detail. Its Range 10 description conflicts with Benjamin’s known Section 20 patent in Range 11, so it does not prove that the patent tract was the burial farm or support a precise modern map pin.',
    url: 'https://www.familysearch.org/search/film/008218733',
    accessLabel: 'Open FamilySearch film',
  },
  {
    id: 67,
    title: 'Benjamin Meason conveys his interest as Joseph Meason’s heir',
    citation:
      'Union County, Kentucky, deed book, manuscript pp. 106–108; instrument dated and acknowledged 7 July 1813 and recorded 28 September 1813; FamilySearch DGS 8573278, images 72–73.',
    supports:
      'The recorded deed directly calls Benjamin Meason of Nelson County “one of the heirs at law” of Joseph Meason deceased and conveys Benjamin’s undivided interest in Joseph’s 1,000-acre Highland Creek tract to James Meason of Claiborne County, Mississippi Territory.',
    limitation:
      '“Heir at law” does not mean “son.” Benjamin could have inherited through a child, sibling, or another statutory branch. The deed does not name his father or mother, state his precise relationship to Joseph, or authorize placing Joseph above him in the tree.',
    url: 'https://www.familysearch.org/search/film/008573278',
    accessLabel: 'Open FamilySearch film',
    accessLinks: [
      {
        label: 'Open image 72 in the FamilySearch film',
        url: 'https://www.familysearch.org/search/film/008573278?i=71',
      },
      {
        label: 'Open image 73 in the FamilySearch film',
        url: 'https://www.familysearch.org/search/film/008573278?i=72',
      },
    ],
    visualAccess: {
      status: 'external-volume-only',
      note: 'Images 72–73 are preserved for research, but reuse rights remain pending; the page-indexed links open numbered images inside the provider-bound FamilySearch film, not public hosted previews.',
    },
  },
  {
    id: 68,
    title: 'Joseph Meason’s brothers and collateral heirs',
    citation:
      'Union County, Kentucky, deed book, manuscript pp. 111–115; instrument dated 14 May 1813, acknowledged in Fairfield County, Ohio, 1 June 1813, and recorded 28 September 1813; FamilySearch DGS 8573278, images 74–76.',
    supports:
      'The deed identifies John and Samuel Mason as brothers of Joseph Mason and names children of both brothers among Joseph’s heirs at law. The sibling names and the neighboring heir deeds strongly associate this Joseph with the family named in Thomas Meason senior’s 1779 will and show that Joseph’s estate passed through collateral branches.',
    limitation:
      'The deed does not name Benjamin, identify Thomas Meason senior as Joseph’s father, or assign Benjamin to John, Samuel, Thomas, or any other sibling branch. It makes Thomas born in 1755 a serious candidate father, not a proved or uniquely selected one.',
    url: 'https://www.familysearch.org/search/film/008573278',
    accessLabel: 'Open FamilySearch film',
    accessLinks: [
      {
        label: 'Open image 74 in the FamilySearch film',
        url: 'https://www.familysearch.org/search/film/008573278?i=73',
      },
      {
        label: 'Open image 75 in the FamilySearch film',
        url: 'https://www.familysearch.org/search/film/008573278?i=74',
      },
      {
        label: 'Open image 76 in the FamilySearch film',
        url: 'https://www.familysearch.org/search/film/008573278?i=75',
      },
    ],
    visualAccess: {
      status: 'external-volume-only',
      note: 'Images 74–76 are preserved for research, but reuse rights remain pending; the page-indexed links open numbered images inside the provider-bound FamilySearch film, not public hosted previews.',
    },
  },
  {
    id: 69,
    title: 'William Mason conveys his Highland Creek interest',
    citation:
      'Union County, Kentucky, Deed Book A, manuscript pp. 70–71; instrument dated 27 April 1811, acknowledged in Henderson County 15 May 1811, and recorded in Union County 19 August 1811; FamilySearch DGS 8573278, image 24.',
    supports:
      'William Mason of Ohio, expressly identified as a son of Thomas Mason deceased, conveyed his interest in the 200 Highland Creek acres to two Henderson County grantees, including Leonard Jones. The first surname is difficult in this image and is resolved as James C. Wardlow by the later case record.',
    limitation:
      'The deed confirms the Thomas-to-William relationship and extends the title chain, but it does not state Joseph’s relationship to Thomas or William and does not name Benjamin.',
    url: 'https://www.familysearch.org/search/film/008573278',
    accessLabel: 'Open FamilySearch film',
  },
  {
    id: 70,
    title: 'Wardlow and Jones v. Higgins ejectment abstract',
    citation:
      'George B. Simpson, Biography of Judge Peter Casey, his court, and contemporaries (1811–1812), printed p. 130; FamilySearch Digital Library item 103297, image 141; court entry dated 11 March 1812.',
    supports:
      'The derivative abstract identifies an ejectment involving Wardlow and Jones and 200 acres within Edmond Rice’s 1,000-acre patent, strongly matching William Mason’s Highland Creek title branch.',
    limitation:
      'This is a derivative abstract rather than the original case file. It does not print “Highland Creek,” resolve title, identify Higgins with the mapped mill, or add any kinship statement.',
    url: 'https://www.familysearch.org/library/books/viewer/103297/?offset=0#page=141&viewer=picture',
    accessLabel: 'Open the case abstract',
  },
  {
    id: 71,
    title: 'Munsell and Anderson’s 1818 Kentucky map',
    citation:
      'Luke Munsell and Hugh Anderson, A map of the State of Kentucky: from actual survey; also part of Indiana and Illinois (Frankfort, 1818), Copy 1; Library of Congress Geography and Map Division, control no. 75653132.',
    supports:
      'The contemporary map labels Highland Creek, Higgins’ Mill, Carthage, Mason’s Creek, and nearby western Kentucky geography.',
    limitation:
      'The map is geographic context, not a parcel survey. It does not prove that the mapped Higgins was the ejectment defendant, place either mill inside William’s 200 acres, or show a Mason residence.',
    url: 'https://www.loc.gov/resource/g3950.ct003777a/',
    accessLabel: 'Open the original map',
    visualAccess: {
      status: 'reviewed-preview',
      previewMediaIds: ['highland-creek-map-1818'],
      note: 'A reviewed detail of the public Library of Congress map is available here; the external link opens the original map.',
    },
  },
  {
    id: 72,
    title: 'Union County Mason deed-index review, 1816–1835',
    citation:
      'Union County, Kentucky, grantor index E–N and grantee index I–S, complete Mason surname runs for 1816–1835; FamilySearch DGS 8193444, images 476–478, and DGS 8193441, images 185–188.',
    supports:
      'No responsive indexed Mason principal-party conveyance, partition, consolidation, release, commissioner deed, or backward recital tied to the Highland Creek tract was found in the reviewed period.',
    limitation:
      'This is a bounded principal-party index negative. It cannot exclude an unindexed or misfiled instrument, an incidental recital, a court proceeding, or a deed indexed only under another surname.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSLX-26K9',
    accessLabel: 'Open the grantor index page',
  },
  {
    id: 73,
    title: 'Ann Meason–Hugh Quigley premarital agreement',
    citation:
      'Westmoreland County, Pennsylvania, Deed Book 3, pp. 443–444; agreement dated 21 March 1786, acknowledged 11 June 1798, and recorded 20 June 1798; FHL film 929167, DGS 8085360, images 676–677.',
    supports:
      'The agreement calls Ann Meason the “widow and relict” of deceased Thomas Meason, says Ann and Hugh Quigley intended to marry, and protects Ann’s share of land to be sold under Thomas’s last will. Together with the matching Quigley and Westbay roles in the 1785 will, it establishes that Thomas Meason of Hempfield was dead by 21 March 1786 and therefore cannot be the living Kentucky Thomas documented in 1788 and 1795.',
    limitation:
      'The agreement does not name Benjamin, identify his parents, prove that Ann and Hugh later married, or connect Hempfield Thomas to Thomas Meason senior. Its 1798 acknowledgment and recording dates do not change the agreement’s 21 March 1786 date or the widow statement made then.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSNP-DSM3-9',
    accessLabel: 'Open the agreement',
    accessLinks: [
      {
        label: 'Opening page · image 676',
        url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSNP-DSM3-9',
      },
      {
        label: 'Continuation · image 677',
        url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSNP-DSMC-H',
      },
    ],
    visualAccess: {
      status: 'external-original-only',
      note: 'Exact external links are available for both original deed-book pages; no local public preview has been approved.',
    },
  },
  {
    id: 74,
    title: 'James Lawrence Meason 1934 Texas birth-index entry',
    citation:
      'Texas Department of Health, Bureau of Vital Statistics, statewide birth index, 1934 births, cycle 01 through 99, p. 1279, James Lawrence Meason, 26 October 1934, Dallas County (county code 057); Ancestry collection 8781, image TXBTH_1934_000514l, record 152492117.',
    supports:
      'The statewide index records the child as James Lawrence Meason, born 26 October 1934 in Dallas County, the father as James Lawrence Meason, and the mother as Mary Estelle Sledge. The entry matches Jimmy’s documented identity and strongly corroborates the parent names reported on his 1973 death certificate.',
    limitation:
      'This is a derivative index entry, not the underlying birth certificate or a second original event record. The reviewed index image is not cleared for public reproduction.',
    url: 'https://www.ancestry.com/search/collections/8781/records/152492117',
    accessLabel: 'Open the Ancestry record',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'A stable provider record page is linked, but the reviewed index image is not publication-cleared and is not reproduced here.',
    },
  },
  {
    id: 75,
    title: 'James Lawrence Meason 1934 Texas birth certificate',
    citation:
      'Texas State Department of Health, Bureau of Vital Statistics, standard certificate of birth for James Lawrence Meason, 26 October 1934, Dallas County, state file no. 80844, register no. 29; FamilySearch indexed-record ARK K6GQ-G18, image ARK 33SQ-GTHM-DP; accessed 21 September 2026.',
    supports:
      'The contemporaneous certificate records the child as James Lawrence Meason, the father as James Lawrence Meason, and the mother as Mary Estelle Sledge. It is the strongest reviewed source for these recorded parent-child relationships.',
    limitation:
      'The privately preserved certificate image is not cleared for public reproduction; the public link opens the corresponding FamilySearch record page.',
    url: 'https://www.familysearch.org/ark:/61903/1:1:K6GQ-G18',
    accessLabel: 'Open the FamilySearch record',
    visualAccess: {
      status: 'external-original-only',
      note: 'The stable FamilySearch record page is available externally; the privately preserved certificate image is not copied or hotlinked here.',
    },
  },
  {
    id: 76,
    title: '1940 Richardson household — James L. Meason family',
    citation:
      '1940 United States census, Richardson, Dallas County, Texas, household of James L. Meason; Ancestry collection 2442, record 155810441, image m-t0627-04016-00037; FamilySearch indexed-record ARK KWJL-2PF.',
    supports:
      'The reviewed household image places James L. Meason, Mary, and young Jimmie together in Richardson, independently corroborating the family association recorded by the 1934 birth certificate and later records.',
    limitation:
      'The full-resolution schedule has not yet been preserved, and the enumeration district, sheet, line, address, and adjacent household context remain unverified. The household association does not by itself establish a narrower biological, legal, or adoptive relationship subtype.',
    accessLinks: [
      {
        label: 'Open the Ancestry record',
        url: 'https://www.ancestry.com/search/collections/2442/records/155810441',
      },
      {
        label: 'Open the FamilySearch record',
        url: 'https://www.familysearch.org/ark:/61903/1:1:KWJL-2PF',
      },
    ],
    visualAccess: {
      status: 'text-only-deferred',
      note: 'Stable provider record pages are linked, but no reviewed public preview is available.',
    },
  },
  {
    id: 77,
    title: 'Ralph Cherry bill of sale to Isaac Mason',
    citation:
      'Fairfield County, Ohio, deed book, manuscript pp. 309 and 354; bill of sale dated 13 October 1807 and repeated in the recorded books in 1808; FamilySearch DGS 8141949, images 548 and 576; original grantee index, DGS 7900699, image 97, p. 39.',
    supports:
      'Ralph Cherry of Fairfield County sold livestock to Isaac Mason of the same county, with Samuel Randall and Lydia Carty as witnesses. Isaac and Samuel are controlled members of the family group named in the 1813 collateral-heir deed, making the instrument a useful pre-1813 associate-cluster confirmation.',
    limitation:
      'The instrument does not name Elizabeth Cherry, call Ralph her husband, name John Mason, state kinship, or supply a child or heir roster. Lydia Carty is preserved as written and is not merged with Caty/Martha Randal. The repeated recording is the same transaction, not an independent event.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSKH-QNBQ',
    accessLabel: 'Open the first recorded copy',
    accessLinks: [
      {
        label: 'First recording · manuscript page 309',
        url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSKH-QNBQ',
      },
      {
        label: 'Repeated recording · manuscript page 354',
        url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSKH-QNLR',
      },
      {
        label: 'Original grantee-index page',
        url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CS4T-S1PJ',
      },
    ],
    visualAccess: {
      status: 'external-original-only',
      note: 'Exact FamilySearch links open the two recorded copies and original index page; privately preserved images are not copied, republished, or hotlinked here.',
    },
  },
  {
    id: 78,
    title: 'Isaac and Rachel Mason deed to Henry Kistler',
    citation:
      'Fairfield County, Ohio, Deed Book J, p. 346; Isaac Mason and Rachel his wife to Henry Kistler, instrument dated 19 June 1815 and recorded 25 August 1815; FamilySearch DGS 8585332, image 448.',
    supports:
      'The deed confirms the exact Isaac-and-Rachel couple named in the 1813 collateral-heir deed and recites a federal patent to Isaac for the conveyed half-section.',
    limitation:
      'The deed names no John, inheritance, or heir relationship. Its patent recital does not resolve any earlier entry, warrant, or equitable right, identify John or his family, or provide a sibling or heir list.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-C37L-S9XT-S',
    accessLabel: 'Open the recorded deed',
    visualAccess: {
      status: 'external-original-only',
      note: 'The exact FamilySearch page is available externally; the privately preserved image is not copied, republished, or hotlinked here.',
    },
  },
  {
    id: 79,
    title: 'Richard Holmes–Elizabeth Cherry marriage return',
    citation:
      'Fairfield County, Ohio, marriage return for Richard Holmes and Elizabeth Cherry, married 12 December 1816 and returned 6 January 1817; FHL film 295268, DGS 4016266, image 121.',
    supports:
      'The bride’s name, Fairfield County setting, and widow chronology make her a plausible continuation of Elizabeth or Betty Cherry, John Mason’s daughter in the 1813 collateral-heir deed.',
    limitation:
      'The return contains no Mason or Meason relationship and no unique associate control. The bride remains an unresolved identity candidate and must not be merged with John’s daughter or used to add Richard Holmes as her proved spouse.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:9392-919L-C5',
    accessLabel: 'Open the marriage return',
    visualAccess: {
      status: 'external-original-only',
      note: 'The exact FamilySearch page is available externally; the privately preserved image is not copied, republished, or hotlinked here.',
    },
  },
  {
    id: 80,
    title: 'Court entry and depositions proving Joseph Meason’s oral will',
    citation:
      'Henderson County, Kentucky, Will Book A, p. 104 and continuation; depositions concerning Joseph Meason’s declaration of 29 March 1799, ordered recorded 6 August 1799; FamilySearch DGS 4819887, images 137–138.',
    supports:
      'Mary Hartle, John Carnahan, and Rachel Thompson described Joseph very ill aboard a Kentucky boat on the Monongahela about a mile above Pittsburgh, his request for a deed drawn to convey land to Joseph Worthington that could not be reached among packed effects, his spoken declaration, and his death soon afterward. Carnahan and Thompson described the 1,000-acre Highland Creek tract.',
    limitation:
      'This is a clerk’s will-book copy of a court order and witness depositions, not Joseph’s handwritten will or the requested deed. It gives no illness, boat origin or destination, deed execution or fate, or final land-title outcome. It does not establish that no separate writing ever existed.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:33SQ-GPQM-9N2B',
    accessLabel: 'Open first page at FamilySearch',
    accessLinks: [
      {
        label: 'First page · court entry and depositions',
        url: 'https://www.familysearch.org/ark:/61903/3:1:33SQ-GPQM-9N2B',
      },
      {
        label: 'Continuation · depositions',
        url: 'https://www.familysearch.org/ark:/61903/3:1:33SQ-GPQM-9NV2',
      },
    ],
    visualAccess: {
      status: 'external-original-only',
      note: 'The two original record pages are linked at FamilySearch; privately preserved images are not republished here. The story provides a reviewed abstract, not a full transcription.',
    },
  },
  {
    id: 81,
    title: 'Kentucky’s 1797 wills act',
    citation:
      'William Littell, The Statute Law of Kentucky, vol. 1 (Frankfort, 1809), chapter CCXCIII, pp. 611–615, reproducing the 1797 act concerning wills and testaments.',
    supports:
      'The act required a land devise to be in writing and signed; its rules for oral wills did not remove that land-devise requirement.',
    limitation:
      'The statute explains why Joseph’s spoken declaration alone was not a written devise of Highland Creek. It does not determine whether the requested deed was signed, delivered, later recovered, or legally effective, or resolve the tract’s later title.',
    url: 'https://archive.org/details/LittellsStatutesVol1/page/n625/mode/2up',
    accessLabel: 'Read the statute volume',
    visualAccess: {
      status: 'external-original-only',
      note: 'The public-domain statute volume is linked at Internet Archive; no page image is reproduced here.',
    },
  },
  {
    id: 82,
    title: 'Kentucky boats were inland flatboats',
    citation:
      'National Park Service, “Flatboats: Transportation During the Cherokee Removal 1837–1839,” updated 21 December 2021.',
    supports:
      'Flatboats were also called Kentucky boats and commonly carried people and cargo downstream on inland rivers. This explains the boat term in Joseph’s deposition without identifying his particular craft or itinerary.',
    limitation:
      'This later historical overview supplies general boat context, not evidence of Joseph’s departure point, destination, reason for travel, illness, or whether the boat was moving when he died.',
    url: 'https://home.nps.gov/articles/000/flatboats-transportation-during-the-cherokee-removal-1837-1839.htm',
    accessLabel: 'Read National Park Service context',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'Historical context is linked; no illustration is used as a depiction of Joseph’s boat.',
    },
  },
  {
    id: 83,
    title: 'Mary Meason 1952 Texas death certificate',
    citation:
      'Texas death certificate for Mary Meason, 1952, Dallas County; Ancestry collection 2272, record 22407326, certificate front.',
    supports:
      'Names her father as Jack Sledge and mother as Elizabeth Hetzer, as typed.',
    limitation:
      'The certificate does not call Jack Ira or Mary Estelle. The typed mother surname is Hetzer; Netzer remains unverified. Her reported birth year conflicts with the 1900 census. A possible reverse was not independently reviewed.',
    url: 'https://www.ancestry.com/search/collections/2272/records/22407326',
    accessLabel: 'Open provider record',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'The reviewed certificate front is summarized; private image bytes are not republished.',
    },
  },
  {
    id: 84,
    title: 'Mary in the 1900 Dallas Sledge household',
    citation:
      '1900 United States census, Dallas Ward 12, Dallas County, Texas, enumeration district 125, sheet 5B, Jack and Lizzie Sledge household; NARA T623 roll 1625; Ancestry collection 7602, record 70512902.',
    supports:
      'Places daughter Mary in the household of Jack and Lizzie Sledge, supporting the later Mary Meason identity bridge.',
    limitation:
      'The identity with the later Mary Meason is an inference. The census reports birth year 1897, while her 1952 death certificate reports 1896.',
    url: 'https://www.ancestry.com/search/collections/7602/records/70512902',
    accessLabel: 'Open provider record',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'The provider record is linked; private census image bytes are not republished.',
    },
  },
  {
    id: 85,
    title: 'Mary in the 1910 Lathram household',
    citation:
      '1910 United States census, Lathram Township, Caddo County, Oklahoma, enumeration district 67, sheet 6A, Ira and Lizzie household; NARA T624 roll 1245; Ancestry collection 7884, record 22769222.',
    supports:
      'Places daughter Mary with Ira and Lizzie in the later household, contributing to the Jack/Ira and Mary identity analysis.',
    limitation:
      'The census association alone does not prove that Jack and Ira were the same man or identify the later Mary Meason without correlation.',
    url: 'https://www.ancestry.com/search/collections/7884/records/22769222',
    accessLabel: 'Open provider record',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'The provider record is linked; private census image bytes are not republished.',
    },
  },
  {
    id: 86,
    title: 'Francis and John in the 1860 Tishomingo census sequence',
    citation:
      '1860 United States census, Tishomingo County, Mississippi, NARA M653 roll 593, manuscript pp. 145, 147, 148, 146, 6 August 1860; Ancestry collection 7667, frames 4233376_00149–00152.',
    supports:
      'Francis M. Sledge starts household 958 on p. 145, line 40. Its continuation on p. 147 includes John Sledge, age 10, at line 7; household 959 starts at line 12.',
    limitation:
      'The schedule has no relationship column, so the shared household does not directly establish parentage. Page 146 follows page 148 in household sequence; Sarah Bass belongs to household 969, not Francis’s household.',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'Reviewed four-frame sequence is summarized; private census image bytes are not republished.',
    },
  },
  {
    id: 87,
    title: 'Francis and John in the 1870 Alcorn household',
    citation:
      '1870 United States census, Alcorn County, Mississippi, NARA M593 roll 720, manuscript pp. 31–32, F M Sleage and John household; Ancestry collection 7163, record 36514689.',
    supports:
      'Records F M Sleage, age 59 and Georgia-born, and John, age 21 and Mississippi-born, in the same complete household.',
    limitation:
      'The form supplies neither John’s middle initial nor relationship to the head; identification with later John W. Sledge and fatherhood are indirect questions.',
    url: 'https://www.ancestry.com/search/collections/7163/records/36514689',
    accessLabel: 'Open provider record',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'Provider record is linked; private census image bytes are not republished.',
    },
  },
  {
    id: 88,
    title: '1798 Hancock County will of John Sledge',
    citation:
      'Hancock County, Georgia, Will Book AA, pp. 18–19, will dated 17 April 1798; FamilySearch DGS 5759601, image 273.',
    supports:
      'The recorded will directly calls Collin Sledge the testator John Sledge’s son.',
    limitation:
      'The will does not style the testator Jr. and does not by itself identify him with a compiled patriot or establish Revolutionary service. The derivative 14 April date is superseded by the original record.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3QS7-893L-5J5D',
    accessLabel: 'Open will-book image',
    visualAccess: {
      status: 'external-original-only',
      note: 'The FamilySearch image is linked externally; private image bytes are not republished.',
    },
  },
  {
    id: 89,
    title: '1834 Pike County deed witnessed by Francis M. Sledge',
    citation:
      'Pike County, Georgia, Deed Book C, p. 13, Crawley to Zilpha Sledge, 1834; FamilySearch DGS 8152116, image 288.',
    supports:
      'Names Francis M. Sledge as a witness to Zilpha Sledge’s purchase.',
    limitation:
      'Witnessing a deed states no kinship between Francis and Zilpha or Collin Sledge.',
    url: 'https://www.familysearch.org/ark:/61903/3:1:3Q9M-CSKJ-Y9J3-8',
    accessLabel: 'Open deed-book image',
    visualAccess: {
      status: 'external-original-only',
      note: 'The FamilySearch image is linked externally; private image bytes are not republished.',
    },
  },
  {
    id: 90,
    title: 'Tishomingo school fund account book name index',
    citation:
      'Tishomingo County Historical & Genealogical Society, School Fund Accounts Book (2005), alphabetical name index, PDF p. 34, printed p. 228, Sledge entries.',
    supports:
      'The derivative index points Barbery Ann, Francis, John, and William Sledge to manuscript p. 19, and Barbery A., John W., Mary F., Sabra Jane, and William Sledge to manuscript p. 42.',
    limitation:
      'This is a name locator, not the original account book. Manuscript pp. 19 and 42, their columns, and continuations have not been reviewed. Shared surname or page number does not establish household, identity, or kinship. A separate school-record index has different page numbers that cannot be transferred here.',
    url: 'https://www.msgw.org/tishomingo/1856_1859SchoolFundAccountBook.pdf',
    accessLabel: 'Open society name index',
    visualAccess: {
      status: 'text-only-deferred',
      note: 'The derivative PDF is linked with attribution; its pages and any future archive scans are not republished.',
    },
  },
];
const publication = {
  status: 'published',
  privacy: 'public',
  reviewedOn: '2026-09-21',
} as const;

export const references: readonly Reference[] = referenceCatalog.map(
  (entry) => ({
    ...entry,
    publication:
      entry.id >= 80
        ? {
            ...publication,
            reviewedOn:
              entry.id >= 90
                ? '2026-09-26'
                : entry.id >= 83
                  ? '2026-09-24'
                  : '2026-09-22',
          }
        : publication,
  })
);
