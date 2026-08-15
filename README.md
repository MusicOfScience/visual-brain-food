# OPTICAL WEATHER

OPTICAL WEATHER is a static moving-image cinematheque for film history, animation, avant-garde cinema, printmaking, photography, design, archival film and gallery space.

The public site is published with GitHub Pages:

<https://musicofscience.github.io/visual-brain-food/>

## Collection

- 11 ready-made long-form YouTube playlists in the v3 historical base.
- 36 curated programmes with 267 running-order entries in the v3 historical base.
- One-action discovery for transport, company or attentive watching.
- Shareable, history-aware discovery results.
- Browse territories and a precise catalogue index.
- Quiet viewing-access routes and honest copy-level limitations.
- Resilient routes that can use verified institutional sources, precise YouTube `Find current copy` searches, or both.

v4.1 extends the historical base through `content/curation.js`; the public footer derives programme and route totals from the assembled catalogue rather than hard-coded numbers.

## Architecture

The site is plain HTML, CSS and browser JavaScript. It has no build step, framework, backend, account, analytics, database or API key.

- `index.html` — semantic document shell.
- `styles.css` — responsive editorial design system.
- `app.js` — stable v3 hash routing, rendering, discovery and index filtering.
- `metadata-v2.js` — stable programme IDs and the backwards-compatible v3 discovery, browse, access and editorial metadata layer.
- `data-ready.js` — historical ready-made playlist shelf.
- `data-1.js`–`data-4.js` — historical curated programme data.
- `content/curation.js` — the human-editable v4.1 in-house curation layer for new/revised reservoirs, programmes and programme metadata.
- `content/registry.js` — validates source provenance and deterministically merges the curation layer before `app.js` starts.
- `content/source-actions.js` — progressively adds verified institutional watch actions and non-YouTube reservoirs after the stable renderer runs.
- `docs/v2-design-rationale.md` — audit, ontology, IA, wireframes and red-team decisions.
- `docs/v3-plan-and-release-gates.md` — v3 team review, implemented scope, accessibility policy, curatorial roadmap and release gates.
- `docs/v4.1-content-management.md` — v4.1 editorial workflow, source model, replacement rules and migration rationale.
- `tests/catalogue.test.mjs` — historical catalogue and static-shell validation.
- `tests/content-management.test.mjs` — v4.1 overlay, provenance, validation and assembled-count checks.

The historical programme files remain intact. Programme-level editorial corrections, access guidance and work-level sensory/context notes can be layered through controlled metadata rather than inferred from search results. v4.1 begins explicit source provenance with source kinds and verification dates for new non-YouTube institutional routes; fuller copy-level normalisation remains a deliberate editorial migration.

## Test

Node 20 or later is sufficient. There are no packages to install.

```sh
npm test
```

GitHub Actions also runs the test suite for pushes and pull requests touching the repository.

## Updating the catalogue

For normal in-house curation, **do not edit `app.js`, `data-ready.js`, `data-1.js`–`data-4.js` or `metadata-v2.js`.** Those files are the historical/application base.

1. Add or revise the reservoir/programme in `content/curation.js`.
2. Give each programme item at least one resilient route: a verified direct HTTPS source or a precise YouTube `Find current copy` fallback. Use both when that genuinely improves resilience.
3. For a non-YouTube direct source, supply a human-facing source label, controlled `sourceKind` and `verified` date.
4. For a new programme ID, add a matching `metadata.programmes` entry in the same curation file.
5. Add access claims only when they have actually been checked. Never infer captions, subtitles, intertitles, language or sensory characteristics from a title or search result.
6. Run `npm test`.
7. Preview desktop and narrow mobile widths.
8. Review through the normal feature-branch/pull-request flow before publication.

If a change genuinely requires altering the historical base or application logic, treat it as a code migration rather than routine content editing and document why.
