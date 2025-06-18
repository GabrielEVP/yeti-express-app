import { RouteRecordRaw } from 'vue-router';
import { List, Details } from '@/views/debts/pages';

export const DebtRouter: Array<RouteRecordRaw> = [
  {
    path: '/debts',
    name: 'debts',
    component: List,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/debts/details',
    name: 'debtsDetails',
    component: Details,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];
