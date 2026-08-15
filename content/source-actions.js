(function () {
  "use strict";

  const isHttps = (url) => /^https:\/\//.test(String(url || ""));
  const isYouTube = (url) => /^https:\/\/(www\.)?youtube\.com\//.test(String(url || ""));
  const isBfiPlayer = (url) => /^https:\/\/player\.bfi\.org\.uk\//.test(String(url || ""));
  const idFromTitle = (title) => String(title || "").match(/^(\d{2})\s+—/)?.[1] || "";
  const programmes = () => Array.isArray(window.CINEMATHEQUE_PROGRAMMES) ? window.CINEMATHEQUE_PROGRAMMES : [];
  const streams = () => Array.isArray(window.CINEMATHEQUE_READY) ? window.CINEMATHEQUE_READY : [];
  const youtubeSearch = (item) => {
    const terms = `${item?.title || ""} ${item?.credit || ""}`.trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(terms)}`;
  };

  function currentProgramme() {
    const id = location.hash.match(/^#programme\/(\d{2})/)?.[1];
    if (!id) return null;
    return programmes().find((programme) => idFromTitle(programme?.title) === id) || null;
  }

  function addInstitutionalWorkLinks() {
    const programme = currentProgramme();
    if (!programme) return;

    const rows = document.querySelectorAll("#app .work-list > .work-item");
    programme.items?.forEach((item, index) => {
      if (!isHttps(item?.watch) || isYouTube(item.watch)) return;
      const actions = rows[index]?.querySelector(".work-actions");
      if (!actions) return;

      if (!actions.querySelector('[data-source-action="institutional"]')) {
        const link = document.createElement("a");
        link.href = item.watch;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.dataset.sourceAction = "institutional";
        const label = isBfiPlayer(item.watch)
          ? `${item.watchLabel || "Watch at BFI"} (UK only)`
          : (item.watchLabel || "Watch at source");
        link.textContent = `${label} ↗`;
        link.setAttribute("aria-label", `${label}: ${item.title}, opens in a new tab`);
        actions.prepend(link);
      }

      // BFI Player playback is territorially restricted to the UK. When an
      // editorial fallback was not supplied, preserve global resilience with
      // a deterministic title/credit YouTube search rather than leaving an
      // international viewer at a dead end.
      if (isBfiPlayer(item.watch) && !item.search && !actions.querySelector('[data-source-action="territory-fallback"]')) {
        const fallback = document.createElement("a");
        fallback.href = youtubeSearch(item);
        fallback.target = "_blank";
        fallback.rel = "noopener noreferrer";
        fallback.dataset.sourceAction = "territory-fallback";
        fallback.textContent = "Find current copy ↗";
        fallback.setAttribute("aria-label", `Find current copy of ${item.title} on YouTube, opens in a new tab`);
        actions.append(fallback);
      }
    });
  }

  function addInstitutionalStreams() {
    if (location.hash !== "#browse/ready") return;
    const list = document.querySelector("#app .stream-list");
    if (!list) return;

    const institutional = streams().filter((stream) => isHttps(stream?.url) && !isYouTube(stream.url));
    institutional.forEach((stream) => {
      const key = String(stream.title || "");
      if (Array.from(list.querySelectorAll("[data-source-stream]")).some((node) => node.dataset.sourceStream === key)) return;

      const row = document.createElement("li");
      row.className = "stream-row";
      row.dataset.sourceStream = key;

      const link = document.createElement("a");
      link.href = stream.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${stream.title}, open ${stream.sourceLabel || "institutional collection"} in a new tab`);

      const copy = document.createElement("span");
      const title = document.createElement("span");
      title.className = "stream-row__title";
      title.textContent = stream.title;
      const description = document.createElement("span");
      description.className = "stream-row__description";
      description.textContent = stream.description;
      copy.append(title, description);

      const source = document.createElement("span");
      source.className = "stream-row__meta";
      source.textContent = isBfiPlayer(stream.url)
        ? `${stream.sourceLabel || "BFI Player"} · UK only ↗`
        : `${stream.sourceLabel || "Source"} ↗`;

      link.append(copy, source);
      row.append(link);
      list.append(row);
    });

    const lede = document.querySelector("#app #ready-title + .lede");
    if (lede && institutional.length) {
      lede.textContent = "Long-form playlists and institutional collections for the moments when making no more decisions is the point.";
    }

    const allUrlsValid = streams().every((stream) => isHttps(stream?.url));
    if (allUrlsValid) document.querySelector("#app .browse-selection > .small-note")?.remove();
  }

  function enhance() {
    addInstitutionalWorkLinks();
    addInstitutionalStreams();
  }

  enhance();
  window.addEventListener("hashchange", () => window.requestAnimationFrame(enhance));
})();
