import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';

export class SearchCouriersUseCase {
  constructor(private courierRepository: ICourierRepository) {}

  async execute(query: string): Promise<Courier[]> {
    if (!this.courierRepository.search) {
      throw new Error('Search method is not implemented in the repository');
    }
    return await this.courierRepository.search(query);
  }
}
