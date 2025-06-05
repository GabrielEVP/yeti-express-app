import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class UpdateDebtUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(id: string, debt: Debt): Promise<Debt> {
    try {
      return await this.repository.update(id, debt);
    } catch (error) {
      console.error(`Error in UpdateDebtUseCase for id ${id}:`, error);
      throw error;
    }
  }
}