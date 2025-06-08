import { DebtPayment } from '@/views/debts-payments/domain/';
import { PaymentMethod } from '@/views/debts-payments/domain/';

export class DebtPaymentFormAdapter {
  static fromFormFullPayment(form: any): DebtPayment {
    return new DebtPayment(form.id ?? '', 0, new Date(), form.method as PaymentMethod, form.debtId);
  }

  static fromFormPartialPayment(form: any): DebtPayment {
    return new DebtPayment(
      form.id ?? '',
      form.amount,
      new Date(),
      form.method as PaymentMethod,
      form.debtId
    );
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
