import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/Client';

export class GetClientsUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(): Promise<Client[]> {
    return await this.clientRepository.getAll();
  }
}
