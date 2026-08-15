/* OPTICAL WEATHER v4.1 — Programme 41 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-41 loaded before curation.js");

  const nfaj = (title, credit, runtime, path, note, extra = {}) => ({
    title,
    credit,
    runtime,
    watch: `https://animation.filmarchives.jp/en/works/view/${path}`,
    watchLabel: "Watch at NFAJ",
    sourceKind: "archive",
    verified: "2026-08-16",
    note,
    ...extra
  });

  curation.programmes.push({
    title: "41 — Japan Before Anime",
    description: "Six hours tracing Japanese animation before the postwar industry: surviving fragments, cutout and cel craft, educational morality, abstraction, sound, militarised popular culture and the technical brilliance that propaganda also learned to use.",
    duration: 381,
    tags: ["Japan", "animation", "prewar", "cutout", "cel", "propaganda", "NFAJ", "archive"],
    modes: ["WATCH PROPERLY", "LET IT RUN"],
    items: [
      nfaj("The Dull Sword", "Junichi Kouchi, 1917", "4m", "100183", "The oldest surviving Japanese frame-animation film currently viewable: a digitally restored tinted nitrate fragment made startlingly whole."),
      nfaj("Film Address: Ethicization of Politics", "Junichi Kouchi / Shinpei Goto, 1926", "32m", "43609", "Political cartooning becomes a moving lecture: animation, diagrams and intertitles used to instruct an electorate."),
      nfaj("The Nation of Fish", "Hakuzan Kimura / Ministry of Education, 1928", "15m", "5229", "Educational animation slides easily into martial allegory: collective defence, mobilisation and victory."),
      nfaj("Two Worlds", "Yasuji Murata / Ministry of Education, 1929", "15m", "86947", "Detailed cutout insects carry an explicit lesson in diligence, thrift and social conduct."),
      nfaj("Nonsense Story, Vol.1: Monkey Island", "Kenzo Masaoka, 1930", "24m", "42168", "Masaoka before the talkie breakthrough: long-form silent animation with fluid staging and character movement."),
      nfaj("Momotaro in the Sky", "Yasuji Murata, 1931", "13m", "13639", "Folklore is retooled as aviation fantasy amid contemporary militarisation; NFAJ notes the rogue eagle was understood as representing the United States.", { context: "Contains nationalist and militarised imagery produced during Japan's expansionist period." }),
      nfaj("Momotaro under the Sea", "Yasuji Murata, 1932", "9m", "11121", "The sequel moves Momotaro's military adventure underwater, with submarines, radio news and medals folded into children's fantasy.", { context: "Contains nationalist and militarised imagery." }),
      nfaj("Armies of the World", "Unknown animator / Army Ministry Information Bureau support, 1932", "28m", "44414", "A comparative survey of global military power and arms control whose missing opening only sharpens its status as surviving political evidence.", { context: "Government-supported military information film from the interwar period." }),
      nfaj("A Day after a Hundred Years", "Shigeji Ogino, 1933", "10m", "71578", "Ogino wakes in 2032: television, robots, colour machines and Mars travel inside a tiny independent science-fiction animation."),
      nfaj("Private Norakuro in Boot Camp / Training", "Yasuji Murata, 1933", "14m", "11105", "A popular comic dog enters army life; slapstick normalises barracks, hierarchy, manoeuvres and military hardware."),
      nfaj("Spring Comes to Ponsuke", "Ikuo Oishi, 1934", "7m", "91355", "A jazz-inflected talkie whose animal comedy, military march and popular song reveal animation learning to move with recorded sound."),
      nfaj("Corporal Norakuro", "Yasuji Murata, 1934", "11m", "43686", "Norakuro has been promoted: confidential documents, regiments and comic militarism become ordinary entertainment."),
      nfaj("Sankichi and Osayo: A Genroku Romance", "Mitsuyo Seo, 1934", "8m", "43676", "An early Seo sword-fighting romance; the surviving print has lost the original talkie soundtrack."),
      nfaj("The Hare in Inaba", "Mitsuyo Seo, 1935", "9m", "42118", "Cel animation and folklore from Seo; the surviving copy begins late and loses its ending."),
      nfaj("Propagate", "Shigeji Ogino, 1935", "4m", "71588", "Semi-abstract geometry behaves like plant growth: a private experimental language beside the era's institutional animation."),
      nfaj("The Making of a Color Animation", "Shigeji Ogino / Noburo Ofuji, 1937", "5m", "71555", "A rare workshop document: drawings transferred to celluloid, painted from behind and photographed frame by frame."),
      nfaj("My Big Emergency", "Sanae Yamamoto, 1936", "11m", "43779", "Air raids, submarines, searchlights and animal-shaped weaponry appear first as nightmare and then as dream.", { context: "Contains militarised imagery and aerial bombardment." }),
      nfaj("Monkey and Crabs", "Kenzo Masaoka, 1939", "11m", "44405", "Masaoka's elegant late-prewar movement and staging applied to a familiar folktale of violence and collective revenge."),
      nfaj("The Quack Infantry Troop", "Mitsuyo Seo / Ministry of Education, 1940", "13m", "5141", "Ducks and frogs escalate a quarrel into mechanised war before a lightning strike exposes its absurdity.", { context: "NFAJ categorises the film under war/propaganda; its anti-conflict resolution coexists with militarised imagery." }),
      nfaj("Arichan the Ant", "Mitsuyo Seo / Ministry of Education, 1941", "11m", "5148", "Japan's first animation made with a multiplane camera stand: musical storytelling, depth and remarkably assured cel movement."),
      {
        title: "The Spider and the Tulip",
        credit: "Kenzo Masaoka, 1943",
        runtime: "16m",
        search: "https://www.youtube.com/results?search_query=Kenzo+Masaoka+The+Spider+and+the+Tulip+1943",
        note: "Masaoka's wartime masterpiece: lyrical sound-era cel animation whose technical sophistication sits outside direct military propaganda."
      },
      {
        title: "Momotaro's Sea Eagles",
        credit: "Mitsuyo Seo / Navy Ministry commission, 1943",
        runtime: "37m",
        search: "https://www.youtube.com/results?search_query=Mitsuyo+Seo+Momotaro+Sea+Eagles+1943",
        note: "A near-feature propaganda film translating the Pacific War into children's animal adventure.",
        context: "Imperial Japanese Navy propaganda. Contains racist enemy caricature and the ideological reframing of colonial warfare for children."
      },
      {
        title: "Momotaro, Sacred Sailors",
        credit: "Mitsuyo Seo / Shochiku, 1945",
        runtime: "74m",
        search: "https://www.youtube.com/results?search_query=Mitsuyo+Seo+Momotaro+Sacred+Sailors+1945+English+subtitles",
        note: "Japan's first feature-length animation: technically ambitious, musically rich and inseparable from the Navy propaganda commission that produced it.",
        context: "Imperial Japanese Navy propaganda. Contains colonial ideology and racist caricature of enemy forces; included as historical evidence, not endorsement."
      }
    ]
  });

  curation.metadata.programmes["41"] = {
    attention: ["attentive", "intermittent"],
    language: ["intertitles", "mixed", "subtitles"],
    image: "monochrome",
    energy: ["rhythmic", "intense"],
    form: ["animation", "archive", "experimental"],
    session: "six-to-ten",
    sound: "original",
    territories: ["animation", "world-histories", "cities-politics", "archive-process"],
    directions: ["animation", "archive", "political", "world-cinema", "all-night"],
    regions: ["Japan"],
    period: "1917–1945",
    displayName: "Japan Before Anime",
    displayDescription: "Animation before the postwar industry: survival, handmade craft, education, abstraction, sound, military fantasy and wartime propaganda.",
    context: "The final movement contains explicit Japanese imperial propaganda and racist enemy caricature. These works are sequenced as evidence of how technical innovation, children's culture and state ideology became entangled before 1945."
  };
})();
