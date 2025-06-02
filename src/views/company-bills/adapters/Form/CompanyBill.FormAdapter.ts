import { CompanyBill } from '@/views/company-bills/domain/CompanyBill';
import { PaymentMethod } from '@/views/company-bills/domain/enums/PaymentMethod';

export class CompanyBillFormAdapter {
  static fromForm(form: any): CompanyBill {
    return new CompanyBill(
      form.id ?? '',
      new Date(form.date),
      form.name,
      form.description,
      form.method as PaymentMethod,
      Number(form.amount),
      form.userId ?? '',
      form.createdAt ? new Date(form.createdAt) : new Date(),
      form.updatedAt ? new Date(form.updatedAt) : new Date()
    );
  }

  static toForm(bill: CompanyBill): any {
    return {
      id: bill.getId(),
      date: bill.getDate().toISOString().split('T')[0],
      name: bill.getName(),
      description: bill.getDescription(),
      method: bill.getMethod(),
      amount: bill.getAmount(),
      userId: bill.getUserId(),
      createdAt: bill.getCreatedAt(),
      updatedAt: bill.getUpdatedAt(),
    };
  }
}
