import { defineStore } from "pinia";
import { User } from "@/views/users/";

interface AuthState {
   accessToken: string | null;
   user: User | null;
}

export const useAuthStore = defineStore("auth", {
   state: (): AuthState => ({
      accessToken: localStorage.getItem("accessToken") || null,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
   }),
   actions: {
      setAccessToken(token: string | null) {
         this.accessToken = token;
         if (token) {
            localStorage.setItem("accessToken", token);
         } else {
            localStorage.removeItem("accessToken");
         }
      },
      clearAccessToken() {
         this.accessToken = null;
         localStorage.removeItem("accessToken");
      },
      setUser(userData: User) {
         this.user = userData;
         localStorage.setItem("user", JSON.stringify(userData));
      },
      clearUser() {
         this.user = null;
         localStorage.removeItem("user");
      },
   },
   getters: {
      isAuthenticated: (state) => !!state.accessToken,
      getUser: (state) => state.user,
   },
});
