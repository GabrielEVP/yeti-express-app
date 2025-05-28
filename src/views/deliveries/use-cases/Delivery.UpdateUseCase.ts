import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class UpdateDeliveryUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(id: string, delivery: Delivery): Promise<Delivery> {
    if (!id) throw new Error('Delivery ID is required');
    return await this.deliveryRepo.update(id, delivery);
  }
}
