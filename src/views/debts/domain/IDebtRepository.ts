import type { Debt } from '@/views/debts/domain/';
import type { DebtStatus } from '@/views/debts/domain/enum/DebtStatus';

export interface IDebtRepository {
  getAll(): Promise<Debt[]>;
  getById(id: string): Promise<Debt | null>;
  getByStatus(status: DebtStatus): Promise<Debt[]>;
  StatusUpdate(id: string, debt: Debt): Promise<Debt>;
  create(debt: Debt): Promise<Debt>;
  update(id: string, debt: Debt): Promise<Debt>;
}
