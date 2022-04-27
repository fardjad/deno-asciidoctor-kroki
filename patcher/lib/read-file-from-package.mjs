import fs from "node:fs";
import path from 'node:path';
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeModulesPath = path.join(__dirname, '../node_modules');

export const readFileFromPackage = async (filePath) => {
  return fs.promises.readFile(path.join(nodeModulesPath, filePath), { encoding: "utf8" });
};
