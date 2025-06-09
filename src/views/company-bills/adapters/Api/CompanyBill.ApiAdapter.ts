import { CompanyBill } from '@/views/company-bills/domain/CompanyBill';
import { PaymentMethod } from '@/views/company-bills/domain/enums/PaymentMethod';

export class CompanyBillApiAdapter {
  public id: string;
  public date: string;
  public name: string;
  public description: string;
  public method: PaymentMethod;
  public amount: number;
  public user_id: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    date: string,
    name: string,
    description: string,
    method: PaymentMethod,
    amount: number,
    user_id: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.description = description;
    this.method = method;
    this.amount = amount;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromApi(companyBillApiAdapter: CompanyBillApiAdapter): CompanyBill {
    return new CompanyBill(
      companyBillApiAdapter.id,
      companyBillApiAdapter.date,
      companyBillApiAdapter.name,
      companyBillApiAdapter.description,
      companyBillApiAdapter.method as PaymentMethod,
      Number(companyBillApiAdapter.amount),
      companyBillApiAdapter.user_id,
      new Date(companyBillApiAdapter.created_at),
      new Date(companyBillApiAdapter.updated_at)
    );
  }

  static toApi(bill: CompanyBill): any {
    return {
      id: bill.getId(),
      date: bill.getDate(),
      name: bill.getName(),
      description: bill.getDescription(),
      method: bill.getMethod(),
      amount: bill.getAmount(),
      user_id: bill.getUserId(),
      created_at: bill.getCreatedAt(),
      updated_at: bill.getUpdatedAt(),
    };
  }
}
