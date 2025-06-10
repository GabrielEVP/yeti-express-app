import type { Courier } from './Courier';

export interface ICourierRepository {
  getAll(): Promise<Courier[]>;
  getById(id: string): Promise<Courier | null>;
  create(courier: Courier): Promise<Courier>;
  update(id: string, courier: Courier): Promise<Courier>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Courier[]>;
  getDeliveriesReport(id: string): Promise<Blob>;
}
