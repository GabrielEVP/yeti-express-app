import type { DebtPayment } from '@/views/debts-payments/domain';
import type { PaymentMethod } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class GetDebtPaymentsByMethodUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(method: PaymentMethod): Promise<DebtPayment[]> {
    return this.repository.getByMethod(method);
  }
}
