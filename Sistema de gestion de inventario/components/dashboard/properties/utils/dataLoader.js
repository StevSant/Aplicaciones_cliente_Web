import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";
import { DOM } from "./domElements.js";
import { setPropertiesData, getPropertiesData } from "./formHandlers.js";
import { setCourseAndCategoryData, showProperties } from "./renderData.js";

let coursesData = [];
let categoriesData = [];

export async function loadPropertiesData() {
  // Cargar categorías
  categoriesData = loadFromStorage(STORAGE_KEYS.CATEGORIES) || [];
  if (!categoriesData.length) {
    const res = await fetch("/components/dashboard/categories/categories.json");
    categoriesData = await res.json();
    saveToStorage(STORAGE_KEYS.CATEGORIES, categoriesData);
  }

  // Cargar cursos
  coursesData = loadFromStorage(STORAGE_KEYS.COURSES) || [];
  if (!coursesData.length) {
    const res = await fetch("/components/dashboard/courses/courses.json");
    coursesData = await res.json();
    saveToStorage(STORAGE_KEYS.COURSES, coursesData);
  }

  // Cargar propiedades
  const propertiesData = loadFromStorage(STORAGE_KEYS.PROPERTIES) || [];
  if (!propertiesData.length) {
    const res = await fetch("/components/dashboard/properties/properties.json");
    const data = await res.json();
    saveToStorage(STORAGE_KEYS.PROPERTIES, data);
    setPropertiesData(data);
  } else {
    setPropertiesData(propertiesData);
  }

  // Llenar selects
  DOM.categorySelect.innerHTML = `<option value="">Seleccione una categoría</option>`;
  categoriesData.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    DOM.categorySelect.appendChild(option);
  });

  DOM.courseSelect.innerHTML = `<option value="">Seleccione un curso</option>`;
  coursesData.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    DOM.courseSelect.appendChild(option);
  });

  setCourseAndCategoryData(coursesData, categoriesData);
  showProperties(getPropertiesData());
}
