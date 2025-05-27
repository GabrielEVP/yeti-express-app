import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';

export class DeleteCourierUseCase {
  constructor(private courierRepository: ICourierRepository) {}

  async execute(id: string): Promise<void> {
    await this.courierRepository.delete(id);
  }
}
