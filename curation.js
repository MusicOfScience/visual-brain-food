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
 * Keep this file reviewable: one editorial change per object, no generated
 * scraping, no automatic claims about captions/subtitles/accessibility.
 */
window.OPTICAL_WEATHER_CURATION = {
  version: "4.1",
  updated: "2026-08-16",

  ready: [
    /*
    {
      title: "Example ready-made stream",
      description: "What it is and why it belongs here.",
      tags: ["Example"],
      url: "https://www.youtube.com/playlist?list=..."
    }
    */
  ],

  programmes: [
    /*
    {
      title: "37 — Example Programme",
      description: "Editorial proposition.",
      duration: 420,
      tags: ["example"],
      items: [
        {
          title: "Work title",
          credit: "Maker, year",
          runtime: "42m",
          watch: null,
          search: "https://www.youtube.com/results?search_query=...",
          note: ""
        }
      ],
      modes: ["WATCH PROPERLY"]
    }
    */
  ],

  metadata: {
    programmes: {
      /* "37": { ...metadata... } */
    }
  }
};
