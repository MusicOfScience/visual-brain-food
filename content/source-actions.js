(function () {
  "use strict";

  const isHttps = (url) => /^https:\/\//.test(String(url || ""));
  const isYouTube = (url) => /^https:\/\/(www\.)?youtube\.com\//.test(String(url || ""));
  const idFromTitle = (title) => String(title || "").match(/^(\d{2})\s+—/)?.[1] || "";
  const programmes = () => Array.isArray(window.CINEMATHEQUE_PROGRAMMES) ? window.CINEMATHEQUE_PROGRAMMES : [];
  const streams = () => Array.isArray(window.CINEMATHEQUE_READY) ? window.CINEMATHEQUE_READY : [];

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
      if (!actions || actions.querySelector('[data-source-action="institutional"]')) return;

      const link = document.createElement("a");
      link.href = item.watch;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.dataset.sourceAction = "institutional";
      link.textContent = `${item.watchLabel || "Watch at source"} ↗`;
      link.setAttribute("aria-label", `${item.watchLabel || "Watch at source"}: ${item.title}, opens in a new tab`);
      actions.prepend(link);
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
      source.textContent = `${stream.sourceLabel || "Source"} ↗`;

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
