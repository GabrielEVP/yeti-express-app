import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';
import type { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryApi } from '@/views/deliveries/infrastructure/Delivery.Api';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters';
import { apiClient } from '@/services/';

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
    try {
      const { data } = await apiClient.get(this.baseUrl);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching all deliveries:', error);
      return [];
    }
  }

  async getPaymentPending(): Promise<Delivery[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/payment/pending`);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching pending payment deliveries:', error);
      return [];
    }
  }

  async getPartiallyPaid(): Promise<Delivery[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/payment/partially-paid`);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching partially paid deliveries:', error);
      return [];
    }
  }

  async getPaid(): Promise<Delivery[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/payment/paid`);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching paid deliveries:', error);
      return [];
    }
  }

  async getReceived(): Promise<Delivery[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/status/received`);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching received deliveries:', error);
      return [];
    }
  }

  async getInTransit(): Promise<Delivery[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/status/in-transit`);
      return data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null);
    } catch (error) {
      console.error('Error fetching in-transit deliveries:', error);
      return [];
    }
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
    const result = DeliveryApiAdapter.fromApi(response);
    if (!result) throw new Error('Failed to create delivery');
    return result;
  }

  async update(id: string, delivery: Delivery): Promise<Delivery> {
    const payload = DeliveryApiAdapter.toApi(delivery);
    const response = await DeliveryApi.update(id, payload);
    const result = DeliveryApiAdapter.fromApi(response);
    if (!result) throw new Error('Failed to update delivery');
    return result;
  }

  async delete(id: string): Promise<void> {
    await DeliveryApi.delete(id);
  }

  async search(query: string): Promise<Delivery[]> {
    const response = await DeliveryApi.search(query);
    return response
      .map(DeliveryApiAdapter.fromApi)
      .filter((d: Delivery | null): d is Delivery => d !== null);
  }

  async getFilterAll(params: DeliveryFilterParams): Promise<{ data: Delivery[]; total: number }> {
    const response = await DeliveryApi.getFilterAll(params);
    return {
      data: response.data
        .map(DeliveryApiAdapter.fromApi)
        .filter((d: Delivery | null): d is Delivery => d !== null),
      total: response.total,
    };
  }

  async getTicketPDF(id: string): Promise<Blob> {
    const pdfBlob = await DeliveryApi.getTicketPDF(id);
    return pdfBlob;
  }
}
