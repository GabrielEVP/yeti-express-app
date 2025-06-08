import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';
import type { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryApi } from '@/views/deliveries/infrastructure/Delivery.Api';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters';
import { apiClient } from '@/services/';
import { DeliveryStatus } from '../domain';

interface DeliveryFilterParams {
  search?: string;
  sortBy?: keyof Delivery;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export class DeliveryRepositoryImpl implements IDeliveryRepository {
  private readonly baseUrl = '/deliveries';

  async getAll(): Promise<Delivery[]> {
    const response = await DeliveryApi.getAll();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getPaymentPending(): Promise<Delivery[]> {
    const response = await DeliveryApi.getPaymentPending();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getPartiallyPaid(): Promise<Delivery[]> {
    const response = await DeliveryApi.getPartiallyPaid();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getPaid(): Promise<Delivery[]> {
    const response = await DeliveryApi.getPaid();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getReceived(): Promise<Delivery[]> {
    const response = await DeliveryApi.getReceived();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getInTransit(): Promise<Delivery[]> {
    const response = await DeliveryApi.getInTransit();
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
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
    return DeliveryApiAdapter.fromApi(response)!;
  }

  async update(id: string, delivery: Delivery): Promise<Delivery> {
    const payload = DeliveryApiAdapter.toApi(delivery);
    const response = await DeliveryApi.update(id, payload);
    return DeliveryApiAdapter.fromApi(response)!;
  }

  async delete(id: string): Promise<void> {
    await DeliveryApi.delete(id);
  }

  async search(query: string): Promise<Delivery[]> {
    const response = await DeliveryApi.search(query);
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }

  async getFilterAll(params: DeliveryFilterParams): Promise<{ data: Delivery[]; total: number }> {
    const response = await DeliveryApi.getFilterAll(params);
    return {
      data: response.data
        .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
        .filter(Boolean),
      total: response.total,
    };
  }

  async getTicketPDF(id: string): Promise<Blob> {
    return await DeliveryApi.getTicketPDF(id);
  }

  async updateStatus(id: string, status: DeliveryStatus): Promise<Delivery[]> {
    const response = await DeliveryApi.updateStatus(id, status);
    return response
      .map((delivery: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(delivery)!)
      .filter(Boolean);
  }
}
