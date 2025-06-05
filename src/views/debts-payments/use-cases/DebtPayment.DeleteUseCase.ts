import type { IDebtPaymentRepository } from '@/views/debts-payments/domain/';

export class DeleteDebtPaymentUseCase {
  constructor(private readonly repository: IDebtPaymentRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
