import path from "path";
import pluginTester from "babel-plugin-tester";

import identifierReversePlugin from "../transform-styletron-client.js";

pluginTester({
  plugin: identifierReversePlugin,
  fixtures: path.join(__dirname, "../../fixtures"),
});
