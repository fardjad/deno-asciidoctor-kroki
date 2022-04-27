import { deflate } from "./deps.ts";
import { uint8ArrayToBase64 } from "./deps.ts";

export class KrokiDiagram {
  #text;
  #type;
  #format;

  constructor(type, format, text) {
    this.#text = text;
    this.#type = type;
    this.#format = format;
  }

  getDiagramUri(serverUrl) {
    return `${serverUrl}/${this.#type}/${this.#format}/${this.encode()}`;
  }

  encode() {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(this.#text);
    const compressed = deflate(buffer, { level: 9 });

    return uint8ArrayToBase64(compressed)
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
}
