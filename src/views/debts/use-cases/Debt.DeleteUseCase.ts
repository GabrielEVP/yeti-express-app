import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';

export class DeleteDebtUseCase {
  constructor(private repository: IDebtRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(`Error in DeleteDebtUseCase for id ${id}:`, error);
      throw error;
    }
  }
}