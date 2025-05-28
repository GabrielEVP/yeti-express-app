import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/Client';

export class GetClientByIdUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string): Promise<Client | null> {
    return await this.clientRepository.getById(id);
  }
}
