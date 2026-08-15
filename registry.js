(function () {
  "use strict";

  const patch = window.OPTICAL_WEATHER_CURATION || {};
  const idFromTitle = (title) => String(title || "").match(/^(\d{2})\s+—/)?.[1] || "";

  function mergeBy(items, additions, keyOf) {
    const result = Array.isArray(items) ? items.slice() : [];
    const index = new Map(result.map((item, i) => [keyOf(item), i]).filter(([key]) => key));

    (Array.isArray(additions) ? additions : []).forEach((item) => {
      const key = keyOf(item);
      if (!key) return;
      if (index.has(key)) {
        result[index.get(key)] = item;
      } else {
        index.set(key, result.length);
        result.push(item);
      }
    });

    return result;
  }

  window.CINEMATHEQUE_READY = mergeBy(
    window.CINEMATHEQUE_READY,
    patch.ready,
    (item) => String(item?.title || "").trim()
  );

  window.CINEMATHEQUE_PROGRAMMES = mergeBy(
    window.CINEMATHEQUE_PROGRAMMES,
    patch.programmes,
    (item) => idFromTitle(item?.title)
  );

  const currentMeta = window.OPTICAL_WEATHER_META || { programmes: {}, territories: [], directions: [] };
  const patchMeta = patch.metadata || {};
  window.OPTICAL_WEATHER_META = {
    ...currentMeta,
    ...patchMeta,
    programmes: {
      ...(currentMeta.programmes || {}),
      ...(patchMeta.programmes || {})
    }
  };

  window.OPTICAL_WEATHER_CONTENT = Object.freeze({
    version: String(patch.version || "4.1"),
    updated: String(patch.updated || ""),
    readyCount: window.CINEMATHEQUE_READY.length,
    programmeCount: window.CINEMATHEQUE_PROGRAMMES.length,
    source: "content/curation.js"
  });
})();
