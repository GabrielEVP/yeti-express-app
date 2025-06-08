import type { IServiceRepository } from '@/views/services/domain/IServiceRepository';
import type { Service } from '@views/services/domain/service/Service';

export class SearchServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(query: string): Promise<Service[]> {
    if (!this.serviceRepository.search) {
      throw new Error('Search method is not implemented in the repository');
    }
    return await this.serviceRepository.search(query);
  }
}
