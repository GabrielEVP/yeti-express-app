import { PaymentMethod, getPaymentMethodLabel } from './enum/PaymentMethod';

export class ClientDebtPayment {
  private readonly id: string;
  private readonly amount: number;
  private readonly date: Date;
  private readonly method: PaymentMethod;

  constructor(id: string, amount: number, date: Date | string, method: PaymentMethod) {
    this.id = id;
    this.amount = amount;
    this.date = typeof date === 'string' ? new Date(date) : date;
    this.method = method;
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

  getMethodLabel(): string {
    return getPaymentMethodLabel(this.method);
  }
}
