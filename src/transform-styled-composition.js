import {
  getImportDeclarationVisitor,
  visitNamedSpecifiers,
  visitSpecifierReferences,
  resolveToValue,
} from "babel-utils";

export default function transformStyledComposition(babel) {
  const {types: t} = babel;
  const visitor = getImportDeclarationVisitor(
    ["styletron-react", "fusion-plugin-styletron-react"],
    path => {
      let withStyle;
      let usages = [];
      visitNamedSpecifiers(path, ["styled", "withStyle"], (specifier, id) => {
        if (id === "withStyle") {
          withStyle = specifier;
          return;
        }
        // else "styled"
        visitSpecifierReferences(specifier, paths => usages.push(...paths));
      });

      if (withStyle) {
        // withStyle was present, so we should exit early
        return;
      }

      const withStyleId = path.scope.bindings["withStyle"]
        ? path.scope.generateUidIdentifier("withStyle")
        : t.identifier("withStyle");

      let needsToBeAdded = false;

      usages.forEach(path => {
        let p = path.parentPath;
        if (t.isCallExpression(p)) {
          if (p.get("arguments.length") > 1) {
            let styledArg = p.get("arguments.0");
            let resolved = resolveToValue(styledArg);
            if (t.isCallExpression(resolved)) {
              if (usages.includes(resolved.get("callee"))) {
                p.set("callee", withStyleId);
                needsToBeAdded = true;
              }
            }
          }
        }
      });

      if (needsToBeAdded) {
        const specifier = path.get("specifiers.0");
        specifier.insertAfter(
          t.importSpecifier(withStyleId, t.identifier("withStyle")),
        );
      }
    },
  );

  return {
    name: "styletron-codemods/transform-styled-composition",
    visitor,
  };
}
