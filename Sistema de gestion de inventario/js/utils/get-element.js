export function getElement(selector) {
  if (selector.startsWith("#") || selector.startsWith(".")) {
    return document.querySelector(selector);
  } else {
    return document.getElementById(selector);
  }
}
