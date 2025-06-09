import { Delivery } from '@/views/deliveries/domain/';
import { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class LoadDeliveriesWithDebtByClientUseCase {
  constructor(private readonly repository: IDeliveryRepository) {}

  async execute(clientId: string): Promise<Delivery[]> {
    return await this.repository.loadWithDebtByClient(clientId);
  }
}
