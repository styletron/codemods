import path from "path";
import pluginTester from "babel-plugin-tester";

import transformProvider from "../transform-provider.js";

pluginTester({
  babelOptions: {
    parserOpts: {
      plugins: ["jsx"],
    },
  },
  plugin: transformProvider,
  fixtures: path.join(__dirname, "../../fixtures/transform-provider"),
});
