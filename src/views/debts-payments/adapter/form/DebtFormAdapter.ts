import { Debt, DebtStatus } from '@/views/debts/domain/';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { DebtPaymentFormAdapter } from './DebtPaymentFormAdapter';

export class DebtFormAdapter {
  static fromForm(form: any, client?: Client, delivery?: Delivery): Debt {
    return new Debt(
      form.id ?? '',
      form.amount,
      form.status as DebtStatus,
      (form.payments ?? []).map(DebtPaymentFormAdapter.fromForm),
      client ?? form.client,
      delivery ?? form.delivery
    );
  }

  static toForm(debt: Debt): any {
    return {
      id: debt.getId(),
      amount: debt.getAmount(),
      status: debt.getStatus(),
      client_id: debt.getClient().getId(),
      delivery_id: debt.getDelivery().getId(),
      payments: debt.getPayments().map(DebtPaymentFormAdapter.toForm)
    };
  }
}