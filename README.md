# Hudson Visual Brain Food

A static GitHub Pages cinematheque for film history, animation, avant-garde cinema, printmaking, photography, design, archival film and gallery walkthroughs.

## What it does

- **Press Play Now** shelf for existing long-form YouTube playlists.
- **36 curated 6–10 hour programmes** with running orders.
- Practical viewing metadata such as `BACKGROUND`, `WATCH PROPERLY`, `LOW LANGUAGE`, `OWN MUSIC`, `MONOCHROME`, `ANIMATION`, `PRINT-BRAIN`, `GALLERY`, and `VISUALLY DERANGED`.
- A small browser-side recommendation engine. No account, database, server or API key.
- Resilient **Find current copy** buttons that search YouTube for a current upload when a stable direct link cannot be relied on.

## GitHub Pages

Publish the repository root with GitHub Pages. The site is plain HTML + JavaScript, so there is no build step.

Expected project URL:

`https://musicofscience.github.io/visual-brain-food/`

## Updating the library

The presentation layer is separated from the programme data so new strands can be added without rebuilding the site architecture. The programme data is split across `data-1.js` to `data-4.js`, while `data-ready.js` holds the ready-made playlist shelf.
