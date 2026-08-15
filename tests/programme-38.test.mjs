import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../content/programme-38.js", import.meta.url), "utf8");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = {
    OPTICAL_WEATHER_CURATION: {
      programmes: [],
      metadata: { programmes: {} }
    }
  };
  vm.runInNewContext(source, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("programme 38 registers one commissioned programme and metadata", () => {
  const curation = load();
  assert.equal(curation.programmes.length, 1);
  assert.match(curation.programmes[0].title, /^38 — Instructions for Living$/);
  assert.equal(curation.programmes[0].duration, 383);
  assert.equal(curation.programmes[0].items.length, 24);
  assert.ok(curation.metadata.programmes["38"]);
});

test("programme 38 items all retain at least one viable route", () => {
  const { programmes } = load();
  for (const item of programmes[0].items) {
    const direct = /^https:\/\//.test(String(item.watch || ""));
    const search = /^https:\/\/www\.youtube\.com\/results\?search_query=/.test(String(item.search || ""));
    assert.ok(direct || search, `${item.title} has no viable route`);
  }
});

test("programme 38 institutional sources carry provenance", () => {
  const { programmes } = load();
  for (const item of programmes[0].items.filter((entry) => entry.watch && !entry.watch.includes("youtube.com"))) {
    assert.ok(item.watchLabel, `${item.title} has no watch label`);
    assert.equal(item.sourceKind, "cinematheque");
    assert.match(item.verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("programme 38 is loaded after curation and before registry", () => {
  const curationPos = index.indexOf('src="content/curation.js"');
  const p38Pos = index.indexOf('src="content/programme-38.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  assert.ok(curationPos > -1 && p38Pos > curationPos && registryPos > p38Pos);
});
