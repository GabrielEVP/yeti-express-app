import { RouteRecordRaw } from "vue-router";
import { Details, Form, List } from "@/views/orders/";

export const OrderRouter: Array<RouteRecordRaw> = [
   {
      path: "/orders",
      name: "orders",
      component: List,
      meta: { requiresAuth: true },
   },
   {
      path: "/orders/new",
      name: "OrderNew",
      component: Form,
      meta: { requiresAuth: true },
   },
   {
      path: "/orders/new/:clientId",
      name: "OrderNewWithClient",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/orders/edit/:id",
      name: "OrderEdit",
      component: Form,
      meta: { requiresAuth: true },
      props: true,
   },
   {
      path: "/orders/:id",
      name: "Order",
      component: Details,
      meta: { requiresAuth: true },
      props: true,
   },
];
