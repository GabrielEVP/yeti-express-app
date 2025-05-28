import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class DeleteDeliveryUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new Error('Delivery ID is required');
    await this.deliveryRepo.delete(id);
  }
}
