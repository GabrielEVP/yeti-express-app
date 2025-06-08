import { DebtPayment } from '@/views/debts-payments/domain/';
import { PaymentMethod } from '@/views/debts-payments/domain/';

export class DebtPaymentApiAdapter extends DebtPayment {
  static fromApi(apiData: any): DebtPayment {
    return new DebtPayment(
      apiData.id,
      apiData.amount,
      apiData.date,
      apiData.method as PaymentMethod,
      apiData.debt_id
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
