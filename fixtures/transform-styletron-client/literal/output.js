import { Client as StyletronClient } from "styletron-engine-atomic";
const ssrStyles = document.getElementsByClassName('_styletron_hydrate');
const instance = new StyletronClient({
  prefix: '_',
  hydrate: ssrStyles
});
