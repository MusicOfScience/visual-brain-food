# OPTICAL WEATHER v2: design rationale

Status: candidate specification, 15 August 2026  
Source reviewed: `main` at `b92bf45989609db91687cde448b7f6871bdd5239`

## 1. What already works

The existing site has an unusually strong curatorial core and a suitably modest technical base.

- 11 ready-made YouTube playlists and 36 authored programmes.
- 267 running-order entries across film, animation, archives, process film, print, photography, design and gallery material.
- Every entry has a YouTube search fallback; all 267 fallback URLs follow the expected format.
- 18 entries also have a direct watch link. A direct link is never the only route to a work.
- All programmes have descriptions, durations, tags and viewing modes.
- Declared programme durations reconcile with their running orders. The range is 365–588 minutes; the mean is 480 minutes.
- Repeated works are generally purposeful: a film can participate in more than one curatorial argument.
- Static HTML, CSS and JavaScript are the correct architecture. There is no demonstrated need for accounts, analytics, an API, a database or a framework.

The principal design task is therefore not to manufacture depth. It is to reveal the existing depth without making visitors operate a database.

## 2. Existing implementation audit

### Interface and navigation

The page currently exposes its whole internal model at once: playlist shelf, search, selects, mode checkboxes and all 36 programme cards. Numbered sections imply a three-step task even though each section is an alternative route. The result feels like a useful catalogue interface rather than a public cultural object.

The strongest existing actions—`Surprise me`, background viewing and proper watching—sit above a conventional filter panel instead of forming the architecture. Programme cards are visually equal, so the page has no curatorial rhythm after the hero. Scores such as “Recommended · score 17” expose implementation detail without helping a viewer decide.

There are no shareable programme URLs or route states. Opening a running order does not change history, and browser Back cannot return to a prior state. Random selection can immediately repeat a result. Search and recommendation use related but inconsistent ordering rules.

### Accessibility

The current page has a useful heading hierarchy and native buttons/links, but several important gaps:

- no skip link or `main` and `footer` landmarks;
- programme disclosures are clickable `div` elements, unavailable to keyboard users and unannounced to assistive technology;
- the search field has placeholder text but no visible label;
- changing filters/results is not announced;
- disclosure state is not represented with `aria-expanded`;
- no explicit focus treatment on the dark palette;
- controls are commonly shorter than a 44px touch target;
- smooth scrolling does not respect reduced-motion preferences;
- links opening new tabs do not communicate that behaviour;
- tags and secondary copy need systematic contrast checking, not ad hoc greys.

### Data and ontology

The catalogue has six programme fields and six item fields. This is admirably compact, but the current `modes` vocabulary mixes unrelated dimensions:

- attention: `BACKGROUND`, `LOW ATTENTION`, `WATCH PROPERLY`;
- language: `LOW LANGUAGE`;
- image: `MONOCHROME`;
- form: `ANIMATION`, `GALLERY`;
- subject/stance: `POLITICAL / SOCIAL`, `QUEER / FEMINIST`, `PRINT-BRAIN`;
- energy: `VISUALLY DERANGED`;
- audio use: `OWN MUSIC`.

The three attention labels overlap, while other axes are absent. The 102 free-form tags are valuable editorial descriptors but 82 appear only once. They should remain searchable; they should not be treated as a controlled filtering taxonomy.

Programme titles contain ordinal numbers, so display order doubles as identity. Items have no stable IDs. `credit` combines maker, year and sometimes programme description, which prevents reliable maker/year indexes. Broad “blocks” and exact works share the same shape. Ready-made playlists lack last-checked dates, approximate duration and source type.

### Maintainability

The global arrays and no-build delivery are appropriate. The risks are avoidable rather than architectural:

- CSS, templates, state and recommendation logic share one HTML file;
- four programme files are split by position rather than subject or schema;
- load order is significant;
- there is no catalogue schema validation or link-format test;
- update date is manual;
- a failed data file produces a partial catalogue without a clear error;
- duplicate works cannot share corrected metadata or links;
- no documented editorial workflow distinguishes exact works, blocks and external playlists.

The v2 candidate should separate files and add validation, but it should not add a compiler or dependency chain.

## 3. Collection critique

The library is materially better than a canonical “great films” list: Eastern and Central European adult animation, feminist and queer work, Chinese leftist cinema, Brazilian radical cinemas, public-information film, print processes and Australia/Aotearoa are genuine strengths.

There are still curatorial skews to address over time, not by deleting current programmes:

- Europe and the United States dominate, particularly early-to-mid twentieth-century work.
- Africa, South Asia, Southeast Asia, the Middle East, the Caribbean and Latin America beyond Brazil are thin or absent.
- Indigenous screen traditions need a considered place that does not collapse them into a national miscellany.
- Women and queer makers are strongly represented in dedicated strands but should also be more legible throughout the general index.
- Some “block” entries are excellent prompts but less precise than named works and institutional collections.

These are editorial roadmap findings, not reasons to delay the interaction redesign.

## 4. Identity decision

`OPTICAL WEATHER` is retained as the v2 working name.

