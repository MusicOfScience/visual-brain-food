/*
 * OPTICAL WEATHER — in-house curation layer (v4.1)
 *
 * Add or revise editorial content here instead of editing app.js or the
 * historical data files. The registry merges this layer into the existing
 * catalogue before app.js starts.
 *
 * Existing entries can be replaced deliberately:
 * - ready-made streams match by exact title
 * - programmes match by their two-digit programme id (e.g. "07")
 * - metadata is merged by programme id
 *
 * Source model:
 * - YouTube routes remain valid and useful for resilience.
 * - A verified institutional direct source may stand on its own.
 * - Non-YouTube direct sources must identify sourceLabel/watchLabel,
 *   sourceKind and verified date (YYYY-MM-DD).
 *
 * Keep this file reviewable: one editorial change per object, no generated
 * scraping, no automatic claims about captions/subtitles/accessibility.
 */
window.OPTICAL_WEATHER_CURATION = {
  version: "4.1",
  updated: "2026-08-16",

  ready: [
    {
      title: "EYE — Silent Film Online",
      description: "Several hundred digitised silent films from Eye Filmmuseum: early fiction, actuality, colour processes, travel, experiment and fragments from cinema’s first decades.",
      tags: ["Silent", "Archive", "Early cinema"],
      url: "https://www.eyefilm.nl/en/collection/collections/film/silent-film",
      sourceLabel: "Eye Filmmuseum",
      sourceKind: "cinematheque",
      verified: "2026-08-16"
    },
    {
      title: "Library of Congress — National Screening Room",
      description: "A vast moving-image reservoir: actuality, documentary, home movies, experimental work, news, advertising, public information and culturally significant American film.",
      tags: ["Archive", "Actuality", "Documentary"],
      url: "https://www.loc.gov/collections/national-screening-room/",
      sourceLabel: "Library of Congress",
      sourceKind: "archive",
      verified: "2026-08-16"
    },
    {
      title: "Filmoteca UNAM — Cine en línea",
      description: "More than a hundred free works from Mexico’s national university film archive: silent cinema, restored films, social movements, science, public health, painting and historical documentary.",
      tags: ["Mexico", "Archive", "Restoration"],
      url: "https://cineenlinea.filmoteca.unam.mx/",
      sourceLabel: "Filmoteca UNAM",
      sourceKind: "cinematheque",
      verified: "2026-08-16"
    },
    {
      title: "NFAJ — Japanese Animated Film Classics",
      description: "The National Film Archive of Japan’s portal to 64 digitised early animations from 1917–1942, with routes into Noburō Ōfuji materials and the oldest surviving Japanese animation.",
      tags: ["Japan", "Animation", "Archive"],
      url: "https://www.nfaj.go.jp/english/onlineservice/",
      sourceLabel: "National Film Archive of Japan",
      sourceKind: "archive",
      verified: "2026-08-16"
    },
    {
      title: "NFB — Norman McLaren",
      description: "The National Film Board of Canada’s McLaren collection: direct-on-film drawing, synthetic sound, pixillation, abstraction, dance and camera-less cinema.",
      tags: ["Animation", "Experimental", "Direct film"],
      url: "https://www.nfb.ca/directors/norman-mclaren/?language=all",
      sourceLabel: "National Film Board of Canada",
      sourceKind: "institution",
      verified: "2026-08-16"
    },
    {
      title: "BFI Player — Free Archive Collections",
      description: "Thousands of free archive films and curated collections from the BFI and UK archive partners: local actuality, amateur film, travel, industry, documentary and restored treasures.",
      tags: ["Britain", "Archive", "Actuality"],
      url: "https://player.bfi.org.uk/free/collections",
      sourceLabel: "BFI Player",
      sourceKind: "cinematheque",
      verified: "2026-08-16"
    },
    {
      title: "The Met 360° Project",
      description: "Six immersive films through The Met’s architecture and galleries, including empty after-hours spaces, time-lapse and elevated views: a quiet screen-as-room route.",
      tags: ["Gallery", "Architecture", "Ambient"],
      url: "https://www.metmuseum.org/art/online-features/met-360-project?app=true",
      sourceLabel: "The Metropolitan Museum of Art",
      sourceKind: "museum",
      verified: "2026-08-16"
    },
    {
      title: "KOFA — Korean Classic Film",
      description: "The Korean Film Archive’s long-running classic-film channel: roughly two hundred features spanning Korean film history, with English subtitles widely available.",
      tags: ["Korea", "World cinema", "Archive"],
      url: "https://www.youtube.com/@KoreanFilm"
    }
  ],

  programmes: [],

  metadata: {
    programmes: {}
  }
};
