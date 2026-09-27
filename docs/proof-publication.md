# Reviewed proof publication

Geneaology owns canonical claims, evidence, reviews and research status. This
repository owns their reviewed public presentation. Proof paths remain linear;
side evidence belongs to the supporting argument for a link.

## Import procedure

1. Export the current public reference IDs with
   `npm run proofs:import -- --references /tmp/public-reference-ids.json`.
   In the private repository, run its proof validation and export an explicitly
   approved public candidate to a temporary file. Read every pending item in the
   private publication handoff and record a disposition for each.
2. Review candidate prose, citations, privacy, image rights, current review
   status and the public diff. JSON validation does not establish genealogical
   truth or determine whether arbitrary prose is safe to publish.
3. For the initial migration only, review the existing tracked proof JSON and
   add `--bootstrap` to the import command. Subsequent imports require the
   current generated files to match their provenance before any write. Preserve
   and reconcile a manual edit if this check fails; do not erase the manifest.
   From this repository, run
   `npm run proofs:import -- /absolute/path/to/candidate.json --write`.
4. Run `npm run validate:content`, `npm run validate:genealogy`, and
   `npm run build:genealogy`. Submit the reviewed diff through a website PR.
   Report the commit, checks and handoff dispositions to the genealogy owner.

The importer accepts only schema version 1 with complete `meason` and `sledge`
projects. Its recursive allowlist rejects unknown fields, invalid types,
missing public reference IDs, broken paths, malformed GPS statuses and
incomplete claim provenance. The first manifest claim IDs correspond to the lineage steps in order;
remaining IDs cover supporting parts and dependency closure. Claims shared across projects must have
identical person labels, relationship kind and GPS assessment. Manifest claim
revisions are positive integers. Optional `sourceRevision` is a full commit SHA
and must identify the actual canonical source snapshot when supplied.

## Generated files and drift

`packages/genealogy-content/src/proofs/{meason,sledge}.json` are generated
public content. `provenance.json` records canonical claim IDs/revisions, ordered
project membership and SHA-256 hashes of both outputs. It contains no private
file locations, evidence bytes, contact details or correspondence.

Run `npm run proofs:check` to detect edits to generated content, missing files,
unexpected files or invalid provenance. To compare against a specific approved
candidate, run `npm run proofs:import -- /absolute/path/to/candidate.json --check`.
Neither check writes files. Normal site builds consume only committed public
JSON and never discover or read the private repository. There is no background
LLM, scheduled publisher or automatic website merge.

The generated JSON is excluded from Prettier so formatting hooks do not
change bytes after provenance is calculated.

The manifest detects accidental drift; someone deliberately changing both the
JSON and its hashes can bypass that comparison. PR review and comparison with
the canonical candidate remain the publication authority. Make corrections in
the canonical proof, review its public wording, and re-export.

## Pending research handoff disposition for this migration

- **2026-09-25-sledge-school-fund-index-locator:** already represented in the
  Sledge proof's Francis–John evidence and next test. The manuscript pages remain
  unseen and no kinship is inferred from the derivative index.
- **2026-09-24-sledge-1870-household-and-1860-boundary:** already represented as
  repeated co-residence, with parentage and later John W. identity still open.
- **2026-09-24-sledge-1860-francis-john-household-sequence:** already represented
  with the corrected four-page order and the unresolved parentage boundary.
- **2026-09-24-sledge-originals-and-open-chain:** already represented with Mary's
  recorded parents, Jack/Ira uncertainty, Hetzer transcription, 17 April 1798
  will date and incomplete ancestral/service chain. No new tree edge or SAR
  eligibility claim is introduced.
- **2026-09-26-hsp-minter-title-and-index-correction:** assessed during the
  migration. Existing proof prose makes no complete-negative index claim or
  misdated Davis-witness claim. The new title/debt sequence does not establish
  Benjamin's parentage or resolve the later Thomas's identity. A broader
  references/case/story update remains deferred; no private images are imported.

The genealogy owner records final completion against the reviewed candidate,
website commit and validation results; these dispositions do not themselves
mark the private handoff integrated.

- **2026-09-26-canonical-proof-migration:** imported from committed research
  revision `f94760bd371df0924f52ebdd9eaee3cbe9ead0a3`. Both generated public
  project objects are semantically identical to the previously published JSON;
  the changes establish generated ownership and provenance, not new findings.

## Nearest-linkage publication review — 26 September 2026

This pass reviews the three nearest incomplete assessments against the current
private research and preserves their remaining uncertainty. It introduces no
new relationship edge, member-tree evidence, private image, or living-person
scope. The source revision and exact claim revisions are recorded in generated
`provenance.json` after candidate import.

- **2026-09-26-nearest-linkages-gps-review:** addressed in the Meason and Sledge
  proof paths. James → Frank/Franklin remains documented / work-remains;
  compatible name variation is no longer treated as a material conflict.
  Mary → Jack and Jack = Ira become supported-inference / near-ready. Existing
  evidence and correlation replace mandatory marriage/alias-record language;
  age, informant, research-scope and natal-field limits remain explicit.
  Reference 76 now cites the complete reviewed 1940 household, and reference 58
  distinguishes identifying Frank from independently naming James as his child.
