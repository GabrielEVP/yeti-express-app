import { CompanyBill } from '@/views/company-bills/domain/CompanyBill';
import { PaymentMethod } from '@/views/company-bills/domain/enums';

export const createDefaultCompanyBill = (): CompanyBill => {
  return new CompanyBill('', new Date(), '', '', PaymentMethod.CASH, 0, '', new Date(), new Date());
};
