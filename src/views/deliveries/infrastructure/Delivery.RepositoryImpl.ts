import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';
import type { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryApi } from '@/views/deliveries/infrastructure/Delivery.Api';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters';

interface DeliveryFilterParams {
  search?: string;
  sortBy?: keyof Delivery;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export class DeliveryRepositoryImpl implements IDeliveryRepository {
  async getAll(): Promise<Delivery[]> {
    const response = await DeliveryApi.getAll();
    return response.map(DeliveryApiAdapter.fromApi);
  }

  async getById(id: string): Promise<Delivery | null> {
    try {
      const response = await DeliveryApi.getById(id);
      return DeliveryApiAdapter.fromApi(response);
    } catch (error) {
      return null;
    }
  }

  async create(delivery: Delivery): Promise<Delivery> {
    const payload = DeliveryApiAdapter.toApi(delivery);
    const response = await DeliveryApi.create(payload);
    return DeliveryApiAdapter.fromApi(response);
  }

  async update(id: string, delivery: Delivery): Promise<Delivery> {
    const payload = DeliveryApiAdapter.toApi(delivery);
    const response = await DeliveryApi.update(id, payload);
    return DeliveryApiAdapter.fromApi(response);
  }

  async delete(id: string): Promise<void> {
    await DeliveryApi.delete(id);
  }

  async search(query: string): Promise<Delivery[]> {
    const response = await DeliveryApi.search(query);
    return response.map(DeliveryApiAdapter.fromApi);
  }

  async getFilterAll(params: DeliveryFilterParams): Promise<{ data: Delivery[]; total: number }> {
    const response = await DeliveryApi.getFilterAll(params);
    return {
      data: response.data.map(DeliveryApiAdapter.fromApi),
      total: response.total,
    };
  }

  async getTicketPDF(id: string): Promise<Blob> {
    const pdfBlob = await DeliveryApi.getTicketPDF(id);
    return pdfBlob;
  }
}
