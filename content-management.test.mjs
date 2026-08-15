import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const curation = fs.readFileSync(new URL("../content/curation.js", import.meta.url), "utf8");
const registry = fs.readFileSync(new URL("../content/registry.js", import.meta.url), "utf8");

test("v4.1 curation layer is explicitly versioned", () => {
  const window = {};
  vm.runInNewContext(curation, { window });
  assert.equal(window.OPTICAL_WEATHER_CURATION.version, "4.1");
  assert.ok(Array.isArray(window.OPTICAL_WEATHER_CURATION.ready));
  assert.ok(Array.isArray(window.OPTICAL_WEATHER_CURATION.programmes));
});

test("registry appends and replaces deterministically", () => {
  const window = {
    CINEMATHEQUE_READY: [{ title: "A", url: "old" }],
    CINEMATHEQUE_PROGRAMMES: [{ title: "01 — Old", items: [] }],
    OPTICAL_WEATHER_META: { programmes: { "01": { old: true } }, territories: [], directions: [] },
    OPTICAL_WEATHER_CURATION: {
      version: "4.1",
      updated: "2026-08-16",
      ready: [{ title: "A", url: "new" }, { title: "B", url: "b" }],
      programmes: [{ title: "01 — Replacement", items: [] }, { title: "37 — New", items: [] }],
      metadata: { programmes: { "37": { attention: "proper" } } }
    }
  };

  vm.runInNewContext(registry, { window });
  assert.equal(window.CINEMATHEQUE_READY.length, 2);
  assert.equal(window.CINEMATHEQUE_READY[0].url, "new");
  assert.equal(window.CINEMATHEQUE_PROGRAMMES.length, 2);
  assert.equal(window.CINEMATHEQUE_PROGRAMMES[0].title, "01 — Replacement");
  assert.equal(window.CINEMATHEQUE_PROGRAMMES[1].title, "37 — New");
  assert.equal(window.OPTICAL_WEATHER_META.programmes["01"].old, true);
  assert.equal(window.OPTICAL_WEATHER_META.programmes["37"].attention, "proper");
  assert.equal(window.OPTICAL_WEATHER_CONTENT.version, "4.1");
});
