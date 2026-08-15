# OPTICAL WEATHER

OPTICAL WEATHER is a static moving-image cinematheque for film history, animation, avant-garde cinema, printmaking, photography, design, archival film and gallery space.

The public site is published with GitHub Pages:

<https://musicofscience.github.io/visual-brain-food/>

## Collection

- 11 ready-made long-form YouTube playlists.
- 36 curated programmes with 267 running-order entries.
- One-action discovery for transport, company or attentive watching.
- Browse territories and a precise catalogue index.
- Resilient `Find current copy` searches for every running-order entry.

Direct links are used when reasonably stable. They are always additional to, never a replacement for, the search fallback.

## Architecture

The site is plain HTML, CSS and browser JavaScript. It has no build step, framework, backend, account, analytics, database or API key.

- `index.html` — semantic document shell.
- `styles.css` — responsive editorial design system.
- `app.js` — hash routing, rendering, discovery and index filtering.
- `metadata-v2.js` — stable programme IDs and controlled discovery/browse metadata.
- `data-ready.js` — ready-made playlist shelf.
- `data-1.js`–`data-4.js` — original curated programme data.
- `docs/v2-design-rationale.md` — audit, ontology, IA, wireframes and red-team decisions.
- `tests/catalogue.test.mjs` — catalogue and static-shell validation.

The v2 metadata layer deliberately leaves the programme data intact. Item-level normalisation—stable work IDs, structured makers/years, source kinds and last-checked dates—is an editorial migration, not a prerequisite for the interface.

## Test

Node 20 or later is sufficient. There are no packages to install.

```sh
npm test
```

The tests verify collection counts, programme IDs, controlled ontology values, discovery coverage, duration arithmetic, YouTube fallback formats and core access hooks.

## Updating the catalogue

1. Edit the relevant programme data file.
2. Preserve a precise YouTube search for every item.
3. Add or update the programme entry in `metadata-v2.js`.
4. Run `npm test`.
5. Review the site at desktop and narrow mobile widths before proposing publication.
