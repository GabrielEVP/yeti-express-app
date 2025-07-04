import { apiClient } from '@/services/';
import { Client } from '@views/clients';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@utils';

export const debtApiRoutes = {
  allAmountDebts: '/debts/all-amount-debts',
  clientsWithDebt: '/debts/clients/with-debt',
  clientStats: (clientId: string | number) => `/debts/clients/${clientId}/stats`,
  clientDeliveryWithDebtsFilter: `/debts/clients/delivery-with-debts-filter`,
};

export const allAmountDebts = async (): Promise<number> => {
  const response = await apiClient.get(debtApiRoutes.allAmountDebts);
  return response.data.total_amount;
};

export const getClientsWithDebt = async (): Promise<Client[]> => {
  const response = await apiClient.get(debtApiRoutes.clientsWithDebt);
  return response.data;
};

export const getClientStats = async (clientId: string): Promise<any> => {
  const response = await apiClient.get(debtApiRoutes.clientStats(clientId));
  return response.data;
};

export const getClientDeliveryWithDebtsFilter = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<unknown>> => {
  const response = await apiClient.get(debtApiRoutes.clientDeliveryWithDebtsFilter, { params });
  return handlePaginatedResponse(response, params);
};
