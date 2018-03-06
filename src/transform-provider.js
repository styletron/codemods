import {createNamedModuleVisitor} from "babel-utils";

export default function transformStyletronClient(babel) {
  const {types: t} = babel;
  const visitor = createNamedModuleVisitor(
    "StyletronProvider",
    "styletron-react",
    (ctx, paths) => {
      paths.forEach(path => {
        let p = path.parentPath;
        if (t.isJSXOpeningElement(p)) {
          const attrs = p.get("attributes");
          const transformed = attrs.map(attr => {
            if (attr.get("name.name").node === "styletron") {
              attr.node.name.name = "value";
            }
            return attr.node;
          });

          p.set("attributes", transformed);
        }
      });
    },
  );

  return {
    name: "styletron-codemods/styletron-client",
    visitor,
  };
}
