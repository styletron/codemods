import {
  getImportDeclarationVisitor,
  visitNamedImports,
  resolveToValue,
} from "babel-utils";

export default function transformStyletronClient(babel) {
  const {types: t} = babel;
  const visitor = getImportDeclarationVisitor("styletron-client", path => {
    visitNamedImports(path, "default", paths => {
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

    path.set("source", t.stringLiteral("styletron-engine-atomic"));
  });

  return {
    name: "styletron-codemods/styletron-client",
    visitor,
  };
}
