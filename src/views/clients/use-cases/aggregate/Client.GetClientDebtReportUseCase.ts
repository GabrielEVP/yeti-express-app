import { IClientAggregateRepository } from '@/views/clients/';

export class GetClientDebtReportUseCase {
  constructor(private readonly clientRepository: IClientAggregateRepository) {}

  async execute(id: string): Promise<Blob> {
    return await this.clientRepository.getDebtReport(id);
  }
}
