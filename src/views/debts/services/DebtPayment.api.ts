import { apiClient } from '@/services';
import { DebtPayment } from '@/views/debts/';

export const debtPaymentApiRoutes = {
  full: '/debt-payments/full',
  partial: '/debt-payments/partial',
  payAll: '/debt-payments/pay-all',
  payPartialAmount: '/debt-payments/pay-partial-amount',
};

export const createDebtPaymentFull = async (payment: DebtPayment): Promise<DebtPayment> => {
  const response = await apiClient.post(debtPaymentApiRoutes.full, payment);
  return response.data;
};

export const createDebtPaymentPartial = async (payment: DebtPayment): Promise<DebtPayment> => {
  const response = await apiClient.post(debtPaymentApiRoutes.partial, payment);
  return response.data;
};

export const payAllDebts = async (pay: any): Promise<DebtPayment> => {
  const response = await apiClient.post(debtPaymentApiRoutes.payAll, pay);
  return response.data;
};

export const payPartialAmountAcrossDebts = async (pay: any): Promise<DebtPayment> => {
  const response = await apiClient.post(debtPaymentApiRoutes.payPartialAmount, pay);
  return response.data;
};
