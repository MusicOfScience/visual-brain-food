/* OPTICAL WEATHER v4.1 — Programme 42 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-42 loaded before curation.js");

  const source = (title, credit, runtime, watch, watchLabel, sourceKind, note, extra = {}) => ({
    title, credit, runtime, watch, watchLabel, sourceKind,
    verified: "2026-08-16",
    note,
    ...extra
  });

  curation.programmes.push({
    title: "42 — The Camera Finds the Street",
    description: "Six hours of streets becoming cinema: crowds, traffic, shopfronts, trams, crossings, reconstruction, congestion, pedestrianisation and the accidental choreography of people who rarely know what the camera will preserve.",
    duration: 364,
    tags: ["street", "actuality", "city", "traffic", "archive", "urbanism", "documentary", "public space"],
    modes: ["LET IT RUN", "WATCH PROPERLY"],
    items: [
      source(
        "New York 1898–1906 — actuality block",
        "Library of Congress / Edison & American Mutoscope and Biograph",
        "90m block",
        "https://www.loc.gov/collections/early-films-of-new-york-1898-to-1906/",
        "Open LOC collection",
        "archive",
        "Follow the city rather than a single film: Broadway, Madison Square, Flatiron, elevated railways, ferries, parades, labour and street traffic. Choose roughly ninety minutes from the collection in catalogue order."
      ),
      source(
        "Dutch City Films — panorama / street / phantom ride block",
        "Eye Filmmuseum / Willy Mullens and contemporaries, chiefly 1918–1922",
        "90m block",
        "https://www.eyefilm.nl/en/collection/collections/film/film-files/de-jaren-twintig-en-dertig/stedenfilms",
        "Open EYE city films",
        "cinematheque",
        "A deliberately roaming block through the Dutch city-film tradition: high panoramas, streets, squares, waterways, industry and occasional camera rides from moving trams or cars."
      ),
      source(
        "How We Filmed in the Nineties",
        "Amateur compilation, 1936",
        "24m",
        "https://player.bfi.org.uk/free/film/watch-how-we-filmed-in-the-nineties-1936-online",
        "Watch at BFI",
        "cinematheque",
        "A later homemade compilation of very early material: street scenes, transport, civic spectacle and the unruly heterogeneity of cinema's first decades."
      ),
      source(
        "Peterborough Today",
        "Local actuality, 1933",
        "24m",
        "https://player.bfi.org.uk/free/film/watch-peterborough-today-1933-online",
        "Watch at BFI",
        "cinematheque",
        "Factories and streets filmed for local audiences: ordinary people looking back at a camera whose future archival value they could not know."
      ),
      source(
        "Pedestrians and Traffic",
        "Sheffield City Engineers Department, 1950",
        "12m",
        "https://player.bfi.org.uk/free/film/watch-pedestrians-and-traffic-1950-online",
        "Open at BFI",
        "cinematheque",
        "A traffic-control study accidentally becomes social portraiture: coats, headscarves, trams, bomb damage, white-coated policemen and pedestrians holding their ground."
      ),
      source(
        "Central London Traffic",
        "Government-sponsored research film, 1956",
        "12m",
        "https://player.bfi.org.uk/free/film/watch-central-london-traffic-1956-online",
        "Open at BFI",
        "cinematheque",
        "Congestion as urban texture: Tower Bridge, Oxford Street and Soho seen through the problem of too many vehicles in too little city."
      ),
      source(
        "Bus Strike Traffic",
        "Sheffield City Engineers Department, 1959",
        "9m",
        "https://player.bfi.org.uk/free/film/watch-bus-strike-traffic-1959-online",
        "Open at BFI",
        "cinematheque",
        "A workplace dispute appears indirectly as immobilised streets and police choreography during Sheffield's bus strike."
      ),
      source(
        "Traffic Island",
        "Philip S. H. Mottram, 1963",
        "16m",
        "https://player.bfi.org.uk/free/film/watch-traffic-island-1963-online",
        "Open at BFI",
        "cinematheque",
        "The camera stops merely observing traffic and begins arguing with it: town planning, danger and the car's colonisation of public space."
      ),
      source(
        "Streets for Walking",
        "Essex County Planners, 1970",
        "4m",
        "https://player.bfi.org.uk/free/film/watch-streets-for-walking-1970-online",
        "Open at BFI",
        "cinematheque",
        "Pedestrianisation offered as a new civic technology: remove the motor car and the street changes meaning."
      ),
      source(
        "Winchester",
        "Amateur film, 1964",
        "25m",
        "https://player.bfi.org.uk/free/film/watch-winchester-1964-online",
        "Open at BFI",
        "cinematheque",
        "A pre-pedestrianisation city portrait in which medieval streets, shops, buses and municipal modernity occupy the same frame."
      ),
      {
        title: "A Photographer Films Amsterdam",
        credit: "Ed van der Elsken, 1982",
        runtime: "58m",
        search: "https://www.youtube.com/results?search_query=Ed+van+der+Elsken+A+Photographer+Films+Amsterdam+1982",
        note: "A photographer turns his native city into moving portraiture on foot, by car and from the air; the street looks back, performs and refuses anonymity."
      }
    ]
  });

  curation.metadata.programmes["42"] = {
    attention: ["peripheral", "intermittent", "attentive"],
    language: ["none", "mixed"],
    image: "mixed",
    energy: ["calm", "rhythmic"],
    form: ["archive", "documentary", "shorts"],
    session: "six-to-ten",
    sound: "replaceable",
    territories: ["cities-politics", "world-histories", "archive-process"],
    directions: ["archive", "world-cinema", "gallery", "all-night"],
    regions: ["United States", "Netherlands", "United Kingdom"],
    period: "1890s–1980s",
    displayName: "The Camera Finds the Street",
    displayDescription: "Crowds, crossings, trams, traffic and public space: a century in which the street first ignores the camera, then learns to live with it.",
    context: "Collection blocks are intentional here. Early actuality often survives as dozens of very short views; accumulation rather than a single canonical film is the programme's unit of meaning."
  };
})();
