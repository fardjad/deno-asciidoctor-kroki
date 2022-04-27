import fs from 'fs';
import { readFileFromPackage } from "./read-file-from-package.mjs";

const { version } = JSON.parse(
  await readFileFromPackage("asciidoctor-kroki/package.json")
);

fs.writeSync(process.stdout.fd, version); 
