import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class GetDebtByIdUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(id: string): Promise<Debt | null> {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      console.error(`Error in GetDebtByIdUseCase for id ${id}:`, error);
      return null;
    }
  }
}