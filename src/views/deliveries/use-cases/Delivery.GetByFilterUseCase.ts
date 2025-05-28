import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class GetFilteredDeliveriesUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(params: {
    search?: string;
    sortBy?: keyof Delivery;
    sortDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
  }): Promise<{ data: Delivery[]; total: number }> {
    return await this.deliveryRepo.getFilterAll(params);
  }
}
