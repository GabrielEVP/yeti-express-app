import { DebtPayment } from '@/views/debts-payments/domain/';
import { PaymentMethod } from '@/views/debts-payments/domain/';

export class DebtPaymentApiAdapter {
  public id: string;
  public amount: number;
  public date: Date;
  public method: PaymentMethod;
  public debt_id: string;

  constructor(id: string, amount: number, date: Date, method: PaymentMethod, debt_id: string) {
    this.id = id;
    this.amount = amount;
    this.date = new Date(date);
    this.method = method;
    this.debt_id = debt_id;
  }

  static fromApi(debtPaymentApiAdapter: DebtPaymentApiAdapter): DebtPayment {
    return new DebtPayment(
      debtPaymentApiAdapter.id,
      debtPaymentApiAdapter.amount,
      debtPaymentApiAdapter.date,
      debtPaymentApiAdapter.method as PaymentMethod,
      debtPaymentApiAdapter.debt_id
    );
  }

  static toApi(payment: DebtPayment): any {
    return {
      id: payment.getId(),
      amount: payment.getAmount(),
      date: payment.getPaidAt().toISOString(),
      method: payment.getMethod(),
      debt_id: payment.getDebtId(),
    };
  }
}
