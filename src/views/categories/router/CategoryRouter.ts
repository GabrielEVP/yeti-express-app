import { RouteRecordRaw } from "vue-router";
import { Form, List } from "@/views/categories/";

export const CategoryRoutes: Array<RouteRecordRaw> = [
   {
      path: "/categories",
      name: "Categories",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/categories/new",
      name: "CategoryNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/categories/edit/:id",
      name: "CategoryEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
];
