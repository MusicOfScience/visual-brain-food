import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../content/programme-42.js", import.meta.url), "utf8");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = { OPTICAL_WEATHER_CURATION: { programmes: [], metadata: { programmes: {} } } };
  vm.runInNewContext(source, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("programme 42 registers one commissioned programme and metadata", () => {
  const curation = load();
  assert.equal(curation.programmes.length, 1);
  assert.match(curation.programmes[0].title, /^42 — The Camera Finds the Street$/);
  assert.equal(curation.programmes[0].duration, 364);
  assert.equal(curation.programmes[0].items.length, 11);
  assert.ok(curation.metadata.programmes["42"]);
});

test("programme 42 items all retain at least one viable route", () => {
  const { programmes } = load();
  for (const item of programmes[0].items) {
    const direct = /^https:\/\//.test(String(item.watch || ""));
    const search = /^https:\/\/www\.youtube\.com\/results\?search_query=/.test(String(item.search || ""));
    assert.ok(direct || search, `${item.title} has no viable route`);
  }
});

test("programme 42 collection blocks are explicit and institutionally sourced", () => {
  const { programmes } = load();
  const blocks = programmes[0].items.filter((item) => /block/.test(item.runtime));
  assert.equal(blocks.length, 2);
  for (const item of blocks) {
    assert.ok(item.watchLabel.startsWith("Open"));
    assert.match(item.verified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(["archive", "cinematheque"].includes(item.sourceKind));
  }
});

test("programme 42 is loaded after curation and before registry", () => {
  const curationPos = index.indexOf('src="content/curation.js"');
  const p42Pos = index.indexOf('src="content/programme-42.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  assert.ok(curationPos > -1 && p42Pos > curationPos && registryPos > p42Pos);
});
