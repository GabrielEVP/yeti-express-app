import { DebtStatus } from '@/views/debts/domain';
import { IClientAggregateRepository } from '@/views/clients/';

export class GetClientDebtsUseCase {
  constructor(private readonly clientRepository: IClientAggregateRepository) {}

  async getDebtsTotalAmount(clientId: string): Promise<number> {
    const debts = await this.clientRepository.getDebts(clientId);
    return debts.reduce((total, debt) => {
      const status = debt.getStatus();
      return status === DebtStatus.PENDING || status === DebtStatus.PARTIAL_PAID ? total + Number(debt.getAmount()) : total;
    }, 0);
  }

  async getDebtsPaidAmount(clientId: string): Promise<number> {
    const debts = await this.clientRepository.getDebts(clientId);
    return debts.reduce((total, debt) => {
      return debt.getStatus() === DebtStatus.PAID ? total + Number(debt.getAmount()) : total;
    }, 0);
  }
}
