import { IDebtRepository } from '@/views/debts/domain/IDebtRepository';
import { Debt, DebtPayment, DebtStatus } from '@/views/debts/domain/';
import { DebtApiAdapter } from '@/views/debts/adapter/api/DebtApiAdapter';
import { DebtPaymentApiAdapter } from '@/views/debts/adapter/api/DebtPaymentApiAdapter';
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

  async getByClientId(clientId: string): Promise<Debt[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/client/${clientId}`);
      return data.map(DebtApiAdapter.fromApi);
    } catch (error) {
      console.error(`Error fetching debts for client ${clientId}:`, error);
      return [];
    }
  }

  async getByDeliveryId(deliveryId: string): Promise<Debt | null> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/delivery/${deliveryId}`);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error fetching debt for delivery ${deliveryId}:`, error);
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

  async create(debt: Debt): Promise<Debt> {
    try {
      const payload = DebtApiAdapter.toApi(debt);
      const { data } = await apiClient.post(this.baseUrl, payload);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error('Error creating debt:', error);
      throw error;
    }
  }

  async update(id: string, debt: Debt): Promise<Debt> {
    try {
      const payload = DebtApiAdapter.toApi(debt);
      const { data } = await apiClient.put(`${this.baseUrl}/${id}`, payload);
      return DebtApiAdapter.fromApi(data);
    } catch (error) {
      console.error(`Error updating debt with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting debt with id ${id}:`, error);
      throw error;
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

  async search(query: string): Promise<Debt[]> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/search`, {
        params: { q: query },
      });
      return data.map(DebtApiAdapter.fromApi);
    } catch (error) {
      console.error(`Error searching debts with query ${query}:`, error);
      return [];
    }
  }

  async getFilterAll(params: {
    search?: string;
    sortBy?: keyof Debt;
    sortDirection?: 'asc' | 'desc';
    filters?: Record<string, any>;
    page?: number;
    perPage?: number;
  }): Promise<{ data: Debt[]; total: number }> {
    try {
      const { data } = await apiClient.get(`${this.baseUrl}/filter`, { params });
      return {
        data: data.items.map(DebtApiAdapter.fromApi),
        total: data.total,
      };
    } catch (error) {
      console.error('Error filtering debts:', error);
      return { data: [], total: 0 };
    }
  }
}
