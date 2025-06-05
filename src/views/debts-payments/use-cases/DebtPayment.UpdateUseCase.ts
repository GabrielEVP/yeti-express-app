import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class UpdateDebtPaymentUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(id: string, payment: DebtPayment): Promise<DebtPayment> {
    return this.repository.update(id, payment);
  }
}
