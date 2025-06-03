import { ClientDeliveryDebt, DebtStatus } from '@/views/clients/domain/';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { ClientApiAdapter } from './Client.ApiAdapter';
import { adaptDeliveryToClient } from '@/views/deliveries/adapters/Delivery.ApiAdapter';
import { ClientDebtPaymentApiAdapter } from './Client.DebtPaymentApiAdapter';

export class ClientDeliveryDebtApiAdapter extends ClientDeliveryDebt {
  static fromApi(apiData: any, client?: Client): ClientDeliveryDebt {
    return new ClientDeliveryDebt(
      apiData.id,
      client || ClientApiAdapter.fromApiToDelivery(apiData.client),
      adaptDeliveryToClient(apiData.delivery),
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
      payments: debt.getPayments().map(ClientDebtPaymentApiAdapter.toApi)
    };
  }
}