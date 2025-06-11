import { RouteRecordRaw } from 'vue-router';
import { List } from '@/views/debts/presentation/pages';

export const DebtRouter: Array<RouteRecordRaw> = [
  {
    path: '/debts',
    name: 'debts',
    component: List,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];
