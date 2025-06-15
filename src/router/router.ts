import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@views/home/pages/HomeView.vue';
import LoginView from '@views/auth/pages/Login.Auth.vue';
import { ClientRouter } from '@/views/clients/';
import { DeliveryRouter } from '@/views/deliveries';
import { EmployeeRouter } from '@views/employees';
import { CourierRouter } from '@views/couriers';
import { ServiceRouter } from '@views/services';
import { CompanyBillRouter } from '@/views/company-bills/';
import { UserRouter } from '@/views/users/router/Router.User';
import { DebtRouter } from '@/views/debts/';
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
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  ...ClientRouter,
  ...CourierRouter,
  ...EmployeeRouter,
  ...DeliveryRouter,
  ...ServiceRouter,
  ...CompanyBillRouter,
  ...UserRouter,
  ...DebtRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

setupRouteHistory(router);

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated, isUser, isEmployee } = storeToRefs(authStore);

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: '/' });
    return;
  }

  if (to.meta.requiresAdmin && !isUser.value) {
    if (isEmployee.value) {
      next({ path: '/deliveries' });
      return;
    }
    next({ path: '/' });
    return;
  }

  next();
});

export default router;
