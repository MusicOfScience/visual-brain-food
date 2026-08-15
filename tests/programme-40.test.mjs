import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../content/programme-40.js", import.meta.url), "utf8");
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

test("programme 40 registers one commissioned programme and metadata", () => {
  const curation = load();
  assert.equal(curation.programmes.length, 1);
  assert.match(curation.programmes[0].title, /^40 — Korea Before the Wave$/);
  assert.equal(curation.programmes[0].duration, 396);
  assert.equal(curation.programmes[0].items.length, 4);
  assert.ok(curation.metadata.programmes["40"]);
});

test("programme 40 items all retain resilient Korean Film Archive searches", () => {
  const { programmes } = load();
  for (const item of programmes[0].items) {
    assert.match(item.search, /^https:\/\/www\.youtube\.com\/results\?search_query=/, `${item.title} has no search route`);
    assert.match(item.search, /Korean\+Film\+Archive/, `${item.title} search is not archive-targeted`);
  }
});

test("programme 40 records censorship and restoration context", () => {
  const { programmes, metadata } = load();
  assert.match(programmes[0].items[1].context, /pulled from theatres/i);
  assert.match(programmes[0].items[2].context, /censors/i);
  assert.match(programmes[0].items[3].context, /censorship/i);
  assert.match(metadata.programmes["40"].context, /restoration/i);
});

test("programme 40 is loaded after programme 39 and before registry", () => {
  const p39Pos = index.indexOf('src="content/programme-39.js"');
  const p40Pos = index.indexOf('src="content/programme-40.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  assert.ok(p39Pos > -1 && p40Pos > p39Pos && registryPos > p40Pos);
});
