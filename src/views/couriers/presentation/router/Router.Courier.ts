import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/couriers/presentation/pages';

export const CourierRouter: Array<RouteRecordRaw> = [
  {
    path: '/couriers',
    name: 'Couriers',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/couriers/new',
    name: 'CourierNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/couriers/edit/:id',
    name: 'CourierEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/couriers/:id',
    name: 'Courier',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
