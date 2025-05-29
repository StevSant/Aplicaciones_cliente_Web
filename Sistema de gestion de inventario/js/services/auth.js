import { User } from "../models/user.js";

export class AuthService {
  constructor() {
    const userData = localStorage.getItem("user");
    this.user = userData ? JSON.parse(userData) : null;
  }

  login(email, password) {
    const defaultUser = new User("admin@uleam.edu.ec", "123456");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === defaultUser.email && password === defaultUser.password) {
          const user = new User(email, password);
          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          resolve({ success: true, user });
        } else {
          reject(new Error("Correo o contraseña incorrectos"));
        }
      }, 500); 
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.user !== null;
  }
}
