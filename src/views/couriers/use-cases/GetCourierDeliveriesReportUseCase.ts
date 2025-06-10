import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';

export class GetCourierDeliveriesReportUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(id: string): Promise<Blob> {
    return await this.courierRepository.getDeliveriesReport(id);
  }
}
