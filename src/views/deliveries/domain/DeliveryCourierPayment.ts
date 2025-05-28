import { PaymentMethod } from '@/views/deliveries/domain/PaymentMethod';

export class DeliveryCourierPayment {
  private readonly id: string;
  private date: string;
  private method: PaymentMethod;
  private amount: number;
  private deliveryId: string;

  constructor(id: string, date: string, method: PaymentMethod, amount: number, deliveryId: string) {
    this.id = id;
    this.date = date;
    this.method = method;
    this.amount = amount;
    this.deliveryId = deliveryId;
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
  getDeliveryId(): string {
    return this.deliveryId;
  }
}
