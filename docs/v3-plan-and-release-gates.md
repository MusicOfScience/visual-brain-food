# OPTICAL WEATHER v3: editorial truth and public access

Status: working candidate, 15 August 2026
Base reviewed: `main` at `3e30cb1b89510acdf99d85e8eec57dcf583e1888`

## 1. Proposition

V2 established the right cultural object: a quiet, typographic front door over a deep and eccentric moving-image library. V3 does not replace it. It makes the promises of that interface more truthful, navigable and accessible.

The governing principle is:

> Do not make the catalogue look larger. Make every route more trustworthy, more welcoming and more meaningfully connected.

The site continues to operate as a static GitHub Pages project with plain HTML, CSS and browser JavaScript. It adds no account, analytics, database, recommendation API, framework, remote font request or runtime backend.

## 2. Review lenses

The candidate was reviewed through four complementary lenses:

- founder/editorial direction: purpose, taste and final cultural judgement;
- film curator/editor: programme architecture, historical framing, collection gaps and non-expert entry;
- art director/typographer: hierarchy, mobile composition, visual restraint and identity;
- accessibility specialist: low vision, keyboard and screen-reader use, Deaf/hard-of-hearing access, sensory risk and release gates.

The combined review found that v2 already feels like a cultural resource rather than a product. V3 should be a precision edit, not a redesign.

## 3. What v2 gets right

- The three-part question—Take me somewhere, Keep me company, I want to watch—is the correct front door.
- The almost-black, warm-paper and signal-red palette has authority without luxury branding.
- Serif titles, sans-serif navigation, ruled lists and the absence of thumbnails resist streaming-service convention.
- The 36 programmes and 267 running-order routes are genuinely varied, especially in animation, print, photography, archival film and screen-as-atmosphere.
- Every running-order entry retains a resilient YouTube search route, while direct links remain optional additions.
- Native controls, landmarks, visible focus, reduced motion and no autoplay provide a strong accessibility foundation.

## 4. Problems v3 resolves

### Recommendation truth

V2 could recommend a programme for `Keep me company` and then describe it as `Attentive attention`, because the display read the first metadata value instead of the active recipe. V3 uses human, recipe-aware language such as `Forgiving of divided attention` and `Best watched closely`.

Discovery results now have stable routes such as `#discover/company/17`. Refresh and browser Back preserve the apparent spatial model instead of erasing it.

### Sensory safety

Programme 11 contains known rapid flicker and strobing. V3:

- excludes it from unconstrained `Take me somewhere` discovery;
- warns before the programme is opened;
- repeats the warning at the programme head;
- identifies affected running-order entries.

The warning is not a substitute for threshold analysis if OPTICAL WEATHER ever hosts video. It is a necessary protection when pointing to external copies.

### Viewing-access truth

Silent film, no spoken dialogue, intertitles, translation subtitles and captions are not interchangeable.

- **Intertitles** belong to the film and may still require translation.
- **Translation subtitles** usually represent dialogue.
- **Captions** also represent relevant sound, music cues and speaker identity.
- A score or soundtrack can matter even when a film has no spoken dialogue.
- A search route cannot prove the access features of the copy a visitor eventually opens.

V3 therefore offers quiet discovery routes for `Without spoken dialogue`, `Intertitles` and `Translation subtitles`. Membership is assigned through a conservative editorial whitelist rather than inferred from coarse v2 fields. Programme pages state that copy-level caption status is not yet systematically verified. `Sound optional` is withheld until a manual audit can support it.

