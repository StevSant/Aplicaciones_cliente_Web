import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";
import { getBuildingsData, setBuildingsData } from "./formHandlers.js";
import { DOM } from "./domElements.js";
import { showBuildings } from "./renderData.js";


// container: elemento donde se renderizan los edificios
// displayError: callback que muestra un mensaje de error
export async function loadBuildingsData() {
  const buildingsData = loadFromStorage(STORAGE_KEYS.BUILDINGS) || [];

  if (!buildingsData.length) {
      const res = await fetch("/components/dashboard/buildings/buildings.json");
      const data = await res.json();
      
      saveToStorage(STORAGE_KEYS.BUILDINGS, buildingsData);
      setBuildingsData(data);
    }
      else {
      setBuildingsData(buildingsData);
    }
  

  showBuildings(getBuildingsData());
}
