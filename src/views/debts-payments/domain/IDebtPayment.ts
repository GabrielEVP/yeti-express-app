import type { DebtPayment } from '@/views/debts/domain';
import type { PaymentMethod } from '@/views/debts/domain';

export interface IDebtPaymentRepository {
  getAll(): Promise<DebtPayment[]>;
  getById(id: string): Promise<DebtPayment | null>;
  getByDebtId(debtId: string): Promise<DebtPayment[]>;
  getByMethod(method: PaymentMethod): Promise<DebtPayment[]>;
  create(payment: DebtPayment): Promise<DebtPayment>;
  update(id: string, payment: DebtPayment): Promise<DebtPayment>;
  delete(id: string): Promise<void>;
}
