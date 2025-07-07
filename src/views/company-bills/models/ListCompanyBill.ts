import { PaymentMethod } from '@views/company-bills';

export interface ListCompanyBill {
  id: string;
  date: string;
  name: string;
  method: PaymentMethod;
  amount: number;
}
