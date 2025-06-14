import type { Debt, DebtPayment } from '@/views/debts/';
import { DebtStatus } from '@/views/debts/';
import { PaymentMethod } from '@/views/debts/';

export function adaptDebtPayment(apiData: any = {}): DebtPayment {
  return {
    id: apiData.id ?? '',
    amount: typeof apiData.amount === 'number' ? apiData.amount : Number(apiData.amount) || 0,
    date: apiData.date ? new Date(apiData.date) : new Date(),
    method: (apiData.method as PaymentMethod) ?? PaymentMethod.CASH, // ajustar default según enum
    debtId: apiData.debt_id ?? '',
  };
}

export function adaptDebtPaymentForApi(payment: DebtPayment): any {
  return {
    id: payment.id ?? null,
    amount: payment.amount,
    method: payment.method,
    debt_id: payment.debtId,
  };
}

export function adaptDebt(apiData: any = {}): Debt {
  return {
    id: apiData.id ?? '',
    amount: typeof apiData.amount === 'number' ? apiData.amount : Number(apiData.amount) || 0,
    status: (apiData.status as DebtStatus) ?? DebtStatus.PENDING,
    payments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptDebtPayment) : [],
    clientId: apiData.client_id ?? '',
    deliveryId: apiData.delivery_id ?? '',
  };
}

export function adaptDebtForApi(debt: Debt): any {
  return {
    id: debt.id ?? null,
    amount: debt.amount,
    status: debt.status,
    payments: Array.isArray(debt.payments) ? debt.payments.map(adaptDebtPaymentForApi) : [],
    client_id: debt.clientId,
    delivery_id: debt.deliveryId,
  };
}
