import path from "path";
import pluginTester from "babel-plugin-tester";

import transformStyletronServer from "../transform-styletron-server.js";

pluginTester({
  plugin: transformStyletronServer,
  fixtures: path.join(__dirname, "../../fixtures/transform-styletron-server"),
});
