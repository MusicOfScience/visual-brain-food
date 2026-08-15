/* OPTICAL WEATHER v4.1 — Programme 43 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-43 loaded before curation.js");

  curation.programmes.push({
    title: "43 — The Camera Turns Back: Australian Feminist Counter-Images",
    description: "Six and a half hours of Australian women and feminist collectives taking control of the apparatus: domesticity, labour, sexuality, self-portraiture, First Nations self-representation, colonial memory and the archive turned back on itself.",
    duration: 395,
    tags: ["Australia", "feminist film", "experimental", "women filmmakers", "First Nations", "self-representation", "archive"],
    modes: ["WATCH PROPERLY", "LET IT RUN"],
    items: [
      {
        title: "A Film for Discussion",
        credit: "Sydney Women’s Film Group / Martha Ansara, Jeni Thornley and collaborators, 1973",
        runtime: "24m",
        search: "https://www.youtube.com/results?search_query=A+Film+for+Discussion+1973+Sydney+Women%27s+Film+Group",
        note: "Possibly Australia’s first feminist film: experimental and realist fragments made to trigger collective discussion rather than passive viewing."
      },
      {
        title: "Low Deposit, Easy Terms",
        credit: "Sue Ford, 1971",
        runtime: "2m",
        watch: "https://www.acmi.net.au/works/118038--low-deposit-easy-terms/",
        watchLabel: "Watch at ACMI",
        sourceKind: "museum",
        verified: "2026-08-16",
        note: "Ford turns Melbourne car yards, salesmanship and the machinery of Australian aspiration into a two-minute feminist/urban camera sketch."
      },
      {
        title: "We Aim to Please",
        credit: "Robin Laurie & Margot Nash, 1976",
        runtime: "13m",
        search: "https://www.youtube.com/results?search_query=We+Aim+to+Please+1976+Margot+Nash+Robin+Laurie",
        note: "Anarchic, funny and erotically charged: the filmmakers put themselves in the frame and attack conventions governing how women’s bodies are represented.",
        sensory: "Contains nudity, sexual imagery and deliberately confrontational feminist performance."
      },
      {
        title: "Faces",
        credit: "Sue Ford, 1976",
        runtime: "9m",
        watch: "https://www.acmi.net.au/works/97661--faces/",
        watchLabel: "Watch at ACMI",
        sourceKind: "museum",
        verified: "2026-08-16",
        note: "Portraiture stretched into time: friends and artists look back at the camera long enough for identity to become performance."
      },
      {
        title: "Maidens",
        credit: "Jeni Thornley, 1978",
        runtime: "28m",
        search: "https://www.youtube.com/results?search_query=Jeni+Thornley+Maidens+1978",
        note: "Four generations of maternal family history assembled from photographs, slides, home movies and historical women’s films: family archive as feminist historiography."
      },
      {
        title: "My Survival as an Aboriginal",
        credit: "Essie Coffey with Martha Ansara and collaborators, 1978",
        runtime: "49m",
        search: "https://www.youtube.com/results?search_query=My+Survival+as+an+Aboriginal+Essie+Coffey+1978",
        note: "Muruwari activist Essie Coffey directs the representation of her own Brewarrina community, culture and political analysis rather than being mediated as documentary subject.",
        context: "Aboriginal and Torres Strait Islander viewers are advised that available archival copies may contain images or voices of people who have died."
      },
      {
        title: "For Love or Money: A History of Women and Work in Australia",
        credit: "Megan McMurchy, Margot Nash, Margot Oliver & Jeni Thornley, 1983",
        runtime: "1h 49m",
        search: "https://www.youtube.com/results?search_query=For+Love+or+Money+History+of+Women+and+Work+Australia+1983",
        note: "More than two hundred films, radio, diaries, songs, letters and interviews reorganised into a counter-history of paid, unpaid and organised women’s labour."
      },
      {
        title: "This Woman Is Not a Car",
        credit: "Margaret Dodd, 1982",
        runtime: "23m",
        search: "https://www.youtube.com/results?search_query=Margaret+Dodd+This+Woman+Is+Not+a+Car+1982",
        note: "Suburban motherhood, car fetish and the Australian Dream mutate into an experimental collision of memory, fear, fantasy and assigned female role."
      },
      {
        title: "A Song of Air",
        credit: "Merilee Bennett, 1987",
        runtime: "26m",
        watch: "https://www.acmi.net.au/works/78816--a-song-of-air/",
        watchLabel: "Watch at ACMI",
        sourceKind: "museum",
        verified: "2026-08-16",
        note: "A daughter reclaims her father’s 16mm home movies, turning patriarchal family archive into an autobiographical work of resistance."
      },
      {
        title: "Nice Coloured Girls",
        credit: "Tracey Moffatt, 1987",
        runtime: "16m",
        search: "https://www.youtube.com/results?search_query=Tracey+Moffatt+Nice+Coloured+Girls+1987",
        note: "Contemporary Aboriginal women in Kings Cross are cross-cut with colonial journals: the historical gaze is quoted, reversed and made unstable.",
        context: "First Nations work engaging colonial sexual and racial power; archival presentations may include images or voices of people who have died."
      },
      {
        title: "Egami",
        credit: "Sue Ford / Victorian Women’s Film Unit, 1985",
        runtime: "14m",
        watch: "https://www.acmi.net.au/works/118037--egami/",
        watchLabel: "Watch at ACMI",
        sourceKind: "museum",
        verified: "2026-08-16",
        note: "Melbourne seen by an extraterrestrial visitor: monuments to war, women displayed for sale and colonial amnesia made strange by reversing the image."
      },
      {
        title: "Memory Film: A Filmmaker’s Diary",
        credit: "Jeni Thornley, 2023",
        runtime: "1h 22m",
        watch: "https://www.sbs.com.au/ondemand/movie/memory-film-a-filmmakers-diary/2426582595867",
        watchLabel: "Watch at SBS On Demand",
        sourceKind: "broadcaster",
        verified: "2026-08-16",
        note: "A coda from the future of the archive: three decades of Thornley’s Super 8 become a dialogue-free film poem about radical feminism, gender fluidity, motherhood, land rights, love and political change.",
        sensory: "Mature themes, coarse language references and nudity are flagged by SBS; the film itself has no speaking voices and uses music/sound."
      }
    ]
  });

  curation.metadata.programmes["43"] = {
    attention: ["attentive", "intermittent"],
    language: ["English", "none", "mixed"],
    image: "mixed",
    energy: ["intimate", "confrontational", "reflective"],
    form: ["experimental", "documentary", "essay film"],
    session: "six-to-ten",
    sound: "mixed",
    territories: ["world-histories", "archive-process", "print-design", "dream-experiment"],
    directions: ["strange", "archive", "world-cinema", "all-night"],
    regions: ["Australia"],
    period: "1970s–2020s",
    displayName: "The Camera Turns Back: Australian Feminist Counter-Images",
    displayDescription: "Australian feminist and women’s moving-image practice as counter-image: makers seize the camera, rework family and national archives, and refuse inherited representations of gender, labour and colonial history.",
    context: "Includes nudity and sexual imagery, discussion of gendered violence and oppression, and First Nations material. Aboriginal and Torres Strait Islander viewers should note that archival sources may contain images or voices of people who have died."
  };
})();
