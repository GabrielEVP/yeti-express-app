import { RouteRecordRaw } from 'vue-router';
import { Form, List } from '@/views/company-bills/pages';

export const AppRoutesCompanyBill = {
  list: '/company-bills',
  new: '/company-bills/new',
  edit: (id: string | number) => `/company-bills/edit/${id}`,
};

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
];
