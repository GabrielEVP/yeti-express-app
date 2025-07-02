import { RouteRecordRaw } from 'vue-router';
import { Form, formPassword, List } from '@views/employees/pages';

export const AppRoutesEmployee = {
  list: '/employees',
  new: '/employees/new',
  edit: (id: string | number) => `/employees/edit/${id}`,
  editPassword: (id: string | number) => `/employees/edit/password/${id}`,
};

export const EmployeeRouter: Array<RouteRecordRaw> = [
  {
    path: '/employees',
    name: 'Employees',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/new',
    name: 'EmployeeNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/employees/edit/:id',
    name: 'EmployeeEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/employees/edit/password/:id',
    name: 'EmployeeEditPassword',
    component: formPassword,
    meta: { requiresAuth: true },
    props: true,
  },
];
