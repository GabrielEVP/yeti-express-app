import { Delivery } from '@/views/deliveries/domain/Delivery';
import { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';
import { DeliveryStatus } from '@/views/deliveries/domain/enum';

export class UpdateDeliveryStatusUseCase {
  constructor(private readonly repository: IDeliveryRepository) {}

  async execute(id: string, status: DeliveryStatus): Promise<Delivery> {
    return await this.repository.updateStatus(id, status);
  }
}
