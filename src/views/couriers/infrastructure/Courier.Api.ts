import { apiClient } from '@/services/';
import { courierApiRoutes } from '@views/couriers/infrastructure/routes/Courier.ApiRoutes';
import { CourierApiAdapter } from '@/views/couriers/adapters';

export const CourierApi = {
  async getAll(): Promise<CourierApiAdapter[]> {
    const response = await apiClient.get(courierApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<CourierApiAdapter> {
    const response = await apiClient.get(courierApiRoutes.details(id));
    return response.data;
  },

  async create(data: CourierApiAdapter): Promise<CourierApiAdapter> {
    const response = await apiClient.post(courierApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: CourierApiAdapter): Promise<CourierApiAdapter> {
    const response = await apiClient.put(courierApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(courierApiRoutes.details(id));
  },

  async search(query: string): Promise<CourierApiAdapter[]> {
    const response = await apiClient.get(courierApiRoutes.search(query));
    return response.data;
  },
};
