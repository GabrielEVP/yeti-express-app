import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/';

interface GetClientsByFilterParams {
  search?: string;
  sortBy?: keyof Client;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export class GetClientsByFilterUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(params: GetClientsByFilterParams): Promise<{
    data: Client[];
    total: number;
  }> {
    return await this.clientRepository.getFilterAll(params);
  }
}
