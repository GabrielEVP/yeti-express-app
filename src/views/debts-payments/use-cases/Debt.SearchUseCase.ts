import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class SearchDebtsUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(query: string): Promise<Debt[]> {
    try {
      return await this.repository.search(query);
    } catch (error) {
      console.error(`Error in SearchDebtsUseCase with query "${query}":`, error);
      return [];
    }
  }
}