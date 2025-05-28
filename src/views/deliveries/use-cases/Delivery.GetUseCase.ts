import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class GetAllDeliveriesUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(): Promise<Delivery[]> {
    return await this.deliveryRepo.getAll();
  }
}
