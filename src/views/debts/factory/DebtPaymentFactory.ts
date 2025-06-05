import { DebtPayment, PaymentMethod } from '@/views/debts/domain/';
import { v4 as uuidv4 } from 'uuid';

export class DebtPaymentFactory {
  static create(
    amount: number,
    method: PaymentMethod = PaymentMethod.CASH,
    date: Date = new Date()
  ): DebtPayment {
    const id = uuidv4();
    return new DebtPayment(
      id,
      amount,
      date,
      method
    );
  }

  static createEmpty(): DebtPayment {
    return new DebtPayment(
      '',
      0,
      new Date(),
      PaymentMethod.CASH
    );
  }
}