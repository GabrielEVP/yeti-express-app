import { apiClient } from '@/services/';
import { deliveryApiRoutes } from '@/views/deliveries/infrastructure/routes/Delivery.ApiRoutes';
import type { Delivery } from '@/views/deliveries/domain/Delivery';

interface DeliveryFilterParams {
  search?: string;
  sortBy?: keyof Delivery;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export const DeliveryApi = {
  async getAll(): Promise<Delivery[]> {
    const response = await apiClient.get(deliveryApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<Delivery> {
    const response = await apiClient.get(deliveryApiRoutes.details(id));
    return response.data;
  },

  async create(data: Delivery): Promise<Delivery> {
    const response = await apiClient.post(deliveryApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: Delivery): Promise<Delivery> {
    const response = await apiClient.put(deliveryApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(deliveryApiRoutes.details(id));
  },

  async search(query: string): Promise<Delivery[]> {
    const response = await apiClient.get(deliveryApiRoutes.search(query));
    return response.data;
  },

  async getFilterAll(params: DeliveryFilterParams): Promise<{ data: Delivery[]; total: number }> {
    const response = await apiClient.get(deliveryApiRoutes.list, {
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

  async getTicketPDF(id: string): Promise<Blob> {
    const response = await apiClient.get(deliveryApiRoutes.ticket(id), {
      responseType: 'blob',
    });
    return response.data;
  },
};
