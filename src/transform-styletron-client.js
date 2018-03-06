import {createNamedModuleVisitor, resolveToValue} from "babel-utils";

export default function transformStyletronClient(babel) {
  const {types: t} = babel;
  const visitor = createNamedModuleVisitor(
    "default",
    "styletron-client",
    (ctx, paths) => {
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
    },
  );

  return {
    name: "styletron-codemods/styletron-client",
    visitor,
  };
}
