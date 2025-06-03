import { ClientDebtPayment } from '@/views/clients/domain/';
import { PaymentMethod } from '@/views/clients/domain/';

export class ClientDebtPaymentFormAdapter extends ClientDebtPayment {
  static fromForm(form: any): ClientDebtPayment {
    return new ClientDebtPayment(
      form.id ?? '',
      form.amount,
      form.date,
      form.method as PaymentMethod
    );
  }

  static toForm(payment: ClientDebtPayment): any {
    return {
      id: payment.getId(),
      amount: payment.getAmount(),
      date: payment.getPaidAt().toISOString(),
      method: payment.getMethod()
    };
  }
}