import { apiClient } from '@/services/';
import { Client, ClientAddress, adaptClient, adaptClientForApi } from '@/views/clients/';

export const clientApiRoutes = {
  getAll: '/clients',
  getById: (id: string | number) => `/clients/${id}`,
  create: '/clients',
  update: (id: string | number) => `/clients/${id}`,
  delete: (id: string | number) => `/clients/${id}`,
  edit: (id: string | number) => `/clients/edit/${id}`,
  search: (query: string) => `/clients/search/${query}`,
  filter: '/clients/filter',
  getDebtReport: (clientId: string | number) => `/clients/${clientId}/debt-report`,
  createAddress: (clientId: string | number) => `/clients/${clientId}/addresses`,
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

export const getFilteredClients = async (params: Record<string, any>): Promise<Client[]> => {
  const response = await apiClient.get(clientApiRoutes.filter, { params });
  return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
};

export const getClientDebtReport = async (clientId: string): Promise<any> => {
  const response = await apiClient.get(clientApiRoutes.getDebtReport(clientId), { responseType: 'blob' });
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
