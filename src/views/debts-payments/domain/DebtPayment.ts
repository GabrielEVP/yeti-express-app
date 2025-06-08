import { PaymentMethod, getPaymentMethodLabel } from '@/views/debts-payments/domain';

export class DebtPayment {
  private readonly id: string;
  private readonly amount: number;
  private readonly date: Date;
  private readonly method: PaymentMethod;
  private readonly debtId: string;

  constructor(id: string, amount: number, date: Date, method: PaymentMethod, debtId: string) {
    this.id = id;
    this.amount = amount;
    this.date = new Date(date);
    this.method = method;
    this.debtId = debtId;
  }

  getId(): string {
    return this.id;
  }

  getAmount(): number {
    return this.amount;
  }

  getPaidAt(): Date {
    return this.date;
  }

  getMethod(): PaymentMethod {
    return this.method;
  }

  getDebtId(): string {
    return this.debtId;
  }

  getMethodLabel(): string {
    return getPaymentMethodLabel(this.method);
  }
}
