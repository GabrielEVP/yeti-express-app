import { CompanyBill } from '@views/company-bills/';
import { PaymentMethod } from '@views/company-bills/models/PaymentMethod';

export function adaptCompanyBill(apiData: any = {}): CompanyBill {
  return {
    id: apiData.id ?? '',
    date: apiData.date ?? '',
    name: apiData.name ?? '',
    description: apiData.description ?? '',
    method: (apiData.method as PaymentMethod) ?? PaymentMethod.CASH,
    amount: Number(apiData.amount ?? 0),
    createdAt: new Date(apiData.created_at ?? new Date()),
    updatedAt: new Date(apiData.updated_at ?? new Date()),
  };
}

export function adaptCompanyBillForApi(companyBill: CompanyBill): any {
  return {
    id: companyBill.id,
    date: companyBill.date,
    name: companyBill.name,
    description: companyBill.description,
    method: companyBill.method,
    amount: companyBill.amount,
  };
}
