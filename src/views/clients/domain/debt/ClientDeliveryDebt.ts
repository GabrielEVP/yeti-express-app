import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { ClientDebtPayment } from './ClientDebtPayment';
import { DebtStatus, getDebtStatusLabel } from './enum/DebtStatus';

export class ClientDeliveryDebt {
  private readonly id: string;
  private readonly client: Client;
  private readonly delivery: Delivery;
  private readonly status: DebtStatus;
  private readonly amount: number;
  private readonly payments: ClientDebtPayment[];

  constructor(
    id: string,
    client: Client,
    delivery: Delivery,
    status: DebtStatus,
    amount: number,
    payments: ClientDebtPayment[]
  ) {
    this.id = id;
    this.client = client;
    this.delivery = delivery;
    this.status = status;
    this.amount = amount;
    this.payments = payments;
  }

  getId(): string {
    return this.id;
  }

  getClient(): Client {
    return this.client;
  }

  getDelivery(): Delivery {
    return this.delivery;
  }

  getStatus(): DebtStatus {
    return this.status;
  }

  getStatusLabel(): string {
    return getDebtStatusLabel(this.status);
  }

  getAmount(): number {
    return this.amount;
  }

  getPayments(): ClientDebtPayment[] {
    return [...this.payments];
  }

  getPaidAmount(): number {
    return this.payments.reduce((total, payment) => total + payment.getAmount(), 0);
  }
}
