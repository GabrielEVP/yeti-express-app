import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class GetAllDebtPaymentsUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(): Promise<DebtPayment[]> {
    return this.repository.getAll();
  }
}
