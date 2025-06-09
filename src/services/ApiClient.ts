import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/';
import router from '@/router/router';

export const apiClient = axios.create({
  baseURL: 'http://localhost:80/api',
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const { accessToken } = storeToRefs(authStore);

    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.user) {
      const authStore = useAuthStore();
      authStore.setUser(response.data.user);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.response.data?.message === 'Unauthenticated.') {
      const authStore = useAuthStore();
      authStore.clearAccessToken();
      authStore.clearUser();
      router.push('/');
    }
    return Promise.reject(error);
  }
);
