import { apiClient } from '@/services/';
import { adaptClient, adaptClientForApi, Client, ClientAddress } from '@/views/clients/';

export const clientApiRoutes = {
  getAll: '/clients',
  getById: (id: string | number) => `/clients/${id}`,
  create: '/clients',
  update: (id: string | number) => `/clients/${id}`,
  delete: (id: string | number) => `/clients/${id}`,
  edit: (id: string | number) => `/clients/edit/${id}`,
  search: (query: string) => `/clients/search/${query}`,
  filter: '/clients/filter',
  getDebtReport: (clientId: string | number) => `/clients/${clientId}/debts-report`,
  allGetDebtsReport: `/clients/debts-report`,
  allGetPendingPaidDebtsReport: `/clients/reports/unpaid-debts`,
  createAddress: (clientId: string | number) => `/clients/${clientId}/addresses`,
  getClientsWithDebts: '/clients/with-debts',
};

export const getAllClients = async (): Promise<Client[]> => {
  const response = await apiClient.get(clientApiRoutes.getAll);
  return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
};

export const getClientById = async (clientId: string): Promise<Client> => {
  const response = await apiClient.get(clientApiRoutes.getById(clientId));
  return adaptClient(response.data);
};

export const createClient = async (data: Client): Promise<Client> => {
  const payload = adaptClientForApi(data);
  const response = await apiClient.post(clientApiRoutes.create, payload);
  return adaptClient(response.data);
};

export const updateClient = async (data: Client, clientId: string): Promise<Client> => {
  const payload = adaptClientForApi(data);
  const response = await apiClient.put(clientApiRoutes.update(clientId), payload);
  return adaptClient(response.data);
};

export const deleteClientById = async (clientId: string): Promise<void> => {
  await apiClient.delete(clientApiRoutes.delete(clientId));
};

export const searchClients = async (query: string): Promise<Client[]> => {
  const response = await apiClient.get(clientApiRoutes.search(query));
  return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
};

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  perPage: number;
  total: number;
}

export const getFilteredClients = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<Client>> => {
  const response = await apiClient.get(clientApiRoutes.filter, { params });

  if (response.data.items && Array.isArray(response.data.items)) {
    return {
      items: response.data.items.map(adaptClient),
      currentPage: response.data.currentPage || 1,
      perPage: response.data.perPage || 15,
      total: response.data.total || 0
    };
  }

  const items = Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
  return {
    items,
    currentPage: params.page || 1,
    perPage: params.perPage || 15,
    total: items.length
  };
};

export const getClientDebtReport = async (clientId: string, startDate?: string, endDate?: string): Promise<any> => {
  const params: Record<string, string> = {};

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  }

  const response = await apiClient.get(clientApiRoutes.getDebtReport(clientId), {
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

export interface CreateAddressData {
  clientId: string;
  address: string;
}

export const createClientAddress = async (data: CreateAddressData): Promise<ClientAddress> => {
  const { clientId, ...addressData } = data;
  const response = await apiClient.post(clientApiRoutes.createAddress(clientId), addressData);
  return response.data;
};
