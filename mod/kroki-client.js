export class KrokiClient {
  constructor(doc) {
    this.doc = doc;
  }

  getTextContent() {
    throw new Error("Not supported!");
  }

  getImage() {
    throw new Error("Not supported!");
  }

  getServerUrl() {
    return this.doc.getAttribute("kroki-server-url") || "https://kroki.io";
  }
}
