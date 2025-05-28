import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class SearchDeliveriesUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(query: string): Promise<Delivery[]> {
    if (!query) throw new Error('Search query is required');
    return await this.deliveryRepo.search(query);
  }
}
