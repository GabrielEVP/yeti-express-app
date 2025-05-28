import type { Delivery } from '@/views/deliveries/domain/Delivery';
import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class GetDeliveryByIdUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(id: string): Promise<Delivery | null> {
    if (!id) throw new Error('Delivery ID is required');
    return await this.deliveryRepo.getById(id);
  }
}
