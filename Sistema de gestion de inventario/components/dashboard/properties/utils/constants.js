import { STORAGE_KEYS } from "/js/config/storage-keys.js";



export const formFields = {
  id: { selector: "#propertyId", type: "number", label: "ID del inmueble" },
  name: { selector: "#propertyName", type: "string", label: "Nombre del inmueble" },
  categoryId: { selector: "#categorySelect", type: "number", label: "Categoría" },
  courseId: { selector: "#courseSelect", type: "number", label: "Curso" },
};

export const formSelectors = Object.values(formFields);

export { STORAGE_KEYS };