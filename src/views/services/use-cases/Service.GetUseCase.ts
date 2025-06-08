import type { IServiceRepository } from '@/views/services/domain/IServiceRepository';
import type { Service } from '@views/services/domain/service/Service';

export class GetServicesUseCase {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(): Promise<Service[]> {
    return await this.serviceRepository.getAll();
  }
}
