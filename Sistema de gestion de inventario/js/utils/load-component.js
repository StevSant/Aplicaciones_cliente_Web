import { getElement } from "./dom-utils.js";

export function loadComponent(id, path) {
  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      getElement(id).innerHTML = html;
    });
}
