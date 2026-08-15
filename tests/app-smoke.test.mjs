import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadApp() {
  const rootListeners = new Map();
  const windowListeners = new Map();
  const root = {
    innerHTML: "",
    addEventListener(type, listener) {
      rootListeners.set(type, listener);
    },
    querySelector() {
      return null;
    }
  };
  const document = {
    getElementById(id) {
      return id === "app" ? root : null;
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {}
  };
  const location = { hash: "" };
  const window = {
    addEventListener(type, listener) {
      windowListeners.set(type, listener);
    },
    scrollTo() {}
  };
  const context = {
    console,
    document,
    location,
    requestAnimationFrame(callback) {
      callback();
    },
    window
  };
  vm.createContext(context);
  for (const filename of ["data-ready.js", "data-1.js", "data-2.js", "data-3.js", "data-4.js", "metadata-v2.js", "app.js"]) {
    vm.runInContext(fs.readFileSync(path.join(directory, filename), "utf8"), context, { filename });
  }
  return { root, rootListeners, windowListeners, location };
}

function recipeClick(listener, recipe) {
  listener({
    target: {
      closest(selector) {
        if (selector === "[data-recipe]") return { dataset: { recipe } };
        return null;
      }
    }
  });
}

function renderedTitle(html) {
  return html.match(/id="discovery-title"[^>]*>([^<]+)/)?.[1];
}

test("Discover renders one-action behaviours and a non-repeating result", () => {
  const app = loadApp();
  assert.match(app.root.innerHTML, /What do you want the screen/);
  assert.match(app.root.innerHTML, /Take me somewhere/);
  assert.match(app.root.innerHTML, /Keep me company/);
  assert.match(app.root.innerHTML, /I want to watch/);

  recipeClick(app.rootListeners.get("click"), "company");
  const first = renderedTitle(app.root.innerHTML);
  assert.ok(first);
  assert.match(app.root.innerHTML, /Forgiving enough to live beside/);
  assert.match(app.root.innerHTML, /Open programme/);

  recipeClick(app.rootListeners.get("click"), "company");
  const second = renderedTitle(app.root.innerHTML);
  assert.ok(second);
  assert.notEqual(second, first);
});

test("hash routes render Browse, About and complete programme fallbacks", () => {
  const app = loadApp();
  const route = (hash) => {
    app.location.hash = hash;
    app.windowListeners.get("hashchange")();
  };

  route("#browse");
  assert.match(app.root.innerHTML, /An editorial map/);
  assert.match(app.root.innerHTML, /Ready-made streams/);
  assert.match(app.root.innerHTML, /Dream &amp; experiment/);

  route("#programme/01");
  assert.match(app.root.innerHTML, /Weimar Nightmare/);
  assert.equal((app.root.innerHTML.match(/Find current copy ↗/g) || []).length, 6);

  route("#about");
  assert.match(app.root.innerHTML, /no AI recommendation API, account, tracking, analytics, database or personal profile/);
});
