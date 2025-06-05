import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class GetDebtsUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(): Promise<Debt[]> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      console.error('Error in GetDebtsUseCase:', error);
      return [];
    }
  }
}