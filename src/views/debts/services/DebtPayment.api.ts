import { apiClient } from '@/services';
import { DebtPayment } from '@/views/debts/';
import { adaptDebtPayment, adaptDebtPaymentForApi } from '@/views/debts/';

export const debtPaymentApiRoutes = {
  list: '/debt-payments',
  full: '/debt-payments/full',
  partial: '/debt-payments/partial',
  details: (id: string | number) => `/debt-payments/${id}`,
  payAll: '/debt-payments/pay-all',
  payPartialAmount: '/debt-payments/pay-partial-amount',
};

export const getAllDebtPayments = async (): Promise<DebtPayment[]> => {
  try {
    const response = await apiClient.get(debtPaymentApiRoutes.list);
    return Array.isArray(response.data) ? response.data.map(adaptDebtPayment) : [adaptDebtPayment(response.data)];
  } catch (error) {
    console.error('Error fetching all debt payments:', error);
    return [];
  }
};

export const getDebtPaymentById = async (id: string): Promise<DebtPayment | null> => {
  try {
    const response = await apiClient.get(debtPaymentApiRoutes.details(id));
    return adaptDebtPayment(response.data);
  } catch (error) {
    console.error(`Error fetching debt payment by id ${id}:`, error);
    return null;
  }
};

export const createDebtPaymentFull = async (payment: DebtPayment): Promise<DebtPayment> => {
  try {
    const payload = adaptDebtPaymentForApi(payment);
    const response = await apiClient.post(debtPaymentApiRoutes.full, payload);
    return adaptDebtPayment(response.data);
  } catch (error) {
    console.error('Error creating full debt payment:', error);
    throw error;
  }
};

export const createDebtPaymentPartial = async (payment: DebtPayment): Promise<DebtPayment> => {
  try {
    const payload = adaptDebtPaymentForApi(payment);
    const response = await apiClient.post(debtPaymentApiRoutes.partial, payload);
    return adaptDebtPayment(response.data);
  } catch (error) {
    console.error('Error creating partial debt payment:', error);
    throw error;
  }
};

export const payAllDebts = async (pay: any): Promise<DebtPayment[]> => {
  try {
    const response = await apiClient.post(debtPaymentApiRoutes.payAll, { pay });
    return Array.isArray(response.data) ? response.data.map(adaptDebtPayment) : [];
  } catch (error) {
    console.error('Error paying all debts for client:', error);
    throw error;
  }
};

export const payPartialAmountAcrossDebts = async (pay: any): Promise<DebtPayment[]> => {
  try {
    const response = await apiClient.post(debtPaymentApiRoutes.payPartialAmount, { pay });
    return Array.isArray(response.data) ? response.data.map(adaptDebtPayment) : [];
  } catch (error) {
    console.error('Error paying partial amount across debts for client:', error);
    throw error;
  }
};
