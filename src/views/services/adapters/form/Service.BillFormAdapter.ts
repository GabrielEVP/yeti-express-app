import { Bill } from '@views/services/domain/bill/Bill';

export class BillFormAdapter {
  static fromForm(form: any): Bill {
    return new Bill(
      form.id ?? '',
      form.name ?? '',
      Number(form.amount) ?? 0
    );
  }

  static toForm(bill: Bill): any {
    return {
      id: bill.getId(),
      name: bill.getName(),
      amount: bill.getAmount()
    };
  }
}