import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/deliveries/presentation/pages/';

export const DeliveryRouter: Array<RouteRecordRaw> = [
  {
    path: '/deliveries',
    name: 'Deliverys',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/deliveries/new',
    name: 'DeliveryNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/deliveries/new/:clientId',
    name: 'DeliveryNewWithClient',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/deliveries/edit/:id',
    name: 'DeliveryEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/deliveries/:id',
    name: 'Delivery',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
