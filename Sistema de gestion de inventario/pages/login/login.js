import { AuthService } from "/js/services/auth.js";
import {routesConfig} from "/js/config/routes-config.js";


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.querySelector(".error-message");
const successMessage = document.querySelector(".success-message");
const loginBtn = document.querySelector(".login-btn");

const authService = new AuthService();

async function handleLogin() {
  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = "";
  successMessage.textContent = "";

  if (!email || !password) {
    errorMessage.textContent = "Por favor, rellena todos los campos";
    return;
  }

  try {
    const result = await authService.login(email, password);

    if (result.success) {
      successMessage.textContent = "Inicio de sesión exitoso";
      window.location.href = routesConfig["#/"];
    }
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

loginBtn.addEventListener("click", handleLogin);

if (emailInput && passwordInput) {
  emailInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleLogin();
  });

  passwordInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleLogin();
  });
}
