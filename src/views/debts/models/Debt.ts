import { DebtStatus, PaymentMethod } from '@/views/debts/';

export interface Debt {
  id: string;
  amount: number;
  status: DebtStatus;
  payments: DebtPayment[];
  clientId: string | null;
  deliveryId: string | null;
}

export interface DebtPayment {
  id: string;
  amount: number;
  date: Date;
  method: PaymentMethod;
  debt_id: string;
}
