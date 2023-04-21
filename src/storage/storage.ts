import { AuthUser } from "../types/auth.types";
export const storage = {
  setUser: (user: AuthUser) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    const userRaw = window.localStorage.getItem("user");
    if (userRaw) {
      return JSON.parse(userRaw);
    }
  },
  clearToken: () => {
    window.localStorage.removeItem("token");
  },
};
