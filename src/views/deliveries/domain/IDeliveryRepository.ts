import type { Delivery } from '@/views/deliveries/domain/Delivery';

export interface IDeliveryRepository {
  getAll(): Promise<Delivery[]>;
  getById(id: string): Promise<Delivery | null>;
  create(delivery: Delivery): Promise<Delivery>;
  update(id: string, delivery: Delivery): Promise<Delivery>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Delivery[]>;
  getFilterAll(params: {
    search?: string;
    sortBy?: keyof Delivery;
    sortDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
  }): Promise<{ data: Delivery[]; total: number }>;
  getTicketPDF(id: string): Promise<Blob>;
}
