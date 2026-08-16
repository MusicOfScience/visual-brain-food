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
  "content/v4.3-expansion.js",
  "content/programme-38.js",
  "content/programme-39.js",
  "content/programme-40.js",
  "content/programme-41.js",
  "content/programme-42.js",
  "content/programme-43.js",
  "content/programme-44.js",
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

test("v4.3 assembles at expected catalogue counts", () => {
  const window = assemble();
  assert.equal(window.OPTICAL_WEATHER_CONTENT.version, "4.3");
  assert.equal(window.OPTICAL_WEATHER_CONTENT.programmeCount, 44);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.routeCount, 404);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.readyCount, 26);
});

test("v4.3 assembled catalogue preserves unique ids and ready titles", () => {
  const window = assemble();
  const ids = window.CINEMATHEQUE_PROGRAMMES.map((programme) => programme.title.slice(0, 2));
  const readyTitles = window.CINEMATHEQUE_READY.map((entry) => entry.title);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(readyTitles).size, readyTitles.length);
});

test("v4.3 includes programme 44 and both media-art exploration reservoirs", () => {
  const window = assemble();
  assert.ok(window.CINEMATHEQUE_PROGRAMMES.some((programme) => programme.title.startsWith("44 —")));
  for (const title of ["Vasulka Archive — Video Works & Machine Media", "EAI — A Kinetic History"]) {
    assert.ok(window.CINEMATHEQUE_READY.some((entry) => entry.title === title), `${title} missing`);
  }
});
