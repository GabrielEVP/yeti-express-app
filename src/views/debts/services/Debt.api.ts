import { apiClient } from '@/services/';
import { adaptClient, Client } from '@views/clients';
import { adaptDelivery, Delivery } from '@views/deliveries';

// Interface para la respuesta paginada de la API
interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

export const debtApiRoutes = {
  allAmountDebts: '/debts/all-amount-debts',
  clientsWithDebt: '/debts/clients/with-debt',
  clientStats: (clientId: string | number) => `/debts/clients/${clientId}/stats`,
  clientDeliveryWithDebtsFilter: (clientId: string | number) => `/debts/clients/${clientId}/delivery-with-debts-filter`,
};

export const allAmountDebts = async (): Promise<number> => {
  const response = await apiClient.get(debtApiRoutes.allAmountDebts);
  return response.data.total_amount;
};

export const getClientsWithDebt = async (): Promise<Client[]> => {
  const response = await apiClient.get(debtApiRoutes.clientsWithDebt);
  return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
};

export const getClientStats = async (clientId: string): Promise<any> => {
  const response = await apiClient.get(debtApiRoutes.clientStats(clientId));
  return response.data;
};

export const getClientDeliveryWithDebtsFilter = async (
  clientId: string,
  paymentStatus: string,
  page: number = 1,
  perPage: number = 15
): Promise<PaginatedResponse<Delivery>> => {
  const response = await apiClient.get(debtApiRoutes.clientDeliveryWithDebtsFilter(clientId), {
    params: {
      status: paymentStatus,
      client_id: clientId,
      page,
      per_page: perPage,
    },
  });

  return {
    data: Array.isArray(response.data.data) ? response.data.data.map(adaptDelivery) : [adaptDelivery(response.data.data)],
    current_page: response.data.current_page,
    per_page: response.data.per_page,
    total: response.data.total,
    last_page: response.data.last_page,
    from: response.data.from,
    to: response.data.to,
  };
};
