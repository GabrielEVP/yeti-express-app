import { IClientAggregateRepository } from '@/views/clients/';
import { ClientPhone } from '@/views/clients/';

export class GetClientPhonesUseCase {
  constructor(private repository: IClientAggregateRepository) {}

  execute(clientId: string): Promise<ClientPhone[]> {
    return this.repository.getPhones(clientId);
  }
}
