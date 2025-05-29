import { guestGuard } from "./utils/guest-guard.js";
import { loadComponent } from "./utils/load-component.js";
import { router } from "./utils/router.js";

window.addEventListener("hashchange", router);

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "/components/header/header.html");
  loadComponent("#footer", "/components/footer/footer.html");
//   guestGuard();
  router();
});
