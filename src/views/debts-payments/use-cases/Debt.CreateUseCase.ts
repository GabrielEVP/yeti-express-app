import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class CreateDebtUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(debt: Debt): Promise<Debt> {
    try {
      return await this.repository.create(debt);
    } catch (error) {
      console.error('Error in CreateDebtUseCase:', error);
      throw error;
    }
  }
}