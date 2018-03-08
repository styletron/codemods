import {
  getImportDeclarationVisitor,
  visitNamedSpecifiers,
  visitSpecifierReferences,
} from "babel-utils";

export default function transformStyletronClient(babel) {
  const {types: t} = babel;
  const visitor = getImportDeclarationVisitor("styletron-react", path => {
    visitNamedSpecifiers(path, "StyletronProvider", specifier => {
      visitSpecifierReferences(specifier, paths => {
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
      });
      specifier.set("imported", t.identifier("Provider"));
    });
  });

  return {
    name: "styletron-codemods/transform-provider",
    visitor,
  };
}
