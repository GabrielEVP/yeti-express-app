import type { Service } from './Service';

export interface IServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
  create(service: Service): Promise<Service>;
  update(id: string, service: Service): Promise<Service>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Service[]>;
}
