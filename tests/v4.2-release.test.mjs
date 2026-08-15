import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const files = [
  "data-ready.js",
  "data-1.js",
  "data-2.js",
  "data-3.js",
  "data-4.js",
  "metadata-v2.js",
  "content/curation.js",
  "content/v4.2-expansion.js",
  "content/programme-38.js",
  "content/programme-39.js",
  "content/programme-40.js",
  "content/programme-41.js",
  "content/programme-42.js",
  "content/programme-43.js",
  "content/registry.js"
];

function assemble() {
  const window = {};
  const document = { getElementById: () => null };
  for (const file of files) {
    const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    vm.runInNewContext(source, { window, document });
  }
  return window;
}

test("v4.2 assembles the complete catalogue at expected release counts", () => {
  const window = assemble();
  assert.equal(window.OPTICAL_WEATHER_CONTENT.version, "4.2");
  assert.equal(window.OPTICAL_WEATHER_CONTENT.programmeCount, 43);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.routeCount, 383);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.readyCount, 24);
});

test("v4.2 assembled catalogue has unique programme ids and ready titles", () => {
  const window = assemble();
  const ids = window.CINEMATHEQUE_PROGRAMMES.map((programme) => programme.title.slice(0, 2));
  const readyTitles = window.CINEMATHEQUE_READY.map((entry) => entry.title);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(readyTitles).size, readyTitles.length);
});

test("v4.2 release includes the reviewed programme season and expanded Australian reservoirs", () => {
  const window = assemble();
  for (const id of ["37", "38", "39", "40", "41", "42", "43"]) {
    assert.ok(window.CINEMATHEQUE_PROGRAMMES.some((programme) => programme.title.startsWith(`${id} —`)), `programme ${id} missing`);
  }
  for (const title of ["NFSA — Nangamai", "NFSA — Short Films by First Nations Filmmakers", "ACMI — Screen Culture Collection"]) {
    assert.ok(window.CINEMATHEQUE_READY.some((entry) => entry.title === title), `${title} missing`);
  }
});
