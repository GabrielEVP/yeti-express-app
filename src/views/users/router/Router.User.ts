import { RouteRecordRaw } from 'vue-router';
import { Details, Form } from '@views/users/components/';

export const UserRouter: Array<RouteRecordRaw> = [
  {
    path: '/users/edit/',
    name: 'usersEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/users/',
    name: 'users',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
