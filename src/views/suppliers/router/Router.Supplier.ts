import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@views/suppliers/";

export const SupplierRouter: Array<RouteRecordRaw> = [
   {
      path: "/suppliers",
      name: "suppliers",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/suppliers/new",
      name: "SupplierNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/suppliers/edit/:id",
      name: "SupplierEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/suppliers/:id",
      name: "Supplier",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
