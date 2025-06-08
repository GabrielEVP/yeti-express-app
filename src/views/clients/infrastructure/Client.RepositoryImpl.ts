import type { IClientRepository } from '@/views/clients/domain/IClientRepository';
import type { Client } from '@/views/clients/domain/';
import { ClientApi } from '@views/clients/infrastructure/Client.Api';
import { ClientApiAdapter } from '@/views/clients/adapters';

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
    return response.map((client) => ClientApiAdapter.fromApi(client)!).filter(Boolean);
  }

  async getById(id: string): Promise<Client | null> {
    try {
      const response = await ClientApi.getById(id);
      return ClientApiAdapter.fromApi(response);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async create(client: Client): Promise<Client> {
    const payload = ClientApiAdapter.toApi(client);
    const response = await ClientApi.create(payload);
    return ClientApiAdapter.fromApi(response)!;
  }

  async update(id: string, client: Client): Promise<Client> {
    const payload = ClientApiAdapter.toApi(client);
    const response = await ClientApi.update(id, payload);
    return ClientApiAdapter.fromApi(response)!;
  }

  async delete(id: string): Promise<void> {
    await ClientApi.delete(id);
  }

  async search(query: string): Promise<Client[]> {
    const response = await ClientApi.search(query);
    return response.map((client) => ClientApiAdapter.fromApi(client)!).filter(Boolean);
  }

  async getFilterAll(params: ClientFilterParams): Promise<{ data: Client[]; total: number }> {
    const response = await ClientApi.getFilterAll(params);
    return {
      data: response.data.map((client) => ClientApiAdapter.fromApi(client)!).filter(Boolean),
      total: response.total,
    };
  }
}