It succeeds because it describes both deliberate watching and the screen altering a room. It is distinctive, non-personal, broad enough for print/process/gallery material and slightly mysterious without borrowing film-school language.

Its risk is opacity: without context it could describe meteorology, eyewear or a light installation. The remedy is not a longer name. Use a stable descriptor in metadata and the About introduction:

> OPTICAL WEATHER  
> A moving-image cinematheque

Use the all-caps name as a masthead, not as a typographic effect repeated across every label. The name remains a candidate until it has survived informal comprehension testing with people who do not describe themselves as cinephiles.

## 5. Refined ontology

V2 separates controlled behavioural facets from open editorial description.

| Dimension | Controlled values | Rule |
|---|---|---|
| Attention | `peripheral`, `intermittent`, `attentive` | One or more; describes how forgiving the programme is |
| Language | `none`, `intertitles`, `subtitles`, `dialogue-heavy`, `mixed` | One or more; describes access burden, not language identity |
| Image | `monochrome`, `colour`, `mixed` | One primary value |
| Energy | `calm`, `rhythmic`, `intense`, `deranged` | One or two; curatorial/sensory, not genre |
| Form | `feature`, `shorts`, `animation`, `archive`, `process`, `gallery`, `documentary`, `experimental` | One or more |
| Session | `under-hour`, `one-to-three`, `evening`, `six-to-ten`, `all-night` | Stored separately for works and programmes |
| Sound use | `original`, `replaceable`, `silent-friendly` | Optional; prevents `OWN MUSIC` being confused with attention |

Scholarly fields remain available under Browse/Index: movement, country/region, period, maker, year and process. Existing free tags remain searchable as `keywords`. Identity/politics terms remain editorial facets, not sensory properties.

Two modelling rules matter:

1. Programme and item metadata are different. Every current programme is 6–10 hours, so a programme-only duration filter gives an illusion of choice. Item runtimes will eventually power shorter-session discovery.
2. Exact works, curatorial blocks and external playlists must have explicit `kind` values. A broad archive search should never masquerade as a single film.

V2 introduces stable programme IDs while leaving the existing data files intact. A later editorial migration can normalise item IDs, makers and years without blocking the interface.

## 6. Information architecture

The masthead has four destinations. Discover is the default.

### Discover

Answers “What do you want the screen to do?” in one action.

- `TAKE ME SOMEWHERE`: selects across the full library with a diversity-aware shuffle.
- `KEEP ME COMPANY`: strictly selects programmes marked peripheral or intermittent.
- `I WANT TO WATCH`: strictly selects attentive programmes.

Below these, sensory directions offer a different one-action entry: Dark, Silent, Strange, Animation, Monochrome, Print, Gallery, Political, Surreal, Archive, World Cinema and All Night. These are curated query recipes, not new taxonomy values.

The result is one programme, not a ranked page. It includes the curatorial premise, running time, a few legible qualities, `Open programme`, and `Somewhere else`. This preserves the pleasure of being programmed for while keeping agency.

### Browse

Browse is an editorial map, not a streaming grid. Programmes appear in restrained vertical lists under six plain-language territories:

- Dream & experiment
- Animation after childhood
- Cities, politics & public life
- Film histories across the world
- Print, photography & design
- Archives, galleries & processes

Programmes may appear in more than one territory. That is useful cross-curation, not duplication error.

### Index

Index is the expert tool and the accessibility fallback. It exposes a visible search label, result count and a compact `Refine` disclosure. Results are a typographic list, never poster tiles. Initial facets are Attention, Form, Image and Language; the open keyword search also finds movements, countries, makers, processes and running-order titles.

Refinements use strict AND across dimensions and OR within a dimension. Empty-result recovery explains which constraints are active and offers one Clear action. Scores are never shown.

### About

About explains the project in approximately one screen before optional detail: what it is, how programmes are made, why YouTube search links are intentional, availability/legal caveats, accessibility, privacy/no tracking and how updates work. It contains no personal branding.

## 7. Deterministic discovery

Discovery uses explicit recipe eligibility followed by a non-repeating shuffle. It does not simulate intelligence with opaque scoring.

1. A route or sensory direction produces a strict eligible set.
2. The current session remembers recently shown programme IDs in memory only.
3. Recently shown results are excluded until the eligible set is exhausted.
4. Selection favours programmes whose region/form differs from the immediately previous result, without excluding canonical work.
5. `Somewhere else` draws again from the same recipe.
6. Every result explains itself in human language: “Quiet enough to live beside” or “Selected from Silent.” It never displays weights or scores.

Index search is deterministic filtering, not the discovery shuffle. The two models should not leak into each other.

## 8. Visual system

The visual reference is an exhibition handlist after dark, not a streaming app.

