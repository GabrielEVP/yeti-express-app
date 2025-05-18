import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@/views/purchases/";

export const PurchaseRouter: Array<RouteRecordRaw> = [
   {
      path: "/purchases",
      name: "purchases",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/purchases/new",
      name: "purchaseNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/purchases/edit/:id",
      name: "purchaseEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/purchases/:id",
      name: "purchase",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
