import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class GetDebtsUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(): Promise<Debt[]> {
    return await this.repository.getAll();
  }
}
