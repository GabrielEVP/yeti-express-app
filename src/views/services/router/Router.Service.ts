import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@/views/services/';

export const ServiceRouter: Array<RouteRecordRaw> = [
  {
    path: '/services',
    name: 'Service',
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
    name: 'ServiceDetails',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
