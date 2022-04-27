import { Asciidoctor, assertExists, assertMatch } from "./deps.ts";
import kroki from "./mod.js";

const adoc = `
[mermaid]
....
graph TD
A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
B --> C{ How to contribute? }
C --> D[ Reporting bugs ]
C --> E[ Sharing ideas ]
C --> F[ Advocating ]
....
`;

Deno.test("Register function", () => {
  assertExists(kroki.register);
});

Deno.test("Basic diagram rendering", () => {
  const asciidoctor = Asciidoctor();
  kroki.register(asciidoctor.Extensions);
  const html = asciidoctor.convert(adoc) as string;
  assertMatch(html, /<img/);
});
