import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const curationSource = fs.readFileSync(new URL("../content/curation.js", import.meta.url), "utf8");
const v42Source = fs.readFileSync(new URL("../content/v4.2-expansion.js", import.meta.url), "utf8");
const v43Source = fs.readFileSync(new URL("../content/v4.3-expansion.js", import.meta.url), "utf8");
const indexSource = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function load() {
  const window = {};
  vm.runInNewContext(curationSource, { window });
  vm.runInNewContext(v42Source, { window });
  vm.runInNewContext(v43Source, { window });
  return window.OPTICAL_WEATHER_CURATION;
}

test("v4.3 expansion promotes the curation version and adds two research reservoirs", () => {
  const curation = load();
  assert.equal(curation.version, "4.3");
  assert.equal(curation.updated, "2026-08-16");
  assert.equal(curation.ready.length, 15);
  for (const title of ["Vasulka Archive — Video Works & Machine Media", "EAI — A Kinetic History"]) {
    assert.ok(curation.ready.some((entry) => entry.title === title), `${title} missing`);
  }
});

test("v4.3 reservoirs are explicitly exploration resources with provenance", () => {
  const curation = load();
  const titles = new Set(["Vasulka Archive — Video Works & Machine Media", "EAI — A Kinetic History"]);
  const entries = curation.ready.filter((entry) => titles.has(entry.title));
  assert.equal(entries.length, 2);
  for (const entry of entries) {
    assert.match(entry.url, /^https:\/\//);
    assert.match(entry.sourceLabel, /Explore/);
    assert.ok(entry.sourceKind);
    assert.match(entry.verified, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(entry.description, /(archive|history|documentation|laboratory)/i);
  }
});

test("v4.3 expansion loads after v4.2 and before programme 44 and registry", () => {
  const v42 = indexSource.indexOf('src="content/v4.2-expansion.js"');
  const v43 = indexSource.indexOf('src="content/v4.3-expansion.js"');
  const p44 = indexSource.indexOf('src="content/programme-44.js"');
  const registry = indexSource.indexOf('src="content/registry.js"');
  assert.ok(v42 > -1 && v43 > v42 && p44 > v43 && registry > p44);
});
