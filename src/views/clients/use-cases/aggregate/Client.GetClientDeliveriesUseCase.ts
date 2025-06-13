import { IClientAggregateRepository } from '@/views/clients/';

export class GetClientDeliveriesUseCase {
  constructor(private readonly clientRepository: IClientAggregateRepository) {}

  async getTotalInvoiced(clientId: string): Promise<number> {
    return await this.clientRepository.getTotalInvoiced(clientId);
  }

  async getEarningsDelivery(clientId: string): Promise<number> {
    return await this.clientRepository.getEarningsDelivery(clientId);
  }

  async getPendingEarnings(clientId: string): Promise<number> {
    return await this.clientRepository.getPendingEarnings(clientId);
  }

  async getPendingEarningsCount(clientId: string): Promise<number> {
    return await this.clientRepository.getPendingEarningsCount(clientId);
  }

  async getEarningsDeliveryOfCurrentMonth(clientId: string): Promise<number> {
    return await this.clientRepository.getEarningsDeliveryOfCurrentMonth(clientId);
  }
}
