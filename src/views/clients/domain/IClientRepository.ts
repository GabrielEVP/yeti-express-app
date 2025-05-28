import type { Client } from '@/views/clients/domain/Client';

export interface IClientRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  create(client: Client): Promise<Client>;
  update(id: string, client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Client[]>;
  getFilterAll(params: {
    search?: string;
    sortBy?: keyof Client;
    sortDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
  }): Promise<{ data: Client[]; total: number }>;
}
