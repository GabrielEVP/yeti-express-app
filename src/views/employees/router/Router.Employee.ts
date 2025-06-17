import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List, formPassword } from '@views/employees/pages';

export const AppRoutesEmployee = {
  list: '/employees',
  new: '/employees/new',
  edit: (id: string | number) => `/employees/edit/${id}`,
  details: (id: string | number) => `/employees/${id}`,
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
  {
    path: '/employees/:id',
    name: 'Employee',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
