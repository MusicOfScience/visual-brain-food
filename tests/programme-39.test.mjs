import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../content/programme-39.js", import.meta.url), "utf8");
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

test("programme 39 registers one commissioned programme and metadata", () => {
  const curation = load();
  assert.equal(curation.programmes.length, 1);
  assert.match(curation.programmes[0].title, /^39 — Mexico: Cinema Rescued$/);
  assert.equal(curation.programmes[0].duration, 362);
  assert.equal(curation.programmes[0].items.length, 5);
  assert.ok(curation.metadata.programmes["39"]);
});

test("programme 39 items all use official Filmoteca UNAM routes", () => {
  const { programmes } = load();
  for (const item of programmes[0].items) {
    assert.match(item.watch, /^https:\/\/cineenlinea\.filmoteca\.unam\.mx\//, `${item.title} is not using the Filmoteca UNAM route`);
    assert.equal(item.watchLabel, "Watch at Filmoteca UNAM");
    assert.equal(item.sourceKind, "cinematheque");
    assert.match(item.verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("programme 39 states the archival-loss context", () => {
  const curation = load();
  assert.match(curation.metadata.programmes["39"].context, /90–95%/);
  assert.match(curation.programmes[0].description, /what survives/i);
});

test("programme 39 is loaded after programme 38 and before registry", () => {
  const p38Pos = index.indexOf('src="content/programme-38.js"');
  const p39Pos = index.indexOf('src="content/programme-39.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  assert.ok(p38Pos > -1 && p39Pos > p38Pos && registryPos > p39Pos);
});
