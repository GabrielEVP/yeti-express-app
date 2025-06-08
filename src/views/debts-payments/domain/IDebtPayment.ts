import type { DebtPayment } from '@/views/debts-payments/domain';

export interface IDebtPaymentRepository {
  getAll(): Promise<DebtPayment[]>;
  getById(id: string): Promise<DebtPayment | null>;
  createFull(payment: DebtPayment): Promise<DebtPayment>;
  createPartial(payment: DebtPayment): Promise<DebtPayment>;
}
