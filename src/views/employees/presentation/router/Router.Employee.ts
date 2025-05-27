import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@views/employees/presentation/pages';

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
    path: '/employees/:id',
    name: 'Employee',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
