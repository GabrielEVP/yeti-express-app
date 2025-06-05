import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class UpdateDebtUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(id: string, debt: Debt): Promise<Debt> {
    return await this.repository.update(id, debt);
  }
}
