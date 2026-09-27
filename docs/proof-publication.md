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

A nonblocking follow-up remains in the unchanged Jimmy-parentage assessment:
its older description of incomplete 1940 locators should be reconciled with
reference 76 through the canonical private projection in a separate review.
The corrected source catalog and this pass's three assessments use the complete
reviewed household; no generated JSON was edited by hand to fix that older text.
