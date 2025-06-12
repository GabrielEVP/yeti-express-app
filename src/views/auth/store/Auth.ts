import { defineStore } from 'pinia';
import { User } from '@/views/users/';
import { Employee } from '@/views/employees/';

type AuthUser = User | Employee;

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  type: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    type: localStorage.getItem('type') ? JSON.parse(localStorage.getItem('type')!) : null,
  }),
  actions: {
    setAccessToken(token: string | null) {
      this.accessToken = token;
      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
    },
    clearAccessToken() {
      this.accessToken = null;
      localStorage.removeItem('accessToken');
    },
    setUser(userData: AuthUser, type: string) {
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      this.type = type;
      localStorage.setItem('type', JSON.stringify(type));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('type');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isUser: (state) => state.type == 'user',
    isEmployee: (state) => state.type == 'employee',
  },
});
