/* OPTICAL WEATHER v4.3 — focused media-art reservoir expansion */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: v4.3 expansion loaded before curation.js");

  curation.version = "4.3";
  curation.updated = "2026-08-16";

  const additions = [
    {
      title: "Vasulka Archive — Video Works & Machine Media",
      description: "Artist-controlled archive of Steina and Woody Vasulka video works, stills, catalogues, technical documents, machine-media histories and The Kitchen material. Use it as an explore-the-laboratory reservoir rather than assuming every catalogue record is a full stream.",
      tags: ["Video art", "Electronic image", "Machine media", "Archive"],
      url: "https://www.vasulka.org/",
      sourceLabel: "Explore the Vasulka Archive",
      sourceKind: "artist",
      verified: "2026-08-16"
    },
    {
      title: "EAI — A Kinetic History",
      description: "Electronic Arts Intermix's online history of early video: TV as a Creative Medium, The Kitchen, Vasulka Video, artist-built tools, women's video festivals, Open Circuits and extensive primary documentation. Catalogue authority and research context; full-work streaming varies by title and access.",
      tags: ["Video art", "Electronic Arts Intermix", "History", "Tools"],
      url: "https://www.eai.org/webpages/1224",
      sourceLabel: "Explore EAI's Kinetic History",
      sourceKind: "institution",
      verified: "2026-08-16"
    }
  ];

  additions.forEach((entry) => {
    const index = curation.ready.findIndex((current) => current && current.title === entry.title);
    if (index >= 0) curation.ready[index] = entry;
    else curation.ready.push(entry);
  });
})();