- Palette: almost-black `#11110f`, warm paper `#eee9de`, muted paper `#aaa69d`, hairline `#393833`, and one signal orange-red `#ff5a3d`.
- Typography: a system grotesk for navigation and metadata; a restrained editorial serif stack for programme titles and descriptive passages. No external font request.
- Scale: a large but quiet masthead; discovery actions sized as headlines; body copy at 17–19px; metadata at 12–13px with generous tracking.
- Layout: one primary column with a wide measure, strong left edge, generous vertical intervals and hairline rules. No card field, gradients, pills or ornamental illustration.
- Motion: short opacity/translate transitions only when a result changes. Disable them under `prefers-reduced-motion`.
- Controls: minimum 44px targets, square or nearly square geometry, visible focus ring in the accent colour.
- Imagery: none in the shell. The catalogue’s authority comes from language, sequence and space; thumbnails would import inconsistent YouTube branding and create a streaming grid.

## 9. Major states and journeys

| State | Desktop composition | Mobile composition | Primary next action |
|---|---|---|---|
| Discover, arrival | Masthead/nav; question; three full-width editorial actions; sensory directions below a rule | Compact masthead; actions stack as large tap rows; directions wrap as text buttons | Choose one screen behaviour |
| Discover, result | Question contracts; one result occupies the main measure; premise and qualities precede controls | Result replaces most of the arrival choices; Back to choices remains visible | Open programme or draw again |
| Programme open | Title/premise; facts; ordered running order; each work has resilient route(s) | Same order; actions sit below work metadata; no two-column squeeze | Watch/search a work |
| Browse | Six territories as sequential sections; typographic programme rows | Single continuous list with sticky masthead only; territories become headings | Open a programme |
| Index | Search first; Refine disclosure; compact result rows and count | Search and Refine remain at top; filters stack; rows do not become cards | Search/refine/open |
| About | Short proposition followed by optional detail sections | Identical reading order and measure | Return to Discover |
| Empty/error | Plain explanation in result region; active constraints named | Same; one 44px Clear action | Recover without reloading |

Representative first-time journey:

1. Visitor lands on “What do you want the screen to do?”
2. Visitor chooses `KEEP ME COMPANY`.
3. One programme appears with the explanation “Quiet enough to live beside.”
4. Visitor opens the programme and starts from a direct link or `Find current copy`.

No metadata vocabulary is required in this journey.

## 10. Red-team findings and resolutions

| Risk | Finding | Resolution in candidate |
|---|---|---|
| Unnecessary complexity | Three routes plus twelve directions plus four nav destinations could still feel like two menus | The three behaviours dominate; directions are visually secondary and can be ignored |
| Film-nerd assumptions | Programme titles such as photogénie or structural/material film are meaningful but not self-explanatory | Every selection leads with the plain-language premise, not tags or movement names |
| Mobile usability | Long programme titles and paired action links can create cramped rows | Single-column rows; actions move below copy; 44px controls; no horizontal carousels |
| Accessibility | Custom disclosures would repeat the current keyboard failure | Native `details/summary`, skip link, landmarks, live result status, focus styles, reduced motion |
| Discoverability | A mysterious name and random interface can conceal the catalogue’s scope | Stable descriptor, visible Browse/Index, and a plain one-sentence introduction in About |
| Visual clutter | Showing qualities, keywords, explanations and controls together can recreate tag soup | Result cards show at most three translated qualities; full metadata lives in Index |
| Maintenance burden | A parallel metadata layer can drift from programme data | Stable IDs, one compact metadata map, schema tests, documented defaults and no duplicated titles/descriptions |
| Random monotony | Pure random can repeat regions or canonical works | Non-repeating session bag with a small diversity preference |
| Misleading availability | A search route may return the wrong cut or no lawful copy | Keep precise queries; distinguish direct/watch and search; add source/last-checked fields in editorial migration |
| Duration promise | `ALL NIGHT` could overstate programmes shorter than ten hours | Candidate labels the recipe as “8 hours or more” in its result explanation |

## 11. Candidate implementation plan

1. Preserve `data-ready.js` and `data-1.js`–`data-4.js` unchanged.
2. Add `metadata-v2.js` with stable IDs, controlled behavioural metadata, browse territories and discovery recipes.
3. Replace the monolithic page with semantic `index.html`, `styles.css` and `app.js` while keeping zero build dependencies.
4. Render Discover, Browse, Index and About as shareable hash routes.
5. Use native disclosures for programme running orders and maintain precise YouTube fallbacks.
6. Add a Node test that validates programme IDs, ontology values, duration arithmetic, fallback URLs and expected catalogue counts.
7. Test script syntax, route rendering logic, keyboard-visible semantics in source, responsive CSS constraints and no-JavaScript failure copy.
8. Review the complete diff before any commit or publication proposal.

## 12. Acceptance criteria

- A new visitor can receive one coherent recommendation in one action.
- The front door contains no selects, checkboxes, scores or film-history prerequisites.
- All 36 programmes, 267 entries and 11 ready-made playlists remain available.
- Every running-order item retains `Find current copy`; direct links remain additional.
- Discover, Browse, Index and About are reachable by keyboard and URL.
- The mobile layout has no horizontal overflow at 320px.
- Controls meet a 44px target; focus and reduced-motion behaviours are explicit.
- The interface contains no personal naming.
- No account, tracking, API, database, framework or build service is introduced.
- Automated catalogue validation passes before publication is proposed.
