import { PaymentMethod } from '@views/company-bills/models/PaymentMethod';

export interface CompanyBill {
  id: string;
  date: string;
  name: string;
  description: string;
  method: PaymentMethod;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
