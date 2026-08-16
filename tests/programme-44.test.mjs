import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const curationSource = fs.readFileSync(new URL("../content/curation.js", import.meta.url), "utf8");
const programmeSource = fs.readFileSync(new URL("../content/programme-44.js", import.meta.url), "utf8");
const indexSource = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = {};
  vm.runInNewContext(curationSource, { window });
  vm.runInNewContext(programmeSource, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("programme 44 registers one six-hour commissioned programme and metadata", () => {
  const curation = load();
  const programme = curation.programmes.find((entry) => entry.title.startsWith("44 —"));
  assert.ok(programme);
  assert.equal(programme.duration, 362);
  assert.equal(programme.items.length, 21);
  assert.ok(curation.metadata.programmes["44"]);
});

test("programme 44 retains a viable route for every work", () => {
  const programme = load().programmes.find((entry) => entry.title.startsWith("44 —"));
  for (const item of programme.items) {
    const hasWatch = /^https:\/\//.test(item.watch || "");
    const hasSearch = /^https:\/\/www\.youtube\.com\/results\?search_query=/.test(item.search || "");
    assert.ok(hasWatch || hasSearch, `${item.title} has no route`);
  }
});

test("programme 44 direct non-YouTube sources carry provenance", () => {
  const programme = load().programmes.find((entry) => entry.title.startsWith("44 —"));
  const direct = programme.items.filter((item) => item.watch && !/youtube\.com/.test(item.watch));
  assert.ok(direct.length >= 2);
  for (const item of direct) {
    assert.ok(item.watchLabel);
    assert.ok(item.sourceKind);
    assert.match(item.verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("programme 44 records revised/distributed versions instead of silently reverting to earliest dates", () => {
  const programme = load().programmes.find((entry) => entry.title.startsWith("44 —"));
  const orbital = programme.items.find((item) => item.title === "Orbital Obsessions");
  const west = programme.items.find((item) => item.title === "The West");
  const treecuts = programme.items.find((item) => item.title === "Selected Treecuts");
  assert.match(orbital.credit, /revised 1988/);
  assert.match(west.credit, /distributed 1998/);
  assert.match(treecuts.credit, /distributed 1980/);
});

test("programme 44 loads after programme 43 and before registry", () => {
  const p43 = indexSource.indexOf('src="content/programme-43.js"');
  const p44 = indexSource.indexOf('src="content/programme-44.js"');
  const registry = indexSource.indexOf('src="content/registry.js"');
  assert.ok(p43 > -1 && p44 > p43 && registry > p44);
});
