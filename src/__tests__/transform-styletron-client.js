import path from "path";
import pluginTester from "babel-plugin-tester";

import transformStyletronClient from "../transform-styletron-client.js";

pluginTester({
  plugin: transformStyletronClient,
  fixtures: path.join(__dirname, "../../fixtures/transform-styletron-client"),
});
