/* OPTICAL WEATHER v4.1 — Programme 40 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-40 loaded before curation.js");

  curation.programmes.push({
    title: "40 — Korea Before the Wave",
    description: "Six and a half hours of South Korea before global K-cinema branding: domestic labour and class aspiration, postwar destitution, censored urban despair and a student generation discovering that modernity can accelerate faster than freedom.",
    duration: 396,
    tags: ["Korea", "postwar", "modernity", "censorship", "urbanisation", "class", "gender"],
    modes: ["WATCH PROPERLY"],
    items: [
      {
        title: "The Housemaid",
        credit: "Kim Ki-young, 1960",
        runtime: "111m",
        search: "https://www.youtube.com/results?search_query=The+Housemaid+1960+Korean+Film+Archive+Korean+Classic+Film",
        note: "A middle-class home becomes a machine for class anxiety, gendered labour, sexuality and social aspiration. KOFA restored the film in 2008 with the World Cinema Project.",
        sensory: "Psychological distress, domestic violence, poisoning and death."
      },
      {
        title: "An Aimless Bullet",
        credit: "Yu Hyun-mok, 1961",
        runtime: "107m",
        search: "https://www.youtube.com/results?search_query=An+Aimless+Bullet+1961+Korean+Film+Archive+Korean+Classic+Film",
        note: "A destitute family becomes an x-ray of postwar Seoul: damaged veterans, precarious work, illness and a society moving without direction.",
        context: "The film was pulled from theatres for political reasons. KOFA's restoration had to work from a surviving print with large burned-in English subtitles because the original negative was lost."
      },
      {
        title: "A Day Off",
        credit: "Lee Man-hee, 1968",
        runtime: "73m",
        search: "https://www.youtube.com/results?search_query=A+Day+Off+1968+Lee+Man-hee+Korean+Film+Archive+Korean+Classic+Film",
        note: "A winter Sunday, an unwanted pregnancy, no money and an unfinished city: Korean modernism stripped of developmental optimism.",
        context: "Military-government censors rejected the film's bleak ending. It remained unreleased and effectively buried until the Korean Film Archive brought it to the public in 2005.",
        sensory: "Pregnancy loss/abortion, death, alcohol misuse and physical violence."
      },
      {
        title: "The March of Fools",
        credit: "Ha Gil-jong, 1975",
        runtime: "105m",
        search: "https://www.youtube.com/results?search_query=The+March+of+Fools+1975+Ha+Gil-jong+Korean+Film+Archive+Korean+Classic+Film",
        note: "University students absorb Western style, military service and authoritarian absurdity while humour gradually gives way to pessimism.",
        context: "The film passed through five censorship reviews; KOFA notes that about thirty minutes were cut from the original version and two soundtrack songs were banned from sale.",
        sensory: "Suicide and authoritarian harassment."
      }
    ]
  });

  curation.metadata.programmes["40"] = {
    attention: ["attentive"],
    language: ["subtitles"],
    image: "mixed",
    energy: ["calm", "intense"],
    form: ["feature"],
    session: "six-to-ten",
    sound: "original",
    territories: ["world-histories", "cities-politics"],
    directions: ["dark", "political", "world-cinema", "all-night"],
    regions: ["South Korea"],
    period: "1960s–1970s",
    displayName: "Korea Before the Wave",
    displayDescription: "Class, domestic labour, postwar poverty, censored urban modernism and rebellious youth before Korean cinema became a global brand.",
    context: "This programme treats censorship and restoration as part of the films' histories. The surviving or circulating versions do not always equal the filmmakers' original intended cuts, and subtitle availability should be checked on the copy opened."
  };
})();
