import { IClientAggregateRepository } from '@/views/clients/';
import { ClientEmail } from '@/views/clients/';

export class GetClientEmailsUseCase {
  constructor(private repository: IClientAggregateRepository) {}

  execute(clientId: string): Promise<ClientEmail[]> {
    return this.repository.getEmails(clientId);
  }
}
