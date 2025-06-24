import { apiClient } from '@/services/';
import { adaptClient, Client } from '@views/clients';
import { adaptDelivery, Delivery } from '@views/deliveries';

export const debtApiRoutes = {
  allAmountDebts: '/debts/all-amout-debts',
  clientsWithDebt: '/debts/clients/with-debt',
  clientStats: (clientId: string | number) => `/debts/clients/${clientId}/stats`,
  clientDeliveryWithDebts: (clientId: string | number) => `/debts/clients/${clientId}/delivery-with-debts`,
  clientDeliveryWithDebtsFilter: (clientId: string | number) => `/debts/clients/${clientId}/delivery-with-debts-filter`,
};

export const allAmountDebts = async (): Promise<number> => {
  const response = await apiClient.get(debtApiRoutes.allAmountDebts);
  return response.data;
};

export const getClientsWithDebt = async (): Promise<Client[]> => {
  const response = await apiClient.get(debtApiRoutes.clientsWithDebt);
  return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
};

export const getClientStats = async (clientId: string): Promise<any> => {
  const response = await apiClient.get(debtApiRoutes.clientStats(clientId));
  return response.data;
};

export const getClientDeliveryWithDebts = async (clientId: string): Promise<Delivery[]> => {
  const response = await apiClient.get(debtApiRoutes.clientDeliveryWithDebts(clientId));
  return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
};

export const getClientDeliveryWithDebtsFilter = async (clientId: string, paymentStatus: string): Promise<Delivery[]> => {
  const response = await apiClient.get(debtApiRoutes.clientDeliveryWithDebtsFilter(clientId), {
    params: { status: paymentStatus, client_id: clientId },
  });
  return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
};
