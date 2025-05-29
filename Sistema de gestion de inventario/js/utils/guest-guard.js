import { AuthService } from "../services/auth.js";
import { routesConfig } from "../config/routes-config.js";


export function guestGuard() {
  const authService = new AuthService();
  const currentPath = window.location.pathname;

  if (authService.isLoggedIn()) {
    if (currentPath === "/pages/login/login.html") {
      window.location.href = "/index.html";
    }
  } else {
    if (currentPath !== "/pages/login/login.html") {
      window.location.href = "/pages/login/login.html";
    }
  }
}
