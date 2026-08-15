/* OPTICAL WEATHER v4.2 — focused reservoir expansion */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: v4.2 expansion loaded before curation.js");

  curation.version = "4.2";
  curation.updated = "2026-08-16";

  const additions = [
    {
      title: "BFI Player — Free Archive Collections",
      description: "Thousands of free archive films and curated collections from the BFI and UK archive partners: local actuality, amateur film, travel, industry, documentary and restored treasures. Playback is UK-only; use programme-level Find current copy routes elsewhere.",
      tags: ["Britain", "Archive", "Actuality", "UK only"],
      url: "https://player.bfi.org.uk/free/collections",
      sourceLabel: "BFI Player — UK only",
      sourceKind: "cinematheque",
      verified: "2026-08-16"
    },
    {
      title: "NFSA — Online Collection",
      description: "More than 5,500 online collection highlights from Australia’s national audiovisual archive: film, television, radio, advertising, music, documentary, experimental work and everyday screen culture.",
      tags: ["Australia", "Archive", "Screen culture"],
      url: "https://www.nfsa.gov.au/collection",
      sourceLabel: "National Film and Sound Archive of Australia",
      sourceKind: "archive",
      verified: "2026-08-16"
    },
    {
      title: "NFSA — Nangamai",
      description: "The NFSA’s First Nations online collection, bringing together film, television, music, recorded voices and archival material around Aboriginal and Torres Strait Islander histories, activism and creative expression. Cultural warnings apply to some material.",
      tags: ["First Nations", "Australia", "Archive"],
      url: "https://www.nfsa.gov.au/stories/deep-dives/a-celebration-of-first-nations-culture",
      sourceLabel: "National Film and Sound Archive of Australia",
      sourceKind: "archive",
      verified: "2026-08-16"
    },
    {
      title: "NFSA — Short Films by First Nations Filmmakers",
      description: "A curated route through shorts by Aboriginal and Torres Strait Islander filmmakers including Wayne Blair, Beck Cole, Ivan Sen, Catriona McKenzie and Warwick Thornton, with work from major Indigenous filmmaking initiatives of the 1990s and 2000s.",
      tags: ["First Nations", "Short film", "Australia"],
      url: "https://www.nfsa.gov.au/collection/curated/short-films-aboriginal-and-torres-strait-islander-filmmakers",
      sourceLabel: "National Film and Sound Archive of Australia",
      sourceKind: "archive",
      verified: "2026-08-16"
    },
    {
      title: "ACMI — Screen Culture Collection",
      description: "Search more than 40,000 moving-image works held by Australia’s museum of screen culture, including First Nations work, experimental film, Australian animation, commissions, television and videogames. Online viewing varies by rights and access status.",
      tags: ["Australia", "Museum", "Experimental"],
      url: "https://www.acmi.net.au/works/",
      sourceLabel: "ACMI",
      sourceKind: "museum",
      verified: "2026-08-16"
    },
    {
      title: "NFPF — Films Available for Viewing",
      description: "A freely viewable preservation reservoir from the National Film Preservation Foundation: silent film, newsreels, home movies, sponsored films, animation, political material and avant-garde work restored across US archives.",
      tags: ["Archive", "Preservation", "Avant-garde"],
      url: "https://www.filmpreservation.org/preserved-films/films-available-for-viewing",
      sourceLabel: "National Film Preservation Foundation",
      sourceKind: "archive",
      verified: "2026-08-16"
    }
  ];

  additions.forEach((entry) => {
    const index = curation.ready.findIndex((current) => current && current.title === entry.title);
    if (index >= 0) curation.ready[index] = entry;
    else curation.ready.push(entry);
  });
})();