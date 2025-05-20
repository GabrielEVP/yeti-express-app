import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@/views/employees";

export const EmployerRouter: Array<RouteRecordRaw> = [
   {
      path: "/employees",
      name: "Employers",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/employees/new",
      name: "EmployerNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/employees/edit/:id",
      name: "EmployerEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/employees/:id",
      name: "Employer",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
