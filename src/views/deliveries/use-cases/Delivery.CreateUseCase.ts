import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class CreateDeliveryUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(delivery: Delivery): Promise<Delivery> {
    return await this.deliveryRepo.create(delivery);
  }
}
