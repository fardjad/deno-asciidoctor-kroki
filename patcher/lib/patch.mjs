import fs from "node:fs";
import * as astring from "astring";
import { parse } from "acorn";
import { walk } from "estree-walker";
import { readFileFromPackage } from "./read-file-from-package.mjs";

const script = await readFileFromPackage(
  "asciidoctor-kroki/src/asciidoctor-kroki.js"
);

const ast = parse(script, { ecmaVersion: "latest" });
walk(ast, {
  enter(node) {
    // module.exports.<identifier> = <function_expression> --> export <function_declaration>
    if (
      node.type === 'ExpressionStatement' &&
      node.expression.type === 'AssignmentExpression' &&
      node.expression.left.type === 'MemberExpression' &&
      node.expression.left.object.type === 'MemberExpression' &&
      node.expression.left.object.object.type === 'Identifier' &&
      node.expression.left.object.object.name === 'module' &&
      node.expression.left.object.property.type === 'Identifier' &&
      node.expression.left.object.property.name === 'exports' &&
      node.expression.left.property.type === 'Identifier' &&
      node.expression.right.type === 'FunctionExpression'
    ) {
      return this.replace(
        {
          "type": "ExportNamedDeclaration",
          "declaration": {
            ...node.expression.right,
            "type": "FunctionDeclaration",
          }
        }
      )
    }
  },
});

const code = `
import { KrokiClient as DenoKrokiClient } from './kroki-client.js';
import { KrokiDiagram as DenoKrokiDiagram } from './kroki-diagram.js';

const require = (path) => {
  if (path === './kroki-client.js') {
    return {
      KrokiClient: DenoKrokiClient,
      KrokiDiagram: DenoKrokiDiagram
    }
  }

  return new Proxy({}, {
    get() {
      throw new Error("Not supported!")
    },
    set() {
      throw new Error("Not supported!")
    }
  });
};

${astring.generate(ast)}
`;

fs.writeSync(process.stdout.fd, code);
