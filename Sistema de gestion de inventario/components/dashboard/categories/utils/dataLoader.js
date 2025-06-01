// Módulo para cargar y gestionar los datos de categorías
import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { showCategories } from "./renderData.js";
import { STORAGE_KEYS } from "./constants.js";
import { displayError } from "/js/utils/form-utils.js";
import { DOM } from "./domElements.js";

// Variable donde se almacenarán los datos de categorías
export let categoriesData = [];

// Carga las categorías desde localStorage o desde el archivo JSON si no hay datos guardados
export async function loadCategories() {
  // Intenta cargar datos desde localStorage
  const stored = loadFromStorage(STORAGE_KEYS.CATEGORIES);
  if (Array.isArray(stored) && stored.length > 0) {
    categoriesData = stored;
    showCategories(categoriesData);
    return;
  }

  // Si no hay datos en localStorage, carga desde archivo JSON
  try {
    const res = await fetch("/components/dashboard/categories/categories.json");
    if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");

    const data = await res.json();
    categoriesData = Array.isArray(data) ? data : [];
    saveToStorage(STORAGE_KEYS.CATEGORIES, categoriesData);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
    categoriesData = [];
  }

  showCategories(categoriesData);
}