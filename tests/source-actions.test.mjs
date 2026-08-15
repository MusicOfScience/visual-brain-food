import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../content/source-actions.js", import.meta.url), "utf8");

test("BFI Player routes disclose UK-only playback", () => {
  assert.match(source, /player\\\.bfi\\\.org\\\.uk/);
  assert.match(source, /UK only/);
});

test("BFI-only direct routes retain an international fallback", () => {
  assert.match(source, /territory-fallback/);
  assert.match(source, /Find current copy/);
  assert.match(source, /youtubeSearch/);
});
