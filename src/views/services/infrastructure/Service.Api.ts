import { apiClient } from '@/services/';
import { serviceApiRoutes } from '@views/services/infrastructure/routes/Service.ApiRoutes';
import { ServiceApiAdapter } from '@/views/services/adapters';

export const ServiceApi = {
  async getAll(): Promise<ServiceApiAdapter[]> {
    const response = await apiClient.get(serviceApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<ServiceApiAdapter> {
    const response = await apiClient.get(serviceApiRoutes.details(id));
    return response.data;
  },

  async create(data: ServiceApiAdapter): Promise<ServiceApiAdapter> {
    const response = await apiClient.post(serviceApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: ServiceApiAdapter): Promise<ServiceApiAdapter> {
    const response = await apiClient.put(serviceApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(serviceApiRoutes.details(id));
  },

  async search(query: string): Promise<ServiceApiAdapter[]> {
    const response = await apiClient.get(serviceApiRoutes.search(query));
    return response.data;
  },
};
