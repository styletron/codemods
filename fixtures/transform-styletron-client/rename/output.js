import StyletronClient from "styletron-engine-atomic";
const ssrStyles = document.getElementsByClassName('_styletron_hydrate');
const opts = {
  prefix: '_',
  hydrate: ssrStyles
};
const instance = new StyletronClient(opts);
