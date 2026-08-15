import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = { window: {} };
vm.createContext(context);

for (const filename of ["data-ready.js", "data-1.js", "data-2.js", "data-3.js", "data-4.js", "metadata-v2.js"]) {
  vm.runInContext(fs.readFileSync(path.join(directory, filename), "utf8"), context, { filename });
}

const ready = context.window.CINEMATHEQUE_READY;
const programmes = context.window.CINEMATHEQUE_PROGRAMMES;
const metadata = context.window.OPTICAL_WEATHER_META;
const items = programmes.flatMap((programme) => programme.items);

const allowed = {
  attention: new Set(["peripheral", "intermittent", "attentive"]),
  language: new Set(["none", "intertitles", "subtitles", "dialogue-heavy", "mixed"]),
  image: new Set(["monochrome", "colour", "mixed"]),
  energy: new Set(["calm", "rhythmic", "intense", "deranged"]),
  form: new Set(["feature", "shorts", "animation", "archive", "process", "gallery", "documentary", "experimental"]),
  session: new Set(["under-hour", "one-to-three", "evening", "six-to-ten", "all-night"]),
  sound: new Set(["original", "replaceable", "silent-friendly"])
};

function parseRuntime(value) {
  if (/^\d+:\d{2}$/.test(value)) {
    const [hours, minutes] = value.split(":").map(Number);
    return (hours * 60) + minutes;
  }
  if (/^\d+m$/.test(value)) return Number.parseInt(value, 10);
  throw new Error(`Unrecognised runtime: ${value}`);
}

test("the complete v1 collection is preserved", () => {
  assert.equal(ready.length, 11);
  assert.equal(programmes.length, 36);
  assert.equal(items.length, 267);
});

test("programme IDs and v2 metadata are complete", () => {
  const ids = Array.from(programmes, (programme) => programme.title.match(/^(\d{2})\s+—/)?.[1]);
  assert.deepEqual(ids, Array.from({ length: 36 }, (_, index) => String(index + 1).padStart(2, "0")));
  assert.deepEqual(Object.keys(metadata.programmes).sort((a, b) => Number(a) - Number(b)), ids);
});

test("controlled ontology values remain controlled", () => {
  for (const [id, entry] of Object.entries(metadata.programmes)) {
    for (const key of ["attention", "language", "energy", "form"]) {
      assert.ok(entry[key].length, `${id} must have ${key}`);
      for (const value of entry[key]) assert.ok(allowed[key].has(value), `${id} has invalid ${key}: ${value}`);
    }
    assert.ok(allowed.image.has(entry.image), `${id} has invalid image: ${entry.image}`);
    assert.ok(allowed.session.has(entry.session), `${id} has invalid session: ${entry.session}`);
    assert.ok(allowed.sound.has(entry.sound), `${id} has invalid sound: ${entry.sound}`);
    assert.ok(entry.territories.length, `${id} must have a browse territory`);
    assert.ok(entry.directions.length, `${id} must have a discovery direction`);
    assert.ok(entry.regions.length, `${id} must have a region`);
  }
});

test("all browse territories and discovery directions return results", () => {
  const entries = Object.values(metadata.programmes);
  for (const territory of metadata.territories) {
    assert.ok(entries.some((entry) => entry.territories.includes(territory.id)), `${territory.id} is empty`);
  }
  for (const direction of metadata.directions) {
    assert.ok(entries.some((entry) => entry.directions.includes(direction.id)), `${direction.id} is empty`);
  }
  assert.ok(entries.some((entry) => entry.attention.includes("peripheral")), "Keep me company needs a peripheral result");
  assert.ok(entries.some((entry) => entry.attention.includes("attentive")), "I want to watch needs an attentive result");
});

test("All night never promises less than eight hours", () => {
  for (const programme of programmes) {
    const id = programme.title.match(/^(\d{2})\s+—/)?.[1];
    if (metadata.programmes[id].directions.includes("all-night")) assert.ok(programme.duration >= 480, programme.title);
  }
});

test("programme durations still reconcile with running orders", () => {
  for (const programme of programmes) {
    const total = programme.items.reduce((sum, item) => sum + parseRuntime(item.runtime), 0);
    assert.equal(total, programme.duration, programme.title);
  }
});

test("every item retains a precise YouTube search fallback", () => {
  const fallback = /^https:\/\/www\.youtube\.com\/results\?search_query=\S+/;
  const direct = /^https:\/\/www\.youtube\.com\/(watch|playlist)\?/;
  for (const item of items) {
    assert.match(item.search, fallback, item.title);
    if (item.watch) assert.match(item.watch, direct, item.title);
  }
});

test("the static shell contains the required access and resilience hooks", () => {
  const html = fs.readFileSync(path.join(directory, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(directory, "app.js"), "utf8");
  const css = fs.readFileSync(path.join(directory, "styles.css"), "utf8");

  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="main"/);
  assert.match(html, /<nav[^>]+aria-label="Primary navigation"/);
  assert.match(html, /<noscript>/);
  assert.doesNotMatch(html, /Hudson/i);
  assert.doesNotMatch(app, /Hudson/i);
  assert.doesNotMatch(html, /onclick=/i);
  assert.match(app, /Find current copy/);
  assert.match(app, /<details class="programme-order" open>/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /min-height:\s*2\.75rem/);
});
