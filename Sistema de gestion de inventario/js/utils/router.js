import { routesConfig } from "../config/routes-config.js";
import { loadComponent } from "./load-component.js";

export async function router() {
  const path = window.location.hash || "#/";
  const component = routesConfig[path] || "components/404/404.html";
  await loadComponent(".main-container", `/${component}`);
}
