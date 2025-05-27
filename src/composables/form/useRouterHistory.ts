import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

const lastRoute = ref<RouteLocationNormalized | null>(null);

export function setupRouteHistory(router: any) {
   router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (from.name) {
         lastRoute.value = from;
      }
   });
}

export function useRouteHistory() {
   return {
      getLastRoute: () => lastRoute.value,
   };
}
