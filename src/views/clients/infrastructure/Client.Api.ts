import { apiClient } from '@/services/';
import { clientApiRoutes } from '@views/clients/infrastructure/routes/Client.ApiRoutes';
import type { Client } from '@/views/clients/domain/';

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
    try {
      const response = await apiClient.get(clientApiRoutes.list);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async getById(id: string): Promise<Client> {
    try {
      const response = await apiClient.get(clientApiRoutes.details(id));
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async create(data: Client): Promise<Client> {
    try {
      const response = await apiClient.post(clientApiRoutes.list, data);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async update(id: string, data: Client): Promise<Client> {
    try {
      const response = await apiClient.put(clientApiRoutes.details(id), data);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(clientApiRoutes.details(id));
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async search(query: string): Promise<Client[]> {
    try {
      const response = await apiClient.get(clientApiRoutes.search(query));
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async getFilterAll(params: ClientFilterParams): Promise<{ data: Client[]; total: number }> {
    try {
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
    } catch (error) {
      throw this.extractError(error);
    }
  },

  extractError(error: any): Error {
    if (error.response && error.response.data && error.response.data.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message || 'Error desconocido');
  },
};