This follows W3C guidance that captions communicate speech and relevant non-speech audio, while transcripts provide another text route for Deaf, hard-of-hearing and other visitors: [Captions/Subtitles](https://www.w3.org/WAI/media/av/captions/) and [Transcripts](https://www.w3.org/WAI/media/av/transcripts/).

### Mobile Browse

V2 rendered six overlapping territories, repeated programme lists and ready-made streams in one very long page. V3 makes Browse an editorial map:

1. choose one of six territories or `Press play now`;
2. see only that territory;
3. open a programme;
4. return to the same territory.

This reduces mobile length without introducing accordions, cards, filters or a streaming grid.

### Low-vision typography

V2's contrast is excellent, but important metadata commonly sat between 11.5 and 12.5 pixels. V3 raises the practical floor to 14–16 pixels, makes the search placeholder use the high-contrast muted token, preserves 44-pixel primary targets, shortens the mobile masthead and removes arbitrary character-level word breaking.

The design remains intentionally dark. A custom theme dashboard has not been added without lived-experience evidence that it would help.

### Route orientation and screen-reader support

V3 adds:

- route-specific document titles;
- a persistent polite status announcer outside the replaced application root;
- explicit list roles where hidden markers can otherwise weaken WebKit/VoiceOver semantics;
- destination-specific Back labels;
- a labelled group for the three front-door choices;
- honest error recovery with a Reload action;
- forced-colour focus and boundary support.

## 5. Curatorial corrections in the candidate

The original data files remain byte-preserving collection sources. V3 uses metadata overrides for corrections and context.

| Programme | V3 action |
|---|---|
| 04 | Renamed `Japanese Silent Modernities: Kinugasa / Ozu`; corrected period to the 1920s–30s; explains benshi and copy-dependent intertitles/accompaniment. |
| 05 | Renamed `Early Queer Screens: Gender / Desire / Disguise`; removes the Hollywood-specific “Code” frame; adds context for historical identity categories and the blackface/racial masquerade in *A Florida Enchantment*. |
| 11 | Adds programme and item-level flicker warnings; removes it from unconstrained surprise discovery. |
| 15 | Corrects the period through the 1980s for *Sans Soleil*. |
| 16 | Reframes `Industrial Beauty` as `Machines / Labour / Industrial Film`; makes sponsorship, persuasion and working conditions part of the premise. |
| 27 | Uses the more precise `Scandinavian Silent`; names Sweden, Denmark and Germany; explains *Michael*’s German production. |
| 28 | Uses `Shanghai Modernity & Social Melodrama`, avoiding a blanket leftist classification for every included work. |
| 31 | Corrects the over-broad public region label to the United States while retaining searchable maker context. |
| 34 | Replaces the glib “accidentally invents modernism” claim and adds colonial-commission context for *Song of Ceylon*. |
| 36 | Reframes Australia and Aotearoa as distinct countries and sovereignties; corrects `Ngā Taonga Sound & Vision`; identifies future First Nations and Māori curatorial leadership as necessary. |

`World cinema` is replaced in the public interface by `Across borders`. The internal recipe ID remains stable so existing routes do not break.

## 6. What v3 deliberately does not pretend to finish

At least 105 of the 267 running-order entries are blocks, playlists, collections, selected sections or assembly prompts rather than exact works. V3 does not run a heuristic over them and declare the result authoritative.

The next editorial migration must add, per work and per promoted copy:

- stable work and occurrence IDs;
- exact work / curated block / external playlist / search prompt;
- structured maker, year, country/region and holding institution;
- spoken content and language;
- intertitle presence and language;
- authored captions / automatic captions / translation subtitles / none / unknown;
- coverage of non-speech audio;
- transcript and audio-description status;
- sound importance;
- flicker and other concise sensory advisories;
- availability and access check dates;
- transfer, completeness and source notes.

Unknown is a valid value. It is preferable to a false accessibility claim.

## 7. Non-expert doorway programme

The next content pass should give every programme three editorial scales:

- **Start here** — one welcoming representative work;
- **An hour or so** — a deliberate short sequence;
- **Full weather** — the complete six-to-ten-hour score.

These choices require curatorial judgement and should not be generated mechanically from the first item or runtime arithmetic. Specialist terms such as *photogénie*, structural/material film, Cinema Novo, Cinema Marginal, city symphony and cinema of attractions should receive five-to-ten-word explanations at first encounter.

## 8. Commissioning roadmap

The first new commissions should fill structural gaps rather than create one token “global cinema” sampler.

1. Black independent cinemas: distinct LA Rebellion and Black British workshop routes.
2. Senegalese anti-colonial and post-independence cinema, with an appropriately situated specialist; related regional routes should be separately commissioned rather than collapsed into a continental sampler.
3. Indian parallel and experimental cinema, plus a distinct Films Division documentary/animation route; other South Asian traditions require their own situated commissions.
4. First Nations Australian and Māori moving image as separate, curator-led commissions with cultural protocols.

Second wave: Arab, Iranian and Palestinian essay/militant film; Southeast Asian and Philippine screen cultures; Cuba, Argentina, Chile and Third Cinema; Deaf cinema and signed moving image; postwar Japanese and Chinese experimental animation.

The Deaf-centred commission is important: silent cinema should never be made to stand in for Deaf cinema or signed moving-image culture.

## 9. Release gates

### Gate A — programme commission

- access needs and likely exclusions considered in the premise;
- language, sound and sensory fields complete or explicitly unknown;
- no accessibility claim inferred from genre;
- culturally specific work has appropriate curatorial authority and protocols.

### Gate B — copy verification

Before a direct `Watch` link is promoted:

- URL, runtime, transfer and completeness checked;
- intertitle language checked;
- subtitles distinguished from authored or automatic captions;
- non-speech audio coverage checked;
- transcript and audio-description status recorded;
- access and availability dates stored;
- precise `Find current copy` fallback retained.

### Gate C — automated candidate

- original counts and duration arithmetic preserved;
- controlled metadata validated;
- every item retains a valid search fallback;
- Programme 11’s explicitly flicker-based material is warned and excluded from unconstrained discovery;
- all routes receive distinct document titles;
- Browse territory routes and shareable discovery routes render;
- no horizontal overflow at 320 CSS pixels;
- token contrast checked;
- syntax and route smoke tests pass.

### Gate D — manual access review

- keyboard-only journeys;
- VoiceOver with Safari on iPhone and macOS;
- NVDA with Firefox or Chrome on Windows;
- 200% and 400% zoom;
- text-spacing override;
- screen magnification and focus tracking;
- forced colours/high contrast;
- 320px portrait and large-text mobile;
- reduced motion and touch without hover;
- history, refresh and Back behavior;
- affected flicker route and the longest running order.

### Gate E — paid lived-experience review

Pay at least one low-vision/screen-magnification user, one screen-reader user and one Deaf or hard-of-hearing caption user. Give them real journeys: choose company, find a work requiring English captions, identify whether sound matters, recover from a dead copy and report an inaccessible result.

The accessibility specialist holds a release veto for unresolved blockers. Lived-experience review supplies essential evidence; a small group is not asked to sign off on behalf of whole communities.

## 10. Identity decision

`OPTICAL WEATHER` remains the right name. It is atmospheric, non-personal and broad enough for film, print, process, gallery and archive material. Its ambiguity is productive, but `A moving-image cinematheque` assumes specialist vocabulary.

The v3 public descriptor is therefore:

> Films and moving images for a screen in a room.

`Moving-image cinematheque` remains in About and project metadata, where the institutional idea can be explained.

## 11. V3 acceptance

The candidate is coherent when:

- arrival still asks one question and offers three primary answers;
- direction and viewing-access routes remain secondary and optional;
- discovery results survive refresh and browser history;
- `Keep me company` never contradicts its visible facts;
- Programme 11’s explicitly flicker-based material cannot arrive as an unannounced surprise, while the full sensory audit remains open;
- programme access notes distinguish captions, subtitles and intertitles without overclaiming;
- Browse reveals one territory at a time;
- meaningful interface text has a 14px minimum floor;
- all 36 programmes, 267 routes and 11 ready-made streams remain present;
- every work keeps `Find current copy`;
- no personal naming, account, tracking, backend or build framework appears.

Richness remains in the collection. Intelligence belongs in the structure. Simplicity belongs on the screen.
