import { RouteRecordRaw } from 'vue-router';
import { Form, List } from '@views/services/pages';

export const AppRoutesService = {
  list: '/services',
  new: '/services/new',
  edit: (id: string | number) => `/services/edit/${id}`,
};

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
];
