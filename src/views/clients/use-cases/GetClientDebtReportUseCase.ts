import type { IClientRepository } from '@/views/clients/domain/IClientRepository';

export class GetClientDebtReportUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: string): Promise<Blob> {
    return await this.clientRepository.getDebtReport(id);
  }
}
