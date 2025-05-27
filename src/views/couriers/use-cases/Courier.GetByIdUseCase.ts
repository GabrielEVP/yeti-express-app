import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';

export class GetCourierByIdUseCase {
  constructor(private courierRepository: ICourierRepository) {}

  async execute(id: string): Promise<Courier | null> {
    return await this.courierRepository.getById(id);
  }
}
