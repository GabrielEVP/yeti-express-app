import { Debt, DebtStatus } from '@/views/debts/domain/';
import { ClientApiAdapter } from '@/views/clients/';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters/';
import { DebtPaymentApiAdapter } from '@/views/debts-payments/adapter/';

export class DebtApiAdapter {
  static fromApi(apiData: any): Debt | null {
    if (!apiData) return null;

    return new Debt(
      apiData.id ?? '',
      apiData.amount ?? 0,
      (apiData.status as DebtStatus) ?? DebtStatus.PENDING,
      apiData.payments?.map(DebtPaymentApiAdapter.fromApi) ?? [],
      ClientApiAdapter.fromApi(apiData.client),
      DeliveryApiAdapter.fromApi(apiData.delivery)
    );
  }

  static toApi(debt: Debt): any {
    if (!debt) return null;

    return {
      id: debt.getId(),
      amount: debt.getAmount(),
      status: debt.getStatus(),
      client_id: debt.getClient()?.getId() ?? '',
      delivery_id: debt.getDelivery()?.getId() ?? '',
      payments: debt.getPayments().map(DebtPaymentApiAdapter.toApi),
    };
  }
}
