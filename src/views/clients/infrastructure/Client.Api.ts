import { apiClient } from '@/services/';
import { clientApiRoutes } from '@views/clients/infrastructure/routes/Client.ApiRoutes';
import type { Client } from '@/views/clients/domain/Client';

interface ClientFilterParams {
  search?: string;
  sortBy?: keyof Client;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export const ClientApi = {
  async getAll(): Promise<Client[]> {
    const response = await apiClient.get(clientApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<Client> {
    const response = await apiClient.get(clientApiRoutes.details(id));
    return response.data;
  },

  async create(data: Client): Promise<Client> {
    const response = await apiClient.post(clientApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: Client): Promise<Client> {
    const response = await apiClient.put(clientApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(clientApiRoutes.details(id));
  },

  async search(query: string): Promise<Client[]> {
    const response = await apiClient.get(clientApiRoutes.search(query));
    return response.data;
  },

  async getFilterAll(params: ClientFilterParams): Promise<{ data: Client[]; total: number }> {
    const response = await apiClient.get(clientApiRoutes.list, {
      params: {
        search: params.search,
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
        page: params.page,
        perPage: params.perPage,
        ...params.filters,
      },
    });
    return response.data;
  },
};
