import { Debt } from '@/views/debts/domain/';
import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class UpdateDebtStatus {
  constructor(private readonly debtRepository: IDebtRepository) {}

  async execute(id: string, updatedDebt: Debt): Promise<Debt> {
    return await this.debtRepository.StatusUpdate(id, updatedDebt);
  }
}
