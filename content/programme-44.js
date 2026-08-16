/* OPTICAL WEATHER v4.3 — Programme 44 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-44 loaded before curation.js");

  curation.programmes.push({
    title: "44 — Signal / Feedback / Video Machine",
    description: "Six hours inside the electronic image: video noise, scan processors, sound made visible, machine vision, digital articulation and landscapes transformed into time/energy objects — using the Vasulka laboratory as a way into video as material rather than television as representation.",
    duration: 362,
    tags: ["video art", "electronic image", "feedback", "scan processing", "machine vision", "Steina", "Woody Vasulka", "signal"],
    modes: ["WATCH PROPERLY", "LET IT RUN"],
    items: [
      {
        title: "Homemade TV: The Electronic Image",
        credit: "Portable Channel / Sanford Rockowitz with Steina & Woody Vasulka, 1975",
        runtime: "29m",
        watch: "https://vimeo.com/357923173",
        watchLabel: "Watch at Visual Studies Workshop",
        sourceKind: "institution",
        verified: "2026-08-16",
        note: "A period broadcast introduction made from inside the experiment: electronic image processing explained and demonstrated before the vocabulary hardened into media-art history."
      },
      {
        title: "Noisefields",
        credit: "Steina & Woody Vasulka, 1974",
        runtime: "12m",
        search: "https://www.youtube.com/results?search_query=Steina+Woody+Vasulka+Noisefields+1974",
        note: "Video noise becomes the picture rather than interference with it: keyed colour fields make the signal's energy both image and sound. Authoritative EAI distribution runtime: 12:05."
      },
      {
        title: "Soundsize",
        credit: "Steina & Woody Vasulka, 1974",
        runtime: "5m",
        search: "https://www.youtube.com/results?search_query=Steina+Woody+Vasulka+Soundsize+1974",
        note: "Dots swell and contract under synthesizer control: a concise demonstration of sound and image sharing the same electronic grammar. EAI runtime: 4:40."
      },
      {
        title: "Violin Power",
        credit: "Steina, 1970–78",
        runtime: "10m",
        watch: "https://www.fondation-langlois.org/html/e/page.php?NumPage=485",
        watchLabel: "Watch full version at Fondation Langlois",
        sourceKind: "archive",
        verified: "2026-08-16",
        note: "The violin stops accompanying the image and begins playing it: bow movement and sound deflect scan lines until musical gesture becomes electronic image structure. The archive explicitly identifies this as the full 1978 version."
      },
      {
        title: "Orbital Obsessions",
        credit: "Steina, 1975–77; revised 1988",
        runtime: "24m",
        search: "https://www.youtube.com/results?search_query=Steina+Orbital+Obsessions+1988",
        note: "Mechanised camera movement displaces the human viewpoint. This programme uses EAI's current distributed revision (24:25), not merely the earlier component dates."
      },
      {
        title: "Artifacts",
        credit: "Woody Vasulka, 1980",
        runtime: "21m",
        search: "https://www.youtube.com/results?search_query=Woody+Vasulka+Artifacts+1980",
        note: "The Digital Image Articulator turns image-making into a collaboration with the machine: pixels, encoded values and transformations become visible syntax. EAI distribution runtime: 21:20; institutional holdings may preserve slightly different versions."
      },
      {
        title: "Bad",
        credit: "Steina, 1979",
        runtime: "2m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Bad+1979+video",
        note: "A face is stretched, squeezed and displaced through Buffer Oriented Digital Device commands: self-portrait as software operation. EAI runtime: 2:14."
      },
      {
        title: "Urban Episodes",
        credit: "Steina, 1980",
        runtime: "9m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Urban+Episodes+1980",
        note: "Rotating mirrors and motorised cameras make the city obey machine vision rather than human orientation. EAI runtime: 8:50."
      },
      {
        title: "Summer Salt",
        credit: "Steina, 1982",
        runtime: "19m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Summer+Salt+1982",
        note: "Landscape is re-seen through optical, mechanical and electronic intervention: perception becomes an engineered event. EAI runtime: 18:48."
      },
      {
        title: "Flux",
        credit: "Steina, 1977",
        runtime: "8m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Flux+1977",
        note: "Water, noise and rapid switching collapse representation into perceptual velocity. EAI runtime: 8:00."
      },
      {
        title: "Cantaloup",
        credit: "Steina & Woody Vasulka, 1980",
        runtime: "28m",
        search: "https://www.youtube.com/results?search_query=Steina+Woody+Vasulka+Cantaloup+1980",
        note: "A sustained electronic-image investigation from the analog/digital threshold; retained here as a longer laboratory block. EAI runtime: 27:54."
      },
      {
        title: "Selected Treecuts",
        credit: "Steina, distributed 1980",
        runtime: "8m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Selected+Treecuts+1980",
        note: "Tree and landscape fragments become material for electronic re-seeing. The artist archive lists earlier work dates; OPTICAL WEATHER follows EAI's current 1980 distribution record (8:11) for the viewing version."
      },
      {
        title: "The Commission",
        credit: "Woody Vasulka, 1983",
        runtime: "45m",
        search: "https://www.youtube.com/results?search_query=Woody+Vasulka+The+Commission+1983",
        note: "Electronic imaging codes are pushed into narrative: Paganini, Berlioz and video processing become an opera whose transformations function as syntax rather than decoration. EAI runtime: 44:55."
      },
      {
        title: "Voice Windows",
        credit: "Steina with Joan La Barbara, 1986",
        runtime: "8m",
        search: "https://www.youtube.com/results?search_query=Steina+Joan+La+Barbara+Voice+Windows+1986",
        note: "La Barbara's voice generates animated line structures over landscape: sound becomes a spatial component of the picture. EAI runtime: 8:10."
      },
      {
        title: "Art of Memory",
        credit: "Woody Vasulka, 1987",
        runtime: "36m",
        search: "https://www.youtube.com/results?search_query=Woody+Vasulka+Art+of+Memory+1987",
        note: "Newsreel history is made sculptural and unstable: the electronic image becomes a machine for remembering war, revolution and the nuclear century. EAI runtime: 36:00.",
        sensory: "Contains transformed archival imagery of war, political violence and nuclear history."
      },
      {
        title: "Orka",
        credit: "Steina, 1995",
        runtime: "16m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Orka+1995",
        note: "A later Steina work where landscape and electronic manipulation remain inseparable. EAI's current distribution record gives 16:00."
      },
      {
        title: "Pyroglyphs",
        credit: "Steina, distributed 1995",
        runtime: "27m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Pyroglyphs+1995",
        note: "Fire, forge and processed sound become a multi-channel electronic landscape. OPTICAL WEATHER follows EAI's 1995 distributed video record (27:20), while the installation history begins earlier."
      },
      {
        title: "The West",
        credit: "Steina, distributed 1998",
        runtime: "28m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+The+West+1998",
        note: "The Southwest landscape is layered with electronic colour, ruins and telescopes scanning for signals. The original installation dates to 1983; this programme follows EAI's current 1998 distributed version (28:25)."
      },
      {
        title: "Midi Violin Demo",
        credit: "Steina, 1998",
        runtime: "11m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Midi+Violin+Demo+1998",
        note: "The Violin Power proposition becomes an explicit digital control interface: musical gesture addresses and manipulates stored video. EAI runtime: 11:00."
      },
      {
        title: "Trevor",
        credit: "Steina, 1999",
        runtime: "11m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Trevor+1999",
        note: "Late-century electronic imaging where the accumulated machine vocabulary is no longer a demonstration but an expressive language. EAI runtime: 11:00."
      },
      {
        title: "Warp",
        credit: "Steina, 2000",
        runtime: "5m",
        search: "https://www.youtube.com/results?search_query=Steina+Vasulka+Warp+2000",
        note: "A short coda at the analog/digital seam: image transformation has become immediate, fluid and performative. EAI runtime: 4:30."
      }
    ]
  });

  curation.metadata.programmes["44"] = {
    attention: ["attentive", "intermittent"],
    language: ["English", "none", "mixed"],
    image: "mixed",
    energy: ["rhythmic", "intense", "hypnotic"],
    form: ["experimental", "video art", "documentary"],
    session: "six-to-ten",
    sound: "mixed",
    territories: ["dream-experiment", "archive-process", "animation"],
    directions: ["strange", "archive", "animation", "all-night"],
    regions: ["United States", "Iceland", "Czech Republic"],
    period: "1970s–2000s",
    displayName: "Signal / Feedback / Video Machine",
    displayDescription: "The electronic image treated as material: noise, waveform, scan, feedback, machine vision and digital articulation across the Vasulkas' working laboratory.",
    context: "This is deliberately not a comprehensive history of early video art. It uses the unusually well-documented Vasulka corpus as a laboratory for understanding the image as electronic signal. EAI records are used as authoritative version/runtime metadata; where EAI catalogue access is not public full-playback, the programme provides resilient discovery instead of mislabelling catalogue pages as streams."
  };
})();