- **2026-09-25-sledge-school-fund-index-locator:** already represented in the
  Francis–John evidence and next test; manuscript pages remain unseen and the
  derivative index establishes no kinship.
- **2026-09-24-sledge-1870-household-and-1860-boundary:** already represented;
  repeated co-residence remains distinct from parentage and later identity.
- **2026-09-24-sledge-1860-francis-john-household-sequence:** already represented
  with the corrected page sequence and unresolved parentage.
- **2026-09-24-sledge-originals-and-open-chain:** already represented, with the
  nearest Mary/Jack/Ira assessments updated in this pass. Hetzer remains the
  certificate transcription; the possible reverse remains unreviewed. The
  1798 will date and incomplete ancestral/service chain are unchanged.
- **2026-09-26-hsp-minter-title-and-index-correction:** broader references,
  case and story work remains deferred to a separate editorial pass. The proof
  content contains neither a complete-negative grantor-index claim nor a
  misdated Davis-witness claim; this title/debt sequence establishes no new
  parentage or later Thomas identity.

Affected public surfaces are `/proofs/meason`, `/proofs/sledge`, and
`/sources` references 58 and 76. These are
website review dispositions; the genealogy integration owner verifies the
website commit and checks before recording completion in the private handoff.

At that publication, a nonblocking follow-up remained in the Jimmy-parentage
assessment: its older description of incomplete 1940 locators required
reconciliation with reference 76 through the canonical private projection.
The reconciliation and editorial handover below resolves this follow-up.
The corrected source catalog and this pass's three assessments use the complete
reviewed household; no generated JSON was edited by hand to fix that older text.

## Meason census publication review — 27 September 2026

This pass uses the independently reviewed census findings to update the two
narrow parentage assessments, James → Frank/Franklin and Frank/Franklin →
George, to documented / GPS met. It adds references 92–95 with original census
locators. The 1860/1870 household associations corroborate the explicit
certificate evidence; they are not presented as direct parentage statements.
The 1900/1910 schedules explicitly record sons, with the later James Lawrence
identity established by correlation. Exact birth-date and birthplace
uncertainties remain visible. No new tree edge or broader ancestor conclusion
is introduced, and member trees remain locators rather than proof evidence.

All six pending handoff items were reviewed together:

- **2026-09-27-meason-parentage-census-proof-closure:** addressed in the Meason
  proof path, its supporting explanation and references 92–95. The 1870
  citation uses dwelling 330 / family 335; the 1900 overwritten household
  numbers remain qualified; the 1910 son retains the literal name Larance.
  James's 1892/1893 birth-year difference, Frank's age/date discrepancy and
  George's conflicting birthplace do not disappear with the parentage
  assessment. The claim revisions and committed source snapshot belong in
  generated provenance after the reviewed import.
- **2026-09-25-sledge-school-fund-index-locator:** already represented by
  reference 90 and the Francis–John proof part. Manuscript pages 19 and 42
  remain unseen, and the derivative index supplies no kinship conclusion.
- **2026-09-24-sledge-1870-household-and-1860-boundary:** already represented
  by reference 87 and the Francis–John proof part; repeated co-residence
  remains distinct from proved fatherhood and later John W. identity.
- **2026-09-24-sledge-1860-francis-john-household-sequence:** already
  represented by reference 86 and the corrected 145 → 147 → 148 → 146 page
  order. Sarah Bass remains assigned to household 969, not Francis's.
- **2026-09-24-sledge-originals-and-open-chain:** already represented in
  references 83–89 and the Sledge proof path. The Mary/Jack/Ira assessments,
  literal Hetzer reading, unreviewed possible reverse, 17 April 1798 will
  date and incomplete ancestral/service chain retain their existing limits.
- **2026-09-26-hsp-minter-title-and-index-correction:** broader references,
  cases and stories remain deferred to a separate editorial pass. Reviewed
  current public content contains no complete-negative Westmoreland grantor
  search or misdated Davis-witness claim requiring correction in this pass.
  The title/debt sequence establishes neither Benjamin's parents nor the
  later Thomas identity, so it cannot support these parentage upgrades.

The changed public routes are `/proofs/meason`, `/sources` references
92–95, and `/family`, which consumes the two shared relationships. The complete
20-route content check identified exactly these three meaningful page changes;
story pages and the Sledge proof retain their previous modification dates. Existing Sledge content was checked for the dispositions above, without
changing its findings. Only source summaries and provider links are transferred:
no restricted images, private source paths, correspondence, source hashes or
additional living-person information enter public content. These website
dispositions do not mark the private handoff integrated; its owner records
completion only after verifying the actual website commit and checks.

## Reconciliation and editorial handover — 27 September 2026

