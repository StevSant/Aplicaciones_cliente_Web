import { DOM } from "./domElements.js";
import { createPropertyCard } from "./createCard.js";
import {getElement} from "/js/utils/get-element.js";

let courses = [];
let categories = [];

export function setCourseAndCategoryData(c, cat) {
  courses = c;
  categories = cat;
}

export function showProperties(list) {
  // Actualizar la referencia antes de usar
  DOM.container = getElement("#containerProperties");
  if (!DOM.container || !document.contains(DOM.container)) {
    return;
  } 

  DOM.container.innerHTML = list.length
    ? list.map((p) => createPropertyCard(p, courses, categories)).join("")
    : `<div>No hay inmuebles registrados.</div>`;
}
