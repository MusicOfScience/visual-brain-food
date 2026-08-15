(function () {
  const p = (attention, language, image, energy, form, sound, territories, directions, regions, period, editorial = {}) => ({
    attention,
    language,
    image,
    energy,
    form,
    session: "six-to-ten",
    sound,
    territories,
    directions,
    regions,
    period,
    ...editorial
  });

  window.OPTICAL_WEATHER_META = {
    version: 3,
    territories: [
      { id: "dream-experiment", title: "Dream & experiment", description: "Images loosened from ordinary logic." },
      { id: "animation", title: "Animation after childhood", description: "Graphic, material and adult animation traditions." },
      { id: "cities-politics", title: "Cities, politics & public life", description: "Crowds, labour, dissent and the social world." },
      { id: "world-histories", title: "Film histories across the world", description: "National cinemas, movements and neglected routes through film history." },
      { id: "print-design", title: "Print, photography & design", description: "The hand, the press, the darkroom and graphic systems." },
      { id: "archive-process", title: "Archives, galleries & processes", description: "Moving walls, working hands and evidence from the archive." }
    ],
    directions: [
      { id: "dark", label: "Dark", explanation: "Selected from the darker end of the library." },
      { id: "silent", label: "Silent", explanation: "Cinema carried by images, music and intertitles." },
      { id: "strange", label: "Strange", explanation: "A less obedient image." },
      { id: "animation", label: "Animation", explanation: "Animation with adult, graphic and material intelligence." },
      { id: "monochrome", label: "Monochrome", explanation: "A night in black, white and all the greys between." },
      { id: "print", label: "Print", explanation: "Ink, paper, pressure and graphic form." },
      { id: "gallery", label: "Gallery", explanation: "Let the screen become a room to wander through." },
      { id: "political", label: "Political", explanation: "Cinema looking directly at power and public life." },
      { id: "surreal", label: "Surreal", explanation: "Dream logic, collisions and charged objects." },
      { id: "archive", label: "Archive", explanation: "Found images, public memory and the evidence of film." },
      { id: "world-cinema", label: "Across borders", explanation: "Cinema beyond the most familiar routes." },
      { id: "all-night", label: "All night", explanation: "Eight hours or more, if the room is willing." }
    ],
    accessRoutes: [
      { id: "no-dialogue", label: "Without spoken dialogue", explanation: "Editorially checked programme designs with no spoken dialogue.", programmeIds: ["01", "02", "04", "05", "10", "11", "13", "25", "26", "27"] },
      { id: "intertitles", label: "Intertitles", explanation: "Programmes that include intertitle-led works.", programmeIds: ["01", "02", "04", "05", "13", "25", "26", "27"] },
      { id: "subtitled", label: "Translation subtitles", explanation: "Programmes that include works requiring translation subtitles; availability still depends on the current copy.", programmeIds: ["15", "28", "29", "30"] }
    ],
    programmes: {
      "01": p(["attentive"], ["intertitles"], "monochrome", ["intense"], ["feature", "experimental"], "original", ["dream-experiment", "world-histories"], ["dark", "silent", "monochrome", "surreal", "world-cinema", "all-night"], ["Germany"], "1910s–1920s"),
      "02": p(["attentive"], ["intertitles"], "monochrome", ["rhythmic", "intense"], ["feature", "experimental"], "original", ["cities-politics", "world-histories"], ["silent", "monochrome", "political", "world-cinema"], ["Soviet Union"], "1920s"),
      "03": p(["attentive", "intermittent"], ["mixed"], "mixed", ["rhythmic", "deranged"], ["shorts", "experimental"], "silent-friendly", ["dream-experiment"], ["silent", "strange", "surreal"], ["International"], "1920s–1940s"),
      "04": p(["attentive"], ["intertitles"], "monochrome", ["intense"], ["feature", "experimental"], "original", ["dream-experiment", "world-histories"], ["dark", "silent", "strange", "monochrome", "surreal", "world-cinema", "all-night"], ["Japan"], "1920s–1930s", { displayName: "Japanese Silent Modernities: Kinugasa / Ozu", displayDescription: "Asylum, city, melodrama and family life in Japanese silent cinema: Kinugasa’s radical cutting beside Ozu’s modern social worlds.", context: "These films were not historically language-free. Japanese silent screenings could include live benshi narration; current copies vary in intertitle language and accompaniment." }),
      "05": p(["attentive"], ["intertitles"], "monochrome", ["calm", "intense"], ["feature"], "original", ["cities-politics", "world-histories"], ["dark", "silent", "monochrome", "political", "all-night"], ["Europe", "United States"], "1910s–1920s", { displayName: "Early Queer Screens: Gender / Desire / Disguise", context: "Historical categories do not map neatly onto present identities. A Florida Enchantment also contains racial masquerade and blackface; it is included as difficult historical evidence, not endorsement.", itemOverrides: { "A Florida Enchantment": { context: "Contains racial masquerade and blackface. Presented as difficult historical evidence, not endorsement." } } }),
      "06": p(["attentive", "intermittent"], ["none", "mixed"], "mixed", ["deranged"], ["animation", "shorts", "experimental"], "silent-friendly", ["dream-experiment", "animation", "world-histories"], ["dark", "strange", "animation", "surreal", "world-cinema"], ["Czechoslovakia", "Czech Republic"], "1950s–1990s"),
      "07": p(["attentive", "intermittent"], ["none", "mixed"], "mixed", ["rhythmic"], ["animation", "shorts", "experimental"], "silent-friendly", ["animation", "world-histories", "print-design"], ["animation", "print", "world-cinema"], ["Poland"], "1950s–1980s"),
      "08": p(["attentive", "intermittent"], ["none", "mixed"], "mixed", ["rhythmic"], ["animation", "shorts"], "silent-friendly", ["animation", "world-histories"], ["animation", "world-cinema"], ["Yugoslavia", "Croatia"], "1950s–1980s"),
      "09": p(["attentive", "intermittent"], ["none", "mixed"], "mixed", ["intense", "deranged"], ["animation", "shorts"], "silent-friendly", ["animation", "world-histories"], ["dark", "animation", "surreal", "world-cinema"], ["Eastern Europe", "USSR"], "1960s–1980s"),
      "10": p(["peripheral", "intermittent"], ["none"], "mixed", ["rhythmic", "deranged"], ["animation", "shorts", "experimental"], "replaceable", ["dream-experiment", "animation"], ["strange", "animation", "all-night"], ["International"], "1920s–present"),
      "11": p(["attentive"], ["none"], "mixed", ["intense", "deranged"], ["shorts", "experimental"], "original", ["dream-experiment"], ["strange", "all-night"], ["Europe", "North America"], "1960s–1980s", { excludeFromUnprompted: true, advisories: ["Known rapid flashing and flicker. May trigger seizures, migraine, dizziness or nausea."], itemOverrides: { "Arnulf Rainer": { sensory: "Known rapid black-and-white flicker." }, "The Flicker": { sensory: "Known sustained rapid flicker." }, "Paul Sharits block": { sensory: "Known rapid colour flicker and strobing." }, "Stan Brakhage material block": { sensory: "Possible intense flicker in some selected films." } } }),
      "12": p(["attentive", "intermittent"], ["none", "intertitles"], "mixed", ["deranged"], ["shorts", "experimental"], "silent-friendly", ["dream-experiment"], ["silent", "strange", "surreal"], ["International"], "1910s–1950s"),
      "13": p(["peripheral", "intermittent"], ["none", "intertitles"], "monochrome", ["rhythmic"], ["documentary", "shorts", "experimental"], "replaceable", ["cities-politics", "world-histories", "archive-process"], ["silent", "monochrome", "political", "archive", "world-cinema"], ["International"], "1920s–1930s"),
      "14": p(["attentive", "intermittent"], ["dialogue-heavy"], "monochrome", ["calm", "intense"], ["feature"], "original", ["cities-politics", "world-histories"], ["dark", "monochrome", "all-night"], ["United States"], "1940s–1950s"),
      "15": p(["attentive"], ["mixed", "subtitles"], "mixed", ["calm"], ["documentary", "shorts", "experimental"], "original", ["cities-politics", "world-histories", "archive-process"], ["political", "archive"], ["International"], "1930s–1980s"),
      "16": p(["peripheral", "intermittent"], ["none", "mixed"], "mixed", ["rhythmic"], ["archive", "documentary", "shorts"], "replaceable", ["cities-politics", "archive-process"], ["political", "archive"], ["International"], "1920s–1970s", { displayName: "Machines / Labour / Industrial Film", displayDescription: "Factories, transport and instructional cinema: choreography and texture, but also sponsorship, persuasion and the conditions of labour.", context: "Industrial and public-information films are not neutral records. Future item-level notes will identify sponsors, institutions and propagandistic purpose where known." }),
      "17": p(["peripheral"], ["none"], "mixed", ["calm", "rhythmic"], ["process", "documentary"], "replaceable", ["print-design", "archive-process"], ["print"], ["International"], "Contemporary"),
      "18": p(["peripheral"], ["none"], "mixed", ["calm"], ["process", "documentary"], "replaceable", ["print-design", "archive-process"], ["print", "gallery"], ["International"], "Contemporary"),
      "19": p(["attentive", "intermittent"], ["mixed", "subtitles"], "mixed", ["calm", "rhythmic"], ["documentary", "process"], "original", ["print-design", "archive-process"], ["print"], ["Germany", "International"], "1910s–present"),
      "20": p(["attentive"], ["mixed", "subtitles"], "mixed", ["intense"], ["documentary", "archive", "process"], "original", ["cities-politics", "print-design", "archive-process"], ["print", "political", "archive"], ["International"], "20th century"),
      "21": p(["peripheral"], ["none"], "mixed", ["calm"], ["gallery", "documentary"], "replaceable", ["print-design", "archive-process"], ["gallery"], ["International"], "Contemporary"),
      "22": p(["peripheral"], ["none"], "mixed", ["calm"], ["gallery"], "replaceable", ["archive-process"], ["gallery", "archive", "all-night"], ["International"], "Contemporary"),
      "23": p(["attentive", "intermittent"], ["mixed"], "mixed", ["deranged"], ["archive", "shorts", "experimental"], "original", ["dream-experiment", "archive-process"], ["strange", "surreal", "archive"], ["International"], "20th century"),
      "24": p(["attentive", "intermittent"], ["none", "mixed"], "mixed", ["intense", "deranged"], ["animation", "shorts", "experimental"], "silent-friendly", ["dream-experiment", "animation", "world-histories"], ["strange", "animation", "surreal", "world-cinema", "all-night"], ["International"], "20th century"),
      "25": p(["attentive", "intermittent"], ["none", "intertitles"], "mixed", ["rhythmic"], ["archive", "shorts", "experimental"], "silent-friendly", ["world-histories", "archive-process"], ["silent", "archive", "all-night"], ["Europe", "United States"], "1890s–1910s"),
      "26": p(["attentive"], ["intertitles"], "monochrome", ["calm", "intense"], ["feature", "experimental"], "original", ["dream-experiment", "world-histories"], ["silent", "monochrome", "world-cinema", "all-night"], ["France"], "1920s"),
      "27": p(["attentive"], ["intertitles"], "monochrome", ["calm", "intense"], ["feature"], "original", ["world-histories"], ["dark", "silent", "monochrome", "world-cinema", "all-night"], ["Sweden", "Denmark", "Germany"], "1910s–1920s", { displayName: "Scandinavian Silent: Landscape / Desire / Doom", context: "This route follows Scandinavian directors and traditions; Dreyer’s Michael was produced in Germany." }),
      "28": p(["attentive"], ["subtitles"], "monochrome", ["calm", "intense"], ["feature"], "original", ["cities-politics", "world-histories"], ["monochrome", "political", "world-cinema", "all-night"], ["China"], "1930s–1940s", { displayName: "Shanghai Modernity & Social Melodrama", displayDescription: "Urban modernity, labour, gender and social melodrama in pre-1949 Chinese cinema." }),
      "29": p(["attentive"], ["subtitles"], "mixed", ["intense"], ["feature"], "original", ["cities-politics", "world-histories"], ["political", "world-cinema", "all-night"], ["Brazil"], "1960s"),
      "30": p(["attentive"], ["subtitles"], "mixed", ["intense", "deranged"], ["feature", "experimental"], "original", ["dream-experiment", "cities-politics", "world-histories"], ["dark", "strange", "political", "surreal", "world-cinema", "all-night"], ["Brazil"], "1960s–1970s"),
      "31": p(["attentive"], ["none", "mixed"], "mixed", ["intense"], ["shorts", "experimental"], "original", ["dream-experiment", "cities-politics"], ["political", "surreal"], ["United States"], "1940s–1970s"),
      "32": p(["attentive", "intermittent"], ["none"], "mixed", ["rhythmic"], ["animation", "shorts", "experimental"], "silent-friendly", ["dream-experiment", "animation", "print-design"], ["animation", "print"], ["International"], "20th century"),
      "33": p(["peripheral", "intermittent"], ["none", "mixed"], "mixed", ["calm", "deranged"], ["archive", "documentary", "shorts"], "replaceable", ["archive-process"], ["strange", "archive"], ["International"], "1870s–1970s"),
      "34": p(["attentive"], ["dialogue-heavy", "mixed"], "monochrome", ["calm", "rhythmic"], ["documentary", "archive", "shorts"], "original", ["cities-politics", "world-histories", "archive-process"], ["political", "archive"], ["United Kingdom"], "1930s–1950s", { displayDescription: "Public-film modernism and its institutions, followed by postwar observation turned toward ordinary life.", context: "Song of Ceylon was made within a British colonial commission. Its formal invention cannot be separated from the power and representational politics of that context.", itemOverrides: { "Song of Ceylon": { context: "Made within a British colonial commission; view its formal invention alongside that institutional and representational context." } } }),
      "35": p(["attentive"], ["dialogue-heavy", "mixed"], "mixed", ["intense", "deranged"], ["feature", "shorts", "experimental"], "original", ["dream-experiment", "cities-politics", "world-histories"], ["dark", "strange", "surreal", "all-night"], ["United States"], "1940s–1960s"),
      "36": p(["attentive", "intermittent"], ["mixed"], "mixed", ["rhythmic", "deranged"], ["archive", "shorts", "experimental"], "original", ["dream-experiment", "world-histories", "archive-process"], ["strange", "political", "archive", "world-cinema", "all-night"], ["Australia", "Aotearoa New Zealand"], "20th century", { displayName: "Australia / Aotearoa: Experimental Screens", displayDescription: "Experimental film, artists’ moving image and archival screen culture across two distinct countries and many sovereignties.", context: "This provisional route does not represent a single national story. Australia and Aotearoa require separate future programmes, with First Nations and Māori curatorial leadership and cultural protocols.", itemOverrides: { "New Zealand Film Archive / Nga Taonga block": { title: "Ngā Taonga Sound & Vision archive block" } } })
    }
  };
})();
