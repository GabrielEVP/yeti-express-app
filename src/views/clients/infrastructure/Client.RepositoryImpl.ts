import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/Client';
import { ClientApi } from '@views/clients/infrastructure/Client.Api';
import { adaptClient, adaptClientForApi } from '@/views/clients/adapters';

interface ClientFilterParams {
  search?: string;
  sortBy?: keyof Client;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}

export class ClientRepositoryImpl implements IClientRepository {
  async getAll(): Promise<Client[]> {
    const response = await ClientApi.getAll();
    return response.map(adaptClient);
  }

  async getById(id: string): Promise<Client | null> {
    try {
      const response = await ClientApi.getById(id);
      return adaptClient(response);
    } catch (error) {
      return null;
    }
  }

  async create(client: Client): Promise<Client> {
    const payload = adaptClientForApi(client);
    const response = await ClientApi.create(payload);
    return adaptClient(response);
  }

  async update(id: string, client: Client): Promise<Client> {
    const payload = adaptClientForApi(client);
    const response = await ClientApi.update(id, payload);
    return adaptClient(response);
  }

  async delete(id: string): Promise<void> {
    await ClientApi.delete(id);
  }

  async search(query: string): Promise<Client[]> {
    const response = await ClientApi.search(query);
    return response.map(adaptClient);
  }

  async getFilterAll(params: ClientFilterParams): Promise<{ data: Client[]; total: number }> {
    const response = await ClientApi.getFilterAll(params);
    return {
      data: response.data.map(adaptClient),
      total: response.total,
    };
  }
}
