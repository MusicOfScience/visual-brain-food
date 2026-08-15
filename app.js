(function () {
  "use strict";

  const root = document.getElementById("app");
  const announcer = document.getElementById("announcer");
  const rawProgrammes = window.CINEMATHEQUE_PROGRAMMES || [];
  const ready = window.CINEMATHEQUE_READY || [];
  const metaRoot = window.OPTICAL_WEATHER_META || { programmes: {}, territories: [], directions: [] };

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

  const idFromTitle = (title) => String(title).match(/^(\d{2})\s+—/)?.[1] || "";
  const cleanTitle = (title) => String(title).replace(/^\d{2}\s+—\s+/, "");
  const formatDuration = (minutes) => `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
  const titleCase = (value) => String(value).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const youtubeLink = (url) => /^https:\/\/(www\.)?youtube\.com\//.test(String(url)) ? url : "";

  const programmes = rawProgrammes.map((programme) => {
    const id = idFromTitle(programme.title);
    const meta = metaRoot.programmes[id] || null;
    const itemOverrides = meta?.itemOverrides || {};
    return {
      ...programme,
      id,
      sourceName: cleanTitle(programme.title),
      sourceDescription: programme.description,
      name: meta?.displayName || cleanTitle(programme.title),
      description: meta?.displayDescription || programme.description,
      items: programme.items.map((item) => ({ ...item, ...(itemOverrides[item.title] || {}) })),
      meta
    };
  });

  const programmeById = new Map(programmes.map((programme) => [programme.id, programme]));

  const state = {
    discovery: null,
    shownByRecipe: new Map(),
    lastProgrammeId: null,
    returnHash: "#discover",
    index: { q: "", attention: "", form: "", image: "", access: "", refineOpen: false }
  };

  let announcementTimer = 0;

  function announce(message, delay = 0) {
    if (!announcer) return;
    window.clearTimeout(announcementTimer);
    announcementTimer = window.setTimeout(() => {
      announcer.textContent = "";
      window.requestAnimationFrame(() => { announcer.textContent = message; });
    }, delay);
  }

  function randomIndex(length) {
    if (!length) return 0;
    if (window.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0] % length;
    }
    return Math.floor(Math.random() * length);
  }

  function recipeDefinition(recipeId) {
    if (recipeId === "take") {
      return { id: recipeId, label: "Take me somewhere", explanation: "A door chosen from across the cinematheque.", eligible: (programme) => !programme.meta?.excludeFromUnprompted };
    }
    if (recipeId === "company") {
      return {
        id: recipeId,
        label: "Keep me company",
        explanation: "Forgiving enough to live beside.",
        eligible: (programme) => programme.meta?.attention.some((value) => value === "peripheral" || value === "intermittent")
      };
    }
    if (recipeId === "watch") {
      return { id: recipeId, label: "I want to watch", explanation: "Chosen for attentive viewing.", eligible: (programme) => programme.meta?.attention.includes("attentive") };
    }
    const direction = metaRoot.directions.find((item) => item.id === recipeId);
    if (direction) {
      return {
        id: recipeId,
        label: direction.label,
        explanation: direction.explanation,
        eligible: (programme) => programme.meta?.directions.includes(recipeId)
      };
    }
    const accessRoute = metaRoot.accessRoutes?.find((item) => item.id === recipeId);
    if (accessRoute) {
      return { ...accessRoute, eligible: (programme) => accessRoute.programmeIds.includes(programme.id) };
    }
    return recipeDefinition("take");
  }

  function selectProgramme(recipeId) {
    const recipe = recipeDefinition(recipeId);
    const eligible = programmes.filter(recipe.eligible);
    if (!eligible.length) return null;

    const shown = state.shownByRecipe.get(recipe.id) || new Set();
    let available = eligible.filter((programme) => !shown.has(programme.id));
    if (!available.length) {
      shown.clear();
      available = eligible.slice();
    }

    const previous = programmeById.get(state.lastProgrammeId);
    if (previous?.meta?.regions?.length && available.length > 1) {
      const differentRegion = available.filter((programme) => !programme.meta?.regions.some((region) => previous.meta.regions.includes(region)));
      if (differentRegion.length) available = differentRegion;
    }

    const selected = available[randomIndex(available.length)];
    shown.add(selected.id);
    state.shownByRecipe.set(recipe.id, shown);
    state.lastProgrammeId = selected.id;
    state.discovery = { recipe, programme: selected };
    return selected;
  }

  function viewingText(programme) {
    const membership = (id) => metaRoot.accessRoutes?.find((route) => route.id === id)?.programmeIds.includes(programme.id);
    if (membership("no-dialogue")) return membership("intertitles") ? "No spoken dialogue · includes intertitles" : "No spoken dialogue";
    if (membership("subtitled")) return "Includes works requiring translation subtitles";
    return "Dialogue and on-screen text vary";
  }

  function soundText(programme) {
    const intertitleRoute = metaRoot.accessRoutes?.find((route) => route.id === "intertitles");
    if (intertitleRoute?.programmeIds.includes(programme.id)) return "Accompaniment varies by copy";
    if (programme.meta?.sound === "replaceable" || programme.meta?.sound === "silent-friendly") return "Sound use varies";
    return "Soundtrack carries meaning";
  }

  function factList(programme, recipe, limit = 4) {
    const attention = recipe?.id === "company"
      ? "Forgiving of divided attention"
      : recipe?.id === "watch"
        ? "Best watched closely"
        : "";
    const facts = [formatDuration(programme.duration), attention, viewingText(programme), soundText(programme)]
      .filter(Boolean)
      .slice(0, limit);
    return `<ul class="fact-list" role="list">${facts.map((fact) => `<li>${escapeHTML(fact)}</li>`).join("")}</ul>`;
  }

  function programmeRow(programme, showDescription = true) {
    return `
      <li class="programme-row">
        <a href="#programme/${escapeHTML(programme.id)}">
          <span>
            <span class="programme-row__title">${escapeHTML(programme.name)}</span>
            ${showDescription ? `<span class="programme-row__description">${escapeHTML(programme.description)}</span>` : ""}
          </span>
          <span class="programme-row__meta">${escapeHTML(formatDuration(programme.duration))}</span>
        </a>
      </li>`;
  }

  function renderAdvisory(programme, compact = false) {
    const advisories = programme.meta?.advisories || [];
    if (!advisories.length) return "";
    return `<div class="advisory${compact ? " advisory--compact" : ""}" role="note" aria-label="Sensory warning">
      <strong>Sensory warning</strong>
      ${advisories.map((advisory) => `<p>${escapeHTML(advisory)}</p>`).join("")}
    </div>`;
  }

  function discoveryFromRoute(route) {
    if (!route.recipe || !route.id) return null;
    const recipe = recipeDefinition(route.recipe);
    const programme = programmeById.get(route.id);
    if (!programme || recipe.id !== route.recipe || !recipe.eligible(programme)) return null;
    state.discovery = { recipe, programme };
    state.lastProgrammeId = programme.id;
    return state.discovery;
  }

  function renderDiscover(route = {}) {
    const discovery = discoveryFromRoute(route);
    if (discovery) {
      const { recipe, programme } = discovery;
      root.innerHTML = `
        <section class="page-section discovery-result" aria-labelledby="discovery-title">
          <p class="eyebrow">${escapeHTML(recipe.label)}</p>
          <p class="result-context" role="status">${escapeHTML(recipe.explanation)}</p>
          <div class="programme-hero">
            <h1 class="programme-title" id="discovery-title" tabindex="-1">${escapeHTML(programme.name)}</h1>
            <p class="programme-description">${escapeHTML(programme.description)}</p>
            ${factList(programme, recipe)}
            ${renderAdvisory(programme, true)}
            <div class="actions">
              <a class="button button--primary" href="#programme/${escapeHTML(programme.id)}">Open programme</a>
              <button class="button" type="button" data-action="reroll" data-recipe="${escapeHTML(recipe.id)}">Somewhere else</button>
              <a class="text-button" href="#discover">Back to choices</a>
            </div>
          </div>
        </section>`;
      return;
    }

    state.discovery = null;

    root.innerHTML = `
      <section class="page-section" aria-labelledby="discover-title">
        <p class="eyebrow">Films for a screen in a room</p>
        <h1 class="display-title" id="discover-title" tabindex="-1">What do you want the screen <em>to do?</em></h1>
        <div class="screen-choices" role="group" aria-labelledby="discover-title">
          <button class="screen-choice" type="button" data-recipe="take">
            <span><span class="screen-choice__title">Take me somewhere</span><span class="screen-choice__note">No destination required.</span></span>
            <span class="screen-choice__mark" aria-hidden="true">→</span>
          </button>
          <button class="screen-choice" type="button" data-recipe="company">
            <span><span class="screen-choice__title">Keep me company</span><span class="screen-choice__note">For glancing, drifting and living beside.</span></span>
            <span class="screen-choice__mark" aria-hidden="true">→</span>
          </button>
          <button class="screen-choice" type="button" data-recipe="watch">
            <span><span class="screen-choice__title">I want to watch</span><span class="screen-choice__note">Give the images the room.</span></span>
            <span class="screen-choice__mark" aria-hidden="true">→</span>
          </button>
        </div>
      </section>
      <section class="page-section section-rule" aria-labelledby="direction-title">
        <p class="eyebrow" id="direction-title">Or choose a direction</p>
        <div class="directions">
          ${metaRoot.directions.map((direction) => `<button class="direction-button" type="button" data-recipe="${escapeHTML(direction.id)}"><span>${escapeHTML(direction.label)}</span><span aria-hidden="true">→</span></button>`).join("")}
        </div>
        <details class="access-paths">
          <summary>Viewing access</summary>
          <p>Find programmes by dialogue, on-screen text or sound use. These describe the programme design—not a verified YouTube copy.</p>
          <div class="access-route-list">
            ${(metaRoot.accessRoutes || []).map((route) => `<button type="button" data-recipe="${escapeHTML(route.id)}"><span>${escapeHTML(route.label)}</span><span aria-hidden="true">→</span></button>`).join("")}
          </div>
          <p class="small-note">Captions include relevant sound information as well as speech. Caption availability has not yet been verified across the full catalogue.</p>
        </details>
      </section>`;
  }

  function browseDoor(id, title, description, count, unit = "programme") {
    return `<li class="browse-door">
      <a href="#browse/${escapeHTML(id)}">
        <span>
          <span class="browse-door__title">${escapeHTML(title)}</span>
          <span class="browse-door__description">${escapeHTML(description)}</span>
        </span>
        <span class="browse-door__meta">${escapeHTML(String(count).padStart(2, "0"))} ${escapeHTML(count === 1 ? unit : `${unit}s`)} <span aria-hidden="true">→</span></span>
      </a>
    </li>`;
  }

  function renderBrowse(id = "") {
    if (id === "ready") {
      const validStreams = ready.filter((stream) => youtubeLink(stream.url));
      root.innerHTML = `
        <section class="page-section" aria-labelledby="ready-title">
          <a class="back-link" href="#browse">← Back to Browse</a>
          <p class="eyebrow">Press play now</p>
          <h1 class="section-title" id="ready-title" tabindex="-1">Ready-made streams.</h1>
          <p class="lede">Long-form YouTube playlists for the moments when making no more decisions is the point.</p>
        </section>
        <section class="browse-selection" aria-label="Ready-made streams">
          <ul class="stream-list" role="list">
            ${validStreams.map((stream) => `
              <li class="stream-row">
                <a href="${escapeHTML(youtubeLink(stream.url))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(stream.title)}, open playlist on YouTube in a new tab">
                  <span><span class="stream-row__title">${escapeHTML(stream.title)}</span><span class="stream-row__description">${escapeHTML(stream.description)}</span></span>
                  <span class="stream-row__meta">YouTube ↗</span>
                </a>
              </li>`).join("")}
          </ul>
          ${validStreams.length !== ready.length ? `<p class="small-note">${escapeHTML(ready.length - validStreams.length)} stream ${ready.length - validStreams.length === 1 ? "is" : "are"} temporarily withheld because its URL is invalid.</p>` : ""}
        </section>`;
      return;
    }

    const territory = metaRoot.territories.find((item) => item.id === id);
    if (territory) {
      const members = programmes.filter((programme) => programme.meta?.territories.includes(territory.id));
      root.innerHTML = `
        <section class="page-section" aria-labelledby="territory-title">
          <a class="back-link" href="#browse">← Back to Browse</a>
          <p class="eyebrow">Browse · ${String(members.length).padStart(2, "0")} programmes</p>
          <h1 class="section-title" id="territory-title" tabindex="-1">${escapeHTML(territory.title)}</h1>
          <p class="lede">${escapeHTML(territory.description)}</p>
        </section>
        <section class="browse-selection" aria-label="Programmes in ${escapeHTML(territory.title)}">
          <ul class="programme-list" role="list">${members.map((programme) => programmeRow(programme)).join("")}</ul>
        </section>`;
      return;
    }

    root.innerHTML = `
      <section class="page-section" aria-labelledby="browse-title">
        <p class="eyebrow">Browse</p>
        <h1 class="section-title" id="browse-title" tabindex="-1">An editorial map, not a shelf of covers.</h1>
        <p class="lede">Choose one territory. Programmes can belong to more than one place because film history does too.</p>
      </section>
      <section class="browse-selection" aria-label="Browse routes">
        <ul class="browse-doors" role="list">
          ${browseDoor("ready", "Press play now", "Ready-made streams when making no more decisions is the point.", ready.length, "stream")}
          ${metaRoot.territories.map((item) => {
            const count = programmes.filter((programme) => programme.meta?.territories.includes(item.id)).length;
            return browseDoor(item.id, item.title, item.description, count);
          }).join("")}
        </ul>
      </section>`;
  }

  function searchable(programme) {
    return normalize([
      programme.name,
      programme.sourceName,
      programme.description,
      programme.sourceDescription,
      programme.tags.join(" "),
      programme.modes.join(" "),
      programme.meta?.regions.join(" "),
      programme.meta?.period,
      programme.meta?.form.join(" "),
      metaRoot.accessRoutes.filter((route) => route.programmeIds.includes(programme.id)).flatMap((route) => [route.label, route.explanation]).join(" "),
      programme.items.flatMap((item) => [item.title, item.credit, item.note]).join(" ")
    ].join(" "));
  }

  function filteredProgrammes() {
    const filters = state.index;
    const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
    return programmes.filter((programme) => {
      const text = searchable(programme);
      return terms.every((term) => text.includes(term))
        && (!filters.attention || programme.meta?.attention.includes(filters.attention))
        && (!filters.form || programme.meta?.form.includes(filters.form))
        && (!filters.image || programme.meta?.image === filters.image)
        && (!filters.access || metaRoot.accessRoutes.find((route) => route.id === filters.access)?.programmeIds.includes(programme.id));
    });
  }

  function activeFilterText() {
    const active = [];
    if (state.index.q) active.push(`search “${state.index.q}”`);
    for (const key of ["attention", "form", "image", "access"]) {
      if (state.index[key]) active.push(`${filterHeading(key)}: ${filterLabel(key, state.index[key])}`);
    }
    return active.join(", ");
  }

  function hasIndexFilters() {
    return Boolean(state.index.q || state.index.attention || state.index.form || state.index.image || state.index.access);
  }

  function updateIndexResults({ announceCount = false } = {}) {
    const results = filteredProgrammes();
    const count = root.querySelector("#result-count");
    const host = root.querySelector("#index-results");
    const clear = root.querySelector("[data-action='clear-index']");
    if (!count || !host) return;
    count.textContent = `${results.length} programme${results.length === 1 ? "" : "s"}`;
    if (clear) clear.hidden = !hasIndexFilters();
    if (announceCount) announce(`${results.length} programme${results.length === 1 ? "" : "s"} found`, 400);
    if (!results.length) {
      host.innerHTML = `
        <div class="empty-state">
          <h2>Nothing sits at that exact intersection.</h2>
          <p class="small-note">Active constraints: ${escapeHTML(activeFilterText() || "none")}.</p>
          <button class="button" type="button" data-action="clear-index">Clear all</button>
        </div>`;
      return;
    }
    host.innerHTML = `<ul class="programme-list" role="list">${results.map((programme) => programmeRow(programme)).join("")}</ul>`;
  }

  function filterHeading(key) {
    return ({ attention: "Attention", form: "Form", image: "Image", access: "Viewing access" })[key] || titleCase(key);
  }

  function filterLabel(key, value) {
    const labels = {
      attention: { peripheral: "Lives comfortably in the background", intermittent: "Forgiving of divided attention", attentive: "Best watched closely" },
      image: { monochrome: "Monochrome", colour: "Colour", mixed: "Mixed" }
    };
    if (key === "access") return metaRoot.accessRoutes.find((route) => route.id === value)?.label || titleCase(value);
    return labels[key]?.[value] || titleCase(value);
  }

  function selectOptions(key, values, current) {
    return `<option value="">Any</option>${values.map((value) => `<option value="${escapeHTML(value)}"${current === value ? " selected" : ""}>${escapeHTML(filterLabel(key, value))}</option>`).join("")}`;
  }

  function availableValues(key, orderedValues) {
    return orderedValues.filter((value) => programmes.some((programme) => {
      const field = programme.meta?.[key];
      return Array.isArray(field) ? field.includes(value) : field === value;
    }));
  }

  function renderIndex() {
    root.innerHTML = `
      <section class="page-section" aria-labelledby="index-title">
        <div class="index-intro">
          <p class="eyebrow">Index</p>
          <h1 class="section-title" id="index-title" tabindex="-1">Search the whole cinematheque.</h1>
          <p class="lede">Films, makers, countries, movements, processes and programme premises. Complexity lives here when you want it.</p>
        </div>
        <form class="index-form" id="index-form" role="search">
          <label class="field-label" for="catalogue-search">Search programmes and running orders</label>
          <input class="search-input" id="catalogue-search" name="q" type="search" value="${escapeHTML(state.index.q)}" placeholder="Try Ozu, photogravure, Brazil, silent…" autocomplete="off">
          <details class="refine" id="refine"${state.index.refineOpen ? " open" : ""}>
            <summary>Refine</summary>
            <div class="filter-grid">
              <label>Attention<select name="attention">${selectOptions("attention", availableValues("attention", ["peripheral", "intermittent", "attentive"]), state.index.attention)}</select></label>
              <label>Form<select name="form">${selectOptions("form", availableValues("form", ["feature", "shorts", "animation", "archive", "process", "gallery", "documentary", "experimental"]), state.index.form)}</select></label>
              <label>Image<select name="image">${selectOptions("image", availableValues("image", ["monochrome", "colour", "mixed"]), state.index.image)}</select></label>
              <label>Viewing access<select name="access">${selectOptions("access", metaRoot.accessRoutes.map((route) => route.id), state.index.access)}</select></label>
            </div>
          </details>
          <div class="index-tools">
            <span class="result-count" id="result-count"></span>
            <button class="text-button" type="button" data-action="clear-index"${hasIndexFilters() ? "" : " hidden"}>Clear all</button>
          </div>
        </form>
        <div id="index-results"></div>
      </section>`;
    updateIndexResults();
  }

  function workActions(item) {
    const direct = youtubeLink(item.watch);
    const search = youtubeLink(item.search);
    return `
      <div class="work-actions">
        ${direct ? `<a href="${escapeHTML(direct)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${escapeHTML(item.title)} on YouTube, opens in a new tab">Watch ↗</a>` : ""}
        ${search ? `<a href="${escapeHTML(search)}" target="_blank" rel="noopener noreferrer" aria-label="Find current copy of ${escapeHTML(item.title)} on YouTube, opens in a new tab">Find current copy ↗</a>` : ""}
      </div>`;
  }

  function accessDetails(programme) {
    const dialogue = viewingText(programme);
    const sound = soundText(programme);
    const inAccessRoute = (id) => metaRoot.accessRoutes.find((route) => route.id === id)?.programmeIds.includes(programme.id);
    const subtitleNote = inAccessRoute("subtitled")
      ? "Some works in this programme may require translation subtitles. Check their presence and language on the copy you open."
      : inAccessRoute("intertitles")
        ? "Intertitles are part of the films; their language and translation must be checked on the copy you open."
        : "Dialogue, captions and transcripts have not yet been verified at copy level across this programme.";
    return `<details class="access-details">
      <summary>Access &amp; copy details</summary>
      <div class="access-details__body">
        <dl>
          <div><dt>Dialogue &amp; text</dt><dd>${escapeHTML(dialogue)}</dd></div>
          <div><dt>Sound</dt><dd>${escapeHTML(sound)}</dd></div>
          <div><dt>Caption status</dt><dd>Not systematically verified at copy level</dd></div>
        </dl>
        <p>${escapeHTML(subtitleNote)}</p>
        <p>A resilient search may lead to a different upload over time. Before watching, check the transfer, completeness, intertitle or subtitle language, and whether captions include relevant non-speech sound.</p>
      </div>
    </details>`;
  }

  function returnLabel(hash) {
    if (hash.startsWith("#browse")) return "Back to Browse";
    if (hash.startsWith("#index")) return "Back to Index";
    return "Back to Discover";
  }

  function renderProgramme(id) {
    const programme = programmeById.get(id);
    if (!programme) {
      root.innerHTML = `
        <section class="page-section empty-state">
          <p class="eyebrow">Programme not found</p>
          <h1 class="section-title" tabindex="-1">That route has disappeared.</h1>
          <a class="button" href="#index">Open the index</a>
        </section>`;
      return;
    }

    const returnHash = state.returnHash.startsWith("#programme/") ? "#discover" : state.returnHash;
    root.innerHTML = `
      <article class="programme-page" aria-labelledby="programme-title">
        <a class="back-link" href="${escapeHTML(returnHash)}">← ${escapeHTML(returnLabel(returnHash))}</a>
        <div class="programme-hero">
          <p class="eyebrow">Curated programme · ${escapeHTML(programme.id)}</p>
          <h1 class="programme-title" id="programme-title" tabindex="-1">${escapeHTML(programme.name)}</h1>
          <p class="programme-description">${escapeHTML(programme.description)}</p>
          <ul class="fact-list" role="list">
            <li>${escapeHTML(formatDuration(programme.duration))}</li>
            <li>${escapeHTML(programme.items.length)} works / blocks</li>
            <li>${escapeHTML(programme.meta?.regions.join(" · ") || "International")}</li>
            <li>${escapeHTML(programme.meta?.period || "")}</li>
          </ul>
          ${renderAdvisory(programme)}
          ${accessDetails(programme)}
          ${programme.meta?.context ? `<details class="editorial-context"><summary>Context &amp; care</summary><p>${escapeHTML(programme.meta.context)}</p></details>` : ""}
        </div>
        <details class="programme-order" open>
          <summary>Running order · ${escapeHTML(programme.items.length)} entries</summary>
          <ol class="work-list" role="list">
            ${programme.items.map((item, index) => `
              <li class="work-item">
                <span class="work-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 class="work-title">${escapeHTML(item.title)}${item.runtime ? ` <span class="work-credit">· ${escapeHTML(item.runtime)}</span>` : ""}</h2>
                  <p class="work-credit">${escapeHTML(item.credit)}</p>
                  ${item.note ? `<p class="work-note">${escapeHTML(item.note)}</p>` : ""}
                  ${item.sensory ? `<p class="work-warning"><strong>Sensory warning:</strong> ${escapeHTML(item.sensory)}</p>` : ""}
                  ${item.context ? `<p class="work-context"><strong>Context:</strong> ${escapeHTML(item.context)}</p>` : ""}
                </div>
                ${workActions(item)}
              </li>`).join("")}
          </ol>
        </details>
      </article>`;
  }

  function renderAbout() {
    root.innerHTML = `
      <section class="page-section about-intro" aria-labelledby="about-title">
        <p class="eyebrow">About</p>
        <h1 class="section-title" id="about-title" tabindex="-1">Films and moving images for a screen in a room.</h1>
        <p class="lede">OPTICAL WEATHER moves between close watching, half-watching and the screen as a changing wall.</p>
      </section>
      <section class="about-grid" aria-labelledby="about-collection">
        <h2 id="about-collection">The collection</h2>
        <div class="about-copy">
          <p>Thirty-six long-form programmes connect film history, national cinemas, silent film, avant-gardes, adult animation, documentary, archives, printmaking, photography, typography, graphic design and gallery space.</p>
          <p>A programme is sequenced around an argument or atmosphere. It is not a keyword pile, a ranking or a claim that the canon is complete.</p>
        </div>
      </section>
      <section class="about-grid" aria-labelledby="about-links">
        <h2 id="about-links">Why search links?</h2>
        <div class="about-copy">
          <p>YouTube uploads move, vanish and return in different transfers. A direct Watch link is offered where it is reasonably stable. Every running-order entry also keeps a precise “Find current copy” search so the route can survive one upload disappearing.</p>
          <p>Search results still require judgement: check the title, maker, year, running time, subtitles or intertitles and source before settling in.</p>
        </div>
      </section>
      <section class="about-grid" aria-labelledby="about-system">
        <h2 id="about-system">The system</h2>
        <div class="about-copy">
          <p>Discovery runs entirely in this browser from curated metadata. There is no AI recommendation API, account, tracking, analytics, database or personal profile.</p>
          <p>The non-repeating shuffle remembers recent suggestions only while this page is open. Browse and Index remain available when you prefer an editorial map or exact control.</p>
        </div>
      </section>
      <section class="about-grid" aria-labelledby="about-access">
        <h2 id="about-access">Access & upkeep</h2>
        <div class="about-copy">
          <p>The interface uses semantic HTML, keyboard-operable controls, visible focus, restrained motion and text rather than image-dependent navigation. It is designed to reflow under enlargement, and meaningful interface text is kept at a readable floor.</p>
          <p>Subtitles translate or transcribe dialogue. Captions also identify relevant non-speech sound and speakers. Intertitles belong to the film itself. OPTICAL WEATHER keeps these terms separate and does not describe a search result as captioned until a particular copy has been checked.</p>
          <p>Known limitation: copy-level captions, subtitle languages, transcripts and audio description have not yet been verified across all 267 routes. Programme-level viewing notes are therefore guidance, not a guarantee about the upload you will find.</p>
          <p>Programme 11’s explicitly flicker-based material is warned before it is opened and excluded from unconstrained surprise discovery. A full work-level sensory audit remains part of the editorial migration. Availability and metadata are maintained editorially; the catalogue was last updated ${escapeHTML(window.CINEMATHEQUE_UPDATED || "recently")}.</p>
        </div>
      </section>`;
  }

  function currentRoute() {
    const raw = location.hash.replace(/^#/, "") || "discover";
    const [section, first, second] = raw.split("/");
    if (section === "programme") return { section, id: first };
    if (section === "discover") return { section, recipe: first || "", id: second || "" };
    if (section === "browse") return { section, id: first || "" };
    if (["index", "about"].includes(section)) return { section };
    return { section: "discover" };
  }

  function routeTitle(route) {
    if (route.section === "programme") return `${programmeById.get(route.id)?.name || "Programme"} — OPTICAL WEATHER`;
    if (route.section === "browse") {
      if (route.id === "ready") return "Ready-made streams — OPTICAL WEATHER";
      const territory = metaRoot.territories.find((item) => item.id === route.id);
      return `${territory?.title || "Browse"} — OPTICAL WEATHER`;
    }
    if (route.section === "index") return "Index — OPTICAL WEATHER";
    if (route.section === "about") return "About — OPTICAL WEATHER";
    if (route.recipe && route.id) {
      const recipe = recipeDefinition(route.recipe);
      const programme = programmeById.get(route.id);
      if (programme && recipe.id === route.recipe && recipe.eligible(programme)) return `${programme.name} — OPTICAL WEATHER`;
    }
    return "OPTICAL WEATHER — Films and moving images for a screen in a room";
  }

  function updateNavigation(section) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === section) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function renderRoute({ focusHeading = false } = {}) {
    const route = currentRoute();
    document.title = routeTitle(route);
    const activeSection = route.section === "programme"
      ? (state.returnHash.match(/^#(discover|browse|index|about)/)?.[1] || "")
      : route.section;
    updateNavigation(activeSection);
    if (route.section === "discover") renderDiscover(route);
    if (route.section === "browse") renderBrowse(route.id);
    if (route.section === "index") renderIndex();
    if (route.section === "about") renderAbout();
    if (route.section === "programme") renderProgramme(route.id);
    if (focusHeading) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => root.querySelector("h1")?.focus({ preventScroll: true }));
    }
  }

  root.addEventListener("click", (event) => {
    const recipeButton = event.target.closest("[data-recipe]");
    if (recipeButton) {
      const selected = selectProgramme(recipeButton.dataset.recipe);
      if (!selected) {
        announce("No programme is currently available for that route.");
        return;
      }
      const nextHash = `#discover/${encodeURIComponent(recipeButton.dataset.recipe)}/${encodeURIComponent(selected.id)}`;
      if (location.hash === nextHash) renderRoute({ focusHeading: true });
      else location.hash = nextHash;
      return;
    }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "clear-index") {
      state.index = { q: "", attention: "", form: "", image: "", access: "", refineOpen: state.index.refineOpen };
      renderIndex();
      root.querySelector("#catalogue-search")?.focus();
    }
    if (action === "reload") window.location.reload();
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "catalogue-search") {
      state.index.q = event.target.value.trimStart();
      updateIndexResults({ announceCount: true });
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches("#index-form select")) {
      state.index[event.target.name] = event.target.value;
      updateIndexResults({ announceCount: true });
    }
  });

  root.addEventListener("toggle", (event) => {
    if (event.target.id === "refine") state.index.refineOpen = event.target.open;
  }, true);

  document.addEventListener("click", (event) => {
    const programmeLink = event.target.closest('a[href^="#programme/"]');
    if (programmeLink && !location.hash.startsWith("#programme/")) state.returnHash = location.hash || "#discover";
  });

  window.addEventListener("hashchange", () => renderRoute({ focusHeading: true }));

  if (!rawProgrammes.length || programmes.some((programme) => !programme.meta)) {
    root.innerHTML = `
      <section class="page-section empty-state">
        <p class="eyebrow">Catalogue unavailable</p>
        <h1 class="section-title">OPTICAL WEATHER could not assemble its programme data.</h1>
        <p>One of the static data files may be missing or incomplete.</p>
        <button class="button" type="button" data-action="reload">Reload catalogue</button>
      </section>`;
  } else {
    renderRoute();
  }
})();
