import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@/views/products/";

export const ProductRouter: Array<RouteRecordRaw> = [
   {
      path: "/products",
      name: "Products",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/products/new",
      name: "ProductNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/products/edit/:id",
      name: "ProductEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/products/:id",
      name: "Product",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
