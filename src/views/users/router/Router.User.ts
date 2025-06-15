import { RouteRecordRaw } from 'vue-router';
import { Form, FormPassword } from '@views/users/';

export const UserRouter: Array<RouteRecordRaw> = [
  {
    path: '/users/edit/',
    name: 'usersEdit',
    component: Form,
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
