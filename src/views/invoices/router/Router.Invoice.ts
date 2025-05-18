import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@/views/invoices/";

export const InvoiceRouter: Array<RouteRecordRaw> = [
   {
      path: "/invoices",
      name: "Invoices",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/invoices/new",
      name: "InvoiceNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/invoices/new/:clientId",
      name: "InvoiceNewWithClient",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/invoices/edit/:id",
      name: "InvoiceEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/invoices/:id",
      name: "Invoice",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
