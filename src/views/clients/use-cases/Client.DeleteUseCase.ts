import type { IClientRepository } from '@/views/clients/domain/IClientRepository';

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
