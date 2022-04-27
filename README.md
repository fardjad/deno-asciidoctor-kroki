# deno-asciidoctor-kroki

> Patched version of asciidoctor-kroki to be used with Deno

## Description

This repository automatically patches
[`asciidoctor-kroki`](https://www.npmjs.com/package/asciidoctor-kroki) to make
it compatible with Deno and creates a tag matching the version of the npm
module.

For more information about the module, please visit the official
`asciidoctor-kroki` [repository](https://github.com/Mogztter/asciidoctor-kroki).

## Usage

```typescript
import Asciidoctor from "https://deno.land/x/asciidoctor/mod.js";
import kroki from "https://deno.land/x/asciidoctor-kroki/mod.js";

const asciidoctor = Asciidoctor();
kroki.register(Asciidoctor.Extensions);
const html = asciidoctor.convert(`
== Title

[mermaid]
....
graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
  C --> E[ Sharing ideas ]
  C --> F[ Advocating ]
....
`);
console.log(html);
```

## Limitations

- `vegalite`, `plantuml`, `c4plantuml` diagram types are only supported in
  secure mode (i.e. `{ safe: 'secure' }`)
- The block macro form and file system access are not supported
- `kroki-fetch-diagram` attribute is not supported

It's relatively easy to make Deno compatible shims for unsupported components.
In case you are interested in doing so, please feel free to have a look at the
project repository and the approach taken for shimming `kroki-client.js` and
`kroki-diagram.js` files and submit a PR.
