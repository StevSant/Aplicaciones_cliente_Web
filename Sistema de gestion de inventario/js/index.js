import { loadComponent } from "./utils/load-component.js";

window.addEventListener('DOMContentLoaded', () => {
  loadComponent('#header', 'components/header/header.html');
  loadComponent('#footer', 'components/footer/footer.html');
});


