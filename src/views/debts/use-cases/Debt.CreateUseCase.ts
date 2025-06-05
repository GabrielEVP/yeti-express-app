import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class CreateDebtUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(debt: Debt): Promise<Debt> {
    return await this.repository.create(debt);
  }
}
