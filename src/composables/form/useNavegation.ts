import { Router } from "vue-router";
import { useRouteHistory } from "@/composables/";

export function redirectToLastOrDefault(router: Router, defaultPath: string, defaultQuery: Record<string, any> = {}, defaultHash: string = "") {
   const { getLastRoute } = useRouteHistory();
   const last = getLastRoute();

   const target = last
      ? {
           path: last.fullPath,
           query: last.query,
           hash: last.hash,
        }
      : {
           path: defaultPath,
           query: defaultQuery,
           hash: defaultHash,
        };

   router.push(target);
}
