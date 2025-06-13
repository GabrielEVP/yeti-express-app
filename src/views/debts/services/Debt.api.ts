import { apiClient } from '@/services/';
import { Debt, adaptDebt, adaptDebtForApi } from '@views/debts/';

export const debtApiRoutes = {
  getAll: '/debts',
  getById: (id: string | number) => `/debts/${id}`,
  create: '/debts',
  update: (id: string | number) => `/debts/${id}`,
  delete: (id: string | number) => `/debts/${id}`,
  search: (query: string) => `/debts/search/${query}`,
};

export const getAllDebts = async (): Promise<Debt[]> => {
  const response = await apiClient.get(debtApiRoutes.getAll);
  return Array.isArray(response.data) ? response.data.map(adaptDebt) : [adaptDebt(response.data)];
};

export const getDebtById = async (debtId: string): Promise<Debt> => {
  const response = await apiClient.get(debtApiRoutes.getById(debtId));
  return adaptDebt(response.data);
};

export const createDebt = async (data: Debt): Promise<Debt> => {
  const payload = adaptDebtForApi(data);
  const response = await apiClient.post(debtApiRoutes.create, payload);
  return adaptDebt(response.data);
};

export const updateDebt = async (data: Debt, debtId: string): Promise<Debt> => {
  const payload = adaptDebtForApi(data);
  const response = await apiClient.put(debtApiRoutes.update(debtId), payload);
  return adaptDebt(response.data);
};

export const deleteDebtById = async (debtId: string): Promise<void> => {
  await apiClient.delete(debtApiRoutes.delete(debtId));
};

export const searchDebts = async (query: string): Promise<Debt[]> => {
  const response = await apiClient.get(debtApiRoutes.search(query));
  return Array.isArray(response.data) ? response.data.map(adaptDebt) : [adaptDebt(response.data)];
};
