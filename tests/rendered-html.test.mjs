import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../dist/client/", import.meta.url);

for (const [route, title] of [
  ["index.html", "Hackriculture"],
  ["404.html", "Page not found"],
  ["book/index.html", "The Vegetable Guru"],
  ["book/preview/index.html", "Take a look inside"],
  ["videos/index.html", "Videos"],
  ["about/index.html", "About John"],
  ["calendar/index.html", "Self-sufficiency calendar"],
  ["growing/index.html", "Vegetable growing guides"],
]) {
  test(`static export contains ${route} and its local assets`, async () => {
    const html = await readFile(new URL(route, output), "utf8");
    assert.match(html, /<html/);
    assert.ok(html.includes(title));
    assert.match(html, /<main/);
    for (const match of html.matchAll(/<(?:img|script|link)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
      const url = match[1];
      assert.ok(!/^https?:/.test(url), `Unexpected remote asset: ${url}`);
      if (url.startsWith("/")) {
        await access(new URL(url.slice(1).split(/[?#]/)[0], output));
      }
    }
  });
}
