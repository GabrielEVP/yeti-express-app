import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/clients/pages';

export const AppRoutesClient = {
  list: '/clients',
  new: '/clients/new',
  edit: (id: string | number) => `/clients/edit/${id}`,
  details: (id: string | number) => `/clients/${id}`,
};

export const ClientRouter: Array<RouteRecordRaw> = [
  {
    path: AppRoutesClient.list,
    name: 'Clients',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: AppRoutesClient.new,
    name: 'ClientNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/clients/edit/:id',
    name: 'ClientEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/clients/:id',
    name: 'Client',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
