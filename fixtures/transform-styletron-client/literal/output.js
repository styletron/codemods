import StyletronClient from "styletron-client";
const ssrStyles = document.getElementsByClassName('_styletron_hydrate');
const instance = new StyletronClient({
  prefix: '_',
  hydrate: ssrStyles
});
