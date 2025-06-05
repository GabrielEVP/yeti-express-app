import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/';

export class CreateClientUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(client: Client): Promise<Client> {
    return await this.clientRepository.create(client);
  }
}
