/* OPTICAL WEATHER v4.1 — Programme 39 */
(function () {
  "use strict";

  const curation = window.OPTICAL_WEATHER_CURATION;
  if (!curation) throw new Error("OPTICAL WEATHER: programme-39 loaded before curation.js");

  curation.programmes.push({
    title: "39 — Mexico: Cinema Rescued",
    description: "Six hours about what survives when a national cinema has lost most of its silent-era production: three rescued fiction features followed by restored political archive, moving from nitrate survival to collective memory and counter-history.",
    duration: 362,
    tags: ["Mexico", "silent cinema", "restoration", "archive", "social movements", "Filmoteca UNAM"],
    modes: ["WATCH PROPERLY", "LET IT RUN"],
    items: [
      {
        title: "Tepeyac",
        credit: "Carlos E. González, José Manuel Ramos & Fernando Sáyago, 1917",
        runtime: "64m",
        watch: "https://cineenlinea.filmoteca.unam.mx/?cine_en_linea=tepeyac",
        watchLabel: "Watch at Filmoteca UNAM",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "One of only three surviving Mexican silent fiction features: fiction and documentary reality intermingle around the Villa de Guadalupe. Restored from nitrate negatives and positives by Filmoteca UNAM."
      },
      {
        title: "El tren fantasma",
        credit: "Gabriel García Moreno, 1926",
        runtime: "71m",
        watch: "https://cineenlinea.filmoteca.unam.mx/?cine_en_linea=el-tren-fantasma",
        watchLabel: "Watch at Filmoteca UNAM",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "A provincial thriller rescued from damaged nitrate: trains, crime, romance and Orizaba rendered as both fiction and inadvertent historical record."
      },
      {
        title: "El puño de hierro",
        credit: "Gabriel García Moreno, 1927",
        runtime: "99m",
        watch: "https://cineenlinea.filmoteca.unam.mx/?cine_en_linea=el-puno-de-hierro",
        watchLabel: "Watch at Filmoteca UNAM",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "A reconstructed surviving feature notable for addressing drugs and violence openly; its present form depends on archival recovery and reconstruction from surviving materials and the original synopsis."
      },
      {
        title: "Movimientos sociales, México 1938–1968",
        credit: "Filmoteca UNAM / selection by Ángel Martínez",
        runtime: "40m",
        watch: "https://cineenlinea.filmoteca.unam.mx/?cine_en_linea=movimientos-sociales-mexico-1938-1968",
        watchLabel: "Watch at Filmoteca UNAM",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "Railway, teachers’ and student struggles assembled from the archive as prehistory to 1968: institutional preservation becomes a way of recovering public conflict."
      },
      {
        title: "Movimiento estudiantil 1968",
        credit: "Filmoteca UNAM / selection by Ángel Martínez",
        runtime: "88m",
        watch: "https://cineenlinea.filmoteca.unam.mx/?cine_en_linea=movimiento-estudiantil-1968",
        watchLabel: "Watch at Filmoteca UNAM",
        sourceKind: "cinematheque",
        verified: "2026-08-16",
        note: "Rushes, communiqués and participant-made footage from the 1968 student movement: political memory preserved from inside the struggle rather than reconstructed from official distance.",
        context: "Includes images of political confrontation and repression associated with the 1968 student movement."
      }
    ]
  });

  curation.metadata.programmes["39"] = {
    attention: ["attentive", "intermittent"],
    language: ["intertitles", "Spanish", "mixed"],
    image: "mixed",
    energy: ["calm", "intense"],
    form: ["feature", "archive", "documentary"],
    session: "six-to-ten",
    sound: "original",
    territories: ["world-histories", "cities-politics", "archive-process"],
    directions: ["silent", "political", "archive", "world-cinema", "all-night"],
    regions: ["Mexico"],
    period: "1910s–1960s",
    displayName: "Mexico: Cinema Rescued",
    displayDescription: "What remains when most of a silent cinema disappears: three surviving fiction features followed by restored labour and student-movement archives.",
    context: "Filmoteca UNAM states that roughly 90–95% of Mexican production from 1896 to the early sound era has disappeared. This programme treats surviving and restored works as evidence of archival contingency rather than a complete national canon."
  };
})();
