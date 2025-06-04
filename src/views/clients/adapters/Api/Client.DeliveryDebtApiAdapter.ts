import { ClientDeliveryDebt, DebtStatus } from '@/views/clients/domain/';
import { Client } from '@/views/clients/domain/';
import { ClientDebtPaymentApiAdapter } from './Client.DebtPaymentApiAdapter';

export class ClientDeliveryDebtApiAdapter extends ClientDeliveryDebt {
  static fromApi(apiData: any, client?: Client): ClientDeliveryDebt {
    return new ClientDeliveryDebt(
      apiData.id,
      null as any,
      null as any,
      apiData.status as DebtStatus,
      apiData.amount,
      apiData.payments?.map(ClientDebtPaymentApiAdapter.fromApi) ?? []
    );
  }

  static toApi(debt: ClientDeliveryDebt): any {
    return {
      id: debt.getId(),
      client_id: debt.getClient().getId(),
      delivery_id: debt.getDelivery().getId(),
      status: debt.getStatus(),
      amount: debt.getAmount(),
      payments: debt.getPayments().map(ClientDebtPaymentApiAdapter.toApi),
    };
  }
}
