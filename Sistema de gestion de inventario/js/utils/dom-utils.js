export function getElement(selector) {
  if (typeof selector !== "string" || !selector.trim()) {
    throw new Error("Selector no debe estar vacío");
  }

  if (selector.startsWith("#")) {
    return document.querySelector(selector);
  }

  const result = document.querySelectorAll(selector);
  return Array.from(result);
}
