// Módulo para manejar las operaciones del formulario de categorías
import { getFormData, isDuplicate, clearForm, displayError, hideError } from "/js/utils/form-utils.js";
import { saveToStorage } from "/js/utils/storage.js";
import { formFields, formSelectors, STORAGE_KEYS } from "./constants.js";
import { showCategories } from "./renderData.js";
import { getElement } from "/js/utils/get-element.js";
import { categoriesData } from "./dataLoader.js";
import { DOM } from "./domElements.js";

// Validación de datos de categoría
export function validateCategoryData(category) {
  if (
    typeof category.id !== "number" ||
    isNaN(category.id) ||
    category.id < 0
  ) {
    throw new Error("El ID debe ser un número positivo.");
  }

  if (typeof category.name !== "string" || category.name.trim() === "") {
    throw new Error("El nombre debe ser una cadena no vacía.");
  }

  if (
    typeof category.description !== "string" ||
    category.description.trim() === ""
  ) {
    throw new Error("La descripción debe ser una cadena no vacía.");
  }
}

// Agregar categoría
export function addCategory(event) {
  event.preventDefault();
  hideError(DOM.errorBox);

  try {
    const category = getFormData(formFields);

    validateCategoryData(category);

    // Verifica si ya existe una categoría con el mismo ID o nombre
    const { idExists, nameExists } = isDuplicate(category, categoriesData, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe una categoría con ese ID.");
    if (nameExists) throw new Error("Ya existe una categoría con ese nombre.");

    // Agrega la categoría al principio del array y actualiza el almacenamiento
    categoriesData.unshift(category);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categoriesData);
    showCategories(categoriesData);
    clearForm(formSelectors);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
  }
}

// Elimina una categoría por ID
export function deleteCategory(id) {
  const index = categoriesData.findIndex(c => c.id === id);
  if (index !== -1) {
    categoriesData.splice(index, 1);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categoriesData);
    showCategories(categoriesData);
  }
}

// Edita una categoría llenando el formulario con los datos seleccionados y luego lo elimina temporalmente
export function editCategory(id) {
  const cat = categoriesData.find((c) => c.id === id);
  if (!cat) return;

  // Carga los datos de la categoría en el formulario
  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = cat[key];
  }

  // Elimina la categoría original para permitir la edición
  deleteCategory(id);
}