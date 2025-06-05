import type { Debt } from '@/views/debts/domain/';
import type { DebtStatus } from '@/views/debts/domain/enum/DebtStatus';

export interface IDebtRepository {
  getAll(): Promise<Debt[]>;
  getById(id: string): Promise<Debt | null>;
  getByStatus(status: DebtStatus): Promise<Debt[]>;
  create(debt: Debt): Promise<Debt>;
  update(id: string, debt: Debt): Promise<Debt>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Debt[]>;
}
