import { DebtPayment } from '@/views/debts/domain';
import { DebtStatus, getDebtStatusLabel } from '@/views/debts/domain';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';

export class Debt {
  private readonly id: string;
  private readonly amount: number;
  private readonly status: DebtStatus;
  private readonly payments: DebtPayment[];
  private readonly client: Client;
  private readonly delivery: Delivery;

  constructor(
    id: string,
    amount: number,
    status: DebtStatus,
    payments: DebtPayment[],
    client: Client,
    delivery: Delivery
  ) {
    this.id = id;
    this.amount = amount;
    this.status = status;
    this.payments = payments;
    this.client = client;
    this.delivery = delivery;
  }

  getId(): string {
    return this.id;
  }

  getAmount(): number {
    return this.amount;
  }
  getStatus(): DebtStatus {
    return this.status;
  }

  getStatusLabel(): string {
    return getDebtStatusLabel(this.status);
  }

  getPayments(): DebtPayment[] {
    return [...this.payments];
  }

  getClient(): Client {
    return this.client;
  }

  getDelivery(): Delivery {
    return this.delivery;
  }
  getPaidAmount(): number {
    return this.payments.reduce((total, payment) => total + payment.getAmount(), 0);
  }

  getRemainingAmount(): number {
    return this.amount - this.getPaidAmount();
  }
}
