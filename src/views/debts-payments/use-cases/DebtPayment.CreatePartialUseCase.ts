import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class CreatePartialDebtPaymentUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(payment: DebtPayment): Promise<DebtPayment> {
    return this.repository.createPartial(payment);
  }
}
