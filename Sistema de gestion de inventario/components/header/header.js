import { AuthService } from "/js/services/auth.js";
import { getElement } from "/js/utils/get-element.js";

export function renderAuthButton() {
  const logoutBtnNav = getElement("logout");
  const loginLink = getElement("#auth-actions a");

  if (!logoutBtnNav || !loginLink) {
    return;
  }

  const authService = new AuthService();

  if (authService.isLoggedIn()) {
    logoutBtnNav.style.display = "inline-block";
    loginLink.style.display = "none";

    logoutBtnNav.addEventListener("click", () => {
      authService.logout();
      window.location.href = "#/login";
    });
  } else {
    logoutBtnNav.style.display = "none";
    loginLink.style.display = "inline-block";
  }
}
renderAuthButton();
