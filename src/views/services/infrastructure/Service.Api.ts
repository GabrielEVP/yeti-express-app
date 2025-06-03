import { apiClient } from '@/services/';
import { serviceApiRoutes } from '@views/services/infrastructure/routes/Service.ApiRoutes';
import type { Service } from '@views/services/domain/service/Service';

export const ServiceApi = {
  async getAll(): Promise<Service[]> {
    const response = await apiClient.get(serviceApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<Service> {
    const response = await apiClient.get(serviceApiRoutes.details(id));
    return response.data;
  },

  async create(data: Service): Promise<Service> {
    const response = await apiClient.post(serviceApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: Service): Promise<Service> {
    const response = await apiClient.put(serviceApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(serviceApiRoutes.details(id));
  },

  async search(query: string): Promise<Service[]> {
    const response = await apiClient.get(serviceApiRoutes.search(query));
    return response.data;
  },
};
