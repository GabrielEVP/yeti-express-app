import { Delivery } from '@/views/deliveries/domain/';
import { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class LoadDeliveriesWithDebtUseCase {
  constructor(private readonly repository: IDeliveryRepository) {}

  async execute(): Promise<Delivery[]> {
    return await this.repository.loadWithDebt();
  }
}
