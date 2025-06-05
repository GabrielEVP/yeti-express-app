import { ClientDebtPayment } from '@/views/clients/domain/';
import { PaymentMethod } from '@/views/clients/domain/';

export class ClientDebtPaymentApiAdapter extends ClientDebtPayment {
  static fromApi(apiData: any): ClientDebtPayment {
    return new ClientDebtPayment(
      apiData.id,
      apiData.amount,
      apiData.date,
      apiData.method as PaymentMethod
    );
  }

  static toApi(payment: ClientDebtPayment): any {
    return {
      id: payment.getId(),
      amount: payment.getAmount(),
      date: payment.getPaidAt().toISOString(),
      method: payment.getMethod()
    };
  }
}