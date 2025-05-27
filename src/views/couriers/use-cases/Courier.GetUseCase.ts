import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';

export class GetCouriersUseCase {
  private courierRepository: ICourierRepository;

  constructor(courierRepository: ICourierRepository) {
    this.courierRepository = courierRepository;
  }

  async execute(): Promise<Courier[]> {
    return await this.courierRepository.getAll();
  }
}
