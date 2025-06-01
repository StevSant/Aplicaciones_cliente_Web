// Módulo para cargar y gestionar los datos de cursos y edificios
import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { showCourses } from "./renderData.js";
import { STORAGE_KEYS } from "./constants.js";
import { getElement } from "/js/utils/get-element.js";

// Variables para guardar la información cargada
export let coursesData = [];
export let buildingsData = [];

// Función para cargar las opciones del select con los edificios disponibles
function loadBuildingOptions() {
  const select = getElement("#buildingIdSelect");
  select.innerHTML = `<option value="">Seleccione un edificio</option>`;
  buildingsData.forEach((b) => {
    const option = document.createElement("option");
    option.value = b.id;
    option.textContent = `${b.name} (#${b.id})`;
    select.appendChild(option);
  });
}

// Carga los datos de los cursos y edificios desde el almacenamiento o desde archivos JSON
export async function loadCoursesAndBuildings() {
  // Carga datos de edificios desde localStorage o archivo JSON
  buildingsData = loadFromStorage(STORAGE_KEYS.BUILDINGS);
  if (!buildingsData || buildingsData.length === 0) {
    const res = await fetch("/components/dashboard/buildings/buildings.json");
    buildingsData = await res.json();
    saveToStorage(STORAGE_KEYS.BUILDINGS, buildingsData);
  }

  // Carga datos de cursos desde localStorage o archivo JSON
  coursesData = loadFromStorage(STORAGE_KEYS.COURSES);
  if (!coursesData || coursesData.length === 0) {
    const res = await fetch("/components/dashboard/courses/courses.json");
    coursesData = await res.json();
    saveToStorage(STORAGE_KEYS.COURSES, coursesData);
  }

  // Carga las opciones del select con los edificios disponibles
  loadBuildingOptions();

  // Muestra los cursos cargados
  showCourses(coursesData);
}