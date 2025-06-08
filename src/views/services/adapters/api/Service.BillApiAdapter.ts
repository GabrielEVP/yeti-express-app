import { Bill } from '@/views/services/domain/bill/Bill';

export class BillApiAdapter {
  public id: string;
  public name: string;
  public amount: number;

  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  static fromApi(BillApiAdapter: BillApiAdapter): Bill {
    return new Bill(BillApiAdapter.id, BillApiAdapter.name, BillApiAdapter.amount);
  }

  static toApi(bill: Bill): BillApiAdapter {
    return {
      id: bill.getId(),
      name: bill.getName(),
      amount: bill.getAmount(),
    };
  }
}
