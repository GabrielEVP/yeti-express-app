import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';
import { DebtPayment } from '@/views/debts/domain/';
import { DebtPaymentApiAdapter } from '@/views/debts/adapter/api/DebtPaymentApiAdapter';
import { apiClient } from '@/services';

export class DebtRepositoryImpl implements IDebtRepository {
  async getAll(): Promise<Debt[]> {
    try {
      const { data } = await apiClient.get(this.baseUrl);
      return data.map(DebtApiAdapter.fromApi);
    } catch (error) {
      console.error('Error fetching debts:', error);
      return [];
    }
  }

  async addPayment(debtId: string, payment: DebtPayment): Promise<Debt> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.post(`${this.baseUrl}/${debtId}/payments`, payload);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error adding payment to debt ${debtId}:`, error);
      throw error;
    }
  }

  async updatePayment(debtId: string, paymentId: string, payment: DebtPayment): Promise<Debt> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.put(
        `${this.baseUrl}/${debtId}/payments/${paymentId}`,
        payload
      );
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error updating payment ${paymentId} for debt ${debtId}:`, error);
      throw error;
    }
  }

  async deletePayment(debtId: string, paymentId: string): Promise<Debt> {
    try {
      const { data } = await apiClient.delete(`${this.baseUrl}/${debtId}/payments/${paymentId}`);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error deleting payment ${paymentId} from debt ${debtId}:`, error);
      throw error;
    }
  }
}
