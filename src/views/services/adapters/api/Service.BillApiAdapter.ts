import { Bill } from '@/views/services/domain/bill/Bill';

export class BillApiAdapter {
  static fromApi(apiData: any): Bill {

    return new Bill(
        apiData.id,
        apiData.name,
        apiData.amount,
    );
  }

  static toApi(bill: Bill): any {
    return {
      id: bill.getId(),
      name: bill.getName(),
      amount: bill.getAmount(),
    };
  }
}
