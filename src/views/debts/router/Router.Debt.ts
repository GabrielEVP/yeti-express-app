import { RouteRecordRaw } from 'vue-router';
import { List } from '@/views/debts/pages';

export const DebtRouter: Array<RouteRecordRaw> = [
  {
    path: '/debts',
    name: 'debts',
    component: List,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];
