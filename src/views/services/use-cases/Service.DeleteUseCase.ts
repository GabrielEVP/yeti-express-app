import type { IServiceRepository } from '@/views/services/domain/IServiceRepository';

export class DeleteServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
