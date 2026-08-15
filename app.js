(function () {
  "use strict";

  const root = document.getElementById("app");
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
    return { ...programme, id, name: cleanTitle(programme.title), meta: metaRoot.programmes[id] || null };
  });

  const programmeById = new Map(programmes.map((programme) => [programme.id, programme]));

  const state = {
    discovery: null,
    shownByRecipe: new Map(),
    lastProgrammeId: null,
    returnHash: "#discover",
    index: { q: "", attention: "", form: "", image: "", language: "", refineOpen: false }
  };

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
      return { id: recipeId, label: "Take me somewhere", explanation: "A door chosen from the whole cinematheque.", eligible: () => true };
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

  function factList(programme, limit = 4) {
    const facts = [
      formatDuration(programme.duration),
      programme.meta?.attention?.[0] ? `${titleCase(programme.meta.attention[0])} attention` : "",
      programme.meta?.image ? titleCase(programme.meta.image) : "",
      programme.meta?.energy?.[0] ? titleCase(programme.meta.energy[0]) : ""
    ].filter(Boolean).slice(0, limit);
    return `<ul class="fact-list">${facts.map((fact) => `<li>${escapeHTML(fact)}</li>`).join("")}</ul>`;
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

  function renderDiscover() {
    if (state.discovery) {
      const { recipe, programme } = state.discovery;
      root.innerHTML = `
        <section class="page-section discovery-result" aria-labelledby="discovery-title">
          <p class="eyebrow">${escapeHTML(recipe.label)}</p>
          <p class="result-context" role="status">${escapeHTML(recipe.explanation)}</p>
          <div class="programme-hero">
            <h1 class="programme-title" id="discovery-title" tabindex="-1">${escapeHTML(programme.name)}</h1>
            <p class="programme-description">${escapeHTML(programme.description)}</p>
            ${factList(programme)}
            <div class="actions">
              <a class="button button--primary" href="#programme/${escapeHTML(programme.id)}">Open programme</a>
              <button class="button" type="button" data-action="reroll" data-recipe="${escapeHTML(recipe.id)}">Somewhere else</button>
              <button class="text-button" type="button" data-action="choices">Back to choices</button>
            </div>
          </div>
        </section>`;
      root.querySelector("#discovery-title")?.focus({ preventScroll: true });
      return;
    }

    root.innerHTML = `
      <section class="page-section" aria-labelledby="discover-title">
        <p class="eyebrow">A moving-image cinematheque</p>
        <h1 class="display-title" id="discover-title" tabindex="-1">What do you want the screen <em>to do?</em></h1>
        <div class="screen-choices" aria-label="Choose how you want to use the screen">
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
          ${metaRoot.directions.map((direction) => `<button class="direction-button" type="button" data-recipe="${escapeHTML(direction.id)}">${escapeHTML(direction.label)}</button>`).join("")}
        </div>
      </section>`;
  }

  function renderBrowse() {
    root.innerHTML = `
      <section class="page-section browse-intro" aria-labelledby="browse-title">
        <p class="eyebrow">Browse</p>
        <h1 class="section-title" id="browse-title" tabindex="-1">An editorial map, not a shelf of covers.</h1>
        <p class="lede">Enter through a territory. Programmes can belong to more than one place because film history does too.</p>
      </section>
      ${metaRoot.territories.map((territory) => {
        const members = programmes.filter((programme) => programme.meta?.territories.includes(territory.id));
        return `
          <section class="territory" aria-labelledby="territory-${escapeHTML(territory.id)}">
            <div class="territory__intro">
              <p class="eyebrow">${String(members.length).padStart(2, "0")} programmes</p>
              <h2 id="territory-${escapeHTML(territory.id)}">${escapeHTML(territory.title)}</h2>
              <p>${escapeHTML(territory.description)}</p>
            </div>
            <ul class="programme-list">${members.map((programme) => programmeRow(programme)).join("")}</ul>
          </section>`;
      }).join("")}
      <section class="ready-streams" aria-labelledby="ready-title">
        <div class="ready-streams__head">
          <div>
            <p class="eyebrow">Press play now</p>
            <h2 id="ready-title">Ready-made streams</h2>
          </div>
          <p class="lede">Existing long-form YouTube playlists for the moments when making no more decisions is the point.</p>
        </div>
        <ul class="stream-list">
          ${ready.map((stream) => `
            <li class="stream-row">
              <a href="${escapeHTML(youtubeLink(stream.url))}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(stream.title)}, open playlist on YouTube in a new tab">
                <span>
                  <span class="stream-row__title">${escapeHTML(stream.title)}</span>
                  <span class="stream-row__description">${escapeHTML(stream.description)}</span>
                </span>
                <span class="stream-row__meta">YouTube ↗</span>
              </a>
            </li>`).join("")}
        </ul>
      </section>`;
  }

  function searchable(programme) {
    return normalize([
      programme.name,
      programme.description,
      programme.tags.join(" "),
      programme.modes.join(" "),
      programme.meta?.regions.join(" "),
      programme.meta?.period,
      programme.meta?.form.join(" "),
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
        && (!filters.language || programme.meta?.language.includes(filters.language));
    });
  }

  function activeFilterText() {
    const active = [];
    if (state.index.q) active.push(`search “${state.index.q}”`);
    for (const key of ["attention", "form", "image", "language"]) {
      if (state.index[key]) active.push(`${key}: ${titleCase(state.index[key])}`);
    }
    return active.join(", ");
  }

  function updateIndexResults() {
    const results = filteredProgrammes();
    const count = root.querySelector("#result-count");
    const host = root.querySelector("#index-results");
    if (!count || !host) return;
    count.textContent = `${results.length} programme${results.length === 1 ? "" : "s"}`;
    if (!results.length) {
      host.innerHTML = `
        <div class="empty-state">
          <h2>Nothing sits at that exact intersection.</h2>
          <p class="small-note">Active constraints: ${escapeHTML(activeFilterText() || "none")}.</p>
          <button class="button" type="button" data-action="clear-index">Clear all</button>
        </div>`;
      return;
    }
    host.innerHTML = `<ul class="programme-list">${results.map((programme) => programmeRow(programme)).join("")}</ul>`;
  }

  function selectOptions(values, current) {
    return `<option value="">Any</option>${values.map((value) => `<option value="${escapeHTML(value)}"${current === value ? " selected" : ""}>${escapeHTML(titleCase(value))}</option>`).join("")}`;
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
              <label>Attention<select name="attention">${selectOptions(availableValues("attention", ["peripheral", "intermittent", "attentive"]), state.index.attention)}</select></label>
              <label>Form<select name="form">${selectOptions(availableValues("form", ["feature", "shorts", "animation", "archive", "process", "gallery", "documentary", "experimental"]), state.index.form)}</select></label>
              <label>Image<select name="image">${selectOptions(availableValues("image", ["monochrome", "colour", "mixed"]), state.index.image)}</select></label>
              <label>Language<select name="language">${selectOptions(availableValues("language", ["none", "intertitles", "subtitles", "dialogue-heavy", "mixed"]), state.index.language)}</select></label>
            </div>
          </details>
          <div class="index-tools">
            <span class="result-count" id="result-count" role="status" aria-live="polite"></span>
            <button class="text-button" type="button" data-action="clear-index">Clear all</button>
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
        <a class="back-link" href="${escapeHTML(returnHash)}">← Back</a>
        <div class="programme-hero">
          <p class="eyebrow">Curated programme · ${escapeHTML(programme.id)}</p>
          <h1 class="programme-title" id="programme-title" tabindex="-1">${escapeHTML(programme.name)}</h1>
          <p class="programme-description">${escapeHTML(programme.description)}</p>
          <ul class="fact-list">
            <li>${escapeHTML(formatDuration(programme.duration))}</li>
            <li>${escapeHTML(programme.items.length)} works / blocks</li>
            <li>${escapeHTML(programme.meta?.regions.join(" · ") || "International")}</li>
            <li>${escapeHTML(programme.meta?.period || "")}</li>
          </ul>
        </div>
        <details class="programme-order" open>
          <summary>Running order · ${escapeHTML(programme.items.length)} entries</summary>
          <ol class="work-list">
            ${programme.items.map((item, index) => `
              <li class="work-item">
                <span class="work-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 class="work-title">${escapeHTML(item.title)}${item.runtime ? ` <span class="work-credit">· ${escapeHTML(item.runtime)}</span>` : ""}</h2>
                  <p class="work-credit">${escapeHTML(item.credit)}</p>
                  ${item.note ? `<p class="work-note">${escapeHTML(item.note)}</p>` : ""}
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
        <h1 class="section-title" id="about-title" tabindex="-1">A small cinematheque for the life of a screen in a room.</h1>
        <p class="lede">OPTICAL WEATHER moves between proper watching, half-watching and the screen as a changing wall.</p>
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
          <p>YouTube uploads move, vanish and return in different transfers. A direct Watch link is offered where it is reasonably stable. Every work also keeps a precise “Find current copy” search so the route can survive one upload disappearing.</p>
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
          <p>The interface uses semantic HTML, keyboard-operable controls, visible focus, restrained motion and text rather than image-dependent navigation. Availability and metadata are maintained editorially; the catalogue was last updated ${escapeHTML(window.CINEMATHEQUE_UPDATED || "recently")}.</p>
        </div>
      </section>`;
  }

  function currentRoute() {
    const raw = location.hash.replace(/^#/, "") || "discover";
    const [section, id] = raw.split("/");
    if (section === "programme") return { section, id };
    if (["discover", "browse", "index", "about"].includes(section)) return { section };
    return { section: "discover" };
  }

  function updateNavigation(section) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === section) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function renderRoute({ focusHeading = false } = {}) {
    const route = currentRoute();
    updateNavigation(route.section);
    if (route.section === "discover") renderDiscover();
    if (route.section === "browse") renderBrowse();
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
      selectProgramme(recipeButton.dataset.recipe);
      renderDiscover();
      window.scrollTo(0, 0);
      return;
    }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "choices") {
      state.discovery = null;
      renderDiscover();
      root.querySelector("#discover-title")?.focus({ preventScroll: true });
    }
    if (action === "clear-index") {
      state.index = { q: "", attention: "", form: "", image: "", language: "", refineOpen: state.index.refineOpen };
      renderIndex();
      root.querySelector("#catalogue-search")?.focus();
    }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "catalogue-search") {
      state.index.q = event.target.value.trimStart();
      updateIndexResults();
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.matches("#index-form select")) {
      state.index[event.target.name] = event.target.value;
      updateIndexResults();
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
        <p>Reload the page. If the problem continues, one of the static data files may be missing.</p>
      </section>`;
  } else {
    renderRoute();
  }
})();
