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
};

export const getAllClients = async (): Promise<ListClient[]> => {
  const response = await apiClient.get(clientApiRoutes.getAll);
  return response.data;
};

export const getClientById = async (id: string): Promise<any> => {
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
