(function () {
  "use strict";

  const patch = window.OPTICAL_WEATHER_CURATION || {};
  const idFromTitle = (title) => String(title || "").match(/^(\d{2})\s+—/)?.[1] || "";
  const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);
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

  function validateReady(items) {
    assertUnique(items, (item) => String(item?.title || "").trim(), "ready-made stream");
    items.forEach((item, index) => {
      if (!String(item?.description || "").trim()) fail(`ready-made stream ${index + 1} needs a description.`);
      if (!Array.isArray(item?.tags)) fail(`ready-made stream ${index + 1} needs a tags array.`);
      if (!/^https:\/\//.test(String(item?.url || ""))) fail(`ready-made stream ${index + 1} needs an https URL.`);
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
        if (!String(item?.title || "").trim()) fail(`programme ${id}, item ${itemIndex + 1} needs a title.`);
        if (!String(item?.credit || "").trim()) fail(`programme ${id}, item ${itemIndex + 1} needs a credit.`);
        if (!String(item?.runtime || "").trim()) fail(`programme ${id}, item ${itemIndex + 1} needs a runtime.`);
        if (!/^https:\/\/www\.youtube\.com\/results\?search_query=/.test(String(item?.search || ""))) {
          fail(`programme ${id}, item ${itemIndex + 1} needs a resilient YouTube search fallback.`);
        }
        if (item?.watch != null && !/^https:\/\//.test(String(item.watch))) {
          fail(`programme ${id}, item ${itemIndex + 1} has an invalid direct watch URL.`);
        }
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

  const countNode = document.getElementById("collection-count");
  if (countNode) {
    countNode.textContent = `${window.OPTICAL_WEATHER_CONTENT.programmeCount} programmes · ${routeCount} routes into moving-image culture`;
  }
})();
