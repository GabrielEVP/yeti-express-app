import { IDebtPaymentRepository } from '@/views/debts-payments/domain/';
import { DebtPayment } from '@/views/debts-payments/domain';
import { PaymentMethod } from '@/views/debts-payments/domain';
import { DebtPaymentApiAdapter } from '@views/debts-payments/adapter/api';
import { apiClient } from '@/services';

export class DebtPaymentRepositoryImpl implements IDebtPaymentRepository {
  private readonly baseUrl = '/debt-payments';

  async getAll(): Promise<DebtPayment[]> {
    try {
      const { data } = await apiClient.get(this.baseUrl);
      return data.map(DebtPaymentApiAdapter.fromApi);
    } catch (error) {
      console.error('Error fetching all debt payments:', error);
      return [];
    }
  }

  async getById(id: string): Promise<DebtPayment | null> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/${id}`);
      return DebtPaymentApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error fetching debt payment by id ${id}:`, error);
      return null;
    }
  }

  async getByDebtId(debtId: string): Promise<DebtPayment[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/debt/${debtId}`);
      return data.map(DebtPaymentApiAdapter.fromApi);
    } catch (error) {
      console.error(`Error fetching payments for debt ${debtId}:`, error);
      return [];
    }
  }

  async getByMethod(method: PaymentMethod): Promise<DebtPayment[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/method/${method}`);
      return data.map(DebtPaymentApiAdapter.fromApi);
    } catch (error) {
      console.error(`Error fetching debt payments by method ${method}:`, error);
      return [];
    }
  }

  async create(payment: DebtPayment): Promise<DebtPayment> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.post(this.baseUrl, payload);
      return DebtPaymentApiAdapter.fromApi(data);
    } catch (error) {
      console.error('Error creating debt payment:', error);
      throw error;
    }
  }

  async update(id: string, payment: DebtPayment): Promise<DebtPayment> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.put(`${this.baseUrl}/${id}`, payload);
      return DebtPaymentApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error updating debt payment ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting debt payment ${id}:`, error);
      throw error;
    }
  }
}
