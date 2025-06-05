import { DebtPayment } from '@/views/debts-payments/domain/';
import { PaymentMethod } from '@/views/debts-payments/domain/';

export class DebtPaymentFormAdapter {
  static fromForm(form: any): DebtPayment {
    return new DebtPayment(form.id ?? '', form.amount, form.date, form.method as PaymentMethod);
  }

  static toForm(payment: DebtPayment): any {
    return {
      id: payment.getId(),
      amount: payment.getAmount(),
      date: payment.getPaidAt().toISOString(),
      method: payment.getMethod(),
    };
  }
}
