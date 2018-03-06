import {getImportDeclarationVisitor, visitNamedSpecifiers} from "babel-utils";

export default function transformStyletronServer(babel) {
  const {types: t} = babel;
  const visitor = getImportDeclarationVisitor("styletron-server", path => {
    visitNamedSpecifiers(path, "default", specifier => {
      specifier.replaceWith(
        t.importSpecifier(
          t.identifier(specifier.get("local.name").node),
          t.identifier("Server"),
        ),
      );
    });
    path.set("source", t.stringLiteral("styletron-engine-atomic"));
  });

  return {
    name: "styletron-codemods/styletron-server",
    visitor,
  };
}
