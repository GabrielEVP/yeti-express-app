import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { CategoryRoutes } from "@views/categories";
import { ClientRouter } from "@/views/clients/router";
import HomeView from "@views/home/HomeView.vue";
import { InvoiceRouter } from "@/views/invoices";
import { OrderRouter } from "@/views/orders";
import { ProductRouter } from "@/views/products";
import { PurchaseRouter } from "@/views/purchases";
import { SupplierRouter } from "@/views/suppliers";
import { TypePaymentRouter } from "@views/type-payments";
import { TypePriceRouter } from "@/views/type-prices";
import { UserRouter } from "@/views/users/router/Router.User";
import LoginView from "@/views/LoginView.vue";

import { useAuthStore } from "@/stores/";
import { storeToRefs } from "pinia";
import { setupRouteHistory } from "@/composables/";

const routes: Array<RouteRecordRaw> = [
   {
      path: "/",
      name: "Login",
      component: LoginView,
   },
   {
      path: "/home",
      name: "Home",
      component: HomeView,
      meta: { requiresAuth: true },
   },
   ...CategoryRoutes,
   ...ClientRouter,
   ...InvoiceRouter,
   ...OrderRouter,
   ...ProductRouter,
   ...PurchaseRouter,
   ...SupplierRouter,
   ...TypePaymentRouter,
   ...TypePriceRouter,
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
      next({ path: "/" });
   } else {
      next();
   }
});

export default router;
