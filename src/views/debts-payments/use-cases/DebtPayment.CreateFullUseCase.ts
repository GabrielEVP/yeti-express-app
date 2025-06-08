import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class CreateFullDebtPaymentUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(payment: DebtPayment): Promise<DebtPayment> {
    return this.repository.createFull(payment);
  }
}
