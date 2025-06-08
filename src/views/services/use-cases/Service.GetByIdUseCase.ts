import type { IServiceRepository } from '@/views/services/domain/IServiceRepository';
import type { Service } from '@views/services/domain/service/Service';

export class GetServiceByIdUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<Service | null> {
    return await this.serviceRepository.getById(id);
  }
}
