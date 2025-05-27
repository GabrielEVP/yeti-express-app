import { apiClient } from '@/services/';
import { courierApiRoutes } from '@views/couriers/infrastructure/routes/Courier.ApiRoutes';
import type { Courier } from '@/views/couriers/domain/Courier';

export const CourierApi = {
  async getAll(): Promise<Courier[]> {
    const response = await apiClient.get(courierApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<Courier> {
    const response = await apiClient.get(courierApiRoutes.details(id));
    return response.data;
  },

  async create(data: Courier): Promise<Courier> {
    const response = await apiClient.post(courierApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: Courier): Promise<Courier> {
    const response = await apiClient.put(courierApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(courierApiRoutes.details(id));
  },

  async search(query: string): Promise<Courier[]> {
    const response = await apiClient.get(courierApiRoutes.search(query));
    return response.data;
  },
};
