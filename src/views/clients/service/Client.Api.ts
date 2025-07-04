import { apiClient } from '@/services/';
import { DetailClient, FormClient, ListClient } from '@/views/clients/models';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@/utils/';

const base = '/clients';

export const clientApiRoutes = {
  getAll: base,
  getById: (id: string | number) => `${base}/${id}`,
  create: base,
  update: (id: string | number) => `${base}/${id}`,
  delete: (id: string | number) => `${base}/${id}`,
  edit: (id: string | number) => `${base}/edit/${id}`,
  search: (query: string) => `${base}/search/${query}`,
  filter: `${base}/filter`,
  getDebtReport: (id: string | number) => `${base}/${id}/debts-report`,
  allGetDebtsReport: `${base}/debts-report`,
  allGetPendingPaidDebtsReport: `${base}/reports/unpaid-debts`,
  getClientsWithDebts: `${base}/with-debts`,
};

export const getAllClients = async (): Promise<ListClient[]> => {
  const response = await apiClient.get(clientApiRoutes.getAll);
  return response.data;
};

export const getClientById = async (id: string): Promise<DetailClient> => {
  const response = await apiClient.get(clientApiRoutes.getById(id));
  return response.data;
};

export const createClient = async (client: FormClient): Promise<DetailClient> => {
  const response = await apiClient.post(clientApiRoutes.create, client);
  return response.data;
};

export const updateClient = async (client: FormClient, id: string): Promise<DetailClient> => {
  const response = await apiClient.put(clientApiRoutes.update(id), client);
  return response.data;
};

export const deleteClientById = async (id: string): Promise<void> => {
  await apiClient.delete(clientApiRoutes.delete(id));
};

export const getFilteredClients = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListClient>> => {
  const response = await apiClient.get(clientApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};

export const getClientDebtReport = async (id: string, startDate?: string, endDate?: string): Promise<any> => {
  const params: Record<string, string> = {};

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }

  const response = await apiClient.get(clientApiRoutes.getDebtReport(id), {
    params,
    responseType: 'blob',
  });
  return response.data;
};

export const allGetPendingPaidDebtsReport = async (): Promise<any> => {
  const response = await apiClient.get(clientApiRoutes.allGetPendingPaidDebtsReport, { responseType: 'blob' });
  return response.data;
};

export const allGetClientsDebtReport = async (startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get(clientApiRoutes.allGetDebtsReport, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};
