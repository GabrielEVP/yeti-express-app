import { IClientAggregateRepository } from '@/views/clients/';
import { ClientAddress } from '@/views/clients/';

export class GetClientAddressesUseCase {
  constructor(private repository: IClientAggregateRepository) {}

  execute(clientId: string): Promise<ClientAddress[]> {
    return this.repository.getAddresses(clientId);
  }
}
