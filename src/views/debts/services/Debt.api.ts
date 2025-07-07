import { apiClient } from '@/services/';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@utils';
import { ClientDebt, ClientStats } from '@views/debts/models';
import { Delivery } from '@views/deliveries';

const base = '/debts';

export const debtApiRoutes = {
  allAmountDebts: `${base}/all-amount-debts`,
  clientsWithDebt: `${base}/clients-with-debt`,
  clientStats: (clientId: string | number) => `${base}/${clientId}/stats`,
  clientDeliveryWithDebtsFilter: `${base}/delivery-with-debts-filter`,
  getDebtReport: (id: string | number) => `${base}/${id}/debts-report`,
  allGetDebtsReport: `${base}/debts-report`,
  allGetPendingPaidDebtsReport: `${base}/un-paid-debts-report`,
};

export const allAmountDebts = async (): Promise<number> => {
  const response = await apiClient.get(debtApiRoutes.allAmountDebts);
  return response.data.total_amount;
};

export const getClientsWithDebt = async (): Promise<ClientDebt[]> => {
  const response = await apiClient.get(debtApiRoutes.clientsWithDebt);
  return response.data;
};

export const getClientStats = async (clientId: string): Promise<ClientStats> => {
  const response = await apiClient.get(debtApiRoutes.clientStats(clientId));
  return response.data;
};

export const getClientDeliveryWithDebtsFilter = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<Delivery>> => {
  const response = await apiClient.get(debtApiRoutes.clientDeliveryWithDebtsFilter, { params: params });
  return handlePaginatedResponse(response, params);
};

export const getClientDebtReport = async (id: string, startDate?: string, endDate?: string): Promise<any> => {
  const params: Record<string, string> = {};

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }

  const response = await apiClient.get(debtApiRoutes.getDebtReport(id), {
    params,
    responseType: 'blob',
  });
  return response.data;
};

export const allGetPendingPaidDebtsReport = async (): Promise<any> => {
  const response = await apiClient.get(debtApiRoutes.allGetPendingPaidDebtsReport, { responseType: 'blob' });
  return response.data;
};

export const allGetClientsDebtReport = async (startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get(debtApiRoutes.allGetDebtsReport, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};
