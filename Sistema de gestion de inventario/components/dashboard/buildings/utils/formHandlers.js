import {
  getFormData,
  isDuplicate,
  clearForm,
  displayError,
  hideError,
} from "/js/utils/form-utils.js";
import { saveToStorage } from "/js/utils/storage.js";
import { formFields, formSelectors, STORAGE_KEYS } from "./constants.js";
import { showBuildings } from "./renderData.js";
import { DOM } from "./domElements.js";
import { getElement } from "/js/utils/get-element.js";

export let buildingsData = [];

export function setBuildingsData(data) {
  buildingsData = data;
}

export function getBuildingsData() {
  return buildingsData;
}

export function validateBuildingData(building) {
  if (building.id < 0) throw new Error("El ID debe ser positivo.");
  if (building.floors < 0) throw new Error("Pisos debe ser positivo.");
  if (building.capacity < 0) throw new Error("Capacidad debe ser positiva.");
}

export function addBuilding(event) {
  event.preventDefault();
  hideError(DOM.errorBox);

  try {
    const building = getFormData(formFields);
    validateBuildingData(building);

    const { idExists, nameExists } = isDuplicate(building, buildingsData, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe un edificio con ese ID.");
    if (nameExists) throw new Error("Ya existe un edificio con ese nombre.");

    buildingsData.unshift(building);
    saveToStorage(STORAGE_KEYS.BUILDINGS, buildingsData);
    showBuildings(buildingsData, DOM.container);
    clearForm(formSelectors);
  } catch (err) {
    console.log(err);
    displayError(DOM.errorBox, err.message);
  }
}

export function deleteBuilding(id, container) {
  const index = buildingsData.findIndex((b) => b.id === id);
  if (index !== -1) {
    buildingsData.splice(index, 1);
    saveToStorage(STORAGE_KEYS.BUILDINGS, buildingsData);
    showBuildings(buildingsData, container);
  }
}

export function editBuilding(id) {
  const building = buildingsData.find((b) => b.id === id);
  if (!building) return;

  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = building[key];
  }

  deleteBuilding(id, getElement("#containerBuildings"));
}
