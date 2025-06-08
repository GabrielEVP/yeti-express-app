import { CompanyBill } from '@/views/company-bills/domain/CompanyBill';
import { PaymentMethod } from '@/views/company-bills/domain/enums/PaymentMethod';

export class CompanyBillApiAdapter extends CompanyBill {
  static fromApi(apiData: any): CompanyBill {
    return new CompanyBill(
      apiData.id,
      apiData.date,
      apiData.name,
      apiData.description,
      apiData.method as PaymentMethod,
      Number(apiData.amount),
      apiData.user_id,
      new Date(apiData.created_at),
      new Date(apiData.updated_at)
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
