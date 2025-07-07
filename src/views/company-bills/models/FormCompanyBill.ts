import { PaymentMethod } from '@views/company-bills';

export interface FormCompanyBill {
  date: string;
  name: string;
  description: string;
  method: PaymentMethod;
  amount: number;
}
