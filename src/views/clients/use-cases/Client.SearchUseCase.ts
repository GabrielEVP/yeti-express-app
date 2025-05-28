import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/Client';

export class SearchClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(query: string): Promise<Client[]> {
    if (!this.clientRepository.search) {
      throw new Error('Search method is not implemented in the repository');
    }
    return await this.clientRepository.search(query);
  }
}
