import { RouteRecordRaw } from 'vue-router';
import { Details, Form, FormPassword } from '@views/users/components/';

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
  {
    path: '/users/changePassword/',
    name: 'usersChangePassword',
    component: FormPassword,
    meta: { requiresAuth: true },
    props: true,
  },
];
