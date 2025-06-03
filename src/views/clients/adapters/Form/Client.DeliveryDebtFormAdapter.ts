import { ClientDeliveryDebt, DebtStatus, ClientType } from '@/views/clients/domain/';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { ClientFormAdapter } from './Client.FormAdapter';
import { ClientDebtPaymentFormAdapter } from './Client.DebtPaymentFormAdapter';

export class ClientDeliveryDebtFormAdapter {
  static fromForm(form: any, client?: Client): ClientDeliveryDebt {
    return new ClientDeliveryDebt(
      form.id ?? '',
      client ?? new Client(
        form.client_id ?? '',
        '', // legalName
        ClientType.VENEZOLANO, // type
        '', // registrationNumber
        '', // notes
        false, // allowCredit
        [], // timeLineContent
        [], // addresses
        [], // emails
        [], // phones
        [], // deliveries
        [], // deliveriesDebts
        new Date(), // createdAt
        new Date() // updatedAt
      ),
      form.delivery,
      form.status as DebtStatus,
      form.amount,
      (form.payments ?? []).map(ClientDebtPaymentFormAdapter.fromForm)
    );
  }

  static toForm(debt: ClientDeliveryDebt): any {
    return {
      id: debt.getId(),
      client_id: debt.getClient().getId(),
      delivery_id: debt.getDelivery().getId(),
      status: debt.getStatus(),
      amount: debt.getAmount(),
      payments: debt.getPayments().map(ClientDebtPaymentFormAdapter.toForm)
    };
  }
}