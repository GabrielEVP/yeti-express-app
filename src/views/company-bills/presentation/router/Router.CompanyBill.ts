import { RouteRecordRaw } from 'vue-router';
import { Details, Form, List } from '@/views/company-bills/presentation/pages';

export const CompanyBillRouter: Array<RouteRecordRaw> = [
  {
    path: '/company-bills',
    name: 'CompanyBills',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/company-bills/new',
    name: 'CompanyBillNew',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/company-bills/edit/:id',
    name: 'CompanyBillEdit',
    component: Form,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/company-bills/:id',
    name: 'CompanyBill',
    component: Details,
    meta: { requiresAuth: true },
    props: true,
  },
];
