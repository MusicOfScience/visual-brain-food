import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../content/programme-41.js", import.meta.url), "utf8");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = { OPTICAL_WEATHER_CURATION: { programmes: [], metadata: { programmes: {} } } };
  vm.runInNewContext(source, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("programme 41 registers one commissioned programme and metadata", () => {
  const curation = load();
  assert.equal(curation.programmes.length, 1);
  assert.match(curation.programmes[0].title, /^41 — Japan Before Anime$/);
  assert.equal(curation.programmes[0].duration, 381);
  assert.equal(curation.programmes[0].items.length, 23);
  assert.ok(curation.metadata.programmes["41"]);
});

test("programme 41 items all retain at least one viable route", () => {
  const { programmes } = load();
  for (const item of programmes[0].items) {
    const direct = /^https:\/\//.test(String(item.watch || ""));
    const search = /^https:\/\/www\.youtube\.com\/results\?search_query=/.test(String(item.search || ""));
    assert.ok(direct || search, `${item.title} has no viable route`);
  }
});

test("programme 41 NFAJ sources carry archive provenance", () => {
  const { programmes } = load();
  const nfajItems = programmes[0].items.filter((item) => item.watch?.includes("animation.filmarchives.jp"));
  assert.ok(nfajItems.length >= 20);
  for (const item of nfajItems) {
    assert.equal(item.watchLabel, "Watch at NFAJ");
    assert.equal(item.sourceKind, "archive");
    assert.match(item.verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("programme 41 keeps explicit context on imperial propaganda", () => {
  const { programmes } = load();
  const sacred = programmes[0].items.find((item) => item.title === "Momotaro, Sacred Sailors");
  const seaEagles = programmes[0].items.find((item) => item.title === "Momotaro's Sea Eagles");
  assert.match(sacred.context, /propaganda/i);
  assert.match(seaEagles.context, /propaganda/i);
  assert.match(curationContext(programmes[0]), /propaganda/i);
});

function curationContext(programme) {
  const curation = load();
  return curation.metadata.programmes["41"].context;
}

test("programme 41 is loaded after curation and before registry", () => {
  const curationPos = index.indexOf('src="content/curation.js"');
  const p41Pos = index.indexOf('src="content/programme-41.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  assert.ok(curationPos > -1 && p41Pos > curationPos && registryPos > p41Pos);
});
