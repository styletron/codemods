import {
  getImportDeclarationVisitor,
  visitNamedSpecifiers,
  visitSpecifierReferences,
  resolveToValue,
} from "babel-utils";

export default function transformStyletronClient(babel) {
  const {types: t} = babel;
  const visitor = getImportDeclarationVisitor("styletron-client", path => {
    visitNamedSpecifiers(path, "default", specifier => {
      visitSpecifierReferences(specifier, paths => {
        paths.forEach(path => {
          let p = path.parentPath;
          if (t.isNewExpression(p)) {
            if (p.get("arguments.length") > 1) {
              let optsArg = p.get("arguments.1");
              let resolved = resolveToValue(optsArg);
              if (t.isObjectExpression(resolved)) {
                const props = resolved.node.properties;
                resolved.set("properties", [
                  ...props,
                  t.objectProperty(
                    t.identifier("hydrate"),
                    p.get("arguments.0").node,
                  ),
                ]);
              }
              p.set("arguments", [optsArg.node]);
            }
          }
        });
      });
      specifier.replaceWith(
        t.importSpecifier(
          t.identifier(specifier.get("local.name").node),
          t.identifier("Client"),
        ),
      );
    });
    path.set("source", t.stringLiteral("styletron-engine-atomic"));
  });

  return {
    name: "styletron-codemods/styletron-client",
    visitor,
  };
}
