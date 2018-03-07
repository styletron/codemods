import path from "path";
import pluginTester from "babel-plugin-tester";

import transformStyledComposition from "../transform-styled-composition.js";

pluginTester({
  plugin: transformStyledComposition,
  fixtures: path.join(__dirname, "../../fixtures/transform-styled-composition"),
});
