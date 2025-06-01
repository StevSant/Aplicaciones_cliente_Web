// Módulo para manejar las operaciones del formulario de cursos
import { getFormData, displayError, hideError, clearForm, isDuplicate } from "/js/utils/form-utils.js";
import { saveToStorage } from "/js/utils/storage.js";
import { formFields, formSelectors, STORAGE_KEYS } from "./constants.js";
import { showCourses } from "./renderData.js";
import { getElement } from "/js/utils/get-element.js";
import { coursesData } from "./dataLoader.js";
import { DOM } from "./domElements.js";

// Función que se ejecuta al agregar un nuevo curso
export function addCourse(e) {
  e.preventDefault(); // Evita el comportamiento por defecto del botón
  hideError(DOM.errorBox); // Oculta el mensaje de error (si había)

  try {
    const newCourse = getFormData(formFields); // Obtiene los datos del formulario

    // Verifica si el ID o nombre ya existen en la lista
    const { idExists, nameExists } = isDuplicate(newCourse, coursesData, [
      "id",
      "name",
    ]);
    if (idExists)
      return displayError(DOM.errorBox, "Ya existe un curso con ese ID.");
    if (nameExists)
      return displayError(DOM.errorBox, "Ya existe un curso con ese nombre.");

    // Agrega el nuevo curso al principio del arreglo
    coursesData.unshift(newCourse);

    // Guarda los datos y actualiza la vista
    saveToStorage(STORAGE_KEYS.COURSES, coursesData);
    showCourses(coursesData);
    clearForm(formSelectors); // Limpia el formulario
  } catch (err) {
    // Si ocurre un error, se muestra
    displayError(DOM.errorBox, err.message);
  }
}

// Elimina un curso a partir de su ID
export function deleteCourse(id) {
  const index = coursesData.findIndex(c => c.id === id);
  if (index !== -1) {
    coursesData.splice(index, 1);
    saveToStorage(STORAGE_KEYS.COURSES, coursesData);
    showCourses(coursesData);
  }
}

// Carga los datos del curso en el formulario para editarlos y lo elimina temporalmente
export function editCourse(id) {
  const course = coursesData.find((c) => c.id === id);
  if (!course) return;

  // Carga los valores en los campos del formulario
  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = course[key];
  }

  // Elimina el curso para que se pueda volver a guardar editado
  deleteCourse(id);
}