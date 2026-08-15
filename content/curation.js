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

  programmes: [
    {
      title: "37 — Drawn on Film: Ink / Paper / Light",
      description: "Six hours of cinema treated as physical matter: ink drawn into emulsion, colour painted onto clear stock, scratches cut into black, paper moved frame by frame, optical sound made visible, and filmmakers explaining how the marks got there.",
      duration: 360,
      tags: ["direct film", "camera-less", "animation", "optical sound", "Len Lye", "Norman McLaren", "Noburō Ōfuji"],
      modes: ["WATCH PROPERLY", "LET IT RUN"],
      items: [
        {
          title: "Creative Process: Norman McLaren",
          credit: "Donald McWilliams / National Film Board of Canada, 1990",
          runtime: "1h 56m 32s",
          watch: "https://www.nfb.ca/film/creative_process_norman_mclaren/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Begin with the workshop rather than the canon: cameras discarded, sound drawn, unfinished experiments opened up."
        },
        {
          title: "Loops",
          credit: "Norman McLaren, 1940",
          runtime: "2m 40s",
          watch: "https://www.nfb.ca/film/loops/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Image and sound drawn directly onto film with pen and ink."
        },
        {
          title: "Dots",
          credit: "Norman McLaren, 1940",
          runtime: "2m 30s",
          watch: "https://www.nfb.ca/film/dots/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "A second direct-on-film study in which both image and sound are drawn."
        },
        {
          title: "Hen Hop",
          credit: "Norman McLaren, 1942",
          runtime: "3m 53s",
          watch: "https://www.nfb.ca/film/hen_hop/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Observed movement reduced to a dancing line, drawn directly onto 35mm stock."
        },
        {
          title: "Begone Dull Care",
          credit: "Norman McLaren & Evelyn Lambart, 1949",
          runtime: "7m 51s",
          watch: "https://www.nfb.ca/film/begone_dull_care/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Paint, engraving and transformation worked directly onto film against the Oscar Peterson Trio."
        },
        {
          title: "Blinkity Blank",
          credit: "Norman McLaren, 1955",
          runtime: "5m 29s",
          watch: "https://www.nfb.ca/film/blinkity-blank/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Engraved marks erupt from black leader: the scratch becomes line, creature and rhythm."
        },
        {
          title: "Lines Vertical",
          credit: "Norman McLaren & Evelyn Lambart, 1960",
          runtime: "5m 49s",
          watch: "https://www.nfb.ca/film/lines_vertical/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Minimal line becomes field, movement and optical pressure."
        },
        {
          title: "Lines Horizontal",
          credit: "Norman McLaren & Evelyn Lambart, 1962",
          runtime: "5m 55s",
          watch: "https://www.nfb.ca/film/lines_horizontal/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "The vertical experiment rotated, re-scored and made newly strange."
        },
        {
          title: "Mosaic",
          credit: "Norman McLaren & Evelyn Lambart, 1965",
          runtime: "5m 29s",
          watch: "https://www.nfb.ca/film/mosaic/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Vertical and horizontal films superimposed until their intersections become an optical score."
        },
        {
          title: "Synchromy",
          credit: "Norman McLaren, 1971",
          runtime: "7m 27s",
          watch: "https://www.nfb.ca/film/synchromy/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Synthetic sound cards photographed into soundtrack and image: what you hear becomes what you see."
        },
        {
          title: "Norman McLaren: Animated Musician",
          credit: "Donald McWilliams / National Film Board of Canada, 2014",
          runtime: "26m 40s",
          watch: "https://www.nfb.ca/film/norman_mclaren_animated_musician/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "A compact account of McLaren drawing, etching and photographing sound directly into the film strip."
        },
        {
          title: "Now Is the Time",
          credit: "Norman McLaren & Evelyn Lambart, 1951",
          runtime: "3m",
          watch: "https://www.nfb.ca/film/now_is_the_time/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Paper cut-outs, direct drawing and hand-drawn stereoscopic sound commissioned for the Festival of Britain."
        },
        {
          title: "Around Is Around",
          credit: "Norman McLaren & Evelyn Lambart, 1951",
          runtime: "10m",
          watch: "https://www.nfb.ca/film/around_is_around/",
          watchLabel: "Watch at NFB",
          sourceKind: "institution",
          verified: "2026-08-16",
          note: "Oscilloscope patterns leave the hand behind without leaving drawing: electronic line as moving image."
        },
        {
          title: "Tusalava",
          credit: "Len Lye, 1929",
          runtime: "10m",
          watch: "https://govettbrewster.com/media/files/F1861-Tusalava_H264_1080p24-PBX_Mono.mp4",
          watchLabel: "Watch via Len Lye Centre",
          sourceKind: "museum",
          verified: "2026-08-16",
          note: "Lye before direct colour: hand-drawn organic forms grow, divide and consume one another."
        },
        {
          title: "A Colour Box",
          credit: "Len Lye, 1935",
          runtime: "4m",
          watch: "https://govettbrewster.com/media/files/f9061_acolourbox_h264_1080p25-pbx_mono.mp4",
          watchLabel: "Watch via Len Lye Centre",
          sourceKind: "museum",
          verified: "2026-08-16",
          note: "Painted and stencilled directly onto film stock: advertising commission turned kinetic abstraction."
        },
        {
          title: "The Birth of a Robot",
          credit: "Len Lye, 1936",
          runtime: "7m",
          watch: "https://govettbrewster.com/media/files/f9625-thebirthofarobot_h264_1080p25-pbx_mono.mp4",
          watchLabel: "Watch via Len Lye Centre",
          sourceKind: "museum",
          verified: "2026-08-16",
          note: "Stop-motion, colour and graphic invention pushed through a Shell advertising commission."
        },
        {
          title: "Free Radicals",
          credit: "Len Lye, 1958; revised 1979",
          runtime: "4m 09s",
          watch: "https://govettbrewster.com/media/files/f7706-freeradicals_h264_1080p24-pbx_mono.mp4",
          watchLabel: "Watch via Len Lye Centre",
          sourceKind: "museum",
          verified: "2026-08-16",
          note: "White lightning scratched into black film with tools including dental instruments and an arrowhead.",
          sensory: "Stark high-contrast scratched imagery and rapid rhythmic motion."
        },
        {
          title: "Kaleidoscope",
          credit: "Len Lye, 1935",
          runtime: "4m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Kaleidoscope+1935",
          note: "A companion direct-colour work; use the search route because authorised copies move."
        },
        {
          title: "Rainbow Dance",
          credit: "Len Lye, 1936",
          runtime: "5m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Rainbow+Dance+1936",
          note: "Colour separation, live action and graphic movement collide."
        },
        {
          title: "Trade Tattoo",
          credit: "Len Lye, 1937",
          runtime: "5m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Trade+Tattoo+1937",
          note: "Found GPO footage is reprinted, coloured and rhythmically reworked into graphic montage."
        },
        {
          title: "Colour Flight",
          credit: "Len Lye, 1938",
          runtime: "4m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Colour+Flight+1938",
          note: "Direct colour and commercial commission loosen into pure motion."
        },
        {
          title: "N. or N.W.",
          credit: "Len Lye, 1937",
          runtime: "7m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+N+or+NW+1937",
          note: "Graphic experiment, live action and postal instruction inhabit the same film."
        },
        {
          title: "Swinging the Lambeth Walk",
          credit: "Len Lye, 1939",
          runtime: "4m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Swinging+the+Lambeth+Walk+1939",
          note: "Popular dance tune disassembled into painted rhythmic colour."
        },
        {
          title: "Color Cry",
          credit: "Len Lye, 1952",
          runtime: "3m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Color+Cry+1952",
          note: "Photogram-like shadow, colour and musical pulse."
        },
        {
          title: "Rhythm",
          credit: "Len Lye, 1957",
          runtime: "1m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Rhythm+1957",
          note: "An industrial source image compressed into a one-minute rhythmic machine."
        },
        {
          title: "All Souls Carnival",
          credit: "Len Lye, 1957",
          runtime: "9m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+All+Souls+Carnival+1957",
          note: "A dense late-1950s return to colour, music and painted-film energy."
        },
        {
          title: "Particles in Space",
          credit: "Len Lye, 1979",
          runtime: "4m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Particles+in+Space+1979",
          note: "Scratched line and black field reduced to elemental bursts."
        },
        {
          title: "Life’s Musical Minute",
          credit: "Len Lye, c.1953",
          runtime: "2m",
          search: "https://www.youtube.com/results?search_query=Len+Lye+Lifes+Musical+Minute+1953",
          note: "A small restored fragment of Lye’s continuing effort to turn music into graphic movement."
        },
        {
          title: "A Story of Tobacco",
          credit: "Noburō Ōfuji, 1926",
          runtime: "3m",
          watch: "https://animation.filmarchives.jp/en/works/view/41025",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "A surviving fragment combining paper cut-out and live action; the existing version is incomplete."
        },
        {
          title: "The Thief of Baguda Castle",
          credit: "Noburō Ōfuji, 1926",
          runtime: "14m",
          watch: "https://animation.filmarchives.jp/en/works/view/15479",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "Ōfuji’s debut Chiyogami animation: patterned Japanese paper made mobile."
        },
        {
          title: "The Story of the Monkey King",
          credit: "Noburō Ōfuji, 1926",
          runtime: "8m",
          watch: "https://animation.filmarchives.jp/en/works/view/41061",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "A surviving digest of a much longer chiyogami cut-out film."
        },
        {
          title: "A Ship of Oranges",
          credit: "Noburō Ōfuji, 1927",
          runtime: "6m",
          watch: "https://animation.filmarchives.jp/en/works/view/86030",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "Chiyogami figures, weather and dance survive here in a reduced-gauge version."
        },
        {
          title: "The Golden Flower",
          credit: "Noburō Ōfuji, 1929",
          runtime: "17m",
          watch: "https://animation.filmarchives.jp/en/works/view/42165",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "A long chiyogami tale whose paper surfaces turn folklore into graphic theatre."
        },
        {
          title: "At the Border Checkpoint",
          credit: "Noburō Ōfuji, 1930",
          runtime: "8m",
          watch: "https://animation.filmarchives.jp/en/works/view/42203",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "The surviving second reel is presented without its original record-talkie sound."
        },
        {
          title: "Spring Song",
          credit: "Noburō Ōfuji, 1931",
          runtime: "3m",
          watch: "https://animation.filmarchives.jp/en/works/view/86028",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "Tinted chiyogami movement; the original synchronized-record sound is missing from the surviving version."
        },
        {
          title: "Will Power",
          credit: "Noburō Ōfuji, 1931",
          runtime: "18m",
          watch: "https://animation.filmarchives.jp/en/works/view/5227",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "A substantial surviving chiyogami narrative built from patterned paper, courage and transformation."
        },
        {
          title: "The Three Fearless Frogs",
          credit: "Noburō Ōfuji, 1933",
          runtime: "7m",
          watch: "https://animation.filmarchives.jp/en/works/view/41030",
          watchLabel: "Watch at NFAJ",
          sourceKind: "archive",
          verified: "2026-08-16",
          note: "Ōfuji answers American cel animation with his own militarised frog spectacle; the surviving 1937 re-edit is silent.",
          context: "Contains militaristic imagery derived from the period’s popular culture and the Shanghai Incident."
        }
      ]
    }
  ],

  metadata: {
    programmes: {
      "37": {
        attention: ["attentive", "intermittent"],
        language: ["none", "intertitles", "mixed"],
        image: "mixed",
        energy: ["rhythmic", "intense"],
        form: ["animation", "experimental", "documentary"],
        session: "six-to-ten",
        sound: "original",
        territories: ["dream-experiment", "animation", "print-design", "world-histories", "archive-process"],
        directions: ["strange", "animation", "print", "archive", "world-cinema", "all-night"],
        regions: ["Canada", "Aotearoa New Zealand", "Japan"],
        period: "1920s–2010s",
        displayName: "Drawn on Film: Ink / Paper / Light",
        displayDescription: "Marks become cinema: direct drawing, paint, scratching, patterned paper, optical sound and electronic line across McLaren, Lambart, Lye and Ōfuji.",
        context: "This programme includes surviving archival versions whose original sound, length or completeness may differ from historical release prints. Source notes flag those cases rather than treating the digital copy as transparent evidence."
      }
    }
  }
};
