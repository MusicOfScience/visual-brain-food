(function () {
  "use strict";

  const patch = window.OPTICAL_WEATHER_CURATION || {};
  const idFromTitle = (title) => String(title || "").match(/^(\d{2})\s+—/)?.[1] || "";
  const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);
  const isHttps = (url) => /^https:\/\//.test(String(url || ""));
  const isYouTube = (url) => /^https:\/\/(www\.)?youtube\.com\//.test(String(url || ""));
  const isYouTubeSearch = (url) => /^https:\/\/www\.youtube\.com\/results\?search_query=/.test(String(url || ""));
  const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  const sourceKinds = new Set(["archive", "museum", "cinematheque", "broadcaster", "artist", "distributor", "institution"]);
  const fail = (message) => { throw new Error(`OPTICAL WEATHER curation: ${message}`); };

  function assertUnique(items, keyOf, label) {
    const seen = new Set();
    (Array.isArray(items) ? items : []).forEach((item, index) => {
      const key = keyOf(item);
      if (!key) fail(`${label} entry ${index + 1} has no usable key.`);
      if (seen.has(key)) fail(`duplicate ${label} key “${key}” in content/curation.js.`);
      seen.add(key);
    });
  }

  function validateInstitutionalSource(item, label, urlField = "watch", labelField = "watchLabel") {
    const url = item?.[urlField];
    if (!isHttps(url) || isYouTube(url)) return;
    if (!String(item?.[labelField] || "").trim()) fail(`${label} needs ${labelField} for a non-YouTube source.`);
    if (!sourceKinds.has(String(item?.sourceKind || ""))) {
      fail(`${label} needs sourceKind (${Array.from(sourceKinds).join(", ")}).`);
    }
    if (!isIsoDate(item?.verified)) fail(`${label} needs verified in YYYY-MM-DD form.`);
  }

  function validateReady(items) {
    assertUnique(items, (item) => String(item?.title || "").trim(), "ready-made stream");
    items.forEach((item, index) => {
      const label = `ready-made stream ${index + 1}`;
      if (!String(item?.description || "").trim()) fail(`${label} needs a description.`);
      if (!Array.isArray(item?.tags)) fail(`${label} needs a tags array.`);
      if (!isHttps(item?.url)) fail(`${label} needs an https URL.`);
      validateInstitutionalSource(item, label, "url", "sourceLabel");
    });
  }

  function validateProgrammes(items, existingIds, metadata) {
    assertUnique(items, (item) => idFromTitle(item?.title), "programme");
    items.forEach((programme, index) => {
      const id = idFromTitle(programme?.title);
      if (!id) fail(`programme ${index + 1} must begin with a two-digit id and an em dash.`);
      if (!String(programme?.description || "").trim()) fail(`programme ${id} needs a description.`);
      if (!Number.isFinite(programme?.duration) || programme.duration <= 0) fail(`programme ${id} needs a positive duration in minutes.`);
      if (!Array.isArray(programme?.tags) || !programme.tags.length) fail(`programme ${id} needs at least one tag.`);
      if (!Array.isArray(programme?.items) || !programme.items.length) fail(`programme ${id} needs at least one item.`);
      if (!Array.isArray(programme?.modes) || !programme.modes.length) fail(`programme ${id} needs at least one mode.`);

      programme.items.forEach((item, itemIndex) => {
        const label = `programme ${id}, item ${itemIndex + 1}`;
        if (!String(item?.title || "").trim()) fail(`${label} needs a title.`);
        if (!String(item?.credit || "").trim()) fail(`${label} needs a credit.`);
        if (!String(item?.runtime || "").trim()) fail(`${label} needs a runtime.`);

        const hasWatch = isHttps(item?.watch);
        const hasSearch = isYouTubeSearch(item?.search);
        if (!hasWatch && !hasSearch) {
          fail(`${label} needs either a verified direct watch source or a resilient YouTube search fallback.`);
        }
        if (item?.watch != null && !hasWatch) fail(`${label} has an invalid direct watch URL.`);
        if (item?.search != null && String(item.search).trim() && !hasSearch) {
          fail(`${label} has an invalid YouTube search fallback.`);
        }
        validateInstitutionalSource(item, label);
      });

      if (!existingIds.has(id) && !isObject(metadata?.[id])) {
        fail(`new programme ${id} needs a matching metadata.programmes["${id}"] entry.`);
      }
    });
  }

  function mergeBy(items, additions, keyOf) {
    const result = Array.isArray(items) ? items.slice() : [];
    const index = new Map(result.map((item, i) => [keyOf(item), i]).filter(([key]) => key));

    (Array.isArray(additions) ? additions : []).forEach((item) => {
      const key = keyOf(item);
      if (index.has(key)) {
        result[index.get(key)] = item;
      } else {
        index.set(key, result.length);
        result.push(item);
      }
    });

    return result;
  }

  const readyPatch = Array.isArray(patch.ready) ? patch.ready : [];
  const programmePatch = Array.isArray(patch.programmes) ? patch.programmes : [];
  const patchMeta = isObject(patch.metadata) ? patch.metadata : {};
  const patchProgrammeMeta = isObject(patchMeta.programmes) ? patchMeta.programmes : {};
  const existingProgrammes = Array.isArray(window.CINEMATHEQUE_PROGRAMMES) ? window.CINEMATHEQUE_PROGRAMMES : [];
  const existingIds = new Set(existingProgrammes.map((programme) => idFromTitle(programme?.title)).filter(Boolean));

  validateReady(readyPatch);
  validateProgrammes(programmePatch, existingIds, patchProgrammeMeta);

  window.CINEMATHEQUE_READY = mergeBy(
    window.CINEMATHEQUE_READY,
    readyPatch,
    (item) => String(item?.title || "").trim()
  );

  window.CINEMATHEQUE_PROGRAMMES = mergeBy(
    existingProgrammes,
    programmePatch,
    (item) => idFromTitle(item?.title)
  );

  const finalIds = window.CINEMATHEQUE_PROGRAMMES.map((programme) => idFromTitle(programme?.title));
  if (finalIds.some((id) => !id) || new Set(finalIds).size !== finalIds.length) {
    fail("assembled catalogue contains missing or duplicate programme ids.");
  }

  const currentMeta = window.OPTICAL_WEATHER_META || { programmes: {}, territories: [], directions: [] };
  window.OPTICAL_WEATHER_META = {
    ...currentMeta,
    ...patchMeta,
    programmes: {
      ...(currentMeta.programmes || {}),
      ...patchProgrammeMeta
    }
  };

  const routeCount = window.CINEMATHEQUE_PROGRAMMES.reduce(
    (total, programme) => total + (Array.isArray(programme?.items) ? programme.items.length : 0),
    0
  );

  window.OPTICAL_WEATHER_CONTENT = Object.freeze({
    version: String(patch.version || "4.1"),
    updated: String(patch.updated || ""),
    readyCount: window.CINEMATHEQUE_READY.length,
    programmeCount: window.CINEMATHEQUE_PROGRAMMES.length,
    routeCount,
    source: "content/curation.js"
  });

  if (typeof document !== "undefined") {
    const countNode = document.getElementById("collection-count");
    if (countNode) {
      countNode.textContent = `${window.OPTICAL_WEATHER_CONTENT.programmeCount} programmes · ${routeCount} routes into moving-image culture`;
    }
  }
})();
