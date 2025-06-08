import { IDebtPaymentRepository } from '@/views/debts-payments/domain/';
import { DebtPayment } from '@/views/debts-payments/domain';
import { DebtPaymentApiAdapter } from '@views/debts-payments/adapter/api';
import { apiClient } from '@/services';

export const debtPaymentApiRoutes = {
  list: '/debt-payments',
  full: '/debt-payments/search/full',
  partial: '/debt-payments/partial',
  details: (id: number | string) => `/debt-payments/${id}`,
};

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

  async createFull(payment: DebtPayment): Promise<DebtPayment> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.post(`${this.baseUrl}/full`, payload);
      return DebtPaymentApiAdapter.fromApi(data);
    } catch (error) {
      console.error('Error creating debt payment:', error);
      throw error;
    }
  }

  async createPartial(payment: DebtPayment): Promise<DebtPayment> {
    try {
      const payload = DebtPaymentApiAdapter.toApi(payment);
      const { data } = await apiClient.post(`${this.baseUrl}/partial`, payload);
      return DebtPaymentApiAdapter.fromApi(data);
    } catch (error) {
      console.error('Error creating debt payment:', error);
      throw error;
    }
  }
}
