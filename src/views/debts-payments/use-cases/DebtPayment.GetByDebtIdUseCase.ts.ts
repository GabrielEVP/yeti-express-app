import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class GetDebtPaymentsByDebtIdUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(debtId: string): Promise<DebtPayment[]> {
    return this.repository.getByDebtId(debtId);
  }
}
