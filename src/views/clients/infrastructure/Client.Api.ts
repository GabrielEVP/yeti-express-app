import { apiClient } from '@/services/';
import { Client } from '@/views/clients/';
import { ClientApiAdapter } from '@/views/clients/';

interface ClientFilterParams {
  search?: string;
  sortBy?: keyof Client;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

const clientApiRoutes = {
  getAll: '/clients',
  getById: (clientId: string) => `/clients/${clientId}`,
  create: '/clients',
  update: (clientId: string) => `/clients/${clientId}`,
  delete: (clientId: string) => `/clients/${clientId}`,
  search: (search: string) => `/clients/search/${search}`,
  getFilterAll: '/clients/filter',
};

export const ClientApi = {
  async getAll(): Promise<ClientApiAdapter[]> {
    try {
      const response = await apiClient.get(clientApiRoutes.getAll);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async getById(id: string): Promise<ClientApiAdapter> {
    try {
      const response = await apiClient.get(clientApiRoutes.getById(id));
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async create(data: ClientApiAdapter): Promise<ClientApiAdapter> {
    try {
      const response = await apiClient.post(clientApiRoutes.create, data);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async update(id: string, data: ClientApiAdapter): Promise<ClientApiAdapter> {
    try {
      const response = await apiClient.put(clientApiRoutes.update(id), data);
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(clientApiRoutes.delete(id));
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async search(query: string): Promise<ClientApiAdapter[]> {
    try {
      const response = await apiClient.get(clientApiRoutes.search(query));
      return response.data;
    } catch (error) {
      throw this.extractError(error);
    }
  },

  async getFilterAll(params: ClientFilterParams): Promise<{ data: ClientApiAdapter[]; total: number }> {
    try {
      const response = await apiClient.get(clientApiRoutes.getFilterAll, {
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
