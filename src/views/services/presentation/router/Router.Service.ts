import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/services/presentation/pages';

export const ServiceRouter: Array<RouteRecordRaw> = [
  {
    path: '/services',
    name: 'Services',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/services/new',
    name: 'ServiceNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/services/edit/:id',
    name: 'ServiceEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/services/:id',
    name: 'Service',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
