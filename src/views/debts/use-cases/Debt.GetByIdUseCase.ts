import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class GetDebtByIdUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(id: string): Promise<Debt | null> {
    return await this.repository.getById(id);
  }
}
