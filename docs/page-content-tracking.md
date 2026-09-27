# Page content dates

Every genealogy sitemap route has a committed content fingerprint and a separate
last meaningful modification date. `page-content-state.json` is the authoritative
manifest; `page-modifications.json` is its generated non-null date projection for
Next.js's sitemap. These are website metadata, not genealogical assessments.

## Editing and verification

After changing public data, page copy, interactive content or public images:

```sh
npm run pages:update
npm run pages:check
```

The first command makes a production build with a stable public configuration,
compares all routes, and updates only changed pages. Review and commit both
JSON files under `apps/where-the-record-ends/src/data/` with the content edits.
The second command rebuilds and checks without modifying files. To use a known
editorial instant, append `-- --date 2026-09-27T03:00:37Z` to `pages:update`.
Normal publication uses its current UTC timestamp. An unchanged page keeps its
date, even if the command is run on another day.

A build made before the update contains the previous sitemap dates. `pages:check`
or the ordinary subsequent CI/deployment build incorporates the updated registry.
`pages:verify` checks an already-built public snapshot, starting a short-lived
local production server only to read neutral dynamic pages such as `/contact`.
Do not use it against stale build output. The runner binds localhost and sends
no form submissions or external messages.

CI performs a fresh build and compares to the PR base (or previous push commit).
It rejects missing or extra route coverage, stale content fingerprints, invalid
or regressing dates, dates changed for unchanged content, and changed/new pages
without a date. It also rejects a sitemap date registry that differs from the
manifest. No hook is required; checks run whether edits came from a human,
an agent, or another script. Standard repo branch protection determines whether
failed checks block a merge.

## What changes a fingerprint

- The main rendered page text, meaningful links, headings, image descriptions,
  form labels, title, description, canonical URL and Open Graph metadata.
- Public data used by the page, including selectable atlas people, relationship
  statements, case evidence, story chapters, citation popovers and preview media.
  Rendered citation links also enroll their referenced source automatically.
- Authored literals in the page's transitive application modules, including
  client-only dialogue, labels and options absent from initial HTML.
- Referenced local public image bytes, so replacing a file at the same URL is
  detected. No provider records are fetched for fingerprinting. New unsupported asset
  mechanisms (such as bundled static-import images) fail the check until byte
  tracking is added; they must not silently skip image changes.

Formatting, comments, class/style attributes, scripts, framework identifiers,
site-wide header/footer/navigation, analytics state and private import provenance
are excluded. The runner fixes the canonical origin and optional challenge
configuration. Research review dates are included only where actually displayed;
they are never substituted for the page's modification date.

This is deterministic change detection, not an automated judgment of historical
truth. The public-data projections in `scripts/page-content-models.mjs` must stay
aligned with rendering, especially when adding a new interactive data source.
Authored-source scanning is conservative: changed non-rendered string constants
can warrant review even when initial HTML is identical. Keep projection tests
for relevant and irrelevant changes. The checker must not be bypassed by copying
old hashes, resetting every date, or reading the private repository during build.

## New, removed and changed routes

New sitemap routes must have a public data model and an authored page. Add the
route's dependencies and mutation tests; `pages:update` supplies its first date.
For removal, review and remove its model, manifest and date entries along with
the sitemap route. Unknown historical dates can be `null` during an explicitly
reviewed baseline; later meaningful changes establish a real date.

`--initialize` is only for establishing the first manifest, not a way to clear
stale checks. The current 20 routes have audited historical dates. If the
fingerprinting algorithm changes, review the effect separately from editorial
changes; do not silently relabel an algorithm change as a page update.

## Initial history audit

Dates below are verified main integration timestamps, not independently measured
deployment completion times. They include shared data changes and interactive
citation content; they are not simply the last commit touching a page file.

| Routes                                                                                                                            | UTC timestamp        | Public commit and reason                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| `/`, `/proofs`                                                                                                                    | 2026-09-26T21:41:42Z | `692b960`: proof cards introduced; later assessment changes left these projections unchanged |
| `/proofs/meason`, `/proofs/sledge`, `/sources`, `/family`, `/stories/migration`                                                   | 2026-09-27T03:00:37Z | `aac7439`: assessments and references 58/76, including citation popovers                     |
| `/cases/parentage/highland-creek`, `/cases/parentage/three-thomases`                                                              | 2026-09-26T14:14:02Z | `d3f3012`: reference 18 and timeline correction                                              |
| `/cases`, `/cases/george-connection`, `/stories`, `/stories/joseph-boat`, `/stories/between-lines`, `/stories/texas-reconnection` | 2026-09-22T22:06:16Z | `f8c6d42`: PR41 case summaries, chapters, sources and story navigation                       |
| `/about`                                                                                                                          | 2026-09-22T13:06:15Z | `6f0f56a`: launch editorial copy                                                             |
| `/contact`                                                                                                                        | 2026-09-22T14:28:40Z | `da6e7b4`: form and explanatory copy                                                         |
| `/privacy`                                                                                                                        | 2026-09-22T15:07:23Z | `39d7dd7`: consent and analytics disclosures                                                 |
| `/cases/parentage`, `/cases/burial-ground`                                                                                        | 2026-09-21T11:45:13Z | `979b67b`: citation viewers; no later displayed dependency changes                           |
