import { Debt, DebtPayment } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class AddDebtPaymentUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(debtId: string, payment: DebtPayment): Promise<Debt> {
    try {
      return await this.repository.addPayment(debtId, payment);
    } catch (error) {
      console.error(`Error in AddDebtPaymentUseCase for debtId ${debtId}:`, error);
      throw error;
    }
  }
}