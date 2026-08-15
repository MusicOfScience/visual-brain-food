/* OPTICAL WEATHER v4.1 — Programme 38 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-38 loaded before curation.js");

  curation.programmes.push({
    title: "38 — Instructions for Living",
    description: "Six hours of institutions explaining how to cough, work, nurse, smoke, migrate, parent, cross roads, survive danger and become a legible citizen — public-information cinema as a technology for manufacturing everyday conduct.",
    duration: 383,
    tags: ["public information", "propaganda", "health", "safety", "citizenship", "Central Office of Information", "BFI"],
    modes: ["WATCH PROPERLY", "LET IT RUN"],
    items: [
      {
        title: "If War Should Come",
        credit: "GPO Film Unit / Ministry of Information, 1939",
        runtime: "10m",
        watch: "https://player.bfi.org.uk/free/film/watch-if-war-should-come-1939-online",
        watchLabel: "Watch at BFI",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "Civil defence rendered as household routine: water, sand, pencil, wireless, gas mask, calm."
      },
      {
        title: "Coughs and Sneezes",
        credit: "Richard Massingham / Ministry of Information, 1945",
        runtime: "1m",
        watch: "https://player.bfi.org.uk/free/film/watch-coughs-and-sneezes-1945-online",
        watchLabel: "Watch at BFI",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "One minute in which hygiene becomes slapstick, slogan and bodily discipline."
      },
      {
        title: "Handkerchief Drill",
        credit: "Michael Orrom / Central Office of Information, 1949",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=Handkerchief+Drill+1949+Richard+Massingham",
        note: "The body trained through repetition: another Massingham-era micro-lesson in public hygiene."
      },
      {
        title: "Your Very Good Health",
        credit: "Joy Batchelor & John Halas / Central Office of Information, 1948",
        runtime: "9m",
        watch: "https://player.bfi.org.uk/free/film/watch-your-very-good-health-1948-online",
        watchLabel: "Watch at BFI",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "Animated Charley explains the new NHS and anticipates public scepticism about state provision."
      },
      {
        title: "What's in a Number",
        credit: "John Krish / Central Office of Information, 1948",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=Whats+in+a+Number+1948+John+Krish+National+Insurance",
        note: "National Insurance compressed into an eccentric one-minute lesson in becoming administratively visible."
      },
      {
        title: "Life in Her Hands",
        credit: "Philip Leacock / Crown Film Unit, 1951",
        runtime: "55m",
        watch: "https://player.bfi.org.uk/free/film/watch-life-in-her-hands-1951-online",
        watchLabel: "Watch at BFI",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "A feature-length nursing recruitment drama aimed explicitly at women: vocation sold as responsibility, difficulty and fulfilment."
      },
      {
        title: "District Nurse",
        credit: "Central Office of Information, 1952",
        runtime: "27m",
        search: "https://www.youtube.com/results?search_query=District+Nurse+1952+Central+Office+of+Information",
        note: "The welfare state made intimate through a nurse's rounds: care, duty, rural geography and professional identity."
      },
      {
        title: "Defeat Tuberculosis",
        credit: "Hans M. Nieter, 1950",
        runtime: "7m",
        watch: "https://player.bfi.org.uk/free/film/watch-defeat-tuberculosis-1950-online",
        watchLabel: "Watch at BFI",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "Detection, sanatorium, diet and rest assembled into a confident public-health script."
      },
      {
        title: "Smoking and You",
        credit: "Central Office of Information, 1963",
        runtime: "11m",
        search: "https://www.youtube.com/results?search_query=Smoking+and+You+1963+Central+Office+of+Information",
        note: "An early anti-tobacco educational film: risk enters the classroom as evidence, demonstration and behavioural advice."
      },
      {
        title: "The Smoking Machine",
        credit: "Sarah Erulkar / Central Office of Information, 1964",
        runtime: "16m",
        search: "https://www.youtube.com/results?search_query=The+Smoking+Machine+1964+Sarah+Erulkar",
        note: "A machine makes invisible damage visible for children; persuasion becomes apparatus."
      },
      {
        title: "Return to Life",
        credit: "John Krish / Central Office of Information, 1960",
        runtime: "29m",
        search: "https://www.youtube.com/results?search_query=Return+to+Life+1960+John+Krish+refugees",
        note: "Made for World Refugee Year: resettlement framed through institutional compassion, adaptation and belonging."
      },
      {
        title: "Insaaf",
        credit: "Central Office of Information, 1971",
        runtime: "43m",
        search: "https://www.youtube.com/results?search_query=Insaaf+1971+Central+Office+of+Information+Urdu",
        note: "A public-information drama targeted at Britain's South Asian communities and filmed partly in Urdu.",
        context: "Its value here includes the assumptions embedded in state communication about integration, audience and authority; it is not treated as a neutral account of South Asian British life."
      },
      {
        title: "The Fatal Floor",
        credit: "Central Office of Information, 1974",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=The+Fatal+Floor+1974+public+information+film",
        note: "Rug plus polish becomes mortal threat: domestic space converted into a safety diagram."
      },
      {
        title: "Never Go with Strangers",
        credit: "Sarah Erulkar, 1971",
        runtime: "18m",
        search: "https://www.youtube.com/results?search_query=Never+Go+with+Strangers+1971+Sarah+Erulkar",
        note: "A child-safety film whose fear tactics were considered too distressing for television broadcast.",
        sensory: "Sustained child-danger scenarios and threatening adult behaviour."
      },
      {
        title: "Lonely Water",
        credit: "Central Office of Information, 1973",
        runtime: "2m",
        search: "https://www.youtube.com/results?search_query=Lonely+Water+1973+Donald+Pleasence",
        note: "Donald Pleasence voices death itself: water safety turned into miniature folk horror.",
        sensory: "Threatening narration and depictions of children in mortal danger."
      },
      {
        title: "The Sewing Machine",
        credit: "Central Office of Information, 1973",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=The+Sewing+Machine+1973+public+information+film",
        note: "A mother's road-safety warning collapses domestic routine into abrupt catastrophe."
      },
      {
        title: "The Finishing Line",
        credit: "John Krish & Michael Gilmour, 1977",
        runtime: "21m",
        search: "https://www.youtube.com/results?search_query=The+Finishing+Line+1977+John+Krish",
        note: "Railway safety staged as surreal school-sports nightmare: instruction pushed to the edge of horror.",
        sensory: "Graphic accident scenarios involving children and trains."
      },
      {
        title: "Look after Yourself! An Explanatory Tape for Adult Educators",
        credit: "Health Education Council, 1983",
        runtime: "21m",
        search: "https://www.youtube.com/results?search_query=Look+after+Yourself+1983+Health+Education+Council",
        note: "Lo-fi adult-health pedagogy before wellness branding: exercise, self-management and the responsible body."
      },
      {
        title: "Word of Mouth",
        credit: "National Health Service, 1989",
        runtime: "18m",
        search: "https://www.youtube.com/results?search_query=Word+of+Mouth+1989+dentist+NHS+film",
        note: "Dental anxiety reimagined through horror-film imagery in a training film about managing frightened patients."
      },
      {
        title: "Natural Born Smoker",
        credit: "Central Office of Information, 1985",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=Natural+Born+Smoker+1985+public+information+film",
        note: "Eighties sheen and science-fiction styling make anti-smoking persuasion look like advertising for its enemy."
      },
      {
        title: "Aids — Monolith",
        credit: "Central Office of Information, 1987",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=AIDS+Monolith+1987+John+Hurt+public+information+film",
        note: "The tombstone campaign: immense visual dread compressed into sixty seconds.",
        context: "Included as evidence of a historically consequential public-health campaign whose fear-based rhetoric affected people living with HIV/AIDS as well as the wider public."
      },
      {
        title: "C.A.L.M.",
        credit: "Public information film, 1997",
        runtime: "1m",
        search: "https://www.youtube.com/results?search_query=CALM+1997+public+information+film+suicide",
        note: "A late-century shift toward directly naming suicide prevention and emotional crisis.",
        context: "Contains suicide-prevention messaging."
      },
      {
        title: "Rehabilitation at Roffey Park",
        credit: "Crown Film Unit, 1946",
        runtime: "29m",
        search: "https://www.youtube.com/results?search_query=Rehabilitation+at+Roffey+Park+1946",
        note: "Postwar worker mental health treated as a programme of rehabilitation, productivity and return to ordinary life."
      },
      {
        title: "Polio — Diagnosis and Management",
        credit: "Ministry of Health, 1948",
        runtime: "59m",
        search: "https://www.youtube.com/results?search_query=Polio+Diagnosis+and+Management+1948+Ministry+of+Health",
        note: "Professional instruction rather than public filler: the state training doctors to identify and manage epidemic disease.",
        context: "Historical medical guidance is presented as archival evidence, not current clinical advice."
      }
    ]
  });

  curation.metadata.programmes["38"] = {
    attention: ["attentive", "intermittent"],
    language: ["dialogue-heavy", "mixed", "subtitles"],
    image: "mixed",
    energy: ["calm", "intense", "deranged"],
    form: ["documentary", "archive", "shorts", "animation"],
    session: "six-to-ten",
    sound: "original",
    territories: ["cities-politics", "archive-process", "world-histories"],
    directions: ["dark", "political", "archive", "strange", "all-night"],
    regions: ["United Kingdom"],
    period: "1930s–1990s",
    displayName: "Instructions for Living",
    displayDescription: "Public-information cinema as behavioural technology: health, safety, work, welfare, migration, fear and citizenship from the Ministry of Information to late-century television.",
    context: "These films are institutional speech acts, not neutral manuals. The programme asks how states and public bodies imagine their audiences, define risk, allocate responsibility and turn social policy into images. Historical medical and safety advice should not be treated as current guidance.",
    advisories: ["Several films use fear, accident scenarios, illness, child-danger imagery or suicide-prevention messaging as persuasive tools."]
  };
})();
