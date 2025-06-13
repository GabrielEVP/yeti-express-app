import type { IDebtRepository } from '@/views/debts/domain/IDebtRepository';
import type { Debt } from '@/views/debts/domain/';
import type { DebtStatus } from '@/views/debts/domain/enum/DebtStatus';
import { DebtApiAdapter } from '@views/debts/adapter/api/DebtApiAdapter';
import { apiClient } from '@/services';

export class DebtRepositoryImpl implements IDebtRepository {
  private readonly baseUrl = '/debts';

  async getAll(): Promise<Debt[]> {
    try {
      const { data } = await apiClient.get(this.baseUrl);
      return data.map(DebtApiAdapter.fromApi);
    } catch (error) {
      console.error('Error fetching debts:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Debt | null> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/${id}`);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error fetching debt with id ${id}:`, error);
      return null;
    }
  }

  async getByStatus(status: DebtStatus): Promise<Debt[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/status/${status}`);
      return data.map(DebtApiAdapter.fromApi);
    } catch (error) {
      console.error(`Error fetching debts with status ${status}:`, error);
      return [];
    }
  }

  async StatusUpdate(id: string, debt: Debt): Promise<Debt> {
    try {
      const payload = DebtApiAdapter.toApi(debt);
      const { data } = await apiClient.put(`${this.baseUrl}/${id}/status`, payload);
      return DebtApiAdapter.fromApi(data)!;
    } catch (error) {
      console.error(`Error updating status of debt with id ${id}:`, error);
      throw error;
    }
  }

  async create(debt: Debt): Promise<Debt> {
    try {
      const payload = DebtApiAdapter.toApi(debt);
      const { data } = await apiClient.post(this.baseUrl, payload);
      return DebtApiAdapter.fromApi(data)!;
    } catch (error) {
      console.error('Error creating debt:', error);
      throw error;
    }
  }

  async update(id: string, debt: Debt): Promise<Debt> {
    try {
      const payload = DebtApiAdapter.toApi(debt);
      const { data } = await apiClient.put(`${this.baseUrl}/${id}`, payload);
      return DebtApiAdapter.fromApi(data)!;
    } catch (error) {
      console.error(`Error updating debt with id ${id}:`, error);
      throw error;
    }
  }
}
