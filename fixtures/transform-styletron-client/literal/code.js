import StyletronClient from "styletron-client";

const ssrStyles = document.getElementsByClassName('_styletron_hydrate');

const instance = new StyletronClient(ssrStyles, {prefix: '_'});
