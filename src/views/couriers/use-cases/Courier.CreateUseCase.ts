import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';

export class CreateCourierUseCase {
  private courierRepository: ICourierRepository;

  constructor(courierRepository: ICourierRepository) {
    this.courierRepository = courierRepository;
  }

  async execute(courier: Courier): Promise<Courier> {
    return await this.courierRepository.create(courier);
  }
}
