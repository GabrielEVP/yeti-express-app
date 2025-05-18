import { RouteRecordRaw } from "vue-router";
import { Form, List } from "@/views/type-prices/";

export const TypePriceRouter: Array<RouteRecordRaw> = [
   {
      path: "/type-prices",
      name: "type-prices",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/type-prices/new",
      name: "TypePriceNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/type-prices/edit/:id",
      name: "TypePriceEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
];
