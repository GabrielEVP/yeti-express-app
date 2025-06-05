import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/clients/presentation/pages';
<<<<<<< HEAD
=======

>>>>>>> 3b3e9a1 (Remove client delivery debt functionality)
export const ClientRouter: Array<RouteRecordRaw> = [
  {
    path: '/clients',
    name: 'Clients',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/clients/new',
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
