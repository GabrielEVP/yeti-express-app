import { PaymentMethod } from '@views/company-bills';

export interface DetailCompanyBill {
  id: string;
  date: string;
  name: string;
  description: string;
  method: PaymentMethod;
  amount: number;
  created_at: string;
  updated_at: string;
}
