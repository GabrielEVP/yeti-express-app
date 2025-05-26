import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@views/home/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { ClientRouter } from '@/views/clients/router';
import { DeliveryRouter } from '@/views/deliveries';
import { EmployerRouter } from '@views/employees';
import { CourierRouter } from '@views/couriers';
import { ServiceRouter } from '@views/services';
import { UserRouter } from '@/views/users/router/Router.User';
import { useAuthStore } from '@/stores/';
import { storeToRefs } from 'pinia';
import { setupRouteHistory } from '@/composables/';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  ...ClientRouter,
  ...CourierRouter,
  ...EmployerRouter,
  ...DeliveryRouter,
  ...ServiceRouter,
  ...UserRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

setupRouteHistory(router);

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
