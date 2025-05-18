import { RouteRecordRaw } from "vue-router";
import { Form, List } from "@views/type-payments";

export const TypePaymentRouter: Array<RouteRecordRaw> = [
   {
      path: "/type-payments",
      name: "type-payments",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/type-payments/new",
      name: "TypePaymentNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/type-payments/edit/:id",
      name: "TypePaymentEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
];
