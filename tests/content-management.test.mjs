import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const curation = fs.readFileSync(new URL("../content/curation.js", import.meta.url), "utf8");
const registry = fs.readFileSync(new URL("../content/registry.js", import.meta.url), "utf8");
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function programme(id, title = "Programme") {
  return {
    title: `${id} — ${title}`,
    description: "Editorial proposition.",
    duration: 60,
    tags: ["test"],
    items: [{
      title: "Work",
      credit: "Maker, 2026",
      runtime: "1:00",
      watch: null,
      search: "https://www.youtube.com/results?search_query=Work+Maker+2026",
      note: ""
    }],
    modes: ["WATCH PROPERLY"]
  };
}

function runRegistry(overrides = {}) {
  const countNode = { textContent: "" };
  const window = {
    CINEMATHEQUE_READY: [{ title: "A", description: "Old", tags: ["old"], url: "https://example.com/a" }],
    CINEMATHEQUE_PROGRAMMES: [programme("01", "Old")],
    OPTICAL_WEATHER_META: { programmes: { "01": { old: true } }, territories: [], directions: [] },
    OPTICAL_WEATHER_CURATION: { version: "4.1", updated: "2026-08-16", ready: [], programmes: [], metadata: { programmes: {} } },
    ...overrides
  };
  const document = { getElementById: (id) => id === "collection-count" ? countNode : null };
  vm.runInNewContext(registry, { window, document });
  return { window, countNode };
}

test("v4.1 curation layer is explicitly versioned", () => {
  const window = {};
  vm.runInNewContext(curation, { window });
  assert.equal(window.OPTICAL_WEATHER_CURATION.version, "4.1");
  assert.ok(Array.isArray(window.OPTICAL_WEATHER_CURATION.ready));
  assert.ok(Array.isArray(window.OPTICAL_WEATHER_CURATION.programmes));
});

test("registry appends and replaces deterministically", () => {
  const { window } = runRegistry({
    OPTICAL_WEATHER_CURATION: {
      version: "4.1",
      updated: "2026-08-16",
      ready: [
        { title: "A", description: "Revised", tags: ["new"], url: "https://example.com/new" },
        { title: "B", description: "New", tags: ["new"], url: "https://example.com/b" }
      ],
      programmes: [programme("01", "Replacement"), programme("37", "New")],
      metadata: { programmes: { "37": { attention: "proper" } } }
    }
  });

  assert.equal(window.CINEMATHEQUE_READY.length, 2);
  assert.equal(window.CINEMATHEQUE_READY[0].url, "https://example.com/new");
  assert.equal(window.CINEMATHEQUE_PROGRAMMES.length, 2);
  assert.equal(window.CINEMATHEQUE_PROGRAMMES[0].title, "01 — Replacement");
  assert.equal(window.CINEMATHEQUE_PROGRAMMES[1].title, "37 — New");
  assert.equal(window.OPTICAL_WEATHER_META.programmes["01"].old, true);
  assert.equal(window.OPTICAL_WEATHER_META.programmes["37"].attention, "proper");
});

test("empty overlay preserves the assembled base and derives counts", () => {
  const { window, countNode } = runRegistry();
  assert.equal(window.CINEMATHEQUE_READY.length, 1);
  assert.equal(window.CINEMATHEQUE_PROGRAMMES.length, 1);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.version, "4.1");
  assert.equal(window.OPTICAL_WEATHER_CONTENT.programmeCount, 1);
  assert.equal(window.OPTICAL_WEATHER_CONTENT.routeCount, 1);
  assert.equal(countNode.textContent, "1 programmes · 1 routes into moving-image culture");
});

test("new programmes require matching metadata", () => {
  assert.throws(() => runRegistry({
    OPTICAL_WEATHER_CURATION: {
      version: "4.1",
      updated: "2026-08-16",
      ready: [],
      programmes: [programme("37", "Unclassified")],
      metadata: { programmes: {} }
    }
  }), /new programme 37 needs a matching metadata/);
});

test("duplicate curation keys fail loudly", () => {
  assert.throws(() => runRegistry({
    OPTICAL_WEATHER_CURATION: {
      version: "4.1",
      updated: "2026-08-16",
      ready: [
        { title: "Same", description: "One", tags: [], url: "https://example.com/1" },
        { title: "Same", description: "Two", tags: [], url: "https://example.com/2" }
      ],
      programmes: [],
      metadata: { programmes: {} }
    }
  }), /duplicate ready-made stream key/);
});

test("programme items must retain resilient YouTube search fallbacks", () => {
  const invalid = programme("37", "Broken");
  invalid.items[0].search = "https://example.com/search";
  assert.throws(() => runRegistry({
    OPTICAL_WEATHER_CURATION: {
      version: "4.1",
      updated: "2026-08-16",
      ready: [],
      programmes: [invalid],
      metadata: { programmes: { "37": { attention: "proper" } } }
    }
  }), /needs a resilient YouTube search fallback/);
});

test("index loads curation and registry before app and has dynamic count target", () => {
  const curationPos = index.indexOf('src="content/curation.js"');
  const registryPos = index.indexOf('src="content/registry.js"');
  const appPos = index.indexOf('src="app.js"');
  assert.ok(curationPos > -1 && registryPos > curationPos && appPos > registryPos);
  assert.match(index, /id="collection-count"/);
  assert.doesNotMatch(index, /36 programmes · 267 routes/);
});
