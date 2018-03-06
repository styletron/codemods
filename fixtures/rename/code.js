import StyletronClient from "styletron-client";

const ssrStyles = document.getElementsByClassName('_styletron_hydrate');

const opts = {
  prefix: '_'
};

const instance = new StyletronClient(ssrStyles, opts);
