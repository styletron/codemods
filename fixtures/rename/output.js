import StyletronClient from "styletron-client";
const ssrStyles = document.getElementsByClassName('_styletron_hydrate');
const opts = {
  prefix: '_',
  hydrate: ssrStyles
};
const instance = new StyletronClient(opts);
