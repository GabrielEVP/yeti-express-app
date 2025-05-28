import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/Client';

export class UpdateClientUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(id: string, client: Client): Promise<Client> {
    return await this.clientRepository.update(id, client);
  }
}
