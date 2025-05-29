import { PaymentMethod } from '@/views/deliveries/domain/PaymentMethod';

export class DeliveryClientCharge {
  private readonly id: string;
  private date: string;
  private method: PaymentMethod;
  private amount: number;

  constructor(id: string, date: string, method: PaymentMethod, amount: number) {
    this.id = id;
    this.date = date;
    this.method = method;
    this.amount = amount;
  }

  getId(): string {
    return this.id;
  }
  getDate(): string {
    return this.date;
  }
  getMethod(): PaymentMethod {
    return this.method;
  }
  getAmount(): number {
    return this.amount;
  }
}
