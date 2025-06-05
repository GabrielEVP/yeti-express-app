import { Debt, DebtStatus } from '@/views/debts/domain/';
import { Client } from '@/views/clients/domain/';
import { Delivery } from '@/views/deliveries/domain';
import { v4 as uuidv4 } from 'uuid';

export class DebtFactory {
  static create(
    amount: number,
    client: Client,
    delivery: Delivery,
    status: DebtStatus = DebtStatus.PENDING
  ): Debt {
    const id = uuidv4();
    return new Debt(
      id,
      amount,
      status,
      [],
      client,
      delivery
    );
  }

  static createEmpty(): Debt {
    return new Debt(
      '',
      0,
      DebtStatus.PENDING,
      [],
      null as any,
      null as any
    );
  }
}