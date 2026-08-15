import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const curationSource = fs.readFileSync(new URL("../content/curation.js", import.meta.url), "utf8");
const expansionSource = fs.readFileSync(new URL("../content/v4.2-expansion.js", import.meta.url), "utf8");
const indexSource = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = {};
  vm.runInNewContext(curationSource, { window });
  vm.runInNewContext(expansionSource, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("v4.2 expansion promotes the curation version without changing programme count", () => {
  const curation = load();
  assert.equal(curation.version, "4.2");
  assert.equal(curation.updated, "2026-08-16");
  assert.equal(curation.programmes.length, 1);
});

test("v4.2 adds five new reservoirs and deterministically replaces the BFI entry", () => {
  const curation = load();
  assert.equal(curation.ready.length, 13);
  assert.equal(new Set(curation.ready.map((entry) => entry.title)).size, 13);

  const bfi = curation.ready.find((entry) => entry.title === "BFI Player — Free Archive Collections");
  assert.ok(bfi);
  assert.match(bfi.sourceLabel, /UK only/);
  assert.match(bfi.description, /Playback is UK-only/);

  for (const title of [
    "NFSA — Online Collection",
    "NFSA — Nangamai",
    "NFSA — Short Films by First Nations Filmmakers",
    "ACMI — Screen Culture Collection",
    "NFPF — Films Available for Viewing"
  ]) {
    assert.ok(curation.ready.some((entry) => entry.title === title), `${title} missing`);
  }
});

test("all v4.2 institutional additions carry source provenance", () => {
  const curation = load();
  const added = curation.ready.filter((entry) => [
    "NFSA — Online Collection",
    "NFSA — Nangamai",
    "NFSA — Short Films by First Nations Filmmakers",
    "ACMI — Screen Culture Collection",
    "NFPF — Films Available for Viewing"
  ].includes(entry.title));

  for (const entry of added) {
    assert.match(entry.url, /^https:\/\//);
    assert.ok(entry.sourceLabel);
    assert.ok(entry.sourceKind);
    assert.match(entry.verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("v4.2 expansion loads after curation and before commissioned programmes and registry", () => {
  const curationPos = indexSource.indexOf('src="content/curation.js"');
  const expansionPos = indexSource.indexOf('src="content/v4.2-expansion.js"');
  const p38Pos = indexSource.indexOf('src="content/programme-38.js"');
  const registryPos = indexSource.indexOf('src="content/registry.js"');
  assert.ok(curationPos > -1 && expansionPos > curationPos && p38Pos > expansionPos && registryPos > p38Pos);
});
