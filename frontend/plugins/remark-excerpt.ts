import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root } from "mdast";

const remarkExcerpt: Plugin<[], Root> = () => {
  return (ast) => {
    let firstParagraph;

    for (const child of ast.children) {
      if (child.type === "paragraph") {
        firstParagraph = child;
        break;
      }
    }

    const excerptText = firstParagraph ? toString(firstParagraph).trim() : "";

    ast.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              attributes: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "excerpt" },
                    init: {
                      type: "Literal",
                      value: excerptText,
                      raw: JSON.stringify(excerptText),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};

export default remarkExcerpt;