This pass supersedes all prior 17-April will-date assertions and HSP editorial
deferrals above, and resolves the earlier Jimmy-parentage locator follow-up. Those earlier sections remain a record of what each publication reviewed.
The current Sledge source reading is **14 April 1798**, son Nathaniel, and no
named wife; the original does not conflict with the derivative 14 April date.

Every item pending at the start of this pass was reviewed:

- **2026-09-25-sledge-school-fund-index-locator:** already represented in
  reference 90 and the Francis–John proof part. Manuscript pages 19 and 42
  remain unseen; the derivative index supplies neither household nor kinship.
- **2026-09-24-sledge-1870-household-and-1860-boundary:** already represented
  in reference 87 and the Francis–John proof part. Repeated co-residence is
  preserved without upgrading parentage or the later John W. identity.
- **2026-09-24-sledge-1860-francis-john-household-sequence:** already represented
  in reference 86 and the corrected 145 → 147 → 148 → 146 sequence. Sarah Bass
  belongs to household 969, not Francis’s household.
- **2026-09-24-sledge-originals-and-open-chain:** already represented in
  references 83–89 and the Sledge proof path, subject to the will correction
  below. The Mary/Jack/Ira assessments, literal Hetzer reading, unreviewed
  possible certificate reverse, and incomplete ancestral/service chain retain
  their limits. No continuous Sledge pedigree or eligibility is asserted.
- **2026-09-26-hsp-minter-title-and-index-correction:** addressed in new
  references 96–101, the existing Benjamin-parentage case, and the Three
  Thomases timeline. These distinguish the 1777 purchase from its 1782
  recording; follow the 1784 conditional security/default instruments through
  the 1786 sheriff sale; retain the execution/acknowledgment date conflict;
  distinguish the 226-acre Hempfield tract; correctly place Joseph’s Davis
  witness entry in 1780 on Jacob’s Creek; and limit index coverage to A given
  names in subdivision 13/2. No Thomas identity, Isaac kinship, or Benjamin
  parentage conclusion follows. The exact reported Thomas index rows remain
  unverified. The existing public text had no complete-negative index or
  misdated Davis assertion to remove. Existing stories concern other records
  and need no expansion; this pass completes the deferred editorial work
  through the source catalog and two existing case surfaces.
- **2026-09-27-sledge-will-transcription-correction:** addressed in reference
  88 and the reviewed canonical Sledge candidate. The corrected date is
  14 April 1798, probate remains 11 October, the first beneficiary is son
  Nathaniel, and no wife is named. Collin remains an expressly named son.
  The supposed original/derivative date conflict is withdrawn; society
  finding aids do not establish testator identity, service, or eligibility.

- **2026-09-27-jimmy-parentage-locator-consistency:** addressed through the
  canonical public projection, matching reference 76’s complete reviewed
  1940 household locator. It changes no parentage or GPS assessment. This
  item was added during the reconciliation before candidate export.

The reviewed candidate is imported from canonical snapshot
`22bff1f4992cc7d8ab075a658724b445c63185e3`; source and claim revisions are
recorded in generated provenance. Independent editorial/privacy review confirmed
that only the intended Jimmy locator and Sledge correction text changed in the
proof projects, with no relationship or GPS status changes.

Local validation passed: 29 content tests, 8 importer tests, 5 proof-date tests,
39 tracking tests, genealogy type/lint and 34 application tests, exact candidate
import/drift checks, production build, and all 20 route fingerprints. The five
changed routes below received content dates; the other 15 retained theirs.
Desktop/mobile browser checks verified the corrected proof/source wording,
the interactive “Following the land” case section, and the Three Thomases
additions without browser errors or mobile horizontal overflow.

The intended changed public surfaces are `/sources` (88 and 96–101),
`/cases/parentage`, `/cases/parentage/three-thomases`, and the affected Meason
and Sledge proof displays. The full route tracker determines any additional
shared-content effects. Only reviewed summaries and conventional record or
catalog locators cross the boundary. New catalog links are explicitly labeled
as locators, not links to the HSP scans. No source-image bytes, correspondence,
private email or file identifiers, cost details, DNA, or additional living
people are published. No pending item is newly deferred by this pass; the
stated research gaps remain open research, not unfinished website integration.

These are editorial dispositions for the website candidate. The genealogy
integration owner records verified completion against the eventual website
commit and checks, without treating preparation or an open PR as a live release.

## Page modification tracking

After importing a reviewed proof candidate, run `npm run pages:update` and
`npm run pages:check`. The all-route tracker covers shared references,
relationships, interactive data, public media and authored text, including
changes that do not touch a page file. Commit both content metadata files
with the import and review the affected route dates. No-op and provenance-only
imports keep existing dates.

The importer's immediate proof-date updates are provisional until this complete
check reconciles the authoritative content manifest. The check runs in CI too.
Use [page content tracking](page-content-tracking.md) for command details,
new-route requirements, initial date anchors and how to resolve stale checks.
No private research data is read by this process; pending research handoff
dispositions above remain unchanged.
