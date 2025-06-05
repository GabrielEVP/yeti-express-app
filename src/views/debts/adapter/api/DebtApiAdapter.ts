import { Debt, DebtStatus } from '@/views/debts/domain/';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { DebtPaymentApiAdapter } from '@/views/debts-payments/adapters/';

export class DebtApiAdapter {
  static fromApi(apiData: any, client?: Client, delivery?: Delivery): Debt {
    return new Debt(
      apiData.id,
      apiData.amount,
      apiData.status as DebtStatus,
      apiData.payments?.map(DebtPaymentApiAdapter.fromApi) ?? [],
      client ?? apiData.client,
      delivery ?? apiData.delivery
    );
  }

  static toApi(debt: Debt): any {
    return {
      id: debt.getId(),
      amount: debt.getAmount(),
      status: debt.getStatus(),
      client_id: debt.getClient().getId(),
      delivery_id: debt.getDelivery().getId(),
      payments: debt.getPayments().map(DebtPaymentApiAdapter.toApi),
    };
  }
}
