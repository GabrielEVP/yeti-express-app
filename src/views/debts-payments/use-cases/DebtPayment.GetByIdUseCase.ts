import type { DebtPayment } from '@/views/debts-payments/domain';
import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class GetDebtPaymentByIdUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(id: string): Promise<DebtPayment | null> {
    return this.repository.getById(id);
  }
}
