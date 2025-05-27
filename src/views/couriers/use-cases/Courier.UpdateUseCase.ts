import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';

export class UpdateCourierUseCase {
  private courierRepository: ICourierRepository;

  constructor(courierRepository: ICourierRepository) {
    this.courierRepository = courierRepository;
  }

  async execute(id: string, courier: Courier): Promise<Courier> {
    return await this.courierRepository.update(id, courier);
  }
}
