import {
  getFormData,
  displayError,
  hideError,
  clearForm,
  isDuplicate,
} from "/js/utils/form-utils.js";
import { saveToStorage } from "/js/utils/storage.js";
import { formFields, formSelectors, STORAGE_KEYS } from "./constants.js";
import { DOM } from "./domElements.js";
import { showProperties } from "./renderData.js";

let propertiesData = [];

export function setPropertiesData(data) {
  propertiesData = data;
}

export function getPropertiesData() {
  return propertiesData;
}

export function validatePropertyData(property) {
  if (typeof property.id !== "number" || isNaN(property.id) || property.id < 0)
    throw new Error("El ID debe ser un número positivo.");
  if (typeof property.name !== "string" || property.name.trim() === "")
    throw new Error("El nombre debe ser una cadena no vacía.");
  if (typeof property.categoryId !== "number" || isNaN(property.categoryId))
    throw new Error("La ID de la categoría debe ser un número positivo.");
  if (typeof property.courseId !== "number" || isNaN(property.courseId))
    throw new Error("El ID del curso debe ser un número positivo.");
}

export function addProperty(e) {
  e.preventDefault();
  hideError(DOM.errorBox);

  try {
    const property = getFormData(formFields);
    validatePropertyData(property);

    const { idExists, nameExists } = isDuplicate(property, propertiesData, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe un inmueble con ese ID.");
    if (nameExists) throw new Error("Ya existe un inmueble con ese nombre.");

    propertiesData.unshift(property);
    saveToStorage(STORAGE_KEYS.PROPERTIES, propertiesData);
    showProperties(propertiesData);
    clearForm(formSelectors);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
  }
}

export function deleteProperty(id) {
  propertiesData = propertiesData.filter((p) => p.id !== id);
  saveToStorage(STORAGE_KEYS.PROPERTIES, propertiesData);
  showProperties(propertiesData);
}

export function editProperty(id) {
  const property = propertiesData.find((p) => p.id === id);
  if (!property) return;

  for (const key in formFields) {
    const input = document.querySelector(formFields[key].selector);
    if (input) input.value = property[key];
  }

  deleteProperty(id);
}
